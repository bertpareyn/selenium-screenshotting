<?php
phpinfo();
//The user downloads the server on his pc
//He uses a browse button to show the path to his server
//When he clicks "start server" the form is posted and we get the value from the path

//save the path in a string
//$serverpath =
//Split it up into a path and a file name with regular expressions
//$path =
//$file =
//use the cd command to go to the correct path
//shell_exec("cd /Users/hh354/Documents/Selenium/simplium-0.4-with-dependencies/dependencies/selenium-remote-control/2.0");

//Start the server

echo exec("uptime");
$output = shell_exec("java -jar selenium-server-standalone-2.0a2.jar");
echo "output: " . $output;
echo shell_exec("ls");
echo "done";

?>