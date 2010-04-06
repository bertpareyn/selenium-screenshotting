package org.simplium.junit;

import org.junit.runners.model.Statement;
import org.simplium.SimpliumWebTest;

public class ShutdownSeleniumStatement extends ChainedStatement {

	private SimpliumWebTest iTarget;
	
	public ShutdownSeleniumStatement(Statement aNext, Object aTarget) {
		super(aNext);
		iTarget = (SimpliumWebTest) aTarget;
	}

	@Override
	public void evaluteStatementAfter() throws Throwable {
		iTarget.getSelenium().stop();
	}

	@Override
	public void evaluateOnException(Throwable throwable) throws Throwable {
		evaluteStatementAfter();
	}

	@Override
	public void evaluteStatementBefore() throws Throwable {
		//Nothing
	}

}
