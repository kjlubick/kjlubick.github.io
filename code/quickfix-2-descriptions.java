public class InsecureRandomResolution extends BugResolution {

 public static final String GENERATE_SEED_DESC = "Initializing the seed like <br/><code>new Random(SecureRandom.getInstance().generateSeed())</code><br/>"
            + "creates a more secure starting point for the random number generation than the default.<br/><br/>"
            + "However, still using <code>java.lang.Random</code> makes this slightly less secure than using "
            + "<code>java.secure.SecureRandom</code>, but at the benefit of being faster.  ";

    public static final String SECURE_RENAME_DESC = "java.security.SecureRandom can be a drop-in replacement for Random, "
            + "however, calls to the object's methods (e.g. nextInt(), nextBytes()) "
            + "may be significantly slower.";

	//... snip

 @Override
    public String getDescription() {
        if (useSecureRandomObject) {
            return SECURE_RENAME_DESC;
        }
        return GENERATE_SEED_DESC;
    }
}