<?php
  
  if (!empty($_FILES['file'])) {
    $fileName = str_replace(".", "", uniqid('', true));
    $extension = pathinfo($_FILES['file']['name'])['extension'];
    $fullName = $fileName.".".$extension;
    move_uploaded_file($_FILES['file']['tmp_name'], "uploads/".$fullName);
    echo $fullName;
  } else {
    echo "Failed!";
  }
  
  
?>