var id = 1;
var path = 'media/pictures/';
var pictures = 4;
var currentImg = '#img1';
var cachedImages = new Array(pictures);
document.addEventListener('DOMContentLoaded', function() {

  console.log('test');

  loadPreview(1);

  var url = path+1+'.jpg';
  var options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  };
  var request = new Request(url);

  fetch(request, options).then((response) => {
    response.arrayBuffer().then((buffer) => {
      var base64Flag = 'data:image/jpeg;base64,';
      var imageStr  = arrayBufferToBase64(buffer);

      // cachedImages[id-1] = base64Flag + imageStr;
      localStorage.setItem('img'+id, base64Flag + imageStr);
      // document.querySelector(currentImg).src = cachedImages[id-1];
      document.querySelector(currentImg).src = localStorage.getItem('img'+id);
      console.log('Picture loaded');
    });
  });

  function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((b) => binary += String.fromCharCode(b));

    return window.btoa(binary);
  };

});

function loadPicture(id) {

  if (cachedImages[id-1] != null) {
    loadPreview(id);
    //document.querySelector(currentImg).src = cachedImages[id-1];
    document.querySelector(currentImg).src = localStorage.getItem('img'+id);
    console.log('Picture loaded');
  } else {

    loadPreview(id);

    var url = path+id+'.jpg';
    var options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    };
    var request = new Request(url);

    fetch(request, options).then((response) => {
      response.arrayBuffer().then((buffer) => {
        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr  = arrayBufferToBase64(buffer);

        // cachedImages[id-1] = base64Flag + imageStr;
        localStorage.setItem('img'+id, base64Flag + imageStr);
        // document.querySelector(currentImg).src = cachedImages[id-1];
        document.querySelector(currentImg).src = localStorage.getItem('img'+id);
        console.log('Picture loaded');
      });
    });

    function arrayBufferToBase64(buffer) {
      var binary = '';
      var bytes = [].slice.call(new Uint8Array(buffer));

      bytes.forEach((b) => binary += String.fromCharCode(b));

      return window.btoa(binary);
    };

  }

}

function loadPreview(id) {
    document.querySelector(currentImg).src = path+id+'_preview.jpg';
    console.log('Preview loaded');
    blendPictures();
}

function nextPicture() {

  if (id < pictures) {
    id++;
  } else {
    id = 1;
  }

  toggleCurrentImg();

  loadPicture(id);

}

function previousPicture() {

  if (id > 1) {
    id--;
  } else {
    id = pictures;
  }

  toggleCurrentImg();

  loadPicture(id);

}

function toggleCurrentImg() {

  if (currentImg == '#img1') {
    currentImg = '#img2';
  } else {
    currentImg = '#img1';
  }

}

function blendPictures() {

  console.log('Blending pictures...');

  if (currentImg == '#img1') {
    document.querySelector(currentImg).style.opacity = '1';
    document.querySelector('#img2').style.opacity = '0';
  } else {
    document.querySelector(currentImg).style.opacity = '1';
    document.querySelector('#img1').style.opacity = '0';
  }

}
