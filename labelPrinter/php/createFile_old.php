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
  // $text = test_input($_GET["text"]);
  $text = $_GET["text"];
}

if (!empty($_GET["amount"])) {
  // $amount = test_input($_GET["amount"]);
  $amount = $_GET["amount"];
}

if (!empty($_GET["fontSize"])) {
  // $fontSize = test_input($_GET["fontSize"]);
  $fontSize = $_GET["fontSize"];
}

$myFile = fopen("job.printjob", 'w');

fwrite($myFile,
"m m
J
S l1;0.0,0.0,10,13.0,10
O R
T ".strval(1+(1.2*(4-strlen($text)))).",6.2,0,596,pt".$fontSize.";".$text."
A ".$amount."
");

fclose($myFile);

echo "Success";

?>