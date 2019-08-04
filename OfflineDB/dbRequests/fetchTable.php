<?php

  $link = mysqli_connect("localhost", "root","") or die ("Verbindung nicht möglich");
  mysqli_select_db($link, "dummy") or die ("Datenbank existiert nicht");

  /*Funktion zur Überprüfung der Eingaben*/
  function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  };

  if (isset($_POST['tbl'])) {
      $tbl = test_input($_POST['tbl']);
  }

  $sql = "SELECT * FROM ".$tbl.";";
  $result = mysqli_query($link, $sql);

  $responseObj = array();

  while ($info = mysqli_fetch_row($result)) {

    array_push($responseObj, array('id'=>$info[0],'value1'=>$info[1],'value2'=>$info[2],'value3'=>$info[3]));

  };

  $responseJSON = json_encode($responseObj);

  echo $responseJSON;

?>
