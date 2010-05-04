<?php
//phpinfo();

$db = new mysqli('localhost','hh354','cycling','selenium');
if(mysqli_connect_errno()){
    echo mysqli_connect_error();
}

//"SELECT o.id o.testId, o.osId, o.browserId, s.id, s.description, s.osTestId, r.subTestId, r.refScreen, r.screen, r.success, r.osTestId FROM OSTests o, Subtests s, Results r WHERE  "

$query = "SELECT o.id, o.osId, o.testId, o.browserId, s.osTestId, r.subTestId, r.refScreen, r.screen, r.success
FROM OSTests o, SubTests s, Results r 
WHERE o.testId = '1' AND s.osTestId = o.id AND r.osTestId = o.id";

if($result = $db->query($query)){

    while ($row = $result->fetch_object()) {
        //var_dump($row);
        //echo "<br><br>";
        $testId = $row->id; 
        $test = array();
        $test["testId"] = $row->id;;
        $test["description"] = $row->description;
        $test["url"] = $row->url;
        $test["codeInput"] = $row->subTests;
        
        $tests[] = $test;
        
        $os = array();
        $osId = $row->osId;
        $os["osName"] = $row->osName;
        $os["osId"] = $osId;
        $os["osVersion"] = $row->osVersion;
        
        $oss[] = $os;
        
        $browser = array();
        $browser["browserName"] = $row->browserName;
        $browser["browserId"] = $row->browserId;
        $browser["browserVersion"] = $row->browserVersion;
        $browser["browserPic"] = $row->icon;
        $browser["osId"] = $osId;
        
        $browsers[] = $browser;
    }
}

//set basic test info
$test = $tests[0];
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
//var_dump($testSetup);
echo json_encode($testSetup);


?>