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
		//snip...
		//we'll come back to this code
		//...snip
	}

	@Override
	public void visitMethod(Method obj) {
		//snip...
		//we'll come back to this code
		//...snip
	}

	@Override
	public void visitCode(Code obj) {
		//snip...
		//we'll come back to this code
		//...snip
	}

	@Override
	public void sawOpcode(int seen) {
		//snip...
		//we'll come back to this code
		//...snip
	}
}