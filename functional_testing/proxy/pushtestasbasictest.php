<?php

// Website url to open
$daurl = $_GET['server'] . $_GET['dbaccess'] . 'pushtestasbasictest.php?testid=' . $_GET['testid'];	

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