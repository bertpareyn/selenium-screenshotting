package org.simplium.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * <p>The browsers annotation defines the different browsers a test case should be
 * executed in each of the different enviroments (development, test, production).</p>
 * 
 * <p>Selenium supports these different browsers (for more browsers see Selenium documentation)</p> 
 * <ul>
 *  <li>*firefox</li>
 *  <li>*mock</li>
 *  <li>*firefoxproxy</li>
 *  <li>*chrome</li>
 *  <li>*iexploreproxy</li>
 *  <li>*pifirefox</li>
 *  <li>*iexplore</li>
 *  <li>*firefox3</li>
 *  <li>*safariproxy</li>
 *  <li>*googlechrome</li>
 *  <li>*konqueror</li>
 *  <li>*firefox2</li>
 *  <li>*safari</li>
 *  <li>*piiexplore</li>
 *  <li>*opera</li>
 *  <li>*iehta</li>
 *  <li>*custom</li>
 * </ul>
 * 
 * <p>Default test cases executed in development is launched in *firefox and *iexplorer</p>
 * <p>Default test cases executed in test is launched in *firefox, *iexplorer, *opera, *safari and *googlechrome</p>
 * <p>Default test cases executed in production is launched in *firefox, *iexplorer, *opera, *safari and *googlechrome</p>
 */
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface Browsers {

	String[] development() default {
		"*firefox", 
		"*iexplore"
	}; 
	String[] test() default {
		"*firefox", 
		"*iexplore",
		"*opera",
		"*safari",
		"*googlechrome"
	}; 
	String[] production() default {
		"*firefox", 
		"*iexplore",
		"*opera",
		"*safari",
		"*googlechrome"
	}; 

}
