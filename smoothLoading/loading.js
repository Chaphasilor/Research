async function setURL(url) {
  history.pushState({}, '', url);
  // window.dispatchEvent(new Event('popstate'));
}

async function loadNewPage(url, addHistory) {
  
  console.log("Loading new Page")

  startSpinner();
  
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);

      document.body.innerHTML = this.responseText;
      if (addHistory) {
        setURL(url);
      }

    } else if (this.readyState == 4 && this.status != 200) {
      stopSpinner();
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();

}

async function startSpinner() {  
  document.querySelector('#pageLoadingSpinner').classList.add('spinning');  
}

async function stopSpinner() {  
  document.querySelector('#pageLoadingSpinner').classList.remove('spinning');  
}

document.querySelector('a').addEventListener('click', function(e) {

    e.preventDefault();
    console.log(this.href);
    loadNewPage(this.href, true);
    
})