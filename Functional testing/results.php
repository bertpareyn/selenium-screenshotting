<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="css/screen.css" rel="stylesheet" type="text/css" media="screen">
<link rel="stylesheet" href="libs/fancybox/jquery.fancybox-1.3.1.css" type="text/css" media="screen" />
<script type="text/javascript" src="libs/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="libs/roundedcorners.js"></script>
<script type="text/javascript" src="libs/jquery.template.js"></script>
<script type="text/javascript" src="libs/fancybox/jquery.mousewheel-3.0.2.pack.js"></script>
<script type="text/javascript" src="libs/fancybox/jquery.fancybox-1.3.1.js"></script>

<title>Functionality testing</title>
</head>
<body>
<div style="display:none">
    <a id="hidden_clicker" href="#fancy_box_content">fancybox</a>
</div>
<div style="display:none;">
    <div id="fancy_box_content">
    </div>
</div>

<div id="header">
	<div id="header_content">
		<img src="images/functionaltestinglogo.png" alt="functional testing logo" id="logo"/>
		<div id="menu_buttons">
			<ul>
				<li><a href="test.php" title="Test your page">Test</a></li>
				<li class="activebutton">Results</li>
                <li><a href="index.php" title="About the functional tester">About</a></li>
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
</body>
<script type="text/javascript" src="js/results.js"></script>
</html>