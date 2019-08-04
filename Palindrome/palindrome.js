function minPalindrom(word) {
  let mem = new Array(word.length);
  // init mem w/ -1
  for (var i = 0; i < word.length; i++) {
    let temp = new Array(word.length);
    temp.fill(-1);
    mem[i] = temp;
  }
  // init diag(mem) with 1;
  for (var i = 0; i < word.length; i++) {
    mem[i][i] = 1;
  }
  
  console.log(mem);
  
  console.log(checkPalindrom(word, 0, word.length-1, 0, mem));
  
}

function checkPalindrom(word, start, end, count, mem) {
  
  if (mem[start][end] === 1) {
    console.log(1);
    return count;
  } else if (mem[start][end] === -1) {
    console.log(-1);
    let p = start;
    let pal = true;
    while (p <= (end-start)/2) {
      if (word.charAt(p) != word.charAt(end-start-p)) {
        pal = false;
      }
      p++;
    }
    
    if (pal) {
      mem[start][end] = 1
    } else {
      mem[start][end] = 0;
    }
    
    return checkPalindrom(word, start+1, end, count, mem) + 1;
    return checkPalindrom(word, start, end-1, count, mem) + 1;    
    
  } else {
    console.log(0);
    return count - 1;
  }
  
}



function factorial(n) {
  if (n == 0) {
    return 1;
  } else {
    return n * factorial(n-1);
  }
}

function minPalPartion(str) {
  
  let n = str.length;
  let c = new Array(n);
  let p = new Array(n);
  for (let i = 0; i < n; i++) {
    p[i] = new Array(n);
  }
  
  for (let i = 0; i < n; i++) {
    p[i][i] = true;
  }
  
  for (let l = 2; l <= n; l++) {
    for (let i = 0; i <= (n-l); i++) {
      j = i + l - 1;
      if (l == 2) {
        p[i][j] = (str.charAt(i) == str.charAt(j));
      } else {
        p[i][j] = (str.charAt(i) == str.charAt(j)) && p[i+1][j-1];
      }
    }
  }
  
  for (let i = 0; i < n; i++) {
    if (p[0][i] == true) {
      c[i] = 0;
    } else {
      c[i] = Number.MAX_SAFE_INTEGER;
      for (let j = 0; j < i; j++) {
        // if (p[j+1][i] && (c[j] != -1)) {
        if (p[j+1][i] && (c[j]+1 < c[i])) {
          c[i] = c[j] + 1;
        }
      }
    }
  }
  
  // if (p[0][n-1]) {
  //   return 1;
  // } else {
  // 
  //     for (let i = 1; i < n; i++) {
  //       let sections = new Array(i);
  //       for (int j = 0; j < factorial(sections.length); j++) {
  //         sec
  //       }
  //     }
  // 
  // }
  
  return c[n-1] + 1;
  
}