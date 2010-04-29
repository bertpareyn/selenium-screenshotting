/**
 * Declare some variables to be used in the document
 */
// contentcontent: Contains all content data
var $contentcontent = $('#content_content');
// settings: Settings that contain the server ip
settings = Array();

/**
 * Fill the old tests in the combobox
 * Show the template on the page
  * @param {Object} results Contains the old tests from the user
 */
var fillOldTestBox = function(results){
    // Place template to show old tests and give Ajax call results with it
    $.TemplateRenderer("select_old_test_template", results, $contentcontent);
};

/**
 * Ajax call to get all the old tests of a user from the database
 */
var getOldTests = function(){
    //Make the ajax call
    $.ajax({
        url: settings["proxy"] + 'pollforoldtests.php',
        cache: false,
        dataType: "json",
        success: function(data){
            fillOldTestBox(data);
        },
        error: function(error){
            alert(error.responseText);
        },
        data : {
            "server" : settings["server"],
            "dbaccess" : settings["dbaccess"]
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
            settings["server"] = data.server;
            settings["proxy"] = data.proxy;
            settings["dbaccess"] = data.dbaccess;
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
    loadSettings(); 
};

init();
