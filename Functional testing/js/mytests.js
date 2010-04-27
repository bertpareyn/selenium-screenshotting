// contentcontent: Contains all content data
var $contentcontent = $('#content_content');

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
        url: 'proxy/pollforoldtests.php',
        cache: false,
        dataType: "json",
        success: function(data){
            fillOldTestBox(data);
        },
        error: function(error){
            alert(error.responseText);
        }
    });
};
/**
 * Init function that gets all the old tests from the user in the database
 * They are represented in a combobox
 */
var init = function(){
    getOldTests();
};

init();
