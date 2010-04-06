package org.simplium;

/**
 * <p>The base exception type the Simplium framework can throw.</p>
 */
public class SimpliumFrameworkException extends RuntimeException {

	/**
	 * The default serialVersionUID. 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Constructor that takes a message and a Throwable to chain with this
	 * exception. 
	 * 
	 * @param aMessage a message describing why the exception occured. 
	 * @param aThrowable the Throwable that caused that this exception.
	 */
	public SimpliumFrameworkException(String aMessage, Throwable aThrowable) {
		super(aMessage, aThrowable);
	}

	/**
	 * Constructor that takes a message. 
	 * 
	 * @param aMessage a message describing why the exception occured. 
	 */
	public SimpliumFrameworkException(String aMessage) {
		super(aMessage);
	}

}
