<?php

$db = new mysqli('localhost','hh354','cycling','selenium');
if(mysqli_connect_errno()){
    echo mysqli_connect_error();
}

$query = "UPDATE Results r, OsTests ost SET isRef = " . $_GET['refbool'] . " WHERE ost.testId = " . $_GET['testid'] . " AND r.osTestId = ost.id"

if($result = $db->query($query)){
    print "ok";
} else {
    print "error";
}
?>