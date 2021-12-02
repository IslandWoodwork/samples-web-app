<?php
// Database connection stored in $conn
include("dbconnect.php");

if(isset($_GET['sample_id'])){
    // Get sample ID passed from ajax
    $sample_id = $_GET['sample_id'];
    
    $sql = "DELETE FROM ".$_SERVER['TABLE_S']." WHERE ID='$sample_id'";
    $stmt = sqlsrv_query( $conn, $sql );

    if($stmt){
        echo "Sample $sample_id was deleted successfully.";
    } else{
        $msg= "Error: " . $sql . "<br>" . sqlsrv_query($conn, $sql);
        echo $msg;
    }
} else {
    echo "Could not run query. Please contact support.";
    header('HTTP/1.1 500 Innergy data not loaded');
    die();
}
?>