package org.simplium.junit;

import java.lang.reflect.Method;

import org.junit.runners.model.FrameworkMethod;
import org.simplium.annotation.Delay;
import org.simplium.annotation.Enviroments;
import org.simplium.annotation.Screenshot;
import org.simplium.annotation.Timeout;

public class SimpliumFrameworkMethod extends FrameworkMethod {

	private String iBrowser;
	private Enviroments iSelenium;
	private Screenshot iScreenshot;
	private Delay iDelay;
	private Timeout iTimeout;
	
	public SimpliumFrameworkMethod(Method aMethod, String aBrowser, Enviroments aSelenium, Screenshot aScreenshot, Delay aDelay, Timeout aTimeout) {
		super(aMethod);
		iBrowser = aBrowser;
		iSelenium = aSelenium;
		iScreenshot = aScreenshot;
		iDelay = aDelay;
		iTimeout = aTimeout;
	}

	@Override
	public String getName() {
		return super.getName() + "[" + iBrowser + "]";
	}
	
	public Enviroments getSelenium() {
		return iSelenium;
	}
	
	public String getBrowser() {
		return iBrowser;
	}
	
	public Screenshot getScreenshot() {
		return iScreenshot;
	}

	public Delay getDelay() {
		return iDelay;
	}

	public Timeout getTimeout() {
		return iTimeout;
	}
}
