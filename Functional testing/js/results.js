/**
 * Declare some variables to be used in the document
 */
// testSettings: header, clickable for settings
$testSettings = $('#testSettings');
// settingsDiv: div containing settings data
$settingsDiv = $('#settingsDiv');
// contentcontent: Contains all content data
$contentcontent = $('#resultContainer');
// resultcontainer: contains all results from the test
$resultContainer = $('#resultContainer');
// displayBox: Overlay that shows more information about the topic clicked
$displayBox = $('#displayBox');
// hiddenClicker: simulates click on a link
$hiddenClicker = $("#hiddenclicker");
// fancyBoxContent: Content to be shown in the fancybox component
$fancyBoxContent = $("#fancyBoxContent");

/**
 * Show the fancybox and give some parameters to go with it
 */
$("#hidden_clicker").fancybox({
    'titlePosition':'inside',
    'transitionIn':'fade',
    'transitionOut':'fade'
});

var resizeFancyBox = function(){
    alert("test");
};

/**
 * Add clickhandlers
 */
$(".testHeader").live("click", function(){showHideTest($(this));});
$(".browserImages").live("click", function(){showReport($(this));});
$(".okcompareimg").live("click", function(){showReport($(this));});
$(".errorcompareimg").live("click", function(){showReport($(this));});
$("#show_browser_results").live("click", function(){showReport($(this));});

/**
 * Show the testresults or not
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
    // Add browser title and os to title tag
    var template = '<h1>' + ev.context.title + '</h1>';
    // Add browser image to the right top corner
    template += '<img class="browser_image" src="' + ev.context.src + '" class="browserImages" alt="' + ev.context.alt + '" title="' + ev.context.title + '"/>';
    // Add description of the test
    $descriptionColumn = $("div.descriptionColumn." + ev.context.className.split(' ')[1]);
    template += '<div class="descriptionColumn">';
    $descriptionColumn.children().each(function(){
        template += '<div class="descriptionColumnContent"><p>' + $(this).children('p').html() + '</p></div>';
    });
    template += '</div>';
    // Add the whole description next to the short description
    template += '<div class="testContentColumn">';
    $descriptionColumn.children().each(function(){
        template += '<div class="testContentColumnContent">';
        template += $(this).children('p')[0].title;
        template += '</div>';
    });
    // Close testContentColumn div
    template += '</div>';
    // Add the testresults next to the description
    // Get the contentcolumn with results
    $contentcolumn = $("div.testContentColumn." + ev.context.className.split(' ')[1] + '.' + ev.context.className.split(' ')[2]);
    template += '<div class="testContentColumn">';
    $contentcolumn.children().each(function(){
        template += '<div class="testContentColumnContent">';
        template += '<img src="' + $(this).children('img')[0].src + '" alt="' + $(this).children('img')[0].alt + '" class="' + $(this).children('img')[0].className + '"/>';
        template += '</div>';
    });
    // Close testContentColumn div
    template += '</div>';
    
    // Add the template to the html
    $fancyBoxContent.html(template);
    // Trigger click to show fancybox
    $("#hidden_clicker").trigger("click");
    if ($.browser.mozilla) {
        $fancyBoxContent.width("");
    }
};

/**
 * Show screenshots that have no errors.
 * Function will only show taken screenshot and NOT the reference screenshot
 * @param {Object} ev event that came in after click
 */
var showOkScreenshot = function(ev) {
    $fancyBoxContent.width("");
    var template = '<h1>Screenshot successful</h1>';
    template += '<a href="' + ev.context.src + '" title="Show full screenshot" target="_blank"><img src="' + ev.context.src + '" class="okcompareimgbig"></a>';
    // Add the template to the html
    $fancyBoxContent.html(template);

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
    var template = '<h1>Screenshot error</h1>';
    template += '<p id="show_browser_results" class="' + ev.context.className.split("errorcompareimg ")[1] + '">Show browser results</p>';
    template += '<a href="' + ev.context.src + '" title="Show full screenshot" target="_blank"><img src="' + ev.context.src + '" class="errorcompareimgbig"></a>';
    
    // Add the template to the html
    $fancyBoxContent.html(template);
    
    // Trigger click to show fancybox
    $("#hidden_clicker").trigger("click");
};

/**
 * Triggers the click event on the link to show the fancybox
 * Function will select the right function to call based on the event that comes in
 * @param {Object} ev Clickevent
 */
var showReport = function (ev){
    if (ev.context.className.split(' ')[0] == 'browserImages'){
        // Execute function to show information about a specific browser on a specific os
        showBrowserReport(ev);
    } else if (ev.context.className.split(' ')[0] == 'okcompareimg'){
        // Execute function to show information about a specific browser on a specific os
        showOkScreenshot(ev);
    } else if (ev.context.className.split(' ')[0] == 'errorcompareimg'){
        // Execute function to show information about a specific browser on a specific os
        showErrorScreenshot(ev);
    } else if (ev.context.id == 'show_browser_results'){
        $('.browserImages.' + ev.context.className.split(' ')[0] + '.' + ev.context.className.split(' ')[1]).trigger("click");
    }
};

/**
 * Fills the table with results coming from the database
 * @param {Object} results Results from the Ajax call that contain results from the test
 */
var fillTableWithResults = function(results) {
    // Loop through all tests
    for (var i = 0; i < results.tests[0].testresults.length; i++) { 
        // Loop through all results (eg. firefox and safari)
        for (var j = 0; j < results.tests[0].testresults[i].osresults.length; j++) {
            // display the array on the results page
            for (var k = 0; k < results.tests[0].testresults[i].ostests.length; k++) {
                var testContentHolder = $('div.' + results.tests[0].testresults[i].osId + '.' + results.tests[0].testresults[i].osresults[j].browserId);
                // If the content holder is empty then the test has to be shown
                // otherwise a repeat would occur
                if (testContentHolder.children().size() < results.tests[0].testresults[i].ostests.length ) {
                    template = '<div class="testContentColumnContent">';
                    if (results.tests[0].testresults[i].osresults[j].browserresults[k].screenshot == 'null') {
                        // There is no screenshot, show OK of ERROR sign
                        if (results.tests[0].testresults[i].osresults[j].browserresults[k].success == 'true'){
                            template += '<img src="images/testok.png" alt="Test OK" title="Test OK"></img>';
                        }
                        else {
                            template += '<img src="images/testerror.png" alt="Test Error" title="Test Error"></img>';
                        }
                    }
                    else {
                        // There is a screenshot, display it
                        template += '<img src="images/screenshots/' + results.tests[0].testresults[i].osresults[j].browserresults[k].screenshot + '"';
                        // Check if the error is OK or ERROR
                        if (results.tests[0].testresults[i].osresults[j].browserresults[k].success == 'true'){
                            template += 'alt="OK screenshot" title="screenshot OK" class="okcompareimg ' + results.tests[0].testresults[i].osId + ' ' + results.tests[0].testresults[i].osresults[j].browserId +'"></img>';
                        } else {
                            template += 'alt="Error in screenshot" title="Screenshot error"class="errorcompareimg ' + results.tests[0].testresults[i].osId + ' ' + results.tests[0].testresults[i].osresults[j].browserId +'"></img>';
                        }
                    }
                    // Close testContentColumn div
                    template += '</div>';
                    testContentHolder.append(template);
                }
            }
        }
    }
};

/**
 * {
    "tests": [
        {
            "testId" : "0001",
            "testresults" : [
                {
                    "os" : "Windows 7",
                    "osresults" : [
                        {
                            "browserId" : "0001",
                            "browser" : "Firefox 3.6",
                            "browserpic" : "firefox.png",
                            "tests" : [
                                {
                                    "testId" : "0001",
                                    "description" : "verify text"
                                },
                                {
                                    "testId" : "0002",
                                    "description" : "verify text"
                                }
                            ],
                            "browserresults" : [
                                {
                                    "testId" : "0001",
                                    "screenshot" : "null",
                                    "success" : "true"
                                },
                                {
                                    "testId" : "0002",
                                    "screenshot" : "null",
                                    "success" : "true"
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
 * The above JSON file is an example of the returned datafeed
 */
var getResults = function(){
    //Make the ajax call
    $.ajax({
        url: 'json/testresults.json',
        cache: false,
        success: function(data){
            fillTableWithResults(data);
        },
        error: function(error){
            alert(error);
        }
    });
};

/**
 * Create the table in which the data goes in
 * http://plugins.jquery.com/project/jquerytemplate for more information
 * @param {Object} results Results from the Ajax call containing information the user inputted on the page
 */
var createTable = function(results){
    // Create two variables to calculate the max width of the content page
    var highestNumberOfColumns = 0;
    var tempNumberOfColumns = 0;
    for (var i = 0; i < results.operatingsystems.length; i++){
        // Add the testContainer div
        template = '<div class="testcontainer">';
                // Add browser images on top of the list
        template += '<div class="browserImagesContainer">';
        for (var j = 0; j < results.operatingsystems[i].browsers.length; j++) {
            template += '<img src="images/browsers/' + results.operatingsystems[i].browsers[j].browserPic + '" class="browserImages ' + results.operatingsystems[i].osId + ' ' + results.operatingsystems[i].browsers[j].browserId + '" alt="' + results.operatingsystems[i].browsers[j].browserName + '" title="' + results.operatingsystems[i].osName + ' - '  + results.operatingsystems[i].browsers[j].browserName + '"/>';
        }
        // Close browserImagesContainer div
        template += '</div>';
        // Add a div that contains the clickable part of the header
        template += '<div class="testHeader">';
        // Add a header for this testContainer
        template += '<h1>- ' + results.operatingsystems[i].osName + '</h1>';
        // Close the testContainer div
        template += '</div>';
        // Add testcontent
        template += '<div class="testcontent ' + results.operatingsystems[i].osId + '">';
        // Add the description column first
        template += '<div class="descriptionColumn ' + results.operatingsystems[i].osId + '">';
        for (var k = 0; k < results.codeInput.length; k++) {
            template += '<div class="descriptionColumnContent"><p title="' + results.codeInput[k].tooltip + '">' + results.codeInput[k].codeName + '</p></div>';
        }
        template += '</div>';
        for (var l = 0; l < results.operatingsystems[i].browsers.length; l++) {
            template += '<div class="testContentColumn ' + results.operatingsystems[i].osId + ' ' + results.operatingsystems[i].browsers[l].browserId + '">';
            // Close testContentColumn div
            template += '</div>';
            // Add an extra column to the counter
            tempNumberOfColumns ++;
        }
        template += '<hr/>';
        // Close testcontent
        template += '</div>';
        // Insert template into body
        $contentcontent.append($.template(template));
        // Set all contentcolumns equal to the description column
        // If a column is empty at least his height will be there and the dashed line on the right too
        $('.testContentColumn').height($('.descriptionColumn').height());
        // Check if this is the last item to be put on stage
        // If it is set its bottom corners rounded
        if (i == results.operatingsystems.length -1){
            $("div.testcontent." + results.operatingsystems[i].osId).corners("bottom 13px");
        }
        // Check if this OS has the highest number of tests on browsers
        // This means there are more columns and the width has to be wider
        if (highestNumberOfColumns < tempNumberOfColumns){
            highestNumberOfColumns = tempNumberOfColumns;
            tempNumberOfColumns = 0;
        }
    }
    // Calculate the width of the contentpage
    $(".testcontainer").width(25+136+20+(highestNumberOfColumns*110));
    // Request the results
    getResults();
};

/**
 * Create the settings table on top of the page
 * The settings are received through an Ajax call
 * @param {Object} results Results from the Ajax call
 */
var CreateSettingsTable = function(results) {
        // Loop all browsers and check if they are ticked off
        // Display all in an overview
        var testvars = '<div class=testcontainer><div class="testHeader" id="testSettings"><h1>- Test settings</h1></div><div class="testcontent" id="settingsDiv"><h2>Operating systems and browsers</h2>';
        testvars += '<ul>';
        for (var i = 0; i < results.operatingsystems.length; i++) {
            testvars += '<li class="os_test_list_item">' + results.operatingsystems[i].osName + '</li>';
            testvars += '<ul>';
            for (var j = 0; j < results.operatingsystems[i].browsers.length; j++) {
                var browser = results.operatingsystems[i].browsers[j].browserName;
                testvars += '<li class="browser_test_list_item">' + browser + '</li>';
            }
            testvars += '</ul>';
        }
        testvars += '</ul>';
        //
        // Website to check
        testvars += "<h2>Website to check</h2> <ul class=testinput><li>" + results.url + "</li></ul>";
        //
        // Description
        testvars += "<h2>Description</h2> <ul class=testinput><li>" + results.description + "</li></ul>";
        //
        // Test input
        testvars += "<h2>Test input</h2> <ol id='code_input_list'>";
        for (var l = 0; l < results.codeInput.length; l++) {
            testvars += "<li>" + results.codeInput[l].codeName + "</li>";
        }
        testvars += "</ol>";
        // Close the settingsDiv tag and then the settingsContainer tag
        testvars += "</div></div>";
        // Put everything on the screen
        $contentcontent.append($.template(testvars));
        
        // Add corners
        $testSettings = $('#testSettings');
        $settingsDiv = $('#settingsDiv');
        $testSettings.corners("top 13px");
        
        // Show hide testsettings
        $testSettings.click(function() {
        if ($settingsDiv.is(":hidden")){
            $testSettings.html("<h1>- Test settings</h1>");
        } else {
            $testSettings.html("<h1>+ Test settings</h1>");
        }
        $settingsDiv.animate({height: "toggle", opacity: "toggle"});
        });
        
        // Create the result tables
        createTable(results);
};

/**
 * {
    "testId" : "0001",
    "description" : "Testdescription",
    "url" : "http://www.physx.be/",
    "codeInput" : [
                {
                    "codeName" : "AssertTrue"
                },
                {
                    "codeName" : "TakeScreenshot"
                },
                {
                    "codeName" : "AssertTrue"
                }
            ],
    "operatingsystems" : [
        {
            "osName" : "Mac OSX",
            "osId" : "macosx",
            "browsers" : [
                {
                    "browserName" : "Firefox 3.6",
                    "browserId" : "firefox",
                    "browserPic" : "firefox.png"
                },
                {
                    "browserName" : "Safari",
                    "browserId" : "safari",
                    "browserPic" : "safari.png"
                }
            ]
        }
    ]
}
 * 
 * Get the test settings from the database
 * The above JSON file is an example of the returned datafeed
 */
var getSettings = function(){
    //Make the ajax call
    $.ajax({
        url: 'json/startedTestSettings.json',
        cache: false,
        success: function(data){
            CreateSettingsTable(data);
        },
        error: function(error){
            alert(error);
        }
    });
};

getSettings();
var id = setInterval(getResults, 3000);
