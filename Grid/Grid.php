<!DOCTYPE html>
<html>
    <head>

        <meta charset="utf-8">

        <link rel="stylesheet" href="grid.css">
        <script type="text/javascript" src="grid.js" charset="utf-8"></script>

        <title>Grid</title>
    </head>
    <body>

        <div id='container' onclick="placeSquare();"></div>

        <div id='overlayCreate' class='overlay'>

            <div class="dialog">
                <span>Mit welchem Fuß beginnt man?</span>
                <br/>
                <br/>
                <label for='leftInput'>Links</label>
                <input id='leftInput' type="radio" name="startingFoot" value="'left'"  onchange="setupCreate('left');" />
                <hr>
                <label for='rightInput'>Rechts</label>
                <input id='rightInput' type="radio" name="startingFoot" value="'right'" onchange="setupCreate('right');" />
            </div>

        </div>

        <div id='overlayView' class='overlay'>

            <div class="dialog">
                <span>Animation oder Schritt für Schritt?</span>
                <br/>
                <br/>
                <label for='animationInput'>Animation</label>
                <input id='animationInput' type="radio" name="animationstepper" value="'animation'"  onchange="setupView('animation');" />
                <hr>
                <label for='stepperInput'>Schritt für Schritt</label>
                <input id='stepperInput' type="radio" name="animationstepper" value="'stepper'" onchange="setupView('stepper');" />
            </div>

        </div>


        <div id='controls'>
            <!-- <form id='input'>

                <label for="row">Row</label>
                <select id='row' name="row">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

                <br/>
                <br/>

                <label for="column">Column</label>
                <select id='column' name="column">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

                <br/>
                <br/>

                <label for="color">Side</label>
                <select id='color' name="color">
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>

            </form>

            <br/>
            <br/>


            <button type="button" onclick='collectFormInput();'>Set Square</button>

            <button type="button" onclick="animateSteps();">Animate</button> -->

            <br/>

            <div>Länge der Pause: <span id='break'></span></div>
            <br/>
            <br/>
            <button type="button" onclick="createJSON(frames);">Speichern</button>

        </div>

        <script type="text/javascript">
        <?php
         if (!empty($_GET['type'])) {
             $type = $_GET['type'];
         }

         echo "setup('".$type."');";

         ?>
        </script>

    </body>
</html>
