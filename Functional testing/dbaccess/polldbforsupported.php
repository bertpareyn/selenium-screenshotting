<?php

header('Content-Type:application/json');

$db = new mysqli('localhost','hh354','cycling','selenium');
if(mysqli_connect_errno()){
    echo mysqli_connect_error();
}


$query = "SELECT b.name, b.id, b.icon, b.isSupported
FROM Browsers b";
if($result = $db->query($query)){
    while ($row = $result->fetch_object()) {
        $browser = array();
        $browser["browserId"] = $row->id;
        $browser["browserName"] = $row->name;
        $browser["browserpic"] = $row->icon;

        if($row->isSupported == 0){
            $browser["isSupported"] = 'false';
        }else {
            $browser["isSupported"] = 'true';
        }

        $json["browser"][] = $browser;
    }
}


$query = "SELECT os.id, os.name, os.isSupported
From OperatingSystems os";
if($result = $db->query($query)){
    while ($row = $result->fetch_object()) {
        $os = array();
        $os["osId"] = $row->id;
        $os["osName"] = $row->name;
        
        if($row->name == '0'){
            $os["isSupported"] = 'false';
        }else {
            $os["isSupported"] = 'true';
        }

        $supportedBrowserQuery = "SELECT sup.osId, sup.browserId FROM Supports sup WHERE sup.osId = '" . $row->id . "'";
        if($sbResults = $db->query($supportedBrowserQuery)){
        $sbs = array();
            while ($sbRow = $sbResults->fetch_object()) {
                $sb = array();
                $sb["browserId"] = $sbRow->browserId;
                $sbs[] = $sb;
            }
        };
       
        $os["supportedBrowsers"] = $sbs;
        
        $json["os"][] = $os;
    }
}

print json_encode($json);
?>