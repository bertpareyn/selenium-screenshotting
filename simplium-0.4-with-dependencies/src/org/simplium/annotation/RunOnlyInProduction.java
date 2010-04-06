package org.simplium.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * <p>The RunOnlyInProduction annotation marks a class or method that it should only be
 * executed in the production enviroment.</p>
 * 
 * <p>Usage for a method: </p>
 * <code>
 * @Test
 * @RunOnlyInProduction
 * public void doSearchOnGoogleForGoogle() {
 *    selenium.open("/");
 *    selenium.type("q", "google");
 *    selenium.click("btnG");
 * }
 * </code>
 * <p>This will run the test case to search on google only when the test is run in the
 * production enviroment.</p>
 * 
 * <p>Usage for a class: </p>
 * <code>
 * @MyWebTest
 * @RunWith(SimpliumJUnitRunner.class)
 * @RunOnlyInProduction
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
 * <p>This will run the test cases to search on google only when the test is run in the
 * production enviroment.</p>
 */
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface RunOnlyInProduction {

	//Empty. Only a marker annotation.
	
}
