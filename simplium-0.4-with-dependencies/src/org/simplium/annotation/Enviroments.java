package org.simplium.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * The Selenium annotation that defines the selenium server hostname 
 * and port and also the base hostname for which the testcases will
 * execute against for each of the three enviroments (development, 
 * test, production). 
 */
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Target({ElementType.TYPE})
public @interface Enviroments {

	String[] development() default {"localhost", "4444", "http://localhost:8080/"};
	String[] test();
	String[] production();
	
}
