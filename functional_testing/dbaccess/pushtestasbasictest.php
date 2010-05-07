<?php
$db = new mysqli('localhost','hh354','cycling','selenium');
if(mysqli_connect_errno()){
    echo mysqli_connect_error();
}

$query = "UPDATE Tests SET refTestId = 0 WHERE id =" . $_GET['testid'];

if($result = $db->query($query)){
    print "ok";
} else {
    print "error";
}
?>