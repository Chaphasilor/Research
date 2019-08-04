function getTemperature() {

  let xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      trimToTemp(this.responseText);

    }

  }

  xhttp.open("GET", "http://wetter-egelsbach.de/main.php", true);
  xhttp.send();

}

function trimToTemp(text) {

  console.log(text.substring(3215, 3219));

}
