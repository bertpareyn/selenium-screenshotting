<?php
$db = new mysqli('localhost','hh354','cycling','selenium');
if(mysqli_connect_errno()){
    echo mysqli_connect_error();
}

$query = "UPDATE Results SET isRef =" . $_GET['refbool'] . " WHERE subTestId =" . $_GET['subtestid'];

if($result = $db->query($query)){
    print "ok";
} else {
    print "error";
}
?>