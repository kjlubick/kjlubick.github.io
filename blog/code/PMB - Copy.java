/*
 * fb-contrib - Auxiliary detectors for Java programs
 * Copyright (C) 2005-2014 Dave Brosius
 */

public class PossibleMemoryBloat extends BytecodeScanningDetector
{
	private static final Set<String> bloatableSigs = new HashSet<String>();
	static {
		bloatableSigs.add("Ljava/util/concurrent/ArrayBlockingQueue;");
		bloatableSigs.add("Ljava/util/ArrayList;");
		//snip... lots more signatures ...	
		bloatableSigs.add("Ljava/util/Vector;");
	}
	private static final Set<String> decreasingMethods = new HashSet<String>();
	static {
		decreasingMethods.add("clear");
		decreasingMethods.add("delete");
		//snip... more methods that remove elements
		decreasingMethods.add("take");
	}

	private static final Set<String> increasingMethods = new HashSet<String>();
	static {
		increasingMethods.add("add");
		increasingMethods.add("addAll");
		//snip... more methods that add things
		increasingMethods.add("put");
	}
	private final BugReporter bugReporter;
	private OpcodeStack stack;
	private Map<XField, SourceLineAnnotation> bloatableFields;
	private String methodName;

	public PossibleMemoryBloat(BugReporter bugReporter) {
		this.bugReporter = bugReporter;
	}

	@Override
	public void visitClassContext(ClassContext classContext) {
		try {
			bloatableFields = new HashMap<XField, SourceLineAnnotation>();
			JavaClass cls = classContext.getJavaClass();
			Field[] fields = cls.getFields();
			for (Field f : fields) {
				if (f.isStatic()) {
					String sig = f.getSignature();
					if (bloatableSigs.contains(sig)) {
						bloatableFields.put(XFactory.createXField(cls.getClassName(), f.getName(), f.getSignature(), f.isStatic()), null);
					}
				} else if ("Ljava/lang/ThreadLocal;".equals(f.getSignature())) {
					bugReporter.reportBug(new BugInstance(this, "PMB_INSTANCE_BASED_THREAD_LOCAL", NORMAL_PRIORITY)
					.addClass(this)
					.addField(XFactory.createXField(cls.getClassName(), f.getName(), f.getSignature(), f.isStatic())));
				}
			}

			if (bloatableFields.size() > 0) {
				stack = new OpcodeStack();
				super.visitClassContext(classContext);

				for (Map.Entry<XField, SourceLineAnnotation> entry : bloatableFields.entrySet()) {
					SourceLineAnnotation sla = entry.getValue();
					if (sla != null) {
						bugReporter.reportBug(new BugInstance(this, "PMB_POSSIBLE_MEMORY_BLOAT", NORMAL_PRIORITY)
						.addClass(this)
						.addSourceLine(sla)
						.addField(entry.getKey()));
					}
				}
			}
		} finally {
			stack = null;
			bloatableFields = null;
		}
	}

	@Override
	public void visitMethod(Method obj) {
		methodName = obj.getName();
	}

	@Override
	public void visitCode(Code obj) {
		stack.resetForMethodEntry(this);

		if ("<clinit>".equals(methodName) || "<init>".equals(methodName))
			return;

		if (bloatableFields.size() > 0)
			super.visitCode(obj);
	}

	@Override
	public void sawOpcode(int seen) {
		try {
			if (bloatableFields.isEmpty())
				return;

			stack.precomputation(this);

			if ((seen == INVOKEVIRTUAL) || (seen == INVOKEINTERFACE)) {
				String sig = getSigConstantOperand();
				int argCount = Type.getArgumentTypes(sig).length;
				if (stack.getStackDepth() > argCount) {
					OpcodeStack.Item itm = stack.getStackItem(argCount);
					XField field = itm.getXField();
					if (field != null) {
						if (bloatableFields.containsKey(field)) {
							String mName = getNameConstantOperand();
							if (decreasingMethods.contains(mName)) {
								bloatableFields.remove(field);
							} else if (increasingMethods.contains(mName)) {
								if (bloatableFields.get(field) == null) {
									SourceLineAnnotation sla = SourceLineAnnotation.fromVisitedInstruction(this);
									bloatableFields.put(field, sla);
								}
							}
						}
					}
				}
			}
			else if (seen == ARETURN) {
				if (stack.getStackDepth() > 0) {
					OpcodeStack.Item returnItem = stack.getStackItem(0);
					XField field = returnItem.getXField();
					if (field != null) {
						bloatableFields.remove(field);
					}
				}
			}
		}
		finally {
			stack.sawOpcode(this, seen);
		}
	}
}