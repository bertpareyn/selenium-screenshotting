<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
        <link href="css/screen.css" rel="stylesheet" type="text/css" media="screen">
        <title>Functionality testing - my tests</title>
    </head>
<body>
	<div id="header">
	    <div id="header_content">
	        <img src="images/functionaltestinglogo.png" alt="functional testing logo" id="logo"/>
	        <div id="menu_buttons">
	            <ul>
	                <li><a href="test.php" title="Test your page">Test</a></li>
	                <li><a href="results.php" title="Watch your results">Results</a></li>
	                <li><a href="index.php" title="About the functional tester">About</a></li>
	                <li class="activebutton">My tests</li>
	            </ul>
	        </div>
	    </div>
	</div>

	<div id="content">
	    <div id="content_content">
	        <div id="result_container"></div>
	    </div>
	</div>
	
	<div id="footer">
	    <div id="footer_content">
	        <div id="footer_shadow">
	        </div>    
	    </div>
	</div>
	
	<!-- SELECT OLD TEST FORM TEMPLATE -->
	<div id="select_old_test_template" style="display:none;">
		<form name ="checkboxform" method="GET" action="http://10.0.0.49:8888/testSubmit.php">
	        <label for="old_tests_box">Description</label>
	        <select id="old_tests_box" value="test"><option value="Butter">Butter</option><option value="Cheese">Cheese</option><option value="Milk">Milk</option></select>
		</form>
	</div>
</body>

<script type="text/javascript" src="libs/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="libs/roundedcorners.js"></script>
<script type="text/javascript" src="js/mytests.js"></script>
</html>
