/**
 * Declare some variables to be used in the document
 */
// contentcontent: Contains all content data
var $contentcontent = $('#content_content');
// settings: Settings that contain the server ip
var settings = Array();
// selectOldTestTemplate: Dropdown list and submit button to select a test and re-run it
var selectOldTestTemplate = "select_old_test_template";
// settings_table_template: Template to render the extra data for a chosen test
var settingsTableTemplate = "settings_table_template";
// referencedTestsList: Template to render the tests based on a specific test
var referencedTestsList = "referenced_tests_list";
// testDetails: Div that will hold the details for a selected test
var $testDetails = "";
// referenceListHolder: div that will hold the reference list
var $referenceListHolder = "";
// oldTestsBox: Drop down box containing old tests
var $oldTestsBox = "";

/**
 * Function replaces '/' with '' (empty string)
 * Function can only accept results with format "results.tests.description"
 * @param {Object} results Results received from Ajax call
 */
var replaceSlash = function (results){
    // Replace '\' in the description string with empty strings
    for (var i = 0; i < results.tests.length; i++) {
        results.tests[i].description = results.tests[i].description.replace('\\', '');
    };
    return results;
};

/**
 * Rendering of the tests based on a specific test
 * @param {Object} results Results containing referenced tests
 */
var createReferencedTestsList = function(results){
    
    // Replace '\' in the description string with empty strings
    results = replaceSlash(results);
    // Place template to show old tests details
    $.TemplateRenderer(referencedTestsList, results, $referenceListHolder);
    // round corners of the top description
    $(".topDescription").corners("top 7px");
};

/**
 * Search tests that are based on a specific test
 * @param {Object} testId Id of the test where referenced tests have to be looked up for
 */
var getReferencedTests = function(testId){
    //Make the ajax call
    $.ajax({
        url: settings.proxy + 'pollforreferencedtests.php',
        cache: false,
        dataType: "json",
        success: function(data){
            createReferencedTestsList(data);
        },
        error: function(error){
            alert(error.responseText);
        },
        data: {
            "testid": testId,
            "server": settings.server,
            "dbaccess": settings.dbaccess
        }
    });
};

/**
 * Render the template that shows the settings a user selected on submitting the test
 * @param {Object} results Results coming in from the Ajax call
 */
var CreateSettingsTable = function(results){
    // Replace '\' in the description string with empty strings
    results.description = results.description.replace('\\', '');
    // Place template to show old tests details
    $.TemplateRenderer(settingsTableTemplate, results, $testDetails);
    // Fill in variables
    $referenceListHolder = $("#reference_list_holder");
    // Get the list of tests that used this test as a reference
    getReferencedTests($oldTestsBox[0].value);
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
 * Get the test settings from the database
 * Above is an example of the JSON file that is returned
 * @param {Object} testId ID of the test that has to be looked for
 */
var getTestDetails = function(testId){
    $("#test_details").html('');
    //Make the ajax call
    $.ajax({
        url: settings.proxy + 'pollforsetupproxy.php',
        cache: false,
        dataType: "json",
        success: function(data){
            CreateSettingsTable(data);
        },
        error: function(error){
            alert(error.responseText);
        },
        data: {
            "testid": testId,
            "server": settings.server,
            "dbaccess": settings.dbaccess
        }
    });
};

/**
 * Fill the old tests in the combobox
 * Show the template on the page
 * @param {Object} results Contains the old tests from the user
 */
var fillOldTestBox = function(results){
    // Replace '\' in the description string with empty strings
    results = replaceSlash(results);
    // Place template to show old tests and give Ajax call results with it
    $.TemplateRenderer(selectOldTestTemplate, results, $contentcontent);
    // Render the first extra details for the selected results
    $oldTestsBox = $("#old_tests_box");
    $testDetails = $("#test_details");
    getTestDetails($oldTestsBox[0].value);
};

/**
 * Ajax call to get all the old tests of a user from the database
 */
var getOldTests = function(){
    //Make the ajax call
    $.ajax({
        url: settings.proxy + 'pollforoldtests.php',
        cache: false,
        dataType: "json",
        success: function(data){
            fillOldTestBox(data);
        },
        error: function(error){
            alert(error.responseText);
        },
        data: {
            "server": settings.server,
            "dbaccess": settings.dbaccess
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
            getOldTests();
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
    // When dropbox selection changes
    $("#old_tests_box").live("change", function(){
        getTestDetails($oldTestsBox[0].value);
    });
    // Load settings file
    loadSettings();
};

init();
