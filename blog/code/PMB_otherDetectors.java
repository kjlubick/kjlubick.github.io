@Override
public void visitMethod(Method obj) {
	methodName = obj.getName();
}

@Override
public void visitCode(Code obj) {
	stack.resetForMethodEntry(this);

	if ("<clinit>".equals(methodName) || "<init>".equals(methodName))
		return;

	if (bloatableCandidates.size() > 0)
		super.visitCode(obj);
}

@Override
public void sawOpcode(int seen) {
	try {
		if (bloatableCandidates.isEmpty())
			return;

		stack.precomputation(this);

		if ((seen == INVOKEVIRTUAL) || (seen == INVOKEINTERFACE)) {
			String sig = getSigConstantOperand();
			int argCount = Type.getArgumentTypes(sig).length;
			if (stack.getStackDepth() > argCount) {
				OpcodeStack.Item itm = stack.getStackItem(argCount);
				XField field = itm.getXField();
				if (field != null) {
					if (bloatableCandidates.containsKey(field)) {
						checkMethodAsDecreasingOrIncreasing(field);
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

protected void removeFieldsThatGetReturned() {
	if (stack.getStackDepth() > 0) {
		OpcodeStack.Item returnItem = stack.getStackItem(0);
		XField field = returnItem.getXField();
		if (field != null) {
			bloatableCandidates.remove(field);
			bloatableFields.remove(field);
		}
	}
}

protected void checkMethodAsDecreasingOrIncreasing(XField field) {
	String mName = getNameConstantOperand();
	if (decreasingMethods.contains(mName)) {
		bloatableCandidates.remove(field);
		bloatableFields.remove(field);
	} else if (increasingMethods.contains(mName)) {
		if (bloatableCandidates.containsKey(field)) {
			bloatableFields.put(field, bloatableCandidates.get(field));
		}
	}
}
