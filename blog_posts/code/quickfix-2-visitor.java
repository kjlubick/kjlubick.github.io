public class InsecureRandomResolution extends BugResolution {

	//... snip

	private static class RandomVisitor extends ASTVisitor {
        public ClassInstanceCreation randomToFix;

        @Override
        public boolean visit(ClassInstanceCreation node) {
            if ("java.util.Random".equals(node.resolveTypeBinding().getQualifiedName())) {
                this.randomToFix = node;
            }

            return true;
        }
    }
}