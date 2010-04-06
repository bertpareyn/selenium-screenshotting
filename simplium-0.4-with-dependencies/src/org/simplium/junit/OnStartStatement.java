package org.simplium.junit;

import org.junit.runners.model.Statement;
import org.simplium.SimpliumWebTest;

public class OnStartStatement extends ChainedStatement {

	private SimpliumWebTest iSeluitWebTest;
	
	public OnStartStatement(Statement aNext, SimpliumWebTest aSeluitWebTest) {
		super(aNext);
		iSeluitWebTest = aSeluitWebTest;
	}

	@Override
	public void evaluateOnException(Throwable throwable) throws Throwable {
	}

	@Override
	public void evaluteStatementAfter() throws Throwable {
	}

	@Override
	public void evaluteStatementBefore() throws Throwable {
		iSeluitWebTest.onStart();
	}

}
