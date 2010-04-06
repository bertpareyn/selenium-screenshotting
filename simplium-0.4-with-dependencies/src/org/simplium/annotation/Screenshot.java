package org.simplium.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * <p></p>
 * 
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface Screenshot {

	/**
	 * Defines the different Screenshot mode a Method or a Type can have. 
	 */
	public enum CaptureRule {
		CAPTURE_WHEN_EXCEPTION_OCCURES,
	}

	/**
	 * Returns the Screenshot mode. Default is CaptureRule.CAPTURE_WHEN_EXCEPTION_OCCURES 
	 * @return the Screenshot mode for the annotated method or type.
	 */
	CaptureRule value() default CaptureRule.CAPTURE_WHEN_EXCEPTION_OCCURES;
	
}
