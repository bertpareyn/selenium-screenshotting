<?php
header('Content-Type:application/json');


$db = new mysqli('localhost','hh354','cycling','selenium');
if(mysqli_connect_errno()){
    echo mysqli_connect_error();
}

$query = "SELECT t.id, t.description, t.runat, ost.success, ost.fail FROM Tests t, OSTests ost WHERE t.refTestId = " . $_GET['testid'] . " AND ost.testId = t.id ORDER BY t.id ASC";
if($result = $db->query($query)){
    while ($row = $result->fetch_object()) {
        $reftest = array();
        $reftest["testId"] = $row->id;
        $reftest["description"] = $row->description;
        $reftest["runat"] = $row->runat;
        $reftest["success"] = $row->success;
        $reftest["fail"] = $row->fail;
        
        $reftests[] = $reftest;
    }
}

$currentId = -1;
$successes = 0;
$fails = 0;
$results = array();

foreach($reftests as $row){
    if ($currentId == '-1'){
        $currentId = $row["testId"];
    }
    if($currentId == $row["testId"]){
        $fails = $fails + $row["fail"];
        $successes = $successes + $row["success"];
    }else {
        $result = array();
        $result["testId"] = $currentId;
        $result["description"] = $row["description"];
        $result["runat"] = $row["runat"];
        $result["fail"] = $fails;
        $result["success"] = $successes;
        $results[] = $result;
        
        $fails = $row["fail"];
        $successes = $row["success"];
        $currentId = $row["testId"];
    }
}
        $result = array();
        $result["testId"] = $currentId;
        $result["description"] = $row["description"];
        $result["runat"] = $row["runat"];
        $result["fail"] = $fails;
        $result["success"] = $successes;
        $results[] = $result;
        
        $fails = $row["fail"];
        $successes = $row["success"];
        $currentId = $row["testId"]; 

$allreftests["tests"] = $results;
print json_encode($allreftests);
?>