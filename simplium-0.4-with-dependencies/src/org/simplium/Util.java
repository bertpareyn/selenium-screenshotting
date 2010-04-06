package org.simplium;

import java.lang.annotation.Annotation;

import org.simplium.SystemVaribles.Property;
import org.simplium.annotation.Browsers;
import org.simplium.annotation.Enviroments;

/**
 * <p>Util class used by the Simplium framework.</p>
 */
public final class Util {

	/**
	 * Returns the browser(s) the test case should be run with.
	 * 
	 * @param aBrowsers The Browser annotation.
	 * @return An array with the browsers names.
	 */
	public static String[] getBrowsers(Browsers aBrowsers) {
		if (getEnviroment() == Enviroment.DEVELOPMENT) {
			return aBrowsers.development();
		} else if (getEnviroment() == Enviroment.TEST) {
			String[] tBrowsers = aBrowsers.test();
			
			if (tBrowsers.length == 1) {
				if (tBrowsers[0].equalsIgnoreCase("as development")) {
					return aBrowsers.development();
				}
			}
			
			return tBrowsers;
		} else if (getEnviroment() == Enviroment.PRODUCTION) {
			String[] tBrowsers = aBrowsers.production();
			
			if (tBrowsers.length == 1) {
				if (tBrowsers[0].equalsIgnoreCase("as development")) {
					return aBrowsers.development();
				}
				if (tBrowsers[0].equalsIgnoreCase("as test")) {
					return aBrowsers.test();
				}
			}
			
			return tBrowsers;
		} else {
			//Throw Exception
			return null;
		}
	}
	
	/**
	 * Returns the enviroment the test cases should be executed under.  
	 * 
	 * @return The current enviroment.
	 */
	public static Enviroment getEnviroment() {
		String tEnviroment = SystemVaribles.getProperty(Property.ENV);
		if (tEnviroment == null) {
			return Enviroment.DEVELOPMENT;
		} else if (tEnviroment.equals("development")) {
			return Enviroment.DEVELOPMENT;
		} else if (tEnviroment.equals("test")) {
			return Enviroment.TEST;
		} else if (tEnviroment.equals("production")) {
			return Enviroment.PRODUCTION;
		}
		
		return null;
	}

	public static void verifyEnviromentsAnnotation(Enviroments aEnviroments) {
		verifyEnviromentsArray(aEnviroments.development(), "development");
		verifyEnviromentsArray(aEnviroments.test(), "test");
		verifyEnviromentsArray(aEnviroments.production(), "production");
	}
	
	private static void verifyEnviromentsArray(String[] aArray, String aEnviroment) {
		if (aArray == null) {
			throw new SimpliumFrameworkException("The annotation @Enviroments has no enviroment information definied for " + aEnviroment);
		}
		
		if (aArray.length != 3) {
			throw new SimpliumFrameworkException("The annotation @Enviroments definies " + aArray.length + " string values (for enviroment " + aEnviroment + "), the correct is 3 (host, port, baseURL). See Simplium documentation for more informations.");
		}

		if (aArray[0] == null || aArray[0].length() == 0) {
			throw new SimpliumFrameworkException("The annotation @Enviroments definies null or empty string for the host value for enviroment " + aEnviroment + ". See Simplium documentation for more informations.");
		}
		if (aArray[1] == null || aArray[1].length() == 0) {
			throw new SimpliumFrameworkException("The annotation @Enviroments definies null or empty string for the port value for enviroment " + aEnviroment + ". See Simplium documentation for more informations.");
		}
		if (aArray[2] == null || aArray[2].length() == 0) {
			throw new SimpliumFrameworkException("The annotation @Enviroments definies null or empty string for the baseURL value for enviroment " + aEnviroment + ". See Simplium documentation for more informations.");
		}
		
	}

	public static void verifyBrowsersAnnotation(Browsers aBrowsers) {
		verifyBrowsersArray(aBrowsers.development(), "development");
		verifyBrowsersArray(aBrowsers.test(), "test");
		verifyBrowsersArray(aBrowsers.production(), "production");
	}
	
	private static void verifyBrowsersArray(String[] aArray, String aEnviroment) {
		if (aArray == null || aArray.length == 0) {
			throw new SimpliumFrameworkException("The annotation @Browsers has no browser information definied for " + aEnviroment);
		}
	}

	/**
	 * Methods that returns an annotation from a class. 
	 * 
	 * @param aClass The class that contains the annotation.
	 * @param aAnnotationClass The annotation that is requested.
	 * @return The annotation, null if it isn't found.
	 */
	public static Annotation findAnnotation(Class<?> aClass, Class<?> aAnnotationClass) {
		for (Annotation tAnnotation : aClass.getAnnotations()) {
			if (tAnnotation.annotationType().equals(aAnnotationClass)) {
				return tAnnotation;
			}
			for (Annotation tAnno : tAnnotation.annotationType().getAnnotations()) {
				if (tAnno.annotationType().equals(aAnnotationClass)) {
					return tAnno;
				}
			}
		}
		return null;
	}
	
}
