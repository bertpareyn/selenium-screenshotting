/**
 * Declare some variables to be used in the document
 */
/*global $, showHideTest, testId, showReport, TrimPath*/
// testSettings: header, clickable for settings
var $testSettings = $('#test_settings');
// settingsDiv: div containing settings data
var $settingsDiv = $('#settings_div');
// contentcontent: Contains all content data
var $contentcontent = $('#result_container');
// displayBox: Overlay that shows more information about the topic clicked
var $displayBox = $('#displayBox');
// hiddenClicker: simulates click on a link
var $hiddenClicker = $("#hiddenclicker");
// fancyBoxContent: Content to be shown in the fancybox component
var $fancyBoxContent = $("#fancy_box_content");
// settings_table_template: Template to show the settings table
var settingsTableTemplate = "settings_table_template";
// results_table_template: Template to show the results table
var resultsTableTemplate = "results_table_template";
// showBrowserReportTemplate: Template to show the browser reports
var showBrowserReportTemplate = "show_browser_report_template";
// settings: Settings that contain the server ip
var settings = Array();
// noReferenceScreenshotTemplate: Template to show the screenshot without reference image
var noReferenceScreenshotTemplate = "no_reference_screenshot_fancybox_template";
// okScreenshotTemplate: Template to show if the screenshot is ok
var okScreenshotTemplate = "ok_screenshot_fancybox_template";
// errorScreenshotTemplate: Template to show if the screenshot is ok
var errorScreenshotTemplate = "error_screenshot_fancybox_template";

/**
 * With scrollbars floats can become messy
 * If you add some extra width this is fixed but still dynamic
 */
var setFancyBoxWidth = function(){
    $("#fancybox-inner").width($("#fancybox-inner").width() + 40);
};

/**
 * Show the fancybox and give some parameters to go with it
 */
$("#hidden_clicker").fancybox({
    'titlePosition':'inside',
    'transitionIn':'fade',
    'transitionOut':'fade',
    'onComplete' : function() {
       setTimeout(setFancyBoxWidth,1);
    }
});

/**
 * Sets the image as a reference image
 * @param {Object} ev event fired by clicked checkbox
 */
var setReference = function(ev){
    // Check which case is true
    var checkCase = "";
    // Check if the whole browser has to be selected or only one screenshot of the browser
    
    if (ev[0].name === "chkbrowserref") {
        checkCase = "chkbrowserref";
        // Check or uncheck all browser items and persist this in the database
        $("img", ".test_content_column." + ev[0].className.split(" ")[1] + "." + ev[0].className.split(" ")[2]).each(function(){
            // If there is a isref in the data then set it according to the state of the checkbox
            if ($(this).data("isref") !== null) {
                if (ev[0].checked) {
                    $(this).data("isref", "checked");
                }
                else {
                    $(this).data("isref", "");
                }
            }
        });
    }
    else {
            checkCase = "chkref";
            // Set the data on the image so that no reload of the data is needed
            $(".test_content_column_content").find("img").each(function(){
                if ($(this).data("subtestid") == ev[0].value) {
                    if ($(this).data("isref") === "") {
                        $(this).data("isref", "checked");
                    }
                    else {
                        $(this).data("isref", "");
                    }
                }
            });
        }
    
    //Make the ajax call
    $.ajax({
        url: settings.proxy + 'pushreferencesetting.php',
        cache: false,
        success: function(data){
            // Success
        },
        error: function(error){
            alert(error);
        },
        data: {
            "server": settings.server,
            "dbaccess": settings.dbaccess,
            "refbool": ev[0].checked,
            "subtestid": ev[0].value,
            "checkcase": checkCase,
            "testid" : testId,
            "os" : ev[0].className.split(" ")[1],
            "browser" : ev[0].className.split(" ")[2]
        }
    });
};

/**
 * Function that sets a test as a test that can server as a reference for other tests
 * This test can be re-run from the 'my tests' page after it has been set as a reference
 * @param {Object} ev Event fired when clicking the checkbox
 */
var setTestAsBasicTest = function(ev){
    //Make the ajax call
    $.ajax({
        url: settings.proxy + 'pushtestasbasictest.php',
        cache: false,
        success: function(data){
            // Remove checkbox
            $("#setreftest").html('<p>Test set as base test</p>');
        },
        error: function(error){
            alert(error);
        },
        data: {
            "server": settings.server,
            "dbaccess": settings.dbaccess,
            "testid" : ev[0].value
        }
    });
};

/**
 * Add clickhandlers
 */
$(".test_header").live("click", function(){showHideTest($(this));});
$(".browser_images").live("click", function(){showReport($(this));});
$(".ok_compare_img").live("click", function(){showReport($(this));});
$(".error_compare_img").live("click", function(){showReport($(this));});
$(".no_reference_screenshot").live("click", function(){showReport($(this));});
$("#show_browser_results").live("click", function(){showReport($(this));});

/**
 * Add handler for checkbox that defines if a screenshot acts as a reference
 */
$(".chk_ref").live("click", function(){setReference($(this));});
$(".chk_testref").live("click", function(){setTestAsBasicTest($(this));});

/**
 * Show the test results or not
 * @param {Object} ev event that's fired on click of the header
 */ 
var showHideTest = function(ev){
    // Animate all results
    ev.next().animate({height: "toggle", opacity: "toggle"},function(){
        var browser = ev.children('h1').html().substring(2);
        if (ev.siblings().is(":hidden")) {
            ev.children('h1').html("+ " + browser);
        } else {
            ev.children('h1').html("- " + browser);
        }
    });
    // Animate browser images
    ev.prev().animate({opacity: "toggle"});
};

/**
 * Show report for a specific browser on a specific os
 * @param {Object} ev event that came in after click
 */
var showBrowserReport = function(ev){
    // Clear the page
    $fancyBoxContent.html("");

    // Create array that holds the data in the description column
    var descriptionCArr = {};
    $("p", $("div.description_column." + ev[0].className.split(" ")[1])).each(function(i){
        descriptionCArr[i] = $("p", ".description_column_content")[i];
    });

    // Create array that holds the data in the content column
    var contentArr = Array();
    ($("div.test_content_column." + ev.context.className.split(' ')[1] + '.' + ev.context.className.split(' ')[2]).children()).each(function(j){
        contentArr[j] = $(this).find("img");
    });

    // Create the data to give with the template rendering
    var templateData = {
        "ev" : ev,
        "descrColumns" : descriptionCArr,
        "contentColumns" : contentArr,
        "allRef" : $(".browser_images." + ev.context.className.split(' ')[1] + '.' + ev.context.className.split(' ')[2]).data("allRef")
    };

    // Render the template
    $.TemplateRenderer(showBrowserReportTemplate, templateData, $fancyBoxContent);

    var $contentcolumn = $("div.test_content_column." + ev.context.className.split(' ')[1] + '.' + ev.context.className.split(' ')[2]);
    // Loop all children of the testcontencolumn
    $contentcolumn.children().each(function(){
        // If there is a child that is a screenshot get his data and add it to the same screenshot on the fancybox page
        if ($(this).children('img')[0].className.split(' ')[0] === "error_compare_img"){
            // Give the browser header the same data as the image
            $fancyBoxContent.children('div').children('div').children("img."+$(this).children('img')[0].className.split(' ')[0]+"."+$(this).children('img')[0].className.split(' ')[1]+"."+$(this).children('img')[0].className.split(' ')[2]).data("reference", $(this).children('img').data("reference"));
        }
    });

    // Trigger click to show fancybox
    $("#hidden_clicker").trigger("click");
};

/**
 * Show screenshots that have no errors.
 * Function will only show taken screenshot and NOT the reference screenshot
 * @param {Object} ev event that came in after click
 */
var showOkScreenshot = function(ev) {
    // Reset the width of the FancyBox
    $fancyBoxContent.width("");
    // Render the template
    $.TemplateRenderer(okScreenshotTemplate, ev.context, $fancyBoxContent);
    // Trigger click to show fancybox
    $("#hidden_clicker").trigger("click");
};

/**
 * Show screenshots that have errors.
 * Function will show the reference screenshot if it's present
 * @param {Object} ev event that came in after click
 */
var showErrorScreenshot = function(ev) {
    $fancyBoxContent.width("");
    // Render the template
    $.TemplateRenderer(errorScreenshotTemplate, ev, $fancyBoxContent);
    // Get the data from the image reference
    var reference = ev.data("reference");    
    // Put the arbitrary data in the image on the Fancybox
    // It's needed to insure that the right images are compared next to each other
    $fancyBoxContent.children('a').children('img').data("reference", reference); 
    // Trigger click to show fancybox
    $("#hidden_clicker").trigger("click");
};

/**
 * Show screenshots that have errors.
 * Function will show the reference screenshot if it's present
 * @param {Object} ev event that came in after click
 */
var showNoReferenceScreenshot = function(ev) {
    ev.data("isref", $(".test_container").find(".no_reference_screenshot." + ev[0].className.split(" ")[1] + "." + ev[0].className.split(" ")[2] + "." + ev[0].className.split(" ")[3]).data("isref"));
    ev.data("subtestid", $(".test_container").find(".no_reference_screenshot." + ev[0].className.split(" ")[1] + "." + ev[0].className.split(" ")[2] + "." + ev[0].className.split(" ")[3]).data("subtestid"));
    // Render the template
    $.TemplateRenderer(noReferenceScreenshotTemplate, ev, $fancyBoxContent);

    // Trigger click to show fancybox
    $("#hidden_clicker").trigger("click");
};

/**
 * Triggers the click event on the link to show the fancybox
 * Function will select the right function to call based on the event that comes in
 * @param {Object} ev Clickevent
 */
var showReport = function (ev){
    if (ev.context.className.split(' ')[0] === 'browser_images'){
        // Execute function to show information about a specific browser on a specific os
        // Is called when a browser header is clicked and when a user wants more browser information coming from screenshots
        showBrowserReport(ev);
    } else if (ev.context.className.split(' ')[0] === 'ok_compare_img'){
        // Execute function to show information about a specific browser on a specific os
        showOkScreenshot(ev);
    } else if (ev.context.className.split(' ')[0] === 'error_compare_img'){
        // Execute function to show information about a specific browser on a specific os
        showErrorScreenshot(ev);
    } else if (ev.context.id === 'show_browser_results'){
        // Trigger click of browser header
        // This sets all settings correct at once with the same function
        $('.browser_images.' + ev.context.className.split(' ')[0] + '.' + ev.context.className.split(' ')[1]).trigger("click");
    } else if (ev.context.className.split(' ')[0] === 'no_reference_screenshot'){
        // Show a screenshot that hasn't got any reference image
        showNoReferenceScreenshot(ev);
    }
};

/**
 * Fills the table with results coming from the database
 * @param {Object} results Results from the Ajax call that contain results from the test
 */
var fillTableWithResults = function(results){
    if (results.tests[0].testresults) {
        // Unique ID to give to each image on the gui
        var uidForEveryImage = 0;
        // Loop through all tests
        for (var i = 0; i < results.tests[0].testresults.length; i++) {
            // Loop through all results (eg. firefox and safari)
            for (var j = 0; j < results.tests[0].testresults[i].osresults.length; j++) {
                // Set the data for the browserimage
                // The data contains a boolean to see if the test browser is checked as a reference
                var $browserImg = $(".browser_images." + results.tests[0].testresults[i].osId + "." + results.tests[0].testresults[i].osresults[j].browserId);
                if (results.tests[0].testresults[i].osresults[j].allRef === 1) {
                    $browserImg.data("allRef", "checked");
                }
                else {
                    $browserImg.data("allRef", "");
                }
                // display the array on the results page
                for (var k = 0; k < results.tests[0].testresults[i].osresults[j].browserresults.length; k++) {
                    var testContentHolder = $('div.' + results.tests[0].testresults[i].osId + '.' + results.tests[0].testresults[i].osresults[j].browserId);
                    // check if there are results to start with
                    if (results.tests[0].testresults[i].osresults[j].browserresults.length > 0) {
                        // If the content holder is empty then the test has to be shown
                        // otherwise a repeat would occur
                        if (testContentHolder.children().size() < results.tests[0].testresults[i].ostests.length) {
                            // Variable to determine if the data can be added or is already present on the page
                            var canBeAdded = true;
                            // Loop all children and check if the item received is already in the list
                            // If it's already in there it can not be added again
                            testContentHolder.children().each(function(){
                                if ($(this).hasClass(results.tests[0].testresults[i].osresults[j].browserresults[k].subTestId)) {
                                    // Can't be added because it already exists
                                    canBeAdded = false;
                                }
                            });
                            
                            // If the content holder doesn't have any children then the first item
                            // has to be added anywy
                            if (testContentHolder.children().size() === 0) {
                                canBeAdded = true;
                            }
                            
                            // If the data may be added this will be executed
                            if (canBeAdded) {
                                var template = '<div class="test_content_column_content ' + results.tests[0].testresults[i].osresults[j].browserresults[k].subTestId + '">';
                                if (results.tests[0].testresults[i].osresults[j].browserresults[k].screenshot === '') {
                                    // There is no screenshot, show OK of ERROR sign
                                    if (results.tests[0].testresults[i].osresults[j].browserresults[k].success == '1') {
                                        template += '<img src="images/testok.png" alt="Test OK" title="Test OK" class="test_ok_check"></img>';
                                    }
                                    else {
                                        template += '<img src="images/testerror.png" alt="Test Error" title="Test Error" class="test_error_cross"></img>';
                                    }
                                }
                                else {
                                    // There is a screenshot, display it
                                    template += '<img src="' + settings.screenshots + results.tests[0].testresults[i].osresults[j].browserresults[k].screenshot + '"';
                                    // Check if the error is OK or ERROR
                                    if (results.tests[0].testresults[i].osresults[j].browserresults[k].success == '1') {
                                        template += 'alt="OK screenshot" title="screenshot OK" class="ok_compare_img ' + results.tests[0].testresults[i].osId + ' ' + results.tests[0].testresults[i].osresults[j].browserId + ' ' + uidForEveryImage + '"></img>';
                                    }
                                    else {
                                        // Check if there is a reference screenshot available
                                        if (results.tests[0].testresults[i].osresults[j].browserresults[k].reference === '') {
                                            template += 'alt="Screenshot without reference" title="Screenshot without reference" class="no_reference_screenshot ' + results.tests[0].testresults[i].osId + ' ' + results.tests[0].testresults[i].osresults[j].browserId + ' ' + uidForEveryImage + '"></img>';
                                        }
                                        else {
                                            template += 'alt="Error in screenshot" title="Screenshot error"class="error_compare_img ' + results.tests[0].testresults[i].osId + ' ' + results.tests[0].testresults[i].osresults[j].browserId + ' ' + uidForEveryImage + '"></img>';
                                        }
                                    }
                                }
                                
                                // Close testContentColumn div
                                template += '</div>';
                                testContentHolder.append(template);
                                // Put arbitrary data in the images tag
                                // The reference screenshot will be kept in this arbitrary data
                                var referenceData = "";
                                if (results.tests[0].testresults[i].osresults[j].browserresults[k].reference !== null) {
                                    referenceData = settings.screenshots + results.tests[0].testresults[i].osresults[j].browserresults[k].reference;
                                }
                                
                                var image = null;
                                image = $("img.error_compare_img." + results.tests[0].testresults[i].osId + "." + results.tests[0].testresults[i].osresults[j].browserId + '.' + uidForEveryImage);
                                image.data("reference", referenceData);
                                
                                image = $("img.no_reference_screenshot." + results.tests[0].testresults[i].osId + "." + results.tests[0].testresults[i].osresults[j].browserId + '.' + uidForEveryImage);
                                image.data("subtestid", results.tests[0].testresults[i].osresults[j].browserresults[k].subTestId);
                                if (results.tests[0].testresults[i].osresults[j].browserresults[k].isRef === 1) {
                                    image.data("isref", "checked");
                                }
                                else {
                                    image.data("isref", "");
                                }
                            }
                        }
                        uidForEveryImage++;
                    }
                }
            }
        }
    }
};

/**
 {
    "tests": [
        {
            "testId": 1,
            "testresults": [
                {
                    "osId": "macosx",
                    "ostests": [
                        {
                            "testId": "1",
                            "description": "assertTrue(isTextPresent(\\\"News\\\"))",
                            "tooltip": "assertTrue"
                        },
                        {
                            "testId": "1",
                            "description": "assertTrue(isTextPresent(\\\"Page last updated\\\"))",
                            "tooltip": "assertTrue"
                        },
                        {
                            "testId": "1",
                            "description": "takeScreenshot",
                            "tooltip": "takeScreenshot"
                        }
                    ],
                    "osresults": [
                        {
                            "browserId": "firefox",
                            "browserresults": [
                                {
                                    "testId": "1",
                                    "screenshot": "",
                                    "reference": null,
                                    "success": "1"
                                },
                                {
                                    "testId": "1",
                                    "screenshot": "",
                                    "reference": null,
                                    "success": "1"
                                },
                                {
                                    "testId": "1",
                                    "screenshot": "\/Users\/hh354\/Sites\/php-src\/screenshots\/2010\/4\/26\/_Intel_Mac_OS_X_10_6\/Firefox\/merged\/merged0.png",
                                    "reference": null,
                                    "success": "1"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
 * Get the results from the database
 * Above is an example of the JSON file that is returned
 */
var getResults = function(){
    //Make the ajax call
    $.ajax({
        //url: 'json/testresults.php',
        url: settings.proxy + 'pollforresultsproxy.php',
        cache: false,
        dataType:"json",
        success: function(data){
            fillTableWithResults(data);
        },
        error: function(error){
            alert(error);
        },
        data : {
            "testid" : testId,
            "server" : settings.server,
            "dbaccess" : settings.dbaccess
        }
    });
};

/**
 * Create the table in which the data goes in
 * http://plugins.jquery.com/project/jquerytemplate for more information
 * @param {Object} results Results from the Ajax call containing information the user inputted on the page
 */
var createTable = function(results){
    // Render the template
    $contentcontent.append($.TemplateRenderer(resultsTableTemplate, results));
 
    // Create two variables to calculate the max width of the content page
    var highestNumberOfColumns = 0;
    var tempNumberOfColumns = 0;
    for (var i = 0; i < results.operatingsystems.length; i++){
        // Check how many columns there are to determine the width of the container
        for (var l = 0; l < results.operatingsystems[i].browsers.length; l++) {
            tempNumberOfColumns ++;
        }

        // Set all contentcolumns equal to the description column
        // If a column is empty at least his height will be there and the dashed line on the right too
        $('.test_content_column').height($('.description_column').height());

        // Check if this is the last item to be put on stage
        // If it is set its bottom corners rounded
        if (i === results.operatingsystems.length -1){
            $("div.test_content." + results.operatingsystems[i].osId).corners("bottom 13px");
        }

        // Check if this OS has the highest number of tests on browsers
        // This means there are more columns and the width has to be wider
        if (highestNumberOfColumns < tempNumberOfColumns){
            highestNumberOfColumns = tempNumberOfColumns;
            tempNumberOfColumns = 0;
        }
    }
    // Calculate the width of the contentpage
    $(".test_container").width(25+136+20+(highestNumberOfColumns*110));
    // Request the results
    getResults();
    var id = setInterval(getResults, 2000);  
};

/**
 * Create the settings table on top of the page
 * The settings are received through an Ajax call
 * @param {Object} results Results from the Ajax call
 */
var CreateSettingsTable = function(results) {
    if (results.testId) {
        // Render the template
        $.TemplateRenderer(settingsTableTemplate, results, $contentcontent);

        // Add corners
        $testSettings = $('#test_settings');
        $settingsDiv = $('#settings_div');
        $testSettings.corners("top 13px");

        // Show hide testsettings
        $testSettings.click(function(){
            if ($settingsDiv.is(":hidden")) {
                $testSettings.html("<h1>- Test settings</h1>");
            }
            else {
                $testSettings.html("<h1>+ Test settings</h1>");
            }
            $settingsDiv.animate({
                height: "toggle",
                opacity: "toggle"
            });
        });

        // Create the result tables
        createTable(results);
    } else {
        // Place template to show search box to search for tests on ID
        var result = TrimPath.processDOMTemplate("search_test_template");
        $contentcontent.html(result);
    }
};

/**
 * {

    testId: "1"
    description: "test bbc"
    url: http://news.bbc.co.uk/
    codeInput: [
            {
                codeName: "AssertTrue"
                tooltip: "assertTrue(isTextPresent(\"News\"))"
            }
            {
                codeName: "AssertTrue"
                tooltip: "assertTrue(isTextPresent(\"Page last updated\"))"
            }
            {
                codeName: "TakeScreenshot"
                tooltip: "takeScreenshot"
            }
    ]
    operatingsystems: [
            {
                osName: "MAC OSX 10.6"
                osId: "macosx"
                osVersion: "",
                browsers: [
                        {
                            browserName: "Mozilla Firefox 3.5"
                            browserId: "firefox"
                            browserVersion: "3.5"
                            browserPic: "firefox-icon.png"
                        }
                        {
                            browserName: "Safari 4"
                            browserId: "safari"
                            browserVersion: "4"
                            browserPic: "safari-icon.png"
                        }
                  ]
            }
      ]
}
 * 
 * Get the test settings from the database
 * Above is an example of the JSON file that is returned
 */
var getTestSettings = function(){
    //Make the ajax call
    $.ajax({
        //url: 'json/startedTestSettings.php',
        url: settings.proxy + 'pollforsetupproxy.php',
        cache: false,
        dataType: "json",
        success: function(data){
            CreateSettingsTable(data);
        },
        error: function(error){
            alert(error.responseText);
        },
        data : {
            "testid" : testId,
            "server" : settings.server,
            "dbaccess" : settings.dbaccess
        }
    });
};

/**
 * Loads the settings form the settings.php file
 * These settings are:
 *      - URL for the server
 *      - URL for the proxy directory
 *      - URL for the polling directory
 */
var loadSettings = function(){
    //Make the ajax call
    $.ajax({
        url: 'settings/settings.php',
        cache: false,
        dataType: "json",
        success: function(data){
            settings.server = data.server;
            settings.proxy = data.proxy;
            settings.dbaccess = data.dbaccess;
            settings.screenshots = data.screenshots;
            getTestSettings();
        },
        error: function(error){
            alert(error);
        }
    });
};

/**
 * Function that init's the page
 * The settings file is loaded first
 */
var init = function(){
    loadSettings(); 
};

init();