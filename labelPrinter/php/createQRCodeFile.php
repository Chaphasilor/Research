<?php 

// /*Funktion zur Überprüfung der Eingaben*/
// function test_input($data) {
//   $data = trim($data);
//   $data = stripslashes($data);
//   $data = htmlspecialchars($data);
//   return $data;
// };

$text = "";
$amount = "1";

if (!empty($_GET["text"])) {
  $text = $_GET["text"];
}

if (!empty($_GET["amount"])) {
  $amount = $_GET["amount"];
}

$myFile = fopen("job.printjob", 'w');

fwrite($myFile,
"m m
J
S l1;0.0,0.0,10,13,10
O R
B 1.5,1.4,0,QRCODE+EL1,0.3;".$text."
A ".$amount."
");

fclose($myFile);

echo "Success";

?>