import static edu.umd.cs.findbugs.plugin.eclipse.quickfix.util.ASTUtil.getASTNode;

public class LiteralStringComparisonResolution extends BugResolution {

    @Override
    protected boolean resolveBindings() {
        return false;
    }

    @Override
    protected void repairBug(ASTRewrite rewrite, CompilationUnit workingUnit, BugInstance bug) throws BugResolutionException {
        ASTNode node = getASTNode(workingUnit, bug.getPrimarySourceLineAnnotation());
        LSCVisitor lscFinder = new LSCVisitor();
        node.accept(lscFinder);

        //TODO perform the resolution
    }

    private static class LSCVisitor extends ASTVisitor {
        //TODO flesh out
    }

}
