//PossibleMemoryBloat.java  (one of the snips from earlier)
//relevant fields
private final BugReporter bugReporter;
private Map<XField, FieldAnnotation> bloatableCandidates;
private Map<XField, FieldAnnotation> bloatableFields;
private OpcodeStack stack;
private Set<FieldAnnotation> threadLocalNonStaticFields;

@Override
public void visitClassContext(ClassContext classContext) {
	try {
		bloatableCandidates = new HashMap<XField, FieldAnnotation>();
		bloatableFields = new HashMap<XField, FieldAnnotation>();
		threadLocalNonStaticFields = new HashSet<FieldAnnotation>();
		parseFields(classContext);

		if (bloatableCandidates.size() > 0) {
			stack = new OpcodeStack();
			super.visitClassContext(classContext);

			reportMemoryBloatBugs();
			reportThreadLocalBugs();
		}
	} finally {
		stack = null;
		bloatableCandidates = null;
		bloatableFields = null;
		threadLocalNonStaticFields = null;
	}
}

private void parseFields(ClassContext classContext) {
	JavaClass cls = classContext.getJavaClass();
	Field[] fields = cls.getFields();
	for (Field f : fields) {
		String sig = f.getSignature();
		if (f.isStatic()) {
			if (bloatableSigs.contains(sig)) {
				bloatableCandidates.put(XFactory.createXField(cls.getClassName(), f.getName(), f.getSignature(), f.isStatic()), FieldAnnotation.fromBCELField(cls, f));
			}
		} else if ("Ljava/lang/ThreadLocal;".equals(sig)) {
			threadLocalNonStaticFields.add(FieldAnnotation.fromBCELField(cls, f));
		} 
	}
}

private void reportMemoryBloatBugs() {
	for (Entry<XField, FieldAnnotation> entry : bloatableFields.entrySet()) {
		FieldAnnotation fieldAn = entry.getValue();
		if (fieldAn != null) {
			bugReporter.reportBug(new BugInstance(this, "PMB_POSSIBLE_MEMORY_BLOAT", NORMAL_PRIORITY)
			.addClass(this)
			.addField(fieldAn)
			.addField(entry.getKey()));
		}
	}
}

private void reportThreadLocalBugs() {
	for(FieldAnnotation fieldAn: threadLocalNonStaticFields) {
		bugReporter.reportBug(new BugInstance(this, "PMB_INSTANCE_BASED_THREAD_LOCAL", NORMAL_PRIORITY)
		.addClass(this)
		.addField(fieldAn));
	}
}

	