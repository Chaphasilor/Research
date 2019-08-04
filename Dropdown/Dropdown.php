<html>
    <head>

        <meta charset="utf-8">

        <link rel="stylesheet" type="text/css" href="style.css">

        <title>Dropdown</title>

        <script type="text/javascript" src="dropdown.js"></script>

    </head>
    <body>

        <form target="_blank" method="get">

            <div class='dropdown' onmouseup="toggle(this);">

                <input id='option1' type='radio' name='option' value='1' checked/>
                <label for='option1' style='display:block;'>Option 1</label>
                <input id='option2' type='radio' name='option' value='2'/>
                <label for='option2' style='display:none;'>Option 2</label>
                <input id='option3' type='radio' name='option' value='3'/>
                <label for='option3' style='display:none;'>Option 3</label>

            </div>

        </form>

        <form target="_blank" method="get">

            <div class='dropdown' onmouseup="toggle(this);">

                <input id='option4' type='radio' name='option' value='1'/>
                <label for='option4' style='display:block;'>Option 1</label>
                <input id='option5' type='radio' name='option' value='2'/>
                <label for='option5' style='display:none;'>Option 2</label>
                <input id='option6' type='radio' name='option' value='3'/>
                <label for='option6' style='display:none;'>Option 3</label>

            </div>

        </form>

    </body>
</html>
