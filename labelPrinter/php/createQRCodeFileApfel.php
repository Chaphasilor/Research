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

$visString = substr(str_replace(' ', '', $text), 4, 2)." ".substr(str_replace(' ', '', $text), 6, 5);

fwrite($myFile,
"m m
J
S l1;0.0,0.0,10,13,10
O R
B 1.9,0.8,0,QRCODE+EL1,0.32;".$text."
T 2,9.5,0,5,pt5;".$visString."
A ".$amount."
");

fclose($myFile);

echo "Success";

?>