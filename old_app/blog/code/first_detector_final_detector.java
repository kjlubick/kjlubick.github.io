//detect/HangingExecutors.java
public class HangingExecutors extends BytecodeScanningDetector {
	
	private static final Set<String> hangableSig = new HashSet<String>();
	
	static {
		hangableSig.add("Ljava/util/concurrent/ExecutorService;");
	}
	
	private static final Set<String> terminatingMethods = new HashSet<String>();
	
	static {
		terminatingMethods.add("shutdown");
		terminatingMethods.add("shutdownNow");
	}
	
	private final BugReporter bugReporter;
	private Map<XField, FieldAnnotation> hangingCandidates;
	private OpcodeStack stack;
	private String methodName;
	
	public HangingExecutors(BugReporter reporter) {
		this.bugReporter=reporter;
	}
	
	@Override
	public void visitClassContext(ClassContext classContext) {
		try {
			hangingCandidates = new HashMap<XField, FieldAnnotation>();
			parseFields(classContext);

			if (hangingCandidates.size() > 0) {
				stack = new OpcodeStack();
				super.visitClassContext(classContext);
				reportHangingExecutorBugs();
			}
		} finally {
			stack = null;
			hangingCandidates = null;
		}
	}
	
	private void parseFields(ClassContext classContext) {
		JavaClass cls = classContext.getJavaClass();
		Field[] fields = cls.getFields();
		for (Field f : fields) {
			String sig = f.getSignature();
			Debug.println(sig);
			if (hangableSig.contains(sig)) {
				hangingCandidates.put(XFactory.createXField(cls.getClassName(), f.getName(), f.getSignature(), f.isStatic()), FieldAnnotation.fromBCELField(cls, f));
			}
		}
	}
	
	private void reportHangingExecutorBugs() {
		for (Entry<XField, FieldAnnotation> entry : hangingCandidates.entrySet()) {
			FieldAnnotation fieldAn = entry.getValue();
			if (fieldAn != null) {
				bugReporter.reportBug(new BugInstance(this, "HE_EXECUTOR_NEVER_SHUTDOWN", NORMAL_PRIORITY)
				.addClass(this)
				.addField(fieldAn)
				.addField(entry.getKey()));
			}
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

		if (hangingCandidates.size() > 0)
			super.visitCode(obj);
	}

	@Override
	public void sawOpcode(int seen) {
		try {
			if (hangingCandidates.isEmpty())
				return;

			stack.precomputation(this);

			if ((seen == INVOKEVIRTUAL) || (seen == INVOKEINTERFACE)) {
				String sig = getSigConstantOperand();
				int argCount = Type.getArgumentTypes(sig).length;
				if (stack.getStackDepth() > argCount) {
					OpcodeStack.Item itm = stack.getStackItem(argCount);
					XField field = itm.getXField();
					if (field != null) {
						if (hangingCandidates.containsKey(field)) {
							checkMethodAsShutdownOrRelated(field);
						}
					}
				}
			}
			//Should not include private methods
			else if (seen == ARETURN) {
				removeFieldsThatGetReturned();
			}
		}
		finally {
			stack.sawOpcode(this, seen);
		}
	}

	private void removeFieldsThatGetReturned() {
		if (stack.getStackDepth() > 0) {
			OpcodeStack.Item returnItem = stack.getStackItem(0);
			XField field = returnItem.getXField();
			if (field != null) {
				hangingCandidates.remove(field);
			}
		}
	}

	private void checkMethodAsShutdownOrRelated(XField field) {
		String mName = getNameConstantOperand();
		if (terminatingMethods.contains(mName)) {
			hangingCandidates.remove(field);
		}
	}
	
}