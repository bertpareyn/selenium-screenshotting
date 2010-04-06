package org.simplium.junit;

import org.junit.runners.model.FrameworkMethod;
import org.junit.runners.model.Statement;
import org.simplium.Enviroment;
import org.simplium.SimpliumDefaultSelenium;
import org.simplium.SimpliumWebTest;
import org.simplium.Util;
import org.simplium.annotation.Delay;

public class SetupSeleniumStatement extends ChainedStatement {

	private FrameworkMethod iMethod;
	private Object iTarget;
	
	public SetupSeleniumStatement(Statement aNext, FrameworkMethod aMethod, Object aTarget) {
		super(aNext);
		iMethod = aMethod;
		iTarget = aTarget;
	}

	@Override
	public void evaluteStatementBefore() throws Throwable {
		SimpliumFrameworkMethod tMethod = (SimpliumFrameworkMethod) iMethod;
		SimpliumWebTest tTarget = (SimpliumWebTest) iTarget;
		Delay tDelay = tMethod.getDelay();

		String[] tString = null;
		if (Util.getEnviroment() == Enviroment.DEVELOPMENT) {
			tString = tMethod.getSelenium().development();
		} else if (Util.getEnviroment() == Enviroment.TEST) {
			tString = tMethod.getSelenium().test();
			tDelay = null;
		} else if (Util.getEnviroment() == Enviroment.PRODUCTION) {
			tString = tMethod.getSelenium().production();
			tDelay = null;
		}

		//Only start up the server if it is in development mode. Test and Production should use
		//Selenium Grid. But if Test or Production is pointing to localhost a server is started.
		if (Util.getEnviroment() == Enviroment.DEVELOPMENT || (tString[0] != null && tString[0].equalsIgnoreCase("LOCALHOST"))) {
			tTarget.setUpServer(Integer.parseInt(tString[1]));
		}
			
		SimpliumDefaultSelenium tSelenium = new SimpliumDefaultSelenium(tString[0], Integer.parseInt(tString[1]), tMethod.getBrowser(), tString[2], tDelay, tMethod.getTimeout());
		
		tSelenium.start();
		
		tTarget.setSelenium(tSelenium);
	}

	@Override
	public void evaluteStatementAfter() throws Throwable {
	}

	@Override
	public void evaluateOnException(Throwable throwable) throws Throwable {
	}

}
