package org.simplium.junit;

import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.List;

import org.junit.runners.BlockJUnit4ClassRunner;
import org.junit.runners.model.FrameworkMethod;
import org.junit.runners.model.InitializationError;
import org.junit.runners.model.Statement;
import org.simplium.Enviroment;
import org.simplium.SimpliumFrameworkException;
import org.simplium.SimpliumWebTest;
import org.simplium.Util;
import org.simplium.annotation.Browsers;
import org.simplium.annotation.Delay;
import org.simplium.annotation.Enviroments;
import org.simplium.annotation.RunOnlyInDevelopment;
import org.simplium.annotation.RunOnlyInProduction;
import org.simplium.annotation.RunOnlyInTest;
import org.simplium.annotation.Screenshot;
import org.simplium.annotation.Timeout;

public class SimpliumJUnitRunner extends BlockJUnit4ClassRunner {

	public SimpliumJUnitRunner(Class<?> aClass) throws InitializationError {
		super(aClass);
	}

	@Override
	protected List<FrameworkMethod> computeTestMethods() {
		//Get the basic list of @Test annotated methods.
		List<FrameworkMethod> tMethods = super.computeTestMethods();
		List<FrameworkMethod> tSeluitMethods = new ArrayList<FrameworkMethod>();
		
		//Find if the test class extends SeluitWebTest
		if (SimpliumWebTest.class.isAssignableFrom(getTestClass().getJavaClass())) {

			//If this class is marked to only be executed within the development enviroment skip the rest if the enviroment isn't development
			if (ignoreClass(RunOnlyInDevelopment.class, Enviroment.DEVELOPMENT) || ignoreClass(RunOnlyInTest.class, Enviroment.TEST) || ignoreClass(RunOnlyInProduction.class, Enviroment.PRODUCTION)) {
				return new ArrayList<FrameworkMethod>();
			}
			
			Enviroments tSelenium = (Enviroments) Util.findAnnotation(getTestClass().getJavaClass(), Enviroments.class);
			if (tSelenium == null) {
				throw new SimpliumFrameworkException("The annotation @Enviroments couldn't be found. Please make sure that the test class is annotated with this annotation directly or indirectly through meta annotations.");
			}
			Util.verifyEnviromentsAnnotation(tSelenium);
			
			Browsers tBrowsers = (Browsers) Util.findAnnotation(getTestClass().getJavaClass(), Browsers.class);
			if (tBrowsers == null) {
				throw new SimpliumFrameworkException("The annotation @Browsers couldn't be found. Please make sure that the test class is annotated with this annotation directly or indirectly through meta annotations.");
			}
			Util.verifyBrowsersAnnotation(tBrowsers);

			String[] tBrowsersInEnviroment = Util.getBrowsers(tBrowsers);
			if (tBrowsersInEnviroment == null || tBrowsersInEnviroment.length == 0) {
				throw new SimpliumFrameworkException("The annotation @Browsers doesn't contain any browser declarations for the enviroment " + Util.getEnviroment());
			}

			//Find if there is a screenshot annotation on the test class
			Screenshot tScreenshotOnClass = (Screenshot) Util.findAnnotation(getTestClass().getJavaClass(), Screenshot.class);
			//Find if there is a delay annotation on the test class
			Delay tDelayOnClass = (Delay) Util.findAnnotation(getTestClass().getJavaClass(), Delay.class);
			//Find if there is a timeout annotation on the test class
			Timeout tTimeoutOnClass = (Timeout) Util.findAnnotation(getTestClass().getJavaClass(), Timeout.class);
			
			//Find the methods that are marked with the Screenshot, Browser, Timeout or Delay annotation. That is those that should 
			//be handled differently than the main class, if it is annotated with Screenshot, Browsers, Timeout or Delay. 
			List<FrameworkMethod> tScreenshotOnMethods = getTestClass().getAnnotatedMethods(Screenshot.class);
			List<FrameworkMethod> tDelayOnMethods = getTestClass().getAnnotatedMethods(Delay.class);
			List<FrameworkMethod> tTimeoutOnMethods = getTestClass().getAnnotatedMethods(Timeout.class);
			List<FrameworkMethod> tBrowsersOnMethods = getTestClass().getAnnotatedMethods(Browsers.class);
			
			for (FrameworkMethod tMethod : tMethods) {
				//If the method is marked for a certain enviroment filter out methods marked with another enviroment than the current.
				if (ignoreMethod(RunOnlyInDevelopment.class, Enviroment.DEVELOPMENT, tMethod) || 
						ignoreMethod(RunOnlyInTest.class, Enviroment.TEST, tMethod) ||
						ignoreMethod(RunOnlyInProduction.class, Enviroment.PRODUCTION, tMethod)) {
					break;
				}
				
				String[] tBrowers = tBrowsersInEnviroment;
				
				//If any test method has overridden the @Browsers make sure to run the test case according to the methods definition.
				for (FrameworkMethod tBrowserMethod : tBrowsersOnMethods) {
					if (tBrowserMethod.equals(tMethod)) {
						Browsers tBrowsersOnMethod = tBrowserMethod.getMethod().getAnnotation(Browsers.class);
						Util.verifyBrowsersAnnotation(tBrowsersOnMethod);
						if (tBrowsersOnMethod != null) {
							tBrowers = Util.getBrowsers(tBrowsersOnMethod);
						}
					}
				}
				
				//Create test cases for all browsers.
				for (String tBrowser : tBrowers) {
					Screenshot tScreenShotToUse = tScreenshotOnClass;
					Delay tDelayToUse = tDelayOnClass;
					Timeout tTimeoutToUse = tTimeoutOnClass;
					
					
					for (FrameworkMethod tScreenshotMethod : tScreenshotOnMethods) {
						if (tScreenshotMethod.equals(tMethod)) {
							Screenshot tScreenShot = tScreenshotMethod.getMethod().getAnnotation(Screenshot.class);
							if (tScreenshotMethod != null) {
								tScreenShotToUse = tScreenShot;
							}
						}
					}

					for (FrameworkMethod tDelayMethod : tDelayOnMethods) {
						if (tDelayMethod.equals(tMethod)) {
							Delay tDelay = tDelayMethod.getMethod().getAnnotation(Delay.class);
							if (tDelayMethod != null) {
								tDelayToUse = tDelay;
							}
						}
					}

					for (FrameworkMethod tTimeoutMethod : tTimeoutOnMethods) {
						if (tTimeoutMethod.equals(tMethod)) {
							Timeout tTimeout = tTimeoutMethod.getMethod().getAnnotation(Timeout.class);
							if (tTimeoutMethod != null) {
								tTimeoutToUse = tTimeout;
							}
						}
					}
					
					tSeluitMethods.add(new SimpliumFrameworkMethod(tMethod.getMethod(), tBrowser, tSelenium, tScreenShotToUse, tDelayToUse, tTimeoutToUse));
				}
			}
			
		} else {
			throw new SimpliumFrameworkException("The test class " + getTestClass().getJavaClass().getName() + " doesn't extends " + SimpliumWebTest.class.getName());
		}
		
		return tSeluitMethods;
	}
	
	@Override
	protected Statement withAfters(FrameworkMethod aMethod, Object aTarget, Statement aStatement) {
		Statement tStatement = super.withAfters(aMethod, aTarget, aStatement);
		
		SimpliumWebTest tSeluitWebTest = (SimpliumWebTest) aTarget;
		
		return new ShutdownSeleniumStatement(new ScreenshotStatement(aMethod, tSeluitWebTest, tStatement), aTarget);
	}

	@Override
	protected Statement withBefores(FrameworkMethod aMethod, Object aTarget, Statement aStatement) {
		Statement tStatement = super.withBefores(aMethod, aTarget, aStatement);

		SimpliumWebTest tSeluitWebTest = (SimpliumWebTest) aTarget;

		return new SetupSeleniumStatement(new OnStartStatement(tStatement, tSeluitWebTest), aMethod, aTarget);
		
	}

	@Override
	protected String testName(FrameworkMethod aMethod) {
		return super.testName(aMethod);
	}

	/**
	 * If the class is annotated with @RunOnlyInDevelopment, @RunOnlyInTest or @RunOnlyInProduction
	 * the class is ignored depending on the executing enviroment.
	 *  
	 * @param aAnnotation The annotation to search after.
	 * @param aEnviroment The enviroment the annotation should be executed in.
	 * @return true if the class should be ignored, false otherwise.
	 */
	private boolean ignoreClass(Class<? extends Annotation> aAnnotation, Enviroment aEnviroment) {
		Annotation tAnnotation = (Annotation) Util.findAnnotation(getTestClass().getJavaClass(), aAnnotation);
		if (tAnnotation != null && Util.getEnviroment() != aEnviroment) {
			return true;
		}
		return false;
	}

	/**
	 * If the method is annotated with @RunOnlyInDevelopment, @RunOnlyInTest or @RunOnlyInProduction
	 * the method is ignored depending on the executing enviroment.
	 * 
	 * @param aAnnotation The annotation to search after.
	 * @param aEnviroment The enviroment the annotation should be executed in.
	 * @param aMethod The method that should possible be ignored.
	 * @return true if the method should be ignored, false otherwise.
	 */
	private boolean ignoreMethod(Class<? extends Annotation> aAnnotation, Enviroment aEnviroment, FrameworkMethod aMethod) {
		List<FrameworkMethod> tMethods = getTestClass().getAnnotatedMethods(aAnnotation);			
		for (FrameworkMethod aAnnotatedMethod : tMethods) {
			if (aAnnotatedMethod.equals(aMethod) && Util.getEnviroment() != aEnviroment) {
				return true;
			}
		}
		return false;
	}
	
}
