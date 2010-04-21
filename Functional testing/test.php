<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="css/screen.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="libs/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="libs/roundedcorners.js"></script>
<script type="text/javascript" src="libs/jquery.template.js"></script>
<title>Functionality testing</title>
</head>
<body>

<div id="header">
	<div id="header_content">
		<img src="images/functionaltestinglogo.png" alt="functional testing logo" id="logo"/>
		<div id="menu_buttons">
			<ul>
				<li class="activebutton">Test</li>
				<li><a href="results.php" title="Watch your results">Results</a></li>
				<li><a href="index.php" title="About the functional tester">About</a></li>
			</ul>
		</div>
	</div>
</div>

<div id="content">
	<div id="content_content">
		<p id="test_explanation">You can test your webpages for inconsistencies on this page. Once the test is submitted you will be redirected to the results page were your results will appear as soon as they are ready.</p>
		<div id="test_container">
		    <form name ="checkboxform" method="POST" action="results.php">
		        <div id="test_preview">
		            
                </div>
		        <div id="code_input">
		            <h1>Website to check</h1>
		            <input type="text" id="site_to_check" name="siteToCheck">
		            <h1>Description</h1>
		            <input type="text" id="description" name="description">
		            <h1>Test input</h1>
		            <textarea name="codeInput" cols="70" rows="8"></textarea>
		        </div>
		        <div id="submit_test_form">
		            <input id="submit_form_button" type="Submit" name="submitCheckboxes" value="Start test">
		            <input id="reset_form_button" type="Reset" name="resetForm" value="Reset form">
		        </div>
		    </form>
		</div>
		<hr/>
	</div>
</div>
<div id="footer">
	<div id="footer_content">
		<div id="footer_shadow">
		</div>
		
	</div>
</div>
</body>
</html>
<script type="text/javascript" src="js/test.js"></script>