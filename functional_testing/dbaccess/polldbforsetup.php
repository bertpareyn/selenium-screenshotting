<?php

//header('Content-Type:application/json');

$db = new mysqli('localhost','hh354','cycling','selenium');
if(mysqli_connect_errno()){
    echo mysqli_connect_error();
}

$query = "SELECT t.id, t.description, t.url, t.subTests, o.osId, o.browserId, os.name as osName, b.name as browserName, b.icon 
FROM Tests t, OSTests o, OperatingSystems os, Browsers b 
WHERE t.id = '" . $_GET['testid'] .  "' AND o.testId = t.id AND os.id = o.osId AND b.id = o.browserId";

if($result = $db->query($query)){
echo "in here";
    while ($row = $result->fetch_object()) {
        $test = array();
        $test["testId"] = $row->id;;
        $test["description"] = $row->description;
        $test["url"] = $row->url;
        $test["subTests"] = $row->subTests;
        
        $tests[] = $test;
        
        $os = array();
        $osId = $row->osId;
        $os["osName"] = $row->osName;
        $os["osId"] = $osId;
        
        $oss[] = $os;
        
        $browser = array();
        $browser["browserName"] = $row->browserName;
        $browser["browserId"] = $row->browserId;
        $browser["browserPic"] = $row->icon;
        $browser["osId"] = $osId;
        
        $browsers[] = $browser;
    }
}
var_dump($tests);
$test = $tests[0];
$subtests = split(";",$test["subTests"]);
foreach($subtests as $st){
    $subtest = array();
    if($pos = strpos($st,"("))
        $codeName = substr($st,0,$pos);
    else
        $codeName = $st;
    $subtest["codeName"] = ucwords($codeName);
    $subtest["tooltip"] = $st;
    $test["codeInput"][] = $subtest;
}
unset($test["subTests"]);
//set basic test info
$testSetup = $test;

//add the operatingsystems
foreach ($oss as $o){

	foreach($browsers as $b){
        if($o["osId"] == $b["osId"]){
            unset($b["osId"]);
            if($o["browsers"]){
                foreach($o["browsers"] as $br){
                    if($br["browserId"] == $b["browserId"]){
                        $exists = true;
                        break;
                    }else{
                        $exists = false;
                    }
                }
                if(!$exists)
                    $o["browsers"][] = $b;
            }else{
                $o["browsers"][] = $b;
            }
        }
	}

    if($testSetup["operatingsystems"]){
        foreach($testSetup["operatingsystems"] as $op){
            if($op["osId"] == $o["osId"]){
                $exists = true;
                break;
            }else{
                $exists = false;
            }
        }
        if(!$exists)
            $testSetup["operatingsystems"][] = $o;
    }
    else{
        $testSetup["operatingsystems"][] = $o;
    }
}

//print json_encode($testSetup);

?>