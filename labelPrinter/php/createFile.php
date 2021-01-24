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

$file = fopen("job.printjob", 'w');

$lines = explode('|', $text);

fwrite($file,
"m m
J
S l1;0.0,0.0,10,13,10
O R
");

for ($i=0; $i < count($lines); $i++) { 
  fwrite($file,
"T 0.5,".(3*($i+1)).",0,5,pt".$fontSize.";".$lines[$i]."
");
}

fwrite($file, 
  "A ".$amount."
");

fclose($file);

echo "Success";

?>