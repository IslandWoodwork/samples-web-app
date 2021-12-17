<?php
/// -- Look into this for error reporting as a substitute to php errors -- ///
// https://www.php.net/manual/en/function.mysqli-report.php

include("dbconnect.php"); // $conn

// Unknown: Input variables exceeded 1000. To increase the limit change max_input_vars in php.ini ///
// Converting JSON to string before passing to this file to be decoded back to JSON fixes this issue
$opportunities = json_decode($_POST['jobs'], true);

/// -- Inserting test data -- ///
$sql = "INSERT INTO ".$_SERVER['TABLE_IO']." (OppNumber, OppName, Address1, Address2, City, State, ZipCode, Country, Status, ProjNumber, ProjName)
        VALUES ('O-21-Testing', 'Test Opportunity', '31 Howard Place', '', 'Ronkonkoma', 'New York', '11757', 'United States of America', 'Approved', 'P-21-testing', 'Test Project')";

// Handle exceptions/errors for test INSERT
if (sqlsrv_query($conn, $sql) === false){
    // Throw errors back
    if( ($errors = sqlsrv_errors() ) != null) {
        header('HTTP/1.1 500 Could not insert a test record to Innergy Opportunities table.');
        foreach( $errors as $error ) {
            echo "SQLSTMT: ".$sql."\n";
            echo "SQLSTATE: ".$error['SQLSTATE']."\n";
            echo "code: ".$error['code']."\n";
            echo "message: ".$error['message']."\n";
        }
        die();
    }
} else {
    echo "Test INSERT Innergy Opportunities successful.\n\n";
}

/// -- Clearing Innergy Opportunities table data -- ///
echo "Clearing data from Innergy Opportunities table ...\n";

$sql = "DELETE FROM ".$_SERVER['TABLE_IO']."";

// Handle exceptions/errors for DELETE
if (sqlsrv_query($conn, $sql) === false){
    // Throw errors back
    if( ($errors = sqlsrv_errors() ) != null) {
        header('HTTP/1.1 500 Could not delete Innergy Opportunities data.');
        foreach( $errors as $error ) {
            echo "SQLSTMT: ".$sql."\n";
            echo "SQLSTATE: ".$error['SQLSTATE']."\n";
            echo "code: ".$error['code']."\n";
            echo "message: ".$error['message']."\n";
        }
        die();
    }
} else {
    echo "All data inside Innergy Opportunities table successfully deleted.\n\n";
}

/// -- Insert Innergy API data into Innergy Opportunities table -- ///
echo "Inserting Innergy Opportunities API data to Innergy Opportunities table ...\n";

$sql = "INSERT INTO ".$_SERVER['TABLE_IO']." (OppNumber, OppName, Address1, Address2, City, State, ZipCode, Country, Status, ProjNumber, ProjName) VALUES (";

foreach ($opportunities as $opportunity) {
    $address = $opportunity['Address'];
    // Adjust data for query
    // add second apostrophe to data, if there is one, for the query 
    $opportunity['Name'] = str_replace("'", "''", $opportunity['Name']);
    // Parse ZipCode to an integer (because somebody thinks 'NY' is a Zip Code)
    $address['ZipCode'] = (int)$address['ZipCode'];
    // Check if Project is null
    if (is_null($opportunity['Project'])){
        $opportunity['Project']['Number'] = "";
        $opportunity['Project']['Name'] = "";
    } else {
        $opportunity['Project']['Name'] = str_replace("'", "''", $opportunity['Project']['Name']);
    }

    // Build values for query
    $values = "'".$opportunity['Number']."', '".$opportunity['Name']."', "
        ."'".$address['Address1']."', '".$address['Address2']."',"
        ."'".$address['City']."', '".$address['State']."', '".$address['ZipCode']."', '".$address['Country']."', "
        ."'".$opportunity['Status']."', "
        ."'".$opportunity['Project']['Number']."', '".$opportunity['Project']['Name']."')";

    /// Handle exceptions/errors for INSERT
    if (sqlsrv_query($conn, $sql.$values) === false){
        // Throw errors back
        if( ($errors = sqlsrv_errors() ) != null) {
            header('HTTP/1.1 500 Could not insert all Innergy Opportunities API data.');
            foreach( $errors as $error ) {
                echo "SQLSTMT: ".$sql.$values."\n";
                echo "SQLSTATE: ".$error['SQLSTATE']."\n";
                echo "code: ".$error['code']."\n";
                echo "message: ".$error['message']."\n";
            }
            die();
        }
    }
}

/// - Success message if not died - ///
echo "Innergy Opportunities API data successfully inserted into Innergy Opportunities table.\n\n";

unset($conn)

?>