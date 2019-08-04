<?php

    $link = mysqli_connect("localhost", "root","") or die ("Verbindung nicht möglich");
    mysqli_select_db($link, "dummy") or die ("Datenbank existiert nicht");


    if (isset($_POST['name'])) {
        $name = $_POST['name'];
    };
    if (isset($_POST['text'])) {
        $text = $_POST['text'];
    };


    if (isset($_POST['W1'])) {
        $w1 = $_POST['W1'];
    };
    if (isset($_POST['W2'])) {
        $w2 = $_POST['W2'];
    };
    if (isset($_POST['W3'])) {
        $w3 = $_POST['W3'];
    };
    if (isset($_POST['id'])) {
        $id = $_POST['id'];
    };


    if (isset($name) || isset($text)) {

        $sql = "INSERT INTO tbl_1 (name, text) VALUES ('".$name."', '".$text."');";
        mysqli_query($link, $sql);
        //echo $sql;

    };


    if ( (isset($w1) || isset($w2) || isset($w3)) && (! isset($_POST['id']))) {

        $add = "INSERT INTO tbl_2 (v1,v2,v3) VALUES ('".$w1."', '".$w2."', '".$w3."');";
        mysqli_query($link, $add);
        echo $add;

    }

    if (isset($id)) {

        if (isset($_POST['alter'])) {

            $alter = "UPDATE tbl_2 SET v1='".$w1."', v2='".$w2."', v3='".$w3."' WHERE id='".$id."';";
            mysqli_query($link, $alter);
            echo $alter;

        }

        if (isset($_POST['delete'])) {

            $delete = "DELETE FROM tbl_2 WHERE id='".$id."';";
            mysqli_query($link, $delete);
            echo $delete;

        };


    }


    //echo "<p style='background-color: darkgrey;color:white;''>Erfolg!</p>";

    //echo "<html><body onload='close();''></body></html>";
 ?>
