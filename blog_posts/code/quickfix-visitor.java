private static class LSCVisitor extends ASTVisitor {
    private static Set<String> comparisonMethods = new HashSet<String>(3);
    static {
        comparisonMethods.add("equals");
        comparisonMethods.add("compareTo");
        comparisonMethods.add("equalsIgnoreCase");
    }

    public MethodInvocation lscMethodInvocation;
    public Expression stringLiteralExpression;
    public Expression stringVariableExpression;

    @Override
    @SuppressWarnings("unchecked")
    public boolean visit(MethodInvocation node) {
        if (this.lscMethodInvocation != null) {
            return false;
        }
        if (comparisonMethods.contains(node.getName().getIdentifier())) {
            List<Expression> arguments = (List<Expression>) node.arguments();
            if (arguments.size() == 1 && arguments.get(0).resolveConstantExpressionValue() != null) { 
                this.lscMethodInvocation = node;
                this.stringLiteralExpression = arguments.get(0);
                this.stringVariableExpression = node.getExpression();
                return false;
            }
        }
        return true;
    }
}