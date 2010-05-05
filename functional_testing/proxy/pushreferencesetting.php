<?php

// Website url to open
if ($_GET['checkcase'] == "chkref"){
    $daurl = $_GET['server'] . $_GET['dbaccess'] . 'pushreferencesetting.php?refbool=' . $_GET['refbool'] . '&subtestid=' . $_GET['subtestid'];	
} else if ($_GET['checkcase'] == "chkbrowserref"){
	$daurl = $_GET['server'] . $_GET['dbaccess'] . 'pushbrowserreferencesetting.php?testid=' . $_GET['testid'] . '&refbool=' . $_GET['refbool'] . '&os=' . $_GET['os'] . '&browser=' . $_GET['browser'];
}

// Get that website's content
$handle = fopen($daurl, "r");

// If there is something, read and return
if ($handle) {
    while (!feof($handle)) {
        $buffer = fgets($handle, 4096);
        echo $buffer;
    }
    fclose($handle);
}
?>