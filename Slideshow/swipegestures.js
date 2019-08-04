let x0 = null;


function lock(e) {
  x0 = unify(e).clientX;
};

function move(e) {

  if(x0 || x0 === 0) {

    let dx = unify(e).clientX - x0, s = Math.sign(dx);

    console.log(s);

    if (s < 0) {
      nextPicture();
    } else {
      previousPicture();
    }

    x0 = null;

  }


};

function unify(e) {
  return e.changedTouches ? e.changedTouches[0] : e;
};
