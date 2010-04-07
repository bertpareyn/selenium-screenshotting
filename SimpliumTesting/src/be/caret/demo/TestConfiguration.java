package be.caret.demo;


import java.lang.annotation.Documented;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.simplium.annotation.Browsers;
import org.simplium.annotation.Enviroments;
import org.simplium.annotation.Screenshot;
import org.simplium.annotation.Screenshot.CaptureRule;
@Enviroments(
		development = {
				"localhost",
				"4444",
				"http://www.google.co.uk"
		},
		test = {
				"grid.selenium.com",
				"4444",
				"http://testenvironment.com"
		},
		production = {
				"grid.selenium.com",
				"4444",
				"http://www.company.com"
		}
)
@Browsers(
		development = {
				"*safari",
				"*firefox",
		},
		test = {
				"*firefox on Windows",
				"*firefox on MacOS",
				"*firefox on Linux",
				"*iexplore on Windows",
				"*iexplore on MacOS",
				"*safari on MacOS",
				"*safari on Windows",
				"*opera on Windows",
				"*opera on MacOS",
				"*opera on Linux",
				"*googlechrome on Windows"
		},
		production = {
				"*firefox on Windows",
				"*firefox on MacOS",
				"*firefox on Linux",
				"*iexplore on Windows",
				"*iexplore on MacOS",
				"*safari on MacOS",
				"*safari on Windows",
				"*opera on Windows",
				"*opera on MacOS",
				"*opera on Linux",
				"*googlechrome on Windows"
		}
)
@Documented
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Screenshot(CaptureRule.CAPTURE_WHEN_EXCEPTION_OCCURES)
public @interface TestConfiguration {

}
