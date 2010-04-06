package org.simplium;

public class SystemVaribles {

	public enum Property {
		ENV ("enviroment"),
		WORKDIR ("workdir"),
		SERVER_URL ("serverURL"),
		SERVER_PORT ("serverPort");
		
		private String iName;
		
		Property(String aName) {
			iName = aName;
		}
		
		public String getName() {
			return iName;
		}
		
	}
	
	public static String getProperty(Property aProperty) {
		String tProperty = System.getProperty(aProperty.getName());
		if (tProperty == null) {
			return getDefaultValue(aProperty);
		}
			
		return tProperty;
	}
	
	private static String getDefaultValue(Property aProperty) {
		if (aProperty == Property.ENV) {
			return "development";
		} else if (aProperty == Property.WORKDIR) {
			return "tmp";
		} else if (aProperty == Property.SERVER_URL) {
			return "localhost";
		} else if (aProperty == Property.SERVER_PORT) {
			return "8080";
		}
		return null;
	}

}
