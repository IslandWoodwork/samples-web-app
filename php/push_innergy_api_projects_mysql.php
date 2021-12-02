<?php

/// -- CHECK INTO THIS FOR PREPARE-EXECUTE -- ///
// https://www.php.net/manual/en/mysqli.quickstart.prepared-statements.php


include("dbconnect_mysql.php"); // $db

// Unknown: Input variables exceeded 1000. To increase the limit change max_input_vars in php.ini ///
// Converting JSON to string before passing to this file to be decoded back to JSON fixes this issue
$projects = json_decode($_POST['projects'], true);

/// Inserting test data ///
$sql = "INSERT INTO InnergyProjects (`Number`, `ProjName`, `ExternalId`, `CustName`, `Address1`, `Address2`, `City`, `State`, `ZipCode`, `Country`, `Status`, `ProjectManagerName`) VALUES ('P-21-Testing', 'Test Project', 'TEST12345', 'Testing\'s records, Inc.', '31 Howard Place', '', 'Ronkonkoma', 'New York', '11757', 'United States of America', 'Approved', 'Andrew Gottilla')";

// try-catch to handle exceptions/errors for INSERT
try {
    // Test if the query ran successfully
    if ($db->query($sql) === TRUE) {
        echo "Test INSERT successful.\n\n";
    }
} catch (Exception $e) {
    // Throw errors back
    header('HTTP/1.1 500 Could not insert a test record to Innergy table.');
    echo $sql . "\n" . $db->error;
    die();
}

echo "Clearing data from Innergy table ...\n";

/// Clearing InnergyProjects table data ///
$sql = "DELETE FROM InnergyProjects";

// try-catch to handle exceptions/errors for DELETE
try {
    // Test if the query ran successfully
    if ($db->query($sql) === TRUE) {
        echo "All data inside Innergy table successfully deleted.\n\n";
    }
} catch (Exception $e) {
    header('HTTP/1.1 500 Could not delete Innergy table data.');
    echo $sql . "\n" . $db->error;
    die();
}

echo "Inserting Innergy API data to Innergy table ...\n";

/// Insert Innergy API data into InnergyProjects table ///
$sql = "INSERT INTO `InnergyProjects` (`Number`, `ProjName`, `ExternalId`, `CustName`, `Address1`, `Address2`, `City`, `State`, `ZipCode`, `Country`, `Status`, `ProjectManagerName`) VALUES (";

foreach ($projects as $project) {
    // add second apostrophe to data, if there is one, for the query 
    $project['Name'] = str_replace("'", "''", $project['Name']);
    $address = $project['Address'];

    // Build values for query
    $values = "'".$project['Number']."', '".$project['Name']."', '".$project['ExternalId']."',"
        ."'".$project['Customer']['Name']."', '".$address['Address1']."', '".$address['Address2']."',"
        ."'".$address['City']."', '".$address['State']."', '".$address['ZipCode']."', '".$address['Country']."',"
        ."'".$project['Status']."', '".$project['ProjectManager']['FullName']."')";
    
    // try-catch to handle exceptions/errors for INSERT
    try {
        $db->query($sql.$values);
    } catch (Exception $e) {
        header('HTTP/1.1 500 Could not insert all Innergy API data.');
        echo $sql . "\n" . $db->error;
        die();
    }
}

echo "Innergy API data successfully inserted into Innergy table.\n\n";

$db->close();
?>