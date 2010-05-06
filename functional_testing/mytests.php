<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link href="css/screen.css" rel="stylesheet" type="text/css" media="screen">
        <title>Functionality testing</title>
    </head>
<body>
    <div id="header">
        <div id="header_content">
            <img src="images/functionaltestinglogo.png" alt="functional testing logo" id="logo"/>
            <div id="menu_buttons">
                <ul>
                    <li><a href="test.php" title="Test your page">Test</a></li>
                    <li><a href="results.php" title="Watch your results">Results</a></li>
                    <li class="activebutton">My tests</li>
                    <li><a href="index.php" title="About the functional tester">About</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div id="content">
        <div id="content_content">
        </div>
    </div>

    <div id="footer">
        <div id="footer_content">
            <div id="footer_shadow">
            </div>
            
        </div>
    </div>

    <!-- SELECT OLD TEST FORM TEMPLATE -->
    <div id="select_old_test_template" style="display:none;"><!--
        <form name ="old_test_form" method="POST" action="http://10.0.0.80:8888/functional_testing/testSubmit.php">
            <label for="old_tests_box">Choose a test that has been run</label>
            <select name="refTestId" id="old_tests_box" value="test">
                 {for r in tests}
                    {if r.refTestId == 0}
                        <option value="${r.testId}">${r.testId}. ${r.description}</option>
                    {/if}
                {/for}
            </select>
            <div id="test_details"></div>
            <br>
            <input id="submit_old_test_button" type="Submit" name="submitOldtest" value="Re-run test">
            <hr>
        </form>
    --></div>
    <!-- SETTINGS TABLE TEMPLATE -->
	<div id="settings_table_template" style="display:none;"><!--
	    <div class=test_container>
	        <div class="test_header" id="test_settings">
	        <h1>Test settings</h1>
	    </div>
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
	    </div><div id="reference_list_holder"></div>-->
	</div>
	<!-- REFERENCED TESTS LIST -->
	<div id="referenced_tests_list" style="display:none;"><!--
	<h1>Tests based on this test</h1>
	   <div class="refTestResult reftest_alterrow topDescription">
		   <div class="reftestid">Test ID</div>
	       <div class="reftestdaterun">Rundate</div>
	       <div class="reftestdescription">Description</div>
	       <div class="reftestsuccesserror"><span class="reftest_success">OK</span> / <span class="reftest_error">Error</span></div>
	       <div class="showreftest">Show Test</div>
       </div>
       <hr>
	   {for t in tests}
		   <div class="refTestResult{if t_index % 2} reftest_alterrow{/if}">
			   <div class="reftestid">${t.testId}.</div>
			   <div class="reftestdaterun">${t.runat}</div>
			   <div class="reftestdescription">${t.description}</div>
			   <div class="reftestsuccesserror"><span class="reftest_success">${t.success}</span> / <span class="reftest_error">${t.fail}</span></div>
			   <div class="showreftest"><a href="results.php?testid=${t.testId}" title="show test ${t.testId}" target="_blank">show test ${t.testId}</a></div>
			   <hr>
		   </div>
	   {/for}
	</div>-->
</body>

<script type="text/javascript" src="libs/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="libs/roundedcorners.js"></script>
<script type="text/javascript" src="libs/trimpath.js"></script>
<script type="text/javascript" src="js/mytests.js"></script>
</html>
