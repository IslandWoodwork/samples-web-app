<?php
// Database connection stored in $conn
include("dbconnect.php");

$sql = "SELECT * FROM ".$_SERVER['TABLE_S'].";";
$stmt = sqlsrv_query( $conn, $sql );
if( $stmt === false) {
    die( print_r( sqlsrv_errors(), true) );
}

// sqlsrv_fetch_array() returns an array
while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC )) {
    // Format the DateTime data
    if ($row['RequestDate'] != null)
        $row['RequestDate'] = $row['RequestDate']->format('Y-m-d');
    if ($row['ApprovedDate'] != null)
        $row['ApprovedDate'] = $row['ApprovedDate']->format('Y-m-d');
    if ($row['DueDate'] != null)
        $row['DueDate'] = $row['DueDate']->format('Y-m-d');
    if ($row['FranksDate'] != null)
        $row['FranksDate'] = $row['FranksDate']->format('Y-m-d');
    if ($row['SentDate'] != null)
        $row['SentDate'] = $row['SentDate']->format('Y-m-d');

    // Convert each row to UTF8 so the json_encode() runs
    $row = array_map('utf8_encode', $row);
    // Populate row to table
    $table[] = $row;
}

sqlsrv_free_stmt($stmt);

// Return array of objects to server
echo json_encode($table);

/*
https://stackoverflow.com/questions/20694317/json-encode-function-special-characters/20694425
https://www.php.net/manual/en/function.utf8-encode.php
*/
?>