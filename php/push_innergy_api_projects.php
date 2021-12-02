<?php
/// -- Look into this for error reporting as a substitute to php errors -- ///
// https://www.php.net/manual/en/function.mysqli-report.php

include("dbconnect.php"); // $conn

// Unknown: Input variables exceeded 1000. To increase the limit change max_input_vars in php.ini ///
// Converting JSON to string before passing to this file to be decoded back to JSON fixes this issue
$projects = json_decode($_POST['jobs'], true);

/// -- Inserting test data -- ///
$sql = "INSERT INTO InnergyProjects (ProjNumber, ProjName, ExternalId, CustName, Address1, Address2, City, State, ZipCode, Country, Status, ProjectManagerName)
        VALUES ('P-21-Testing', 'Test Project', 'TEST12345', 'Testing''s records, Inc.', '31 Howard Place', '', 'Ronkonkoma', 'New York', '11757', 'United States of America', 'Approved', 'Andrew Gottilla')";

// Handle exceptions/errors for test INSERT
if (sqlsrv_query($conn, $sql) === false){
    // Throw errors back
    if( ($errors = sqlsrv_errors() ) != null) {
        header('HTTP/1.1 500 Could not insert a test record to Innergy Projects table.');
        foreach( $errors as $error ) {
            echo "SQLSTMT: ".$sql."\n";
            echo "SQLSTATE: ".$error['SQLSTATE']."\n";
            echo "code: ".$error['code']."\n";
            echo "message: ".$error['message']."\n";
        }
        die();
    }
} else {
    echo "Test INSERT Innergy Projects successful.\n\n";
}

/// -- Clearing InnergyProjects table data -- ///
echo "Clearing data from Innergy Projects table ...\n";

$sql = "DELETE FROM InnergyProjects";

// Handle exceptions/errors for DELETE
if (sqlsrv_query($conn, $sql) === false){
    // Throw errors back
    if( ($errors = sqlsrv_errors() ) != null) {
        header('HTTP/1.1 500 Could not delete Innergy Projects data.');
        foreach( $errors as $error ) {
            echo "SQLSTMT: ".$sql."\n";
            echo "SQLSTATE: ".$error['SQLSTATE']."\n";
            echo "code: ".$error['code']."\n";
            echo "message: ".$error['message']."\n";
        }
        die();
    }
} else {
    echo "All data inside Innergy Projects table successfully deleted.\n\n";
}

/// -- Insert Innergy API data into InnergyProjects table -- ///
echo "Inserting Innergy Projects API data to Innergy Projects table ...\n";

$sql = "INSERT INTO InnergyProjects (ProjNumber, ProjName, ExternalId, CustName, Address1, Address2, City, State, ZipCode, Country, Status, ProjectManagerName) VALUES (";

foreach ($projects as $project) {
    // add second apostrophe to data, if there is one, for the query 
    $project['Name'] = str_replace("'", "''", $project['Name']);
    $address = $project['Address'];

    // Data-validation
    // Parse ZipCode to an integer (because somebody thinks 'NY' is a Zip Code)
    $address['ZipCode'] = (int)$address['ZipCode'];

    // Build values for query
    $values = "'".$project['Number']."', '".$project['Name']."', '".$project['ExternalId']."',"
        ."'".$project['Customer']['Name']."', '".$address['Address1']."', '".$address['Address2']."',"
        ."'".$address['City']."', '".$address['State']."', '".$address['ZipCode']."', '".$address['Country']."',"
        ."'".$project['Status']."', '".$project['ProjectManager']['FullName']."')";

    /// Handle exceptions/errors for INSERT
    if (sqlsrv_query($conn, $sql.$values) === false){
        // Throw errors back
        if( ($errors = sqlsrv_errors() ) != null) {
            header('HTTP/1.1 500 Could not insert all Innergy Projects API data.');
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
echo "Innergy Projects API data successfully inserted into Innergy Projects table.\n\n";

unset($conn)

?>