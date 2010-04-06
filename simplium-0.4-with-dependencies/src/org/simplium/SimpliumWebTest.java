package org.simplium;

import java.net.BindException;

import org.openqa.selenium.server.RemoteControlConfiguration;
import org.openqa.selenium.server.SeleniumServer;

/**
 * <p>The base class that all Simplium test cases must extend. This base class contains
 * funtionality to retrieve a pre initated Selenium instance.</p>
 * 
 * <p>With the methods <code>isDevelopment</code>, <code>isTest</code>, <code>isProduction</code> can
 * be used to determine if the test case is run in respective enviroment.</p>
 */
public abstract class SimpliumWebTest {

	/**
	 * Protected instance of selenium that can be used directly in the test cases without
	 * the need for any getters.
	 */
	protected SimpliumDefaultSelenium selenium;

	public void setUpServer(int aPort) throws Exception {
		try {
	        RemoteControlConfiguration rcc = new RemoteControlConfiguration();
	        rcc.setTimeoutInSeconds(60);
	        rcc.setPort(aPort);
	        rcc.setSingleWindow(true);
	        rcc.setTrustAllSSLCertificates(true);
		        
	        SeleniumServer server = new SeleniumServer(false, rcc);
	        server.start();
		} catch (BindException e) {
			//This is ok.
		}
	}
	
	/**
	 * Method used by the Simplium framework to populate the base class
	 * with a pre initiated instance of Selenium.
	 * 
	 * @param aSelenium a pre initiated instance of Selenium. 
	 */
	public void setSelenium(SimpliumDefaultSelenium aSelenium) {
		selenium = aSelenium;
	}
	
	/**
	 * Returns the selenium instance. Can be access through the 
	 * protected variable selenium also.
	 * 
	 * @return The selenium instance.
	 */
	public SimpliumDefaultSelenium getSelenium() {
		return selenium;
	}
	
	/**
	 * Override this method to perform actions that is executed before the test case is run. 
	 */
	public void onStart() {
		//Default is to do nothing.
	}

	/**
	 * Override this method to perform actions that is executed after the open command on selenium is run. 
	 */
	public void onOpen() {
		//Default is to do nothing.
	}

	/**
	 * Returns if the test case is executed in test enviroment.
	 * 
	 * @return true if the test case is executed in test enviroment, false otherwise.
	 */
	public boolean isTest() {
		return Util.getEnviroment() == Enviroment.TEST;
	}

	/**
	 * Returns if the test case is executed in development enviroment.
	 * 
	 * @return true if the test case is executed in development enviroment, false otherwise.
	 */
	public boolean isDevelopment() {
		return Util.getEnviroment() == Enviroment.DEVELOPMENT;
	}

	/**
	 * Returns if the test case is executed in production enviroment.
	 * 
	 * @return true if the test case is executed in production enviroment, false otherwise.
	 */
	public boolean isProduction() {
		return Util.getEnviroment() == Enviroment.PRODUCTION;
	}

}
