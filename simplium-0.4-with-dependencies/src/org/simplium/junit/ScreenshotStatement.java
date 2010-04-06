package org.simplium.junit;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.StringTokenizer;

import org.junit.runners.model.FrameworkMethod;
import org.junit.runners.model.Statement;
import org.simplium.Enviroment;
import org.simplium.SimpliumWebTest;
import org.simplium.SystemVaribles;
import org.simplium.Util;
import org.simplium.SystemVaribles.Property;
import org.simplium.annotation.Screenshot;

public class ScreenshotStatement extends ChainedStatement {

	private SimpliumWebTest iSeluitWebTest;
	private FrameworkMethod iMethod;
	
	public ScreenshotStatement(FrameworkMethod aMethod, SimpliumWebTest aSeluitWebTest, Statement aNext) {
		super(aNext);
		iSeluitWebTest = aSeluitWebTest;
		iMethod = aMethod;
	}

	@Override
	public void evaluteStatementAfter() throws Throwable {
		//Do nothing
	}

	@Override
	public void evaluteStatementBefore() throws Throwable {
		//Do nothing
	}

	@Override
	public void evaluateOnException(Throwable aThrowable) throws Throwable {

		if (Util.getEnviroment() == Enviroment.DEVELOPMENT) {
			SimpliumFrameworkMethod tMethod = (SimpliumFrameworkMethod) iMethod;
			if (tMethod.getScreenshot() != null) {
				if (tMethod.getScreenshot().value() == Screenshot.CaptureRule.CAPTURE_WHEN_EXCEPTION_OCCURES) {
					String tWorkDir = SystemVaribles.getProperty(Property.WORKDIR);
					
					if (!tWorkDir.endsWith("/")) {
						tWorkDir = tWorkDir + "/";
					}
					
					System.err.print(iMethod.getMethod().getDeclaringClass().getName());
					System.err.print(iMethod.getMethod().getDeclaringClass().getPackage());
					
					String tFileName = tWorkDir + getDate() + "/" + convertToPath(iMethod.getMethod().getDeclaringClass().getName()) + "/" + iMethod.getName() + ".png";
					
					tFileName = tFileName.replaceAll("\\*", "");
					
			        iSeluitWebTest.getSelenium().captureScreenshot(tFileName);
				}
			}
		}
	}

	private String getDate() {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH.mm");
        java.util.Date date = new java.util.Date();
        return dateFormat.format(date);
	}
	
	private String convertToPath(String aClassName) {
		StringTokenizer tToken = new StringTokenizer(aClassName, ".");
		String tReturn = "";
		while (tToken.hasMoreTokens()) {
			tReturn = tReturn + tToken.nextToken();
			if (tToken.hasMoreElements()) {
				tReturn = tReturn + "/";
			}
		}
		return tReturn;
	}
	
}
