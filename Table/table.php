<?php

    $link = mysqli_connect("localhost", "root","") or die ("Verbindung nicht möglich");
    mysqli_select_db($link, "dummy") or die ("Datenbank existiert nicht");

    $sql = "SELECT * FROM tbl_2;";
    $result = mysqli_query($link, $sql);
    $row;

?>

<html>
    <head>

        <title>Test</title>

        <link rel="stylesheet" type="text/css" href="Style.css">

    </head>
    <body>

        <table>
            <thead>
            <tr>
                <input type="text" value="Column 1" disabled />
                <input type="text" value="Column 2" disabled />
                <input type="text" value="Column 3" disabled />
            </tr>
            </thead>


            <tbody id='data'>
            <?php

                while ($row = mysqli_fetch_row($result)) {
                    echo "

                        <tr>
                            <td>
                                <form name='form".$row[0]."' action='insert.php' method='POST' target='frame' onfocusout=\"document.getElementById('alter".$row[0]."').click();\">
                                    <input type='text' class='showcase' name='W1' value='".$row[1]."'/>
                                    <input type='text' class='showcase' name='W2' value='".$row[2]."'/>
                                    <input type='text' class='showcase' name='W3' value='".$row[3]."'/>
                                    <input type='hidden' name='id' value='".$row[0]."'/><input id='alter".$row[0]."' type='submit' name='alter' value='Apply'/><input id='delete".$row[0]."' type='submit' onclick='setTimeout(function(){location.reload(true);}, 50);' name='delete' value='Delete'/>
                                </form>
                            </td>
                        </tr>

                    ";
                };

             ?>
            </tbody>

        </table>

        <div id='add'></div>

        <button id='addit' onclick="addit();">+</button>



        <br/>

        <iframe name='frame' style='display:none;'></iframe>

        <script>

            function addit() {
                let a = document.createElement("tr");
                let b = document.createElement("td");
                let c = document.createElement("form");
                let d1 = document.createElement("input");
                let d2 = document.createElement("input");
                let d3 = document.createElement("input");
                let d4 = document.createElement("input");

                d1.type = d2.type = d3.type = "text";
                d4.type = "submit";

                d1.name = "W1";
                d2.name = "W2";
                d3.name = "W3";
                d4.value = "Add";

                d1.className = d2.className = d3.className = "new";

                c.action = "insert.php";
                c.method = "POST";
                c.target = "frame";
                c.onsubmit = function () {
            	    setTimeout(function(){location.reload(true);}, 50);
                };

                c.appendChild(d1);
                c.appendChild(d2);
                c.appendChild(d3);
                c.appendChild(d4);

                b.appendChild(c);
                a.appendChild(b);

                document.getElementById('add').appendChild(a);

                document.getElementById('addit').style.display = "none";
            }

        </script>

    </body>
</html>
