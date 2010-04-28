<?php
header('Content-Type:application/json');

$db = new mysqli('localhost','hh354','cycling','selenium');
if(mysqli_connect_errno()){
    echo mysqli_connect_error();
}

$query = "SELECT * FROM Tests";
if($result = $db->query($query)){
    while ($row = $result->fetch_object()) {
        $oldtest["testId"] = $row->id;
        $oldtest["description"] = $row->description;
        $oldtest["code"] = $row->code;
        $oldtest["url"] = $row->url;
        $oldtest["subTests"] = $row->subTests;
        $oldtest["refTestId"] = $row->refTestId;

        $oldtests[] = $oldtest;
    }
}
$alloldtests["tests"] = $oldtests;
print json_encode($alloldtests);
?>