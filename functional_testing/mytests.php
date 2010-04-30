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
        <form name ="old_test_form" method="POST" action="testSubmit.php">
            <label for="old_tests_box">Choose a test that has been run</label>
            <select id="old_tests_box" name="refTestId" value="test">
                 {for r in tests}
                   <option value="${r.testId}">${r.description}</option>
                {/for}
            </select>
            <br>
            <input id="submit_old_test_button" type="Submit" name="submitOldtest" value="Re-run test">
            <hr>
        </form>
    --></div>
</body>

<script type="text/javascript" src="libs/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="libs/roundedcorners.js"></script>
<script type="text/javascript" src="libs/trimpath.js"></script>
<script type="text/javascript" src="js/mytests.js"></script>
</html>
