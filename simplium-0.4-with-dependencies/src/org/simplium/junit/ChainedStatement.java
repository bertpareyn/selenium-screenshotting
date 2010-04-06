package org.simplium.junit;

import org.junit.runners.model.Statement;

public abstract class ChainedStatement extends Statement {

	private Statement iNext;
	
	public ChainedStatement(Statement aNext) {
		iNext = aNext;
	}
	
	@Override
	public void evaluate() throws Throwable {
		evaluteStatementBefore();
		try {
			iNext.evaluate();
		} catch (Throwable aThrowable) {
			evaluateOnException(aThrowable);
			throw aThrowable;
		}
		evaluteStatementAfter();
	}
	
	abstract public void evaluteStatementBefore() throws Throwable;

	abstract public void evaluteStatementAfter() throws Throwable;

	abstract public void evaluateOnException(Throwable aThrowable) throws Throwable;
	
}
