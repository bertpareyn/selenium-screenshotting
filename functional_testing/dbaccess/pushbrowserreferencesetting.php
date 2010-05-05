<?php

$db = new mysqli('localhost','hh354','cycling','selenium');
if(mysqli_connect_errno()){
    echo mysqli_connect_error();
}

$updateResultsqry = "UPDATE Results r, OsTests ost SET isRef = " . $_GET['refbool'] . " WHERE ost.testId = " . $_GET['testid'] . " AND r.osTestId = ost.id AND ost.browserId = '" . $_GET['browser'] . "' AND ost.osId = '" . $_GET['os'] . "'";

if($result = $db->query($updateResultsqry)){
    print $updateResultsqry;//"1. ok | ";
    
    
	$upateOstestqry = "UPDATE OsTests ost SET allRef = " . $_GET['refbool'] . " WHERE ost.testId = " . $_GET['testid'] . " AND ost.osId = '" . $_GET['os'] . "' AND ost.browserId = '" . $_GET['browser'] . "'";
	
	if($result = $db->query($upateOstestqry)){
	    print "2. ok";
	} else {
	    print "2. error";
	}
    
    
    
} else {
    print "1. error";
}
?>