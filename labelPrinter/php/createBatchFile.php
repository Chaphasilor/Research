<?php 

/*Funktion zur Überprüfung der Eingaben*/
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
};

$minValue = $maxValue = 0;
$trailing = "";

if (!empty($_GET["minValue"])) {
  $minValue = test_input($_GET["minValue"]);
}

if (!empty($_GET["maxValue"])) {
  $maxValue = test_input($_GET["maxValue"]);
}

if (!empty($_GET["trailing"])) {
  $trailing = test_input($_GET["trailing"]);
}

if (!empty($_GET["fontSize"])) {
  $fontSize = test_input($_GET["fontSize"]);
}

$myFile = fopen("job.printjob", 'w');

fwrite($myFile, "");

// echo "minValue: ".$minValue.", maxValue: ".$maxValue;

for ($i=$minValue; $i <= $maxValue; $i++) {
  file_put_contents("job.printjob",
  "m m
  J
  S l1;0.0,0.0,9.53,13.0,9.53
  O R
  T 1,6.0,0,7,pt".$fontSize.";".$i.$trailing."
  A 1
  
  ", FILE_APPEND);
}

fclose($myFile);


echo "Success";

?>