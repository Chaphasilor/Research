<?php 

/*Funktion zur Überprüfung der Eingaben*/
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
};

$minValue = $maxValue = 0;
$digitCount = 3;

if (!empty($_GET["minValue"])) {
  $minValue = test_input($_GET["minValue"]);
}

if (!empty($_GET["maxValue"])) {
  $maxValue = test_input($_GET["maxValue"]);
}

if (!empty($_GET["text"])) {
  $text = test_input($_GET["text"]);
}

if (!empty($_GET["fontSize"])) {
  $fontSize = test_input($_GET["fontSize"]);
}

if (!empty($_GET["textFontSize"])) {
  $textFontSize = test_input($_GET["textFontSize"]);
}

if (!empty($_GET["digitCount"])) {
  $digitCount = test_input($_GET["digitCount"]);
}

$myFile = fopen("job.printjob", 'w');

fwrite($myFile, "");

// echo "minValue: ".$minValue.", maxValue: ".$maxValue.", text: ".$text;

for ($i=$minValue; $i <= $maxValue; $i++) {
  file_put_contents("job.printjob",
  "m m
  J
  S l1;0.0,0.0,9.53,13.0,9.53
  O R
  T 0.7,4.0,0,5,pt".$fontSize.";".str_pad($i, $digitCount, '0', STR_PAD_LEFT)."
  T 0.7,8.0,0,5,pt".$textFontSize.";".$text."
  A 1
  
  ", FILE_APPEND);
}

fclose($myFile);


echo "Success";

?>