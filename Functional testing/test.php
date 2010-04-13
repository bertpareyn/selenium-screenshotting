<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="screen.css" rel="stylesheet" type="text/css">
<title>Functionality testing</title>
</head>
<body>

<div id="header">
	<div id="headercontent">
		<img src="images/functionaltestinglogo.png" alt="functional testing logo" id="logo"/>
		<div id="menubuttons">
			<ul>
				<li><a href="index.php" title="About the functional tester">About</a></li>
				<li class="activebutton">Test</li>
				<li><a href="results.php" title="Watch your results">Results</a></li>
			</ul>
		</div>
	</div>
</div>

<div id="content">
	<div id="contentcontent">
		<p>You can test your webpages for inconsistencies on this page. Once the test is submitted you will be redirected to the results page were your results will appear as soon as they are ready.</p>
		<div id="testcontainer">
		    <form name ="checkboxform" method="POST" action="results.php">
		        <div id="browsers">
		            
		        </div>
		        <div id="operatingsystems">

		        </div>
		        <div id="codeInput">
		            <h1>Website to check</h1>
		            <input type="text" id="siteToCheck" name="siteToCheck">
		            <h1>Description</h1>
		            <input type="text" id="description" name="description">
		            <h1>Test input</h1>
		            <textarea name="codeInput" cols="70" rows="8"></textarea>
		        </div>
		        <div id="submitTestForm">
		            <input id="submitFormButton" type="Submit" name="submitCheckboxes" value="Start test">
		            <input id="resetFormButton" type="Reset" name="resetForm" value="Reset form">
		        </div>
		    </form>
		</div>
	</div>
</div>

<div id="footer">
	<div id="footercontent">
		<div id="footershadow">
		</div>
		
	</div>
</div>
</body>
</html>
<?php
    // Read the JSON file and parse it into a JSON Object
    $json_o=json_decode(file_get_contents("json/testvars.json"));
    // Get all supported browsers from the JSON file
    // Create var that contains all checkboxes
    $browsers = "<h1>Browser</h1>";
    for ($i = 0; $i <= count($json_o->browser) -1; $i++) {
        // If the Browser is supported then create a checkbox for it
        if ($json_o->browser[$i]->isSupported == 'true'){
            // Current browser
            $browser = $json_o->browser[$i]->browserName;
            // Add to all browsers
            $browsers = $browsers . "<input type =\'checkbox\' id=\'$browser\' name=\'$browser\'><label for=\'$browser\'>$browser</label><br/>";
        }
    };
    echo ("<script> document.getElementById('browsers').innerHTML = '" . $browsers . "'</script>");

    // Get all supported browsers from the JSON file
    // Create var that contains all checkboxes
    $oss = "<h1>Operating Systems</h1>";
    for ($j = 0; $j <= count($json_o->os) -1; $j++) {
        // If the OS is supported then create a checkbox for it
        if ($json_o->os[$j]->isSupported == 'true'){
            // Current os
            $os = $json_o->os[$j]->osName;
            // Add to all OS's
            $oss = $oss . "<input type =\'checkbox\' id=\'$os\' name=\'$os\'><label for=\'$os\'>$os</label><br/>";
        }
    };
    echo ("<script> document.getElementById('operatingsystems').innerHTML = '" . $oss . "'</script>");
?>