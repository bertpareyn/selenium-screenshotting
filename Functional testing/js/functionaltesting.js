// testSettings: header, clickable for settings
$testSettings = $('#testSettings');
// settingsDiv: div containing settings data
$settingsDiv = $('#settingsDiv');
// contentcontent: Contains all content data
$contentcontent = $('#contentcontent');

// CLICK HANDLERS
$testSettings.click(function() {
    if ($settingsDiv.is(":hidden")){
        $testSettings.html("<h1>- Test settings</h1>"); 
    } else {
        $testSettings.html("<h1>+ Test settings</h1>"); 
    }
    $settingsDiv.animate({height: "toggle", opacity: "toggle"});
});

// ROUNDED CORNERS
$testSettings.corners("top 13px");
$settingsDiv.corners("bottom 13px");

/* Create a template with JQuery Template
 * http://plugins.jquery.com/project/jquerytemplate for more information
 */
var template;
var createTable = function(results){
    // For every OS create a testContainer
    for (var i = 0; i < results.tests[0].testresults.length; i++) { //1
        // Add the testContainer div
        template = '<div class="testcontainer">';
        // Add a div that contains the clickable part of the header
        template += '<div class="testHeader">';
        // Add a header for this testContainer
        template += '<h1>+ ' + results.tests[0].testresults[i].os + '</h1>';
        // Close the testHeader div
        template += '</div>';
        // Add testcontent
        template += '<div class=testcontent>';
        // Add browser images on top of the list
        for (var j = 0; j < results.tests[0].testresults[i].osresults.length; j++){
            template += '<img src="images/browsers/' + results.tests[0].testresults[i].osresults[j].browserpic + '" class="browserImages"/>';
            // Add testresults for this browser to the list
            for (var k = 0; k < results.tests[0].testresults[i].osresults[j].tests.length; k++){
                template += '<div class="descriptionColumn">' + results.tests[0].testresults[i].osresults[j].tests[k].description + '</div>';
            }
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

getResults();
