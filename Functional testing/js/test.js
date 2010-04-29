/**
 * Declare some variables to be used in the document
 */
// testSettings: header, clickable for settings
$testSettings = $('#testSettings');
// settingsDiv: div containing settings data
$settingsDiv = $('#settingsDiv');
// contentcontent: Contains all content data
$contentcontent = $('#content_content');
// testpreview: shows what will be tested on browsers and os's
$testpreview = $('#test_preview');
// settings: Settings that contain the server ip
settings = Array();
// Holds an array of supported browsers on OS's
var selectedTestOSAndBrowsers = Array();

/**
 * Click the header of the settings div
 */ 
 $testSettings.click(function() {
    if ($settingsDiv.is(":hidden")){
        $testSettings.html("<h1>- Test settings</h1>"); 
    } else {
        $testSettings.html("<h1>+ Test settings</h1>"); 
    }
    $settingsDiv.animate({height: "toggle", opacity: "toggle"});
});

/**
 * Check or uncheck boxes in the array of boxes on the screen
 */
var browsersChecked = new Array();
var osChecked = new Array();
var supported = false;
function selectCheckboxesForBrowser(ev){
    var clickedBrowser = ev[0].id;
    $testpreview.find("input").each(function(){
        if ($(this)[0].id == clickedBrowser){
            if ($(this)[0].disabled === false){
                if ($(this)[0].toggleBrowserCheck == "off"){
                    $(this)[0].checked = true;
                    $(this)[0].toggleBrowserCheck = "on";
                } else {
                    $(this)[0].checked = false;
                    $(this)[0].toggleBrowserCheck = "off";
                }
            }
        }
    });
}

/**
 * If an operating system row is clicked
 * check or uncheck the boxes that are enabled
 * @param {Object} ev event fired (os row)
 */
function selectCheckboxesForOS(ev){
    var clickedOS = ev[0].id;
    $testpreview.find("input").each(function(){
        if ($(this).attr('class').split(' ')[1] == clickedOS){
            if ($(this)[0].disabled === false){
                if ($(this)[0].toggleOSCheck == "off"){
                    $(this)[0].checked = true;
                    $(this)[0].toggleOSCheck = "on";
                } else {
                    $(this)[0].checked = false;
                    $(this)[0].toggleOSCheck = "off";
                }
            }
        }
    });
}

/**
 * Add handlers to the checkboxes to choose OS and browsers
 */
$(".browser_images").live("click", function(){
    selectCheckboxesForBrowser($(this));
});

$(".os_description").live("click", function(){
    selectCheckboxesForOS($(this));
});

/**
 * Create the table that will hold the checkboxes
 * These checkboxes are enabled or disabled (according to support)
 * @param {Object} results Results from the Ajax call with information about supported OS's and browsers
 */
var createTableWithCheckboxes = function (results){
    $.TemplateRenderer("table_with_checkboxes_template", results, $testpreview);
    // Create variable to calculate the max width of the content page
    var NumberOfColumns = 0;
    // Check which browsers have to be disabled
    // Loop to see how many columns there are
    for (var k = 0; k < results.browser.length; k++){
        if (results.browser[k].isSupported == 'true') {
            // Add testresults for this browser to the list
            for (var l = 0; l < results.os.length; l++) {
                if (results.os[l].isSupported == 'true') {
                    for (m in results.os[l].supportedBrowsers) {
                        if (results.os[l].supportedBrowsers[m].browserId == results.browser[k].browserId) {
                            var $chk = $("." + results.browser[k].browserId + "." + results.os[l].osId + ".browserandosinputchk");
                            $chk[0].disabled = false;
                        }
                    }
                }
            }
            // Add an extra column to the counter
            NumberOfColumns++;
        }
    }

    // Create a toggleCheck property to tick the checkbox on and off with the Browser button on top
    $testpreview.find("input").each(function(){
        if (typeof($(this).toggleBrowserCheck) === 'undefined'){
            $(this.toggleBrowserCheck="off");
        }
    });
    
    // Create a toggleCheck property to tick the checkbox on and off with the OS button on the left
    $testpreview.find("input").each(function(){
        if (typeof($(this).toggleOSCheck) === 'undefined'){
            $(this.toggleOSCheck="off");
        }
    });
        
    // Calculate the width of the contentpage
    $(".test_container").width(50+$(".description_column").width()+NumberOfColumns*(60));
    $(".browser_images_container").css("left", $(".description_column").width()+5);
};

/**
 * {
    "browser": [
        {
            "browserId": "opera",
            "browserName": "Opera 4",
            "browserpic": "opera-icon.png",
            "isSupported": "false"
        },
        {
            "browserId": "googlechrome",
            "browserName": "Google Chrome 3",
            "browserpic": "chrome-icon.png",
            "isSupported": "true"
        },
        {
            "browserId": "safari",
            "browserName": "Safari 4",
            "browserpic": "safari-icon.png",
            "isSupported": "true"
        },
        {
            "browserId": "iexplore8",
            "browserName": "Internet Explorer 8",
            "browserpic": "ie8-icon.png",
            "isSupported": "true"
        },
        {
            "browserId": "iexplore7",
            "browserName": "Internet Explorer 7",
            "browserpic": "ie7-icon.png",
            "isSupported": "true"
        },
        {
            "browserId": "iexplore6",
            "browserName": "Internet Explorer 6",
            "browserpic": "ie6-icon.png",
            "isSupported": "true"
        },
        {
            "browserId": "firefox",
            "browserName": "Mozilla Firefox 3.5",
            "browserpic": "firefox-icon.png",
            "isSupported": "true"
        }
    ],
    "os": [
        {
            "osId": "macosx",
            "osName": "MAC OSX 10.6",
            "isSupported": "true",
            "supportedBrowsers": [
                
            ]
        },
        {
            "osId": "Linux",
            "osName": "Linux 10",
            "isSupported": "true",
            "supportedBrowsers": [
                {
                    "browserId": "firefox"
                }
            ]
        },
        {
            "osId": "Windows7",
            "osName": "Microsoft Windows 7",
            "isSupported": "true",
            "supportedBrowsers": [
                {
                    "browserId": "firefox"
                },
                {
                    "browserId": "googlechrome"
                },
                {
                    "browserId": "opera"
                },
                {
                    "browserId": "safari"
                },
                {
                    "browserId": "iexplore8"
                },
                {
                    "browserId": "iexplore7"
                },
                {
                    "browserId": "iexplore6"
                }
            ]
        },
        {
            "osId": "WindowsVista",
            "osName": "Microsoft Windows Vista",
            "isSupported": "false",
            "supportedBrowsers": [ 
            ]
        }
    ]
}
 */
/**
 * Get the settings that the user put in the database for a test
 * Above is an example of the JSON file that is returned
 */
var getBrowserSettings = function(){
    //Make the ajax call
    $.ajax({
        //url: 'json/testvars.php',
        url: settings["proxy"] + 'pollforsupportedproxy.php',
        cache: false,
        dataType: "json",
        success: function(data){
            createTableWithCheckboxes(data);
        },
        error: function(error){
            alert(error);
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
            getBrowserSettings();
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
