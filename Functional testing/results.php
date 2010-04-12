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
				<li><a href="test.php" title="Test your page">Test</a></li>
				<li class="activebutton">Results</li>
			</ul>
		</div>
	</div>
</div>

<div id="content">
	<div id="contentcontent">

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
    // INIT //
    //
    // Check if this page has been posted, if so process it and act accordingly
    // I check on the code input field as this one is the most important one to be filled in
    if(!empty($_POST['codeInput'])){
        // Read the JSON file and parse it into a JSON Object
        $json_o=json_decode(file_get_contents("json/testvars.json"));
        //
        // Loop all browsers and check if they are ticked off
        // Display all in an overview
        $testvars = "<h1>Test settings</h1 class="testHeader"><h2>Browsers</h2> <ul class=testinput>";
        for ($i = 0; $i <= count($json_o->browser) -1; $i++) {
        $browser = $json_o->browser[$i]->browserName;
            if (!empty($_POST[$json_o->browser[$i]->browserName])){
                $testvars = $testvars . "<li>" . $browser . "</li>";
            }
        }
        $testvars = $testvars . "</ul>";
        //
        // Loop all OS's and check if they are ticked off
        $testvars = $testvars . "<h2>Operating systems</h2>";
        $testvars = $testvars . "<ul class=testinput>";
        for ($i = 0; $i <= count($json_o->os) -1; $i++) {
            if (!empty($_POST[$json_o->os[$i]->osName])){
                $os = $json_o->os[$i]->osName;
                $testvars = $testvars . "<li>" . $os . "</li>";
            }
        }
        $testvars = $testvars . "</ul>";
        //
        // Website to check
        $testvars = $testvars . "<h2>Website to check</h2> <ul class=testinput><li>" . $_POST["siteToCheck"] ."</li></ul>";
        //
        // Description
        $testvars = $testvars . "<h2>Description</h2> <ul class=testinput><li>" . $_POST["description"] ."</li></ul>";
        //
        // Test input
        $testvars = $testvars . "<h2>Test input</h2> <ul class=testinput><li>" . $_POST["codeInput"] ."</li></ul>";
        
        echo("<script>document.getElementById('contentcontent').innerHTML ='" . $testvars . "'</script>");
    }
?>