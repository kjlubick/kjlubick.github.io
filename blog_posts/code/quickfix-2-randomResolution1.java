 public class InsecureRandomResolution extends BugResolution {

 	private boolean useSecureRandomObject;

    @Override
    protected boolean resolveBindings() {
        return true;
    }

    @Override
    public void setOptions(@Nonnull Map<String, String> options) {
        this.useSecureRandomObject = Boolean.parseBoolean(options.get("useSecureRandomObject"));
    }

    @Override
    protected void repairBug(ASTRewrite rewrite, CompilationUnit workingUnit, BugInstance bug) throws BugResolutionException {
        ASTNode node = getASTNode(workingUnit, bug.getPrimarySourceLineAnnotation());
        RandomVisitor visitor = new RandomVisitor();
        node.accept(visitor);

        AST ast = rewrite.getAST();
        
		ClassInstanceCreation fixedClassInstanceCreation;
        if (useSecureRandomObject) {
            fixedClassInstanceCreation = makeSecureRandom(ast);
        } else {
            fixedClassInstanceCreation = makeRandomWithSeed(ast);
        }

        rewrite.replace(visitor.randomToFix, fixedClassInstanceCreation, null);
        addImports(rewrite, workingUnit, "java.security.SecureRandom");
    }

    private ClassInstanceCreation makeSecureRandom(AST ast) {
        SimpleType secureRandomType = ast.newSimpleType(ast.newName("SecureRandom"));
        ClassInstanceCreation newSecureRandom = ast.newClassInstanceCreation();
        newSecureRandom.setType(secureRandomType);
        return newSecureRandom;
    }

    private ClassInstanceCreation makeRandomWithSeed(AST ast) {
        SimpleType randomType = ast.newSimpleType(ast.newName("Random"));
        ClassInstanceCreation newRandom = ast.newClassInstanceCreation();
        newRandom.setType(randomType);

        ClassInstanceCreation newSecureRandom = makeSecureRandom(ast);

        MethodInvocation getLong = ast.newMethodInvocation();
        getLong.setExpression(newSecureRandom);
        getLong.setName(ast.newSimpleName("nextLong"));

        newRandom.arguments().add(getLong);
        return newRandom;
    }

    //Visitor omitted, see below
}