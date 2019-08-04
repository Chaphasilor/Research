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

  $type=$tbl=$id=$v1=$v2=$v3="";

  if (isset($_POST['type'])) {
      $type = test_input($_POST['type']);
  }
  if (isset($_POST['tbl'])) {
      $tbl = test_input($_POST['tbl']);
  }
  if (isset($_POST['id'])) {
      $id = test_input($_POST['id']);
  }
  if (isset($_POST['v1'])) {
      $v1 = test_input($_POST['v1']);
  }
  if (isset($_POST['v2'])) {
      $v2 = test_input($_POST['v2']);
  }
  if (isset($_POST['v3'])) {
      $v3 = test_input($_POST['v3']);
  }

  if ($type == "add") {
    $sql = "INSERT INTO ".$tbl." (id, v1, v2, v3) VALUES ('".$id."', '".$v1."', '".$v2."', '".$v3."');";
  } elseif ($type == "change") {
    $sql = "UPDATE ".$tbl." SET v1='".$v1."', v2='".$v2."', v3='".$v3."' WHERE id='".$id."';";
  } elseif ($type == "delete") {
    $sql = "DELETE FROM ".$tbl." WHERE id='".$id."';";
  } else {
    // code...
  }

  mysqli_query($link, $sql);

  echo $sql;

?>
