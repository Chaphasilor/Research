<?php

$connection = ftp_connect("eelp001.gsi.de") or die("Connection failed!");

ftp_login($connection, "ftpprint", "print") or die("Authentification failed!");

ftp_put($connection, "job.printjob", "job.printjob", FTP_BINARY, 0);

echo "Success";

?>