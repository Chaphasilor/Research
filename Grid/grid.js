function addSquare(side, row, column) {

    if (side == "left") {

        if (right = document.getElementById("right")) {

            if (right.classList.contains("row"+row) && right.classList.contains("column"+column)) {

                alert("Du tritts dir auf die Füße!");
                this.lastSide = !lastSide;
                return;

            } else {

                right.style = "opacity:.3;";

            }

        }

    } else {

        if (left = document.getElementById("left")) {

            if (left.classList.contains("row"+row) && left.classList.contains("column"+column)) {

                alert("Du tritts dir auf die Füße!");
                this.lastSide = !lastSide;
                return;

            } else {

                left.style = "opacity:.3;";

            }

        }

    }

    if (document.getElementById(side)) {
        document.getElementById(side).remove();
    }

    console.log(side,row,column);

    var square = "<div id='"+side+"' class='square "+side+" row"+row+" column"+column+"'></div>";

    document.getElementById('container').innerHTML += square;

    addFrame(side,row,column,delays[delayIndex]);

    delayIndex = 6;
    updateDelay();

}

var frames = new Object();
frames.frame = [];

function addFrame(side,row,column,duration) {
  frames.frame.push({
    side: side,
    row: row,
    column: column,
    duration: duration
  });
}


function createJSON(x) {

    output = JSON.stringify(x);
    localStorage.setItem("output", output);
    console.log(output);

}

function collectFormInput() {

    var form = document.getElementById("input");

    addSquare(form.elements[2].value, form.elements[0].value, form.elements[1].value);

}


async function animateSteps() {

    await sleep(2000);

    x = JSON.parse(localStorage.getItem("output"));

    for (var i = 0; i < x.frame.length; i++) {

        addSquare(x.frame[i].side,x.frame[i].row,x.frame[i].column);

        await sleep(x.frame[i].duration);

    }

    await sleep(2500);

    document.getElementById('left').remove();
    document.getElementById('right').remove();
    document.getElementById('container').innerHTML += "<div id='left' class='square left row5 column5'></div>";
    document.getElementById('container').innerHTML += "<div id='right' class='square right row5 column6'></div>";

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var lastSide = false;

function placeSquare(e){

    e = e || window.event;

    x = e.pageX;
    y = e.pageY;

    console.log(x,y);

    for (var i = 1; i <= 10; i++) {

        if ((x<(500-(i-1)*50)) && (x>(500-i*50))) {
            column = 11-i;
        }

    }

    for (var i = 1; i <= 10; i++) {

        if ((y<(500-(i-1)*50)) && (y>(500-i*50))) {
            row = 11-i;
        }

    }

    if (lastSide == false) {
        side = "left";
    } else {
        side = "right";
    }

    addSquare(side,row,column);

    this.lastSide = !lastSide;
}

var delays = [125,250,333,500,666,725,1000,1500,2000,3000,4000];
var delayIndex = 6;

function updateDelay(scrollDirection) {

    if (typeof scrollDirection != 'undefined') {

        if (scrollDirection && (delayIndex < (delays.length-1))) {
            delayIndex++;
        } else if (!scrollDirection && (delayIndex > 0)) {
            delayIndex--;
        }

    }

    if (delayIndex == 6) {
        taktOrTakte = "Takt";
    } else {
        taktOrTakte = "Takte";
    }


    window.document.getElementById('break').innerHTML = delays[delayIndex]/1000  + " " + taktOrTakte;

}

window.addEventListener('wheel', getsScrolled, false);

function getsScrolled(e) {

    if (e.deltaY > 0) {

        updateDelay(1); //scrolling down

    } else if (e.deltaY < 0) {

        updateDelay(0); //scrolling up

    }

}


function setup(type) {

    if (type == 'create') {

        window.document.getElementById('overlayView').style='display:none;';

    } else {

        window.document.getElementById('overlayCreate').style='display:none;';

    }

}


function setupCreate(side) {

    if (side == 'left') {
        lastSide = false;
    } else {
        lastSide = true;
    }

    window.document.getElementById('overlayCreate').style = "display:none;";

    document.getElementById('container').innerHTML += "<div id='left' class='square left row5 column5'></div>";
    document.getElementById('container').innerHTML += "<div id='right' class='square right row5 column6'></div>";

    updateDelay();

}


function setupView(type) {

    window.document.getElementById('overlayView').style = "display:none;";

    document.getElementById('container').innerHTML += "<div id='left' class='square left row5 column5'></div>";
    document.getElementById('container').innerHTML += "<div id='right' class='square right row5 column6'></div>";

    if (type == 'animation') {
        animateSteps();
    }

}
