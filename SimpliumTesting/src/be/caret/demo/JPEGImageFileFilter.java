/*
2  * Part of the Java Image Processing Cookbook, please see
3  * http://www.lac.inpe.br/~rafael.santos/JIPCookbook.jsp
4  * for information on usage and distribution.
5  * Rafael Santos (rafael.santos@lac.inpe.br)
6  */
package be.caret.demo;


import java.io.File;
import javax.swing.filechooser.FileFilter;
/*
* This class implements a generic file name filter that allows the listing/selection
* of JPEG files.
*/
public class JPEGImageFileFilter extends FileFilter implements java.io.FileFilter
{
	public boolean accept(File f)
    {
		if (f.getName().toLowerCase().endsWith(".png")) return true;
		if (f.getName().toLowerCase().endsWith(".PNG")) return true;
		return false;
    }
	public String getDescription()
    {
		return "PNG files";
    }
} 