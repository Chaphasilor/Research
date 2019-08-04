var id = 1;
var path = 'media/pictures/';
var pictures = 4;
var currentImg = '#img1';

document.addEventListener('DOMContentLoaded', function() {

  loadPicture(1);

  initiateIndicator(pictures);

  autoAdvance();

});

// document.querySelector('#gallery').addEventListener('touchstart', lock, false);
// document.querySelector('#gallery').addEventListener('touchend', move, false);
// document.querySelector('#gallery').addEventListener('touchmove', e => {e.preventDefault()}, false)

function loadPicture(id) {

  loadPreview(id).then(blendPictures).then(function() {
    document.querySelector(currentImg).src = path+id+'.jpg';
  });

}

async function initiateIndicator(ammount) {

  for (var i = 0; i < ammount; i++) {

    let dot = document.createElement('div');
    dot.id = 'dot'+(i+1);
    dot.classList.add('dot');
    document.querySelector('#indicator').appendChild(dot);

  }

  document.querySelector('#dot1').classList.add('active');

}

async function loadPreview(id) {
  return new Promise((resolve, reject) => {

    document.querySelector(currentImg).addEventListener('onchange', resolve('Preview loaded!'))

    document.querySelector(currentImg).src = path+id+'_preview.jpg';
    // console.log('Preview loaded');

  });
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

  let dots = document.querySelectorAll('.dot');

  for (var i of dots) {
    i.classList.remove('active');
  }

  document.querySelector('#dot'+id).classList.add('active');

}

function blendPictures(responseText) {

  console.log(responseText);
  console.log('Blending pictures...');

  if (currentImg == '#img1') {
    document.querySelector(currentImg).style.opacity = '1';
    document.querySelector('#img2').style.opacity = '0';
  } else {
    document.querySelector(currentImg).style.opacity = '1';
    document.querySelector('#img1').style.opacity = '0';
  }

}

async function autoAdvance() {

  while (true) {
    await sleep(5000);
    nextPicture();
  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
