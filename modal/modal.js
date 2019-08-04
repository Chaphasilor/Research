var testArrays = [[0,1,2,3,4,5,9,8,7,6], [1,3,5,6,4,2], [0,1,2,3,4,5], [6,5,4,3,2,1], [0], [1,0]];

function testModal() {
  for (let a in testArrays) {
    console.log('m for ' + testArrays[a] + ': ' + findModalTurningPoint(testArrays[a]));
  }
  console.log('Complexity analysis yielded ' + analyzeComplexity());
}

function analyzeComplexity() {
  return 'O(log(n))';
}

function findModalTurningPoint(a) {
  // console.log('A:', a);  
  return findModalTurningPointRec(a, 0, a.length-1);
}
function findModalTurningPointRec(a, startIndex, endIndex) {
  if (startIndex == endIndex) {
    return a[startIndex];
  }

  let i = parseInt((endIndex-startIndex)/2)+startIndex;
  // console.log('i: '+ i + ' (element '+a[i]+')');

  if (a[i] < a[i+1]) {
    // console.log('aufsteigend');
    // aufsteigend
    if ((i==startIndex) || (a[i-1] < a[i] && a[i] > a[i+1])) {
      // console.log('returning ' + i +' as m');
      return a[i];
    }
    // console.log('calling function with startIndex='+(i+1) + ' and endIndex='+endIndex);
    return findModalTurningPointRec(a, i+1, endIndex);
  } else {
    // console.log('absteigend');
    // absteigend
    if ((i==startIndex && i==endIndex-1) || (a[i-1] < a[i] && a[i] > a[i+1])) {
      return a[i];
    }
    //console.log('calling function with startIndex='+startIndex + ' and endIndex='+i);
    return findModalTurningPointRec(a, startIndex, i);
  }

}

var pointsX = [0, 1, 2, 3, 4, 3, 2, 1];
var pointsY = [1, 2, 3, 4, 3, 2, 1, 0];
var pointsX2 = [0, 1, 2, 4, 4, 3, 2, 1];
var pointsY2 = [1, 2, 3, 4, 3, 2, 1, 0];

function findLargestX(v, w) {
  
  let index = findLargestXRec(v, 0, v.length-1);
  console.log(index);
  return [v[index], w[index]];
}

function findLargestXRec(v, startIndex, endIndex) {
  
  let i = parseInt((endIndex-startIndex)/2)+startIndex;
  
  if (v[i] < v[i+1]) {
    return findLargestXRec(v, i, endIndex);
  } else if (v[i] > v[i+1]) {
    if (v[i] > v[i-1]) {
      return i;
    }
    return findLargestXRec(v, startIndex, i);
  } else {
    return i;
  }
  
}

function findLargestY(v, w) {
  
  let index = findLargestYRec(w, 0, w.length-1);
  console.log(index);
  return [v[index], w[index]];
}

function findLargestYRec(w, startIndex, endIndex) {
  
  let i = parseInt((endIndex-startIndex)/2)+startIndex;
  
  if (w[i] < w[i+1]) {
    return findLargestYRec(w, i, endIndex);
  } else if (w[i] > w[i+1]) {
    if (w[i] > w[i-1]) {
      return i;
    }
    return findLargestYRec(w, startIndex, i);
  } else {
    return i;
  }
  
}