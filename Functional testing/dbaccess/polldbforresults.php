<?php

header('Content-Type:application/json');

$db = new mysqli('localhost','hh354','cycling','selenium');
if(mysqli_connect_errno()){
    echo mysqli_connect_error();
}


$query = "SELECT os.Id, os.testId, os.osId, os.browserId FROM OSTests os WHERE os.testId =" . 1;
if($result = $db->query($query)){
    while ($row = $result->fetch_object()) {
        $testresult = array();
        $testresult["osId"] = $row->osId;
    }
}

$ostestQuery = "SELECT st.id, st.description, st.osTestId FROM SubTests st WHERE st.osTestId =" . 1;
if($ostestResult = $db->query($ostestQuery)){
    $ostests = array();
    while ($ostestRow = $ostestResult->fetch_object()) {
        $ostest["testId"] = $ostestRow->osTestId;
        $ostest["description"] = $ostestRow->description;
        if($pos = strpos($ostestRow->description,"(")){
            $ostest["tooltip"] = substr($ostestRow->description,0,$pos);
        } else {
        $ostest["tooltip"] = $ostestRow->description;
        }
    $ostests[] = $ostest;
    }
} 
$testresult["ostests"] = $ostests;

if($result = $db->query($query)){
    $osresults = array();
    while ($row = $result->fetch_object()) {
        $osresult["browserid"] = $row->browserId;

        $browserresultsQuery = "SELECT * FROM Results r,OSTests ost, SubTests st
WHERE r.osTestId = ost.id AND ost.id = st.osTestId AND st.id = 1";
        $browserresults = array();
        if($browserresultresult = $db->query($browserresultsQuery)){
            while ($browserresultRow = $browserresultresult->fetch_object()) {
                $browserresult["testId"] = $browserresultRow->osTestId;
                $browserresult["screenshot"] = $browserresultRow->screen;
                $browserresult["reference"] = $browserresultRow->refScreen;
                $browserresult["success"] = $browserresultRow->success;
                $browserresults[] = $browserresult;
            }
        }
        $osresult["browserresults"] = $browserresults;


        $osresults[] = $osresult;
    }
}
$testresult["osresults"] = $osresults;


$testresults[] = $testresult;
$test["testId"] = 1;
$test["testresults"] = $testresults;
$json["tests"][] = $test;
print json_encode($json);
?>