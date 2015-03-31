package com.mebigfatguy.fbcontrib.detect;

import org.apache.bcel.classfile.Code;
import org.apache.bcel.classfile.Method;

import com.mebigfatguy.fbcontrib.debug.Debug;

import edu.umd.cs.findbugs.BugReporter;
import edu.umd.cs.findbugs.BytecodeScanningDetector;
import edu.umd.cs.findbugs.ba.ClassContext;

public class MoreInfiniteLoops extends BytecodeScanningDetector {

	private final BugReporter bugReporter;
	
	public MoreInfiniteLoops(BugReporter reporter) {
		this.bugReporter=reporter;
	}

	@Override
	public void visitClassContext(ClassContext classContext) {
		Debug.println("Visiting ClassContext "+classContext);
		super.visitClassContext(classContext);
	}
	
	@Override
	public void visitMethod(Method obj) {
		Debug.println("Visiting Method "+obj);
		super.visitMethod(obj);
	}
	
	@Override
	public void visitCode(Code obj) {
		Debug.println("Visiting code "+obj);
		super.visitCode(obj);
	}
	
	@Override
	public void sawOpcode(int seen) {
		Debug.println("Saw opcode");
		super.sawOpcode(seen);
	}
	
		@Override
	public void visitClassContext(ClassContext classContext) {
		Debug.println("Visiting ClassContext "+classContext);
		super.visitClassContext(classContext);
	}
	
	@Override
	public void visitMethod(Method obj) {
		Debug.println("Visiting Method "+obj);
		super.visitMethod(obj);
	}
	
	@Override
	public void visitCode(Code obj) {
		Debug.println("Visiting code "+obj);
		super.visitCode(obj);
	}
	
	@Override
	public void sawOpcode(int seen) {
		Debug.println("Saw opcode");
		super.sawOpcode(seen);
	}
	
}
