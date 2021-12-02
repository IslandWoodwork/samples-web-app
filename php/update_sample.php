<?php
// Database connection stored in $conn
include("dbconnect.php");

// Column list
$column_list = [
    'ID', 'RequestDate', 'ApprovedDate', 'SampleType', 'PMStatus', 
    'RequestedBy', 'JobNumber', 'JobName', 'GeneralContractor', 'Architect',
    'Client', 'SentToName', 'SentToAddr', 'SentToPhone', 'ControlSampleStatus',
    'QuantityRequested', 'Cut', 'Figure', 'Veneers', 'Finish', 'Sheen', 'Color',
    'DesignationIAW', 'DesignationArchitect', 'Match', 'Fsc', 'FlitchNo',
    'QuantitySF', 'DueDate', 'TransmittalNotes', 'IntercompanyNotes', 'ShopStatus',
    'AWISystemNo', 'Hardwood', 'FireResistance', 'ChemicalResistance', 'Filler',
    'Nauf', 'RejectionReason', 'DeliveryMethod', 'IncludeOnShopList',
    'PrintLabelCount', 'StorageLocation', 'FranksDate', 'PurposeOfSample',
    'RequestedName', 'ControlSample', 'MatInStock', 'Vendor', 'Remarks', 'SentDate'
];
$id = $_POST['sample']['key'];
$changes = $_POST['sample']['data'];

// Begin creating SQL query
$sql = "UPDATE ".$_SERVER['TABLE_S']." SET ";
foreach($column_list as $column)
{
	if(isset($changes[$column])){
        // add second apostrophe to data, if there is one, for the query
        $changes[$column] = str_replace("'", "''", $changes[$column]);
		$sql .= "$column='$changes[$column]', ";
	}
}

// Remove last ", "
$sql = substr($sql, 0, -2);

// Complete query
$sql .= " WHERE ID='$id';";

// Run SQL query
$stmt = sqlsrv_query( $conn, $sql );

echo "Returned to success";
echo $stmt;

// TODO: DATA-VALIDATION ? //

?>