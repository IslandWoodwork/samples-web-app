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
$sample_id = $_POST['sample']['key'];
$sample = $_POST['sample']['data'];

// Begin creating SQL query
$fields = "";
$values = "";
foreach($column_list as $column)
{
	if(isset($sample[$column])){
        // add second apostrophe to data, if there is one, for the query
        $sample[$column] = str_replace("'", "''", $sample[$column]);
		$fields .= "$column, ";
        $values .= "'$sample[$column]', ";
	}
}

// Remove last ", "
$fields = substr($fields, 0, -2);
$values = substr($values, 0, -2);

// Complete query
$sql = "INSERT INTO ".$_SERVER['TABLE_S']." (" . $fields . ") VALUES (" . $values . ")";

// Run SQL query
$stmt = sqlsrv_query( $conn, $sql );

//echo $sql;
//echo $stmt;

?>