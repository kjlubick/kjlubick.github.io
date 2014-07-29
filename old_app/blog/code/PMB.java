/* PossibleMemoryBloat.java
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
	private Map<XField, FieldAnnotation> bloatableCandidates;
	private Map<XField, FieldAnnotation> bloatableFields;
	private OpcodeStack stack;
	private String methodName;
	private Set<FieldAnnotation> threadLocalNonStaticFields;

	public PossibleMemoryBloat(BugReporter bugReporter) {
		this.bugReporter = bugReporter;
	}

	@Override
	public void visitClassContext(ClassContext classContext) {
		//snip...
		//We'll cover this later
		//...snip
	}

	@Override
	public void visitMethod(Method obj) {
		//snip...
		//We'll cover this later
		//...snip
	}

	@Override
	public void visitCode(Code obj) {
		//snip...
		//We'll cover this later
		//...snip
	}

	@Override
	public void sawOpcode(int seen) {
		//snip...
		//We'll cover this later
		//...snip
	}
	
	private void reportThreadLocalBugs() {
		//snip...
		//We'll cover this later
		//...snip
	}

	private void reportMemoryBloatBugs() {
		//snip...
		//We'll cover this later
		//...snip
	}

	private void parseFields(ClassContext classContext) {
		//snip...
		//We'll cover this later
		//...snip
	}

	private void removeFieldsThatGetReturned() {
		//snip...
		//We'll cover this later
		//...snip
	}

	private void checkMethodAsDecreasingOrIncreasing(XField field) {
		//snip...
		//We'll cover this later
		//...snip
	}
}