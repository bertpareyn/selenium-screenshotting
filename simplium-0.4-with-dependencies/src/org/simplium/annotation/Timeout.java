package org.simplium.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * <p>Annotation that can be used as a meta annotation, class annotation or method annotation
 * to indicate the timeout time Selenium will use for its "open" and the "waitFor*" actions.</p>
 * 
 * <p>The @Timeout value is specified in milliseconds</p>
 * 
 * <p>If used as a meta annotation all test classes and test cases will use this specified timeout 
 * if and only if the class or method it self isn't annotated with the Timeout annotation. 
 * 
 * <p>Usage as meta annotation: </p>
 * <code>
 * @Browsers
 * @Enviroments
 * @Screenshot(CaptureRule.CAPTURE_WHEN_EXCEPTION_OCCURES)
 * @Timeout(60000)
 * @Retention(RetentionPolicy.RUNTIME)
 * @Documented
 * @Inherited
 * public @interface @MyWebTest {
 * }
 * </code>
 * <p>This will run all test cases that has been annotated with @MyWebTest with a 60second timeout.</p>
 * 
 * <p>Usage for a class: </p>
 * <code>
 * @MyWebTest
 * @RunWith(SimpliumJUnitRunner.class)
 * @Timeout(600000)
 * public class MyTestClass extends SimpliumWebTest {
 * 
 *    @Test
 *    public void doSearchOnGoogleForGoogle() {
 *       selenium.open("/");
 *       selenium.type("q", "google");
 *       selenium.click("btnG");
 *    }
 * }    
 * </code>
 * <p>This will run the test cases within this class with a 60 second timeout. Note that other test classes that 
 * is only annotated with @MyWebTest uses the default 30second timeout.</p>
 * 
 * <p>Usage for a method: </p>
 * <code>
 * @MyWebTest
 * @RunWith(SimpliumJUnitRunner.class)
 * public class MyTestClass extends SimpliumWebTest {
 * 
 *    @Test
 *    public void doSearchOnGoogleForGoogle() {
 *       selenium.open("/");
 *       selenium.type("q", "google");
 *       selenium.click("btnG");
 *    }
 *    
 *    @Test
 *    @Timeout(600000)
 *    public void doTheSearchAgain() {
 *       selenium.open("/");
 *       selenium.type("q", "google");
 *       selenium.click("btnG");
 *    }
 * }
 * </code>
 * <p>This will run the test case doTheSearchAgain with a 60 second timeout. Note that doSearchOnGoogleForGoogle
 *  uses the default 30second timeout.</p>
 */
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface Timeout {

	/**
	 * Number of milliseconds that Selenium will wait for actions to complete. 
	 * Actions that require waiting include "open" and the "waitFor*" actions.
	 * The default timeout is 30 seconds.
	 * 
	 * @return The number of milliseconds.
	 */
	int value() default 30000; 

}
