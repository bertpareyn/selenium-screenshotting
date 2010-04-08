package be.caret.demo;

import java.awt.Graphics2D;
import java.awt.image.*;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

import javax.imageio.ImageIO;

import junit.framework.Assert;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.simplium.SimpliumWebTest;
import org.simplium.junit.SimpliumJUnitRunner;

@CaretWebTest
@RunWith(SimpliumJUnitRunner.class)
public class TestA extends SimpliumWebTest {

        String path = "";
        int refRed = 255;
        int refGreen = 255;
        int refBlue = 255;
        int x = 20;
        int y = 150;
        int topPosX,topPosY,bottomPosX,bottomPosY;           //the values of the top left corner
        String browser = "";
        String os = "";
        int colors[] = new int[3];
        File[] files;
        ArrayList<Integer> mergePositions = new ArrayList<Integer>();

        public void setConfiguration() throws Exception{
            //Clear the screenshots folder
            //deleteDir(new File("/Users/hh354/Documents/screenshots"));

            //Get the browser viewport config
            selenium.windowMaximize();
            selenium.windowFocus();

            //this is just for firefox
            selenium.getEval("window.moveTo(1,0);");

            //get browser info
            getBrowserInformation();
            String configPath = "/Users/hh354/Documents/screenshots/config/"+ browser + "/screenshot.png";
            selenium.captureScreenshot(configPath);

            //find the viewport
            File file= new File(configPath);
            BufferedImage image = ImageIO.read(file);
            int clr;
            try{
                //first check the left side
                do{
                    if(x > 0){
                        // Getting pixel color by position x=20 and y=150
                        clr = image.getRGB(x,y);
                        colors = findRGB(clr);
                        x--;
                    }else{
                        break;
                    }
                }while(colors[0] == 255 && colors[1] == 255 && colors[2] == 255);
                topPosX = x++;
                
                //then check the top side
                do{
                    if(y > 0){
                        // Getting pixel color by position
                        clr = image.getRGB(x,y);
                        colors = findRGB(clr);
                        y--;
                    }else{
                        break;
                    }
                }while(colors[0] == 255 && colors[1] == 255 && colors[2] == 255);
                //Add 2 pixels in the end because he went two pixels too far because of the do while
                topPosY = y+2;
                
                //check the right side
                x = topPosX + Integer.parseInt(selenium.getEval("document.body.clientWidth"));
                y = topPosY + Integer.parseInt(selenium.getEval("document.body.clientHeight"));
                do{
                    if(x < image.getWidth() - 1){
                        // Getting pixel color by position
                        clr = image.getRGB(x,y);
                        colors = findRGB(clr);
                        x++;
                    }else{
                        break;
                    }
                }while(colors[0] == 255 && colors[1] == 255 && colors[2] == 255);
                bottomPosX = x--;

                //then check the bottom side
                do{
                    if(y < image.getHeight() - 1){
                        // Getting pixel color by position
                        clr = image.getRGB(x,y);
                        colors = findRGB(clr);
                        y++;
                    }else{
                        break;
                    }
                }while(colors[0] == 255 && colors[1] == 255 && colors[2] == 255);
                bottomPosY = y--;
            }catch(Exception ex){
                System.out.println(ex);
            }
        }
        
        private int[] findRGB(int clr){
            //calculating corresponding rgb values
            colors = new int[3];
            colors[0]   = (clr & 0x00ff0000) >> 16;
            colors[1] = (clr & 0x0000ff00) >> 8;
            colors[2]  =  clr & 0x000000ff;
            return colors;
        }

        @Test
        public void testUntitled() throws Exception {

            setConfiguration();
            ////////////////////////////////////
            // Browser and Test Configuration //
            ////////////////////////////////////

            //This could select the window but first we need to test without eclipse on.
            //String test = selenium.getAllWindowTitles()[0];
            //selenium.selectWindow(test);

            getBrowserInformation();

            //complete path to save screenshot to
            path = "/Users/hh354/Documents/screenshots/"+ os + "/" + browser + "/";


            ////////////////////
            // Start the test //
            ////////////////////

            //Sakai test
            /*selenium.open("/");
            selenium.click("//div[@id='node-2']/div/div/div[2]/h4[1]/a");
            selenium.waitForPageToLoad("30000");
            selenium.click("link=Product Features");
            selenium.waitForPageToLoad("30000");
            selenium.type("edit-search-theme-form-1", "cambridge");
            selenium.click("edit-submit");
            selenium.waitForPageToLoad("30000");*/
            //This line has to be converted by ourselves: verifyTrue(selenium.isTextPresent("Show:"));
            //Assert.assertTrue(selenium.isTextPresent("Search results"));

            //PhysX Test
            selenium.open("/");
            selenium.type("searchinput", "3d");
            selenium.click("searchsubmit");
            selenium.waitForPageToLoad("30000");
            selenium.click("link=PhysX");
            selenium.waitForPageToLoad("30000");

            int i = 0;
            //capture a screenshot of the webpage
            //the testid will be added to the filename later on
            selenium.captureScreenshot(path + "screenshot" + i + ".png");
            //crop it
            cropImage(i);

            //take screenshots of the full page and compare each time with the previous screenshot
            do{
                i++;
                //Page down (500 must be changed to resolution dependent value)
                selenium.getEval("window.scrollTo(0,"+ (i * 500) +");");
                Thread.sleep(500);
                //Take new screenshot
                selenium.captureScreenshot(path + "screenshot" + i + ".png");
                //crop it
                cropImage(i);
            }while(!checkWithPreviousShot(i));

            //Get all the screenshots
            files = NaiveSimilarityFinder.getOtherImageFiles(new File(path + "cropped/screenshot" + i + ".png"));
            files = bubbleSort(files);

            for(File of : files){
            	System.out.println(of.getName());
            }
            
            BufferedImage a = ImageIO.read(files[0]);
            BufferedImage b = ImageIO.read(files[1]);
            System.out.println(files[0]);
            System.out.println(files[1]);
            for(int j = 1, jl = files.length; j < jl; j++){
                BufferedImage subB = b.getSubimage((b.getWidth()/2)-500, 0, 1000, 30);
                //File outputfile = new File(path + "cropped/reference.png");
                //ImageIO.write(subB, "png", outputfile);
                
                for(int k = 0, kl = a.getHeight(); k < kl; k++){
                	//try{
                		//take a snippet of image a
                        BufferedImage subA = a.getSubimage((a.getWidth()/2)-500, k, 1000, 30);
                        //outputfile = new File(path + "cropped/shot" + k + ".png");
                        //ImageIO.write(subA, "png", outputfile);
                        
                        //compare it to image subB
                        double distance = NaiveSimilarityFinder.TestTwoImages(subB, subA);
                        if(distance < 5){
                            System.out.println("two equals");
                            mergePositions.add(k);
                            a = b;
                            System.out.println(files[j]);
                            b = ImageIO.read(files[j++]);
                            System.out.println(files[j]);
                            break;
                        }else{
                            System.out.println(k);
                        }
                	/*}catch(Exception ex){
                		System.out.println(k);
                		System.out.println(ex);
                		break;
                	}*/
                }
            }
            try {
                //merge all the files
                //mergeFile();
                //sum ofthe k's is total length + height of last picture
                int totalHeight = 0;
                for (int height : mergePositions){
                    totalHeight += height;
                }
                totalHeight += ImageIO.read(files[files.length - 1]).getHeight();

                BufferedImage mergedImage = null;
                try{
                    mergedImage = new BufferedImage(a.getWidth(), totalHeight,BufferedImage.TYPE_4BYTE_ABGR);
                    Graphics2D graph = mergedImage.createGraphics();

                    //Loop over all images and add them to the big image
                    int pos = 0;
                    for(int l = 0, ll = mergePositions.size(); l < ll; l++){
                        BufferedImage img = ImageIO.read(files[l]);
                        graph.drawImage(img.getSubimage(0, 0, img.getWidth(), mergePositions.get(l)),null, 0, pos);
                        pos += mergePositions.get(l);
                    }
                    graph.drawImage(ImageIO.read(files[files.length-1]), null, 0, pos);
                }catch(Exception ex){
                    System.out.println(ex);
                }


                //make sure the 'merged' dir has been created
                if(!new File(path + "merged/").exists()){
                    new File(path + "merged/").mkdir();
                }

                //Create a file
                File outputfile = new File(path + "merged/merged.png");
                //Save the image
                ImageIO.write(mergedImage, "png", outputfile);

            } catch (IOException e) {
                System.out.println(e);
            }

        }

        private void cropImage(int id){
            File f = new File(path + "screenshot" + id + ".png");
            if(f.exists()){
                try {
                    //crop the screenshot (-15 for the scrollbars (don't know how to find the scrollbar width))
                    BufferedImage img = ImageIO.read(f).getSubimage(topPosX, topPosY, bottomPosX - topPosX - 15, bottomPosY - topPosY);
                    //make sure the 'cropped' dir has been created
                    if(!new File(path + "cropped/").exists()){
                        new File(path + "cropped/").mkdir();
                    }

                    //Create a file
                    File outputfile = new File(path + "cropped/" + f.getName());
                    //Save the image
                    ImageIO.write(img, "png", outputfile);

                } catch (IOException e) {
                    System.out.println(e);
                }

            }
        }
        
        private File[] bubbleSort(File[] sortFiles)
        {
        try{
           int out, in;
           for(out=sortFiles.length-1; out>1; out--){ // outer loop (backward)
        	   for(in=0; in<out; in++){ // inner loop (forward)
        		   int file1 = Integer.parseInt(sortFiles[in].getName().replace("screenshot", "").replace(".png", ""));
        		   int file2 = Integer.parseInt(sortFiles[in+1].getName().replace("screenshot", "").replace(".png", ""));
        		   if( file1 > file2 ){// out of order?
        			   File temp = sortFiles[in];
        			   sortFiles[in] = sortFiles[in+1];
        			   sortFiles[in+1] = temp;
        		   }
        		}
           }
           return sortFiles;
        }catch(Exception ex){
           System.out.println(ex);
           return null;
        }
        }
        
        private void getBrowserInformation(){
            //get the browser
            //get the complete client info with some JS and split it
            String[] clientinfo = selenium.getEval("navigator.userAgent;").split(" ");
            //get only the browser info at the end of the array
            browser = clientinfo[clientinfo.length - 1];
            //remove the version number
            browser = browser.split("/")[0];

            //get the OS
            //get the complete client info with some JS and split it
            clientinfo = selenium.getEval("navigator.userAgent;").split(";");
            //get the OS information and replace spaces with underscores
            os = clientinfo[2].replace(" ","_");
            //replace dots by underscores
            os = os.replace(".","_");
        }

        private boolean checkWithPreviousShot(int id){
            //Check if the screenshots exist
            File previousScreenshot = new File(path + "cropped/screenshot" + (id-1) + ".png");
            File lastScreenshot = new File(path + "cropped/screenshot" + id + ".png");
            //Check if the screenshot is the same as the previous
            try{
                double distance = NaiveSimilarityFinder.TestTwoImages(previousScreenshot, lastScreenshot);
                if(distance < 5){
                    //delete last screenshot because there was no scrolling
                    lastScreenshot.delete();
                    return true;
                }else{
                    return false;
                }
            }catch(IOException ex){
                System.out.println(ex);
                return false;
            }
        }

        public void deleteDir(File dir) {
            if (dir.isDirectory()) {
            	String[] children = dir.list();
            	for (int i=0; i<children.length; i++) {
            		deleteDir(new File(dir, children[i]));
        		}
        	}
        }
}