<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="css/screen.css" rel="stylesheet" type="text/css" media="screen">
<link rel="stylesheet" href="libs/fancybox/jquery.fancybox-1.3.1.css" type="text/css" media="screen" />

<title>Functionality testing - results</title>
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
				<li><a href="mytests.php" title="About the functional tester">My tests</a></li>
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

<!-- SEARCH TESTS ON ID -->
<div id="search_test_template" style="display:none;">
	<p>Search for your test by putting your test ID in the searchbox below</p>
	<form name ="search_test_form" method="GET">
	    <label for="search_test_input">Test ID</label>
	    <input type="text" name="testid" id="search_test_input">
	    <br>
	    <input id="submit_search_test_button" type="Submit" value="Search">
	</form>
	<hr>
</div>

<!-- SETTINGS TABLE -->
<div id="settings_table_template" style="display:none;"><!--
    <div class=test_container>
        <div class="test_header" id="test_settings">
            <h1>+ Test settings</h1>
        </div>
        <div class="test_content" id="settings_div">
            <h2>Operating systems and browsers</h2>
            <ul>
                {for o in operatingsystems}
                    <li class="os_test_list_item">${o.osName}</li>
                    <ul>
	                    {for b in o.browsers}
                            <li class="browser_test_list_item">${b.browserName}</li>
	                    {/for}
                    </ul>
                {/for}
            </ul>
            <h2>Website to check</h2>
            <ul class=test_input>
                <li><a href="${url}" target='_blank' title="Visit the website that's tested">${url}</a></li>
            </ul>
            <h2>Description</h2>
            <ul class=test_input>
                <li>${description}</li>
            </ul>
            <h2>Test input</h2>
            <ol id='code_input_list'>
                {for c in codeInput}
                    <li>${c.codeName}</li>
                {/for}
            </ol>
        </div>
    </div>-->
</div>

<!-- RESULTS TABLE -->
<div id="results_table_template" style="display:none;"><!--
    {for o in operatingsystems}
        <div class="test_container">
            <div class="browser_images_container">
                {for b in o.browsers}
                    <img src="images/browsers/${b.browserPic}" class="browser_images ${o.osId} ${b.browserId}" alt="${b.browserName}" title="${o.osName} - ${b.browserName}"/>
                {/for}
            </div>
            <div class="test_header">
                <h1>- ${o.osName}</h1>
            </div>
            <div class="test_content ${o.osId}">
            <div class="description_column ${o.osId}">
                {for c in codeInput}
                    <div class='description_column_content'><p title="${c.tooltip}">${c.codeName}</p></div>
                {/for}
            </div>
            {for b in o.browsers}
                <div class="test_content_column ${o.osId} ${b.browserId}">
                
                </div>
            {/for}
            <hr/>
        </div>
        </div>        
    {/for}-->
</div>
</body>

<?php 
    echo ("<script>var testId= ''; testId='" . $_GET['testid'] . "'</script>");
?>

<script type="text/javascript" src="libs/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="libs/roundedcorners.js"></script>
<script type="text/javascript" src="libs/fancybox/jquery.mousewheel-3.0.2.pack.js"></script>
<script type="text/javascript" src="libs/fancybox/jquery.fancybox-1.3.1.js"></script>
<script type="text/javascript" src="libs/trimpath.js"></script>
<script type="text/javascript" src="js/results.js"></script>
</html>