package org.simplium.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * <p>Annotation that marks a class or method that all selenium API calls should be
 * delayed, that is Thread.sleep(). The value of the Delay annotation is the number
 * of milliseconds each command should sleep. The default value is 1000ms.</p>
 * 
 * <p>Note that the Delay annotation is only used by default in the development enviroment.
 * If the Delay annotation is found when executing in test or production it is ignored.</p>
 * 
 * <p>Usage for a method: </p>
 * <code>
 * @Test
 * @Delay(2000)
 * public void doSearchOnGoogleForGoogle() {
 *    selenium.open("/");
 *    selenium.type("q", "google");
 *    selenium.click("btnG");
 * }
 * </code>
 * <p>This will run the test case to search on google with a 2 second delay between each
 * selenium call.</p>
 * 
 * <p>Usage for a class: </p>
 * <code>
 * @MyWebTest
 * @RunWith(SimpliumJUnitRunner.class)
 * @Delay(2000)
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
 *    public void doTheSearchAgain() {
 *       selenium.open("/");
 *       selenium.type("q", "google");
 *       selenium.click("btnG");
 *    }
 * </code>
 * <p>This will run the test cases to search on google with a 2 second delay between each
 * selenium call. Note that this applies for both the test cases within this test class.</p>
 */
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface Delay {

	/**
	 * Number of milliseconds the delay should wait for.
	 * The default value is 1000.
	 * 
	 * @return The number of milliseconds.
	 */
	int value() default 1000; 
	
}
