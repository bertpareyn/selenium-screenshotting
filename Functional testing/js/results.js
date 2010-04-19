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
 * Show the testresults or not
 * @param {Object} ev event that's fired on click of the header
 */ 
var showHideTest = function(ev){
    ev.siblings().animate({height: "toggle", opacity: "toggle"});
    ev.children('.browserImagesContainer').animate({opacity: "toggle"},function(){
        var browser = ev.children('h1').html().substring(2);
        if (ev.siblings().is(":hidden")) {
            ev.children('h1').html("+ " + browser);
        } else {
            ev.children('h1').html("- " + browser);
        }
    });
};

/**
 * Triggers the click event on the link to show the fancybox
 * @param {Object} ev Clickevent
 */
var showBrowserReport = function (ev){
    var template = '<h1>test text</h1>';
    $fancyBoxContent.html(template);
    $("#hidden_clicker").trigger("click");
};

/**
 * 
 */
$("#hidden_clicker").fancybox({
    'titlePosition':'inside',
    'transitionIn':'none',
    'transitionOut':'none'
});

/**
 * All testcontainers have the testHeader class.
 */
//$(".testHeader").live("click", function(){showHideTest($(this));});
$(".browserImages").live("click", function(){showBrowserReport($(this));});

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
        //testvars = testvars + "</ul>";
        //
        // Loop all OS's and check if they are ticked off
        testvars += "<h2>Operating systems</h2>";
        testvars += "<ul class=testinput>";
        for (var i = 0; i < results.operatingsystems.length; i++) {
            os = results.operatingsystems[i].osName;
            testvars += "<li>" + os + "</li>";
        }
        testvars += "</ul>";
        //
        // Website to check
        testvars += "<h2>Website to check</h2> <ul class=testinput><li>" + results.url + "</li></ul>";
        //
        // Description
        testvars += "<h2>Description</h2> <ul class=testinput><li>" + results.description + "</li></ul>";
        //
        // Test input
        testvars += "<h2>Test input</h2> <ol id='code_input_list'>";
        for (var i = 0; i < results.codeInput.length; i++) {
            testvars += "<li>" + results.codeInput[i].codeName + "</li>";
        }
        testvars += "</ol>";
        // Close the settingsDiv tag and then the settingsContainer tag
        testvars += "</div></div>";
        // Put everything on the screen
        $contentcontent.append($.template(testvars));
        
        // ADD CORNERS
        $testSettings = $('#testSettings');
        $settingsDiv = $('#settingsDiv');
        $testSettings.corners("top 13px");
        $testSettings.click(function() {
        if ($settingsDiv.is(":hidden")){
            $testSettings.html("<h1>- Test settings</h1>");
        } else {
            $testSettings.html("<h1>+ Test settings</h1>");
        }
        $settingsDiv.animate({height: "toggle", opacity: "toggle"});
        });
        
        // CREATE THE RESULTS TABLES
        createTable(results);
};
/**
 * Create the table in which the data goes in
 * http://plugins.jquery.com/project/jquerytemplate for more information
 * @param {Object} results Results from the Ajax call containing information the user inputted on the page
 */
var createTable = function(results){
    for (var i = 0; i < results.operatingsystems.length; i++){
        // Add the testContainer div
        template = '<div class="testcontainer">';
        // Add a div that contains the clickable part of the header
        template += '<div class="testHeader">';
        // Add a header for this testContainer
        template += '<h1>- ' + results.operatingsystems[i].osName + '</h1>';
        // Add browser images on top of the list
        template += '<div class="browserImagesContainer">';
        for (var j = 0; j < results.operatingsystems[i].browsers.length; j++) {
            template += '<img src="images/browsers/' + results.operatingsystems[i].browsers[j].browserPic + '" class="browserImages" alt="' + results.operatingsystems[i].browsers[j].browserName + '" title="' + results.operatingsystems[i].browsers[j].browserName + '"/>';
        }
        // Close browserImagesContainer div
        template += '</div>';
        // Close the testContainer div
        template += '</div>';
        // Add testcontent
        template += '<div class=testcontent>';
        // Add the description column first
        template += '<div class="descriptionColumn">';
        for (var k = 0; k < results.codeInput.length; k++) {
            template += '<div class="descriptionColumnContent"><p>' + results.codeInput[k].codeName + '</p></div>';
        }
        template += '</div>';
        for (var l = 0; l < results.operatingsystems[i].browsers.length; l++) {
            template += '<div class="testContentColumn ' + results.operatingsystems[i].osId + ' ' + results.operatingsystems[i].browsers[l].browserId + '">';
            //for (var m = 0; m < results.codeInput.length; m++) {
                // Add testresults for this browser to the list
                //template += '<div class="testContentColumnContent ' + results.operatingsystems[i].osId + ' ' + results.operatingsystems[i].browsers[l].browserId + '"></div>';
            //}
            // Close testContentColumn div
            template += '</div>';
        }
        template += '<hr/>';
        // Close testcontent
        template += '</div>';
        // Insert template into body
        $contentcontent.append($.template(template));
        // Set all contentcolumns equal to the description column
        // If a column is empty at least his height will be there and the dashed line on the right too
        $('.testContentColumn').height($('.descriptionColumn').height());
    }
    // Request the results
    getResults();
};

/**
 * Fills the table with results coming from the database
 * @param {Object} results Results from the Ajax call that contain results from the test
 */
var fillTableWithResults = function(results) {
    // Loop through all tests
    for (var i = 0; i < results.tests[0].testresults.length; i++) { //2
        // Loop through all results (eg. firefox and safari)
        for (var j = 0; j < results.tests[0].testresults[i].osresults.length; j++) {
            // put all results for a specific os and browser in an array
            var browserItems = $resultContainer.find('div.' + results.tests[0].testresults[i].osId + '.' + results.tests[0].testresults[i].osresults[j].browserId);
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
                            template += 'alt="OK screenshot" title="screenshot OK" class="okcompareimg"></img>';
                        } else {
                            template += 'alt="Error in screenshot" title="Screenshot error"class="errorcompareimg"></img>';
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
