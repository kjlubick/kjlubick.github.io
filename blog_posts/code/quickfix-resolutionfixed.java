@Override
protected void repairBug(ASTRewrite rewrite, CompilationUnit workingUnit, BugInstance bug) throws BugResolutionException {
    ASTNode node = getASTNode(workingUnit, bug.getPrimarySourceLineAnnotation());
    LSCVisitor lscFinder = new LSCVisitor();
    node.accept(lscFinder);

    MethodInvocation badMethodInvocation = lscFinder.lscMethodInvocation;
    MethodInvocation fixedMethodInvocation = createFixedMethodInvocation(rewrite, lscFinder);

    rewrite.replace(badMethodInvocation, fixedMethodInvocation, null);
}

@SuppressWarnings("unchecked")
private MethodInvocation createFixedMethodInvocation(ASTRewrite rewrite, LSCVisitor lscFinder) {
    AST ast = rewrite.getAST();
    MethodInvocation fixedMethodInvocation = ast.newMethodInvocation();
    String invokedMethodName = lscFinder.lscMethodInvocation.getName().getIdentifier();
    fixedMethodInvocation.setName(ast.newSimpleName(invokedMethodName));
    // can't simply use visitor.stringLiteralExpression because an IllegalArgumentException
    // will be thrown because it belongs to another AST. So, we use a moveTarget to eventually
    // move the literal into the right place
    fixedMethodInvocation.setExpression((Expression) rewrite.createMoveTarget(lscFinder.stringLiteralExpression)); // thing the method is called on
    fixedMethodInvocation.arguments().add((Expression) rewrite.createMoveTarget(lscFinder.stringVariableExpression));
    return fixedMethodInvocation;
}