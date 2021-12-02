<?php
// Database connection stored in $conn
include("dbconnect.php");

$sql = "SELECT * FROM InnergyJobs;";
$stmt = sqlsrv_query( $conn, $sql );
if( $stmt === false) {
    die( print_r( sqlsrv_errors(), true) );
}

// sqlsrv_fetch_array() returns an array
while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC )) {
    // Convert each row to UTF8 so the json_encode() runs
    $row = array_map('utf8_encode', $row);
    // Populate row to table
    $table[] = $row;
}

sqlsrv_free_stmt($stmt);

// Return array of objects to server
echo json_encode($table);