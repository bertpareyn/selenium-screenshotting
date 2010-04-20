// testSettings: header, clickable for settings
$testSettings = $('#testSettings');
// settingsDiv: div containing settings data
$settingsDiv = $('#settingsDiv');
// contentcontent: Contains all content data
$contentcontent = $('#contentcontent');
// testpreview: shows what will be tested on browsers and os's
$testpreview = $('#testpreview');

// Holds an array of supported browsers on OS's
var selectedTestOSAndBrowsers = Array();

// CLICK HANDLERS
 $testSettings.click(function() {
    if ($settingsDiv.is(":hidden")){
        $testSettings.html("<h1>- Test settings</h1>"); 
    } else {
        $testSettings.html("<h1>+ Test settings</h1>"); 
    }
    $settingsDiv.animate({height: "toggle", opacity: "toggle"});
});

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

// Add handlers to the checkboxes to choose OS and browsers
$(".browserandosinputchk").live("click", function(){showTestPreview($(this));});
$(".browserImages").live("click", function(){
    selectCheckboxesForBrowser($(this));
});
$(".osdescription").live("click", function(){
    selectCheckboxesForOS($(this));
});

var createTableWithCheckboxes = function (results){
        // Add the testContainer div
        template = '<div class="testcontainer">';
        // Add a div that contains the clickable part of the header
        template += '<div class="testHeader">';
        // Add a header for this testContainer
        template += '<h1>Configure test</h1>';
        // Add browser images on top of the list
        template += '<div class="browserImagesContainer">';
        for (var m = 0; m < results.browser.length; m++) {
            if (results.browser[m].isSupported == 'true') {
                template += '<img src="images/browsers/' + results.browser[m].browserName + '.png" id="' + results.browser[m].browserId + '" alt="' + results.browser[m].browserName + '" title="' + results.browser[m].browserName + '" class="browserImages"/>';
            }
        }
        // Close browserImagesContainer div
        template += '</div>';
        // Close the testHeader div
        template += '</div>';
        // Add testcontent
        template += '<div class=testcontent>';
        // Add the description column first
        template += '<div class="descriptionColumn">';
        for (var j = 0; j < results.os.length; j++) {
            if (results.os[j].isSupported == 'true') {
                template += '<div class="descriptionColumnContent"><p class="osdescription" id="' + results.os[j].osId + '">' + results.os[j].osName + '</p></div>';
            }
        }
        template += '</div>';
        // Create variable to calculate the max width of the content page
        var NumberOfColumns = 0;
        for (var k = 0; k < results.browser.length; k++){
            if (results.browser[k].isSupported == 'true') {
                // Add testresults for this browser to the list
                template += '<div class="testContentColumn">';
                for (var l = 0; l < results.os.length; l++) {
                    if (results.os[l].isSupported == 'true') {
                        // Create checkbox
                        template += '<div class="testContentColumnContent">' + '<input type ="checkbox" id="' + results.browser[k].browserId + '" name="' + results.browser[k].browserName + '" class="' + results.browser[k].browserId + ' ' + results.os[l].osId + ' ' + ' browserandosinputchk';
                        // Check if the checkbox should be enabled
                        // If the browser is not supported on this OS then disable it
                        // if the current supported browser in the os is the browser that has been checked
                        // set variable supported to true and break out of the loop
                        var enabled = false;
                        for (m in results.os[l].supportedBrowsers) {
                            if (results.os[l].supportedBrowsers[m].browserName == results.browser[k].browserName) {
                                // Enabled
                                enabled = true;
                                break;
                            }
                        }
                        // If the browser is supported let it be enabled
                        // otherwise disable it
                        if (enabled === true) {
                            template += '"></div>';
                        }
                        else {
                            template += '"disabled></div>';
                        }
                    }
                }
                // Close testContentColumn div
                template += '</div>';
                // Add an extra column to the counter
                NumberOfColumns++;
            }
        }
        template += '<hr/>';
        // Close testcontent
        template += '</div>';
        // Close the testContainer div
        template += '</div>';
        // Insert template into body
        $testpreview.append($.template(template));
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
        $(".testcontainer").width(186+NumberOfColumns*(60));
};

var getBrowserSettings = function(){
    //Make the ajax call
    $.ajax({
        url: 'json/testvars.json',
        cache: false,
        success: function(data){
            createTableWithCheckboxes(data);
        },
        error: function(error){
            alert(error);
        }
    });
};
getBrowserSettings();
