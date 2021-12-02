/// - Page content - ///
$("#content").html("<h1>Press F12 on your keyboard to view the console!<h1>");

/// - Grab the projects data from Innergy then push to database - ///
$.ajax({
    beforeSend: function() {
        console.log("Loading projects data from Innergy ...\n");
    },
    type: "GET",
    dataType: "json",
    url: 'php/get_innergy_api_projects.php',
    success: function(innergy_data) {
        console.log("Successfully grabbed projects data from Innergy!\n");
        console.log("Innergy Data:\n");//+JSON.stringify(innergy_data));
        console.log(innergy_data);
        // Begin inserting Innergy data to database
        pushInnergyData(innergy_data, "push_innergy_api_projects");
    },
    error: function(error_data) {
        console.log("Error loading Innergy projects data.\n");
        console.log("ERROR LOG:\n"+error_data.responseText+"\n");
        alert('An error has occured. Contact IT and do not close this window.');
    },
    complete: {}
});

/// - Grab the opportunities data from Innergy then push to database - ///
$.ajax({
    beforeSend: function() {
        console.log("Loading opportunities data from Innergy ...\n");
    },
    type: "GET",
    dataType: "json",
    url: 'php/get_innergy_api_opportunities.php',
    success: function(innergy_data) {
        console.log("Successfully grabbed opportunities data from Innergy!\n");
        console.log("Innergy Data:\n");//+JSON.stringify(innergy_data));
        console.log(innergy_data);
        // Begin inserting Innergy data to database
        pushInnergyData(innergy_data, "push_innergy_api_opportunities");
    },
    error: function(error_data) {
        console.log("Error loading Innergy opportunities data.\n");
        console.log("ERROR LOG:\n"+error_data.responseText+"\n");
        alert('An error has occured. Contact IT and do not close this window.');
    },
    complete: {}
});

/// - Function to push data to database - ///
function pushInnergyData(innergy_data, php_file) {
    // Insert Innergy data to table
    $.ajax({
        async: false,
        beforeSend: function() {
            console.log("Clearing Innergy table and inserting api data ...\n");
        },
        type: "POST",
        url: "php/" + php_file + ".php",
        /// Unknown: Input variables exceeded 1000. To increase the limit change max_input_vars in php.ini ///
        data: {jobs:JSON.stringify(innergy_data['Items'])},
        success: function(data) {
            console.log(data);
            console.log("Innergy data insertion successful!");
        },
        error: function(error_data) {
            console.log("Error inserting Innergy data.\n");
            console.log("ERROR LOG:\n"+error_data.responseText+"\n");
            alert('An error has occured. Contact IT and do not close this window.');
        },
        complete: function() {
            //console.log("Feel free to scroll up and view some of that sweet delicious data!!\n- Andrew");
        }
    });
}