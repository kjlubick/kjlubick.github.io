//HES_Sample.java 
//imports omitted

class SingleThreadExecutorProblem {
	//tag
	private ExecutorService executor;

	public SingleThreadExecutorProblem() {
		this.executor = Executors.newSingleThreadExecutor();
	}

	public void test() {
		executor.execute(new SampleExecutable());
		executor.execute(new SampleExecutable());
	}
}

class SingleThreadExecutorGood {
	//no tag
	private ExecutorService executor;

	public SingleThreadExecutorGood() {
		this.executor = Executors.newSingleThreadExecutor();
	}
	public void test() {
		executor.execute(new SampleExecutable());
		executor.execute(new SampleExecutable());
	}
	public void shutDown() {
		executor.shutdown();
	}
}

class SampleExecutable implements Runnable {
	@Override
	public void run() {
		System.out.println("Hello");
	}
}