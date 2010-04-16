<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="CSS/screen.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="js/roundedcorners.js"></script>
<script type="text/javascript" src="js/jquery.template.js"></script>
<title>Functionality testing</title>
</head>
<body>

<div id="header">
	<div id="headercontent">
		<img src="images/functionaltestinglogo.png" alt="functional testing logo" id="logo"/>
		<div id="menubuttons">
			<ul>
				<li class="activebutton">Test</li>
				<li><a href="results.php" title="Watch your results">Results</a></li>
				<li><a href="index.php" title="About the functional tester">About</a></li>
			</ul>
		</div>
	</div>
</div>

<div id="content">
	<div id="contentcontent">
		<p>You can test your webpages for inconsistencies on this page. Once the test is submitted you will be redirected to the results page were your results will appear as soon as they are ready.</p>
		<div id="testcontainer">
		    <form name ="checkboxform" method="POST" action="results.php">
		        <div id="testpreview">
		            
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
		<hr/>
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
<script type="text/javascript" src="js/test.js"></script>