//PossibleMemoryBloat.java  (one of the snips from earlier)
//relevant fields
private static final Set<String> bloatableSigs = new HashSet<String>();
private final BugReporter bugReporter;
private OpcodeStack stack;
private Map<XField, SourceLineAnnotation> bloatableFields;

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