<?php
// https://docs.microsoft.com/en-us/sql/connect/php/sqlsrv-connect?view=sql-server-ver15
// https://www.youtube.com/watch?v=VZpzQLqm8Uw
$serverName = $_SERVER['SQL_SERVER'];

// If UID and PWD are not specified in the $connectionInfo array,
// then the connection will be attempted using Windows Authentication.
 // $connectionInfo = array("Database"=>"test");
$connectionInfo = array("Database"=>$_SERVER['DB'], "UID"=>$_SERVER['DB_USER'], "PWD"=>$_SERVER['DB_PASS']);
$conn = sqlsrv_connect($serverName, $connectionInfo);

if( $conn === false ) {
     header('HTTP/1.1 500 Could not connect to SQL Server database.');
     die( print_r( sqlsrv_errors(), true));
}

?>