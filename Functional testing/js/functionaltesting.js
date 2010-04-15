// testSettings: header, clickable for settings
$testSettings = $('#testSettings');
// settingsDiv: div containing settings data
$settingsDiv = $('#settingsDiv');
// contentcontent: Contains all content data
$contentcontent = $('#contentcontent');
// testpreview: shows what will be tested on browsers and os's
$testpreview = $('#testpreview');
// Holds an array of supported browsers on OS's
var supportedBrowsersArr = Array();

// CLICK HANDLERS
$testSettings.click(function() {
    if ($settingsDiv.is(":hidden")){
        $testSettings.html("<h1>- Test settings</h1>"); 
    } else {
        $testSettings.html("<h1>+ Test settings</h1>"); 
    }
    $settingsDiv.animate({height: "toggle", opacity: "toggle"});
});

function showHideTest(ev){
    ev.siblings().animate({height: "toggle", opacity: "toggle"});
    ev.children('.browserImagesContainer').animate({opacity: "toggle"},function(){
        var browser = ev.children('h1').html().substring(2);
        if (ev.siblings().is(":hidden")) {
            ev.children('h1').html("+ " + browser); 
        } else {
            ev.children('h1').html("- " + browser);  
        }
    });
}

var browsersChecked = new Array();
var osChecked = new Array();
var supported = false;
function displayChecked(){
            var temp = '<ul>';
            for (i in osChecked){ 
                temp += '<li>' + osChecked[i] +'<ul>';
                for (j in browsersChecked){
                    // check the supported browsers array for the right os and loop it
                    for (k in supportedBrowsersArr[i]){
                        // if the current supported browser in the os is the browser that has been checked
                        // set variable supported to true and break out of the loop
                        if (supportedBrowsersArr[i][k].browserName == browsersChecked[j]){
                            supported = true;
                        }
                    }
                    // If the OS is contained in the array of supported browsers
                    // Give it a green color, else red
                    if (supported == true){
                        temp += '<li class="supportedbrowser">' + browsersChecked[j] +'</li>';
                        supported = false;
                    } else {
                        temp += '<li class="notsupportedbrowser">' + browsersChecked[j] +'</li>';
                        supported = false;
                    }
                }
                temp += '</ul></li>';
            }
            temp += '</ul>';
            $testpreview.html(temp);
}

function showTestPreview(ev){
    // If a browser was selected add it to the browserlist
    // If a os was selected add it to the os list
    if ($(ev).parent().attr('id')==="browsers"){
        if (ev[0].checked) {
            browsersChecked[ev[0].name] = ev[0].name;
            //displaybrowsersChecked();
            displayChecked();
        } else {
            delete browsersChecked[ev[0].name];
            //displaybrowsersChecked();
            displayChecked();
        }
    } else {
        if (ev[0].checked) {
            osChecked[ev[0].name] = ev[0].name;
            displayChecked();
        } else {
            delete osChecked[ev[0].name];
            displayChecked();
        }
    }
}

// All testcontainers have the testHeader class.
$(".testHeader").live("click", function(){showHideTest($(this));});
// Add handlers to the checkboxes to choose OS and browsers
$(".browserandosinputchk").live("click", function(){showTestPreview(
    $(this));
 });

// ROUNDED CORNERS
$testSettings.corners("top 13px");

/* Create a template with JQuery Template
 * http://plugins.jquery.com/project/jquerytemplate for more information
 */

var template;
var createTable = function(results){
    // For every OS create a testContainer
    for (var i = 0; i < results.tests[0].testresults.length; i++) {
        // Add the testContainer div
        template = '<div class="testcontainer">';
        // Add a div that contains the clickable part of the header
        template += '<div class="testHeader">';
        // Add a header for this testContainer
        template += '<h1>+ ' + results.tests[0].testresults[i].os + '</h1>';
        // Add browser images on top of the list
        template += '<div class="browserImagesContainer">';
        for (var m = 0; m < results.tests[0].testresults[i].osresults.length; m++) {
            template += '<img src="images/browsers/' + results.tests[0].testresults[i].osresults[m].browserpic + '" class="browserImages" alt="' + results.tests[0].testresults[i].osresults[m].browser + '" title="' + results.tests[0].testresults[i].osresults[m].browser + '"/>';
        }
        // Close browserImagesContainer div
        template += '</div>';
        // Close the testHeader div
        template += '</div>';
        // Add testcontent
        template += '<div class=testcontent>';
        // Add the description column first
        template += '<div class="descriptionColumn">';
        for (var j = 0; j < results.tests[0].testresults[i].ostests.length; j++) {
            template += '<div class="descriptionColumnContent"><p>' + results.tests[0].testresults[i].ostests[j].description + '</p></div>';
        }
        template += '</div>';
        for (var k = 0; k < results.tests[0].testresults[i].osresults.length; k++){
            // Add testresults for this browser to the list
            template += '<div class="testContentColumn">';
            for (var l = 0; l < results.tests[0].testresults[i].ostests.length; l++){
                // Check if there is a screenshot attached and display it if there is one
                if (results.tests[0].testresults[i].osresults[k].browserresults[l].screenshot == 'null') {
                    // There is no screenshot, show OK of ERROR sign
                    if (results.tests[0].testresults[i].osresults[k].browserresults[l].success == 'true'){
                        template += '<div class="testContentColumnContent"><img src="images/testok.png" alt="Test OK" title="Test OK"></img></div>';
                    }
                    else {
                        template += '<div class="testContentColumnContent"><img src="images/testerror.png" alt="Test Error" title="Test Error"></img></div>';
                    }
                }
                else {
                    // There is a screenshot, display it
                    template += '<div class="testContentColumnContent"><img src="images/screenshots/' + results.tests[0].testresults[i].osresults[k].browserresults[l].screenshot + '"';
                    // Check if the error is OK or ERROR
                    if (results.tests[0].testresults[i].osresults[k].browserresults[l].success == 'true'){
                        template += 'alt="OK screenshot" title="OK screenshot" class="okcompareimg"></img></div>';
                    } else {
                        template += 'alt="Error in screenshot" title="Error in screenshot"class="errorcompareimg"></img></div>';
                    }
                }
            }
            // Close testContentColumn div
            template += '</div>';
        }
        template += '<hr/>';
        // Close testcontent
        template += '</div>';
        // Close the testContainer div
        template += '</div>';
        // Insert template into body
        $contentcontent.append($.template(template));
    }
};

/*
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
 */
 /*
  * Get the results from the database
  * The above JSON file is an example of the returned datafeed
  */
var getResults = function(){
    //Make the ajax call
    $.ajax({
        url: 'json/testresults.json',
        cache: false,
        success: function(data){
            createTable(data);
        },
        error: function(error){
            alert(error);
        }
    });
};

var createTestCheckboxes = function (results){
    // Get all supported browsers from the JSON file
    // Create var that contains all checkboxes
    var browsers = "<h1>Browser</h1>";
    for (var i = 0; i < results.browser.length ; i++) {
        // If the Browser is supported then create a checkbox for it
        if (results.browser[i].isSupported == 'true'){
            // Current browser
            browser = results.browser[i].browserName;
            browserId = results.browser[i].browserId;
            // Add to all browsers
            browsers = browsers + "<input type ='checkbox' id='" + browserId + "' name='" + browser + "' class='browserandosinputchk'><label for='" + browserId + "'>" + browser + "</label><br/>";
        }
    };
    $('#browsers').append($.template(browsers));
    // Get all supported browsers from the JSON file
    // Create var that contains all checkboxes
    var oss = "<h1>Operating Systems</h1>";
    for (var j = 0; j < results.os.length; j++) {
        // If the OS is supported then create a checkbox for it
        if (results.os[j].isSupported == 'true'){
            // Current os
            var os = results.os[j].osName;
            var osId = results.os[j].osId;
            var supportedBrowsers = results.os[j].supportedBrowsers;
            // Add to all OS's
            oss = oss + "<input type ='checkbox' name='" + os + "' id='" + osId + "' class='browserandosinputchk'><label for='" + osId + "'>" + os + "</label><br/>";
            // Add supported browsers to the array
            supportedBrowsersArr[os] = supportedBrowsers;
            //alert(supportedBrowsersArr["Mac OSX"][0].browserName);
        }
    };
    $('#operatingsystems').append($.template(oss));
};

var getBrowserSettings = function(){
    //Make the ajax call
    $.ajax({
        url: 'json/testvars.json',
        cache: false,
        success: function(data){
            createTestCheckboxes(data);
        },
        error: function(error){
            alert(error);
        }
    });
};
getBrowserSettings();
//getResults();
