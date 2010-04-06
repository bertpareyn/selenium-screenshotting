package org.simplium;

import org.simplium.annotation.Delay;
import org.simplium.annotation.Timeout;

import com.thoughtworks.selenium.DefaultSelenium;

/**
 * <p>Used to override the DefaultSelenium implementation with Simplium specific 
 * behaviour.</p>
 * 
 * <p>Currently only the open command is overriden to make sure that the base url
 * isn't used to open a browser.</p>
 * 
 * <p>A number of convient method will be available through this class.</p>
 */
public class SimpliumDefaultSelenium extends DefaultSelenium {

	/**
	 * The base URL.
	 */
	private String iBaseURL;
	private Timeout iTimeout;
	
	/**
	 * Creates a new instance of the SimpliumDefaultSelenium.
	 * 
	 * @param aServerHost The host where the Selnium remote control or grid is available.
	 * @param aServerPort The port where the Selnium remote control or grid is listing.
	 * @param aBrowserCommand The Browser to execute the test in.
	 * @param aBaseURL The base URL where the test should be executed against.
	 * @param aDelay The number of milliseconds the selenium command should be delay with.
	 * @param aTimeout The timeout time to use.
	 */
	public SimpliumDefaultSelenium(String aServerHost, int aServerPort, String aBrowserCommand, String aBaseURL, Delay aDelay, Timeout aTimeout) {
		super(aServerHost, aServerPort, aBrowserCommand, aBaseURL);
		iBaseURL = aBaseURL;
		if (aDelay != null) {
			setSpeed(String.valueOf(aDelay.value()));
		} else {
			setSpeed("0");
		}
		iTimeout = aTimeout;
	}

	@Override
	public void open(String aUrl) {
		//Make sure that the test isn't using the base URL or any other URL to open the browser.
		if (aUrl.startsWith(iBaseURL)) {
			throw new SimpliumFrameworkException("Don't use the baseURL when calling selenium.open. " +
					"Please only use the context path. For example instead of using selenium.open(\"http://localhost:9080/mywebapp\") use only" +
					"selium.open(\"/mywebapp\")");
		}
		if (aUrl.startsWith("http://") || aUrl.startsWith("https://")) {
			throw new SimpliumFrameworkException("Don't use the baseURL when calling selenium.open. " +
					"Please only use the context path. For example instead of using selenium.open(\"http://localhost:9080/mywebapp\") use only" +
					"selium.open(\"/mywebapp\")");
		}

		if (iTimeout != null) {
			setTimeout(String.valueOf(iTimeout.value()));
		} else {
			setTimeout("30000");
		}
		
		super.open(iBaseURL + aUrl);
	}
	
}
