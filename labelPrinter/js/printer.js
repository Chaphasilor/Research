function printLabel(text, amount) {
  
  if (amount == undefined) {
    amount = 1;
  }
  
  createPrintJob(text, amount, 8).then(_ => {
    uploadPrintJob()
    .catch(err => alert(err));  
  }
  )
  .catch(err => alert(err));
  
}

function generateIDs(lastID, firstID) {
  
  if (firstID == undefined) {
    firstID = 1;
  }
  
  if (checkWithin(firstID, -999, 9999) && (lastID, -999, 9999) && (lastID - firstID) > 0 && (lastID - firstID) < 500) {
      createBatchPrintJob(lastID, firstID, 11).then(_ => {
        uploadPrintJob()
        .catch(err => alert(err));  
      }
      )
      .catch(err => alert(err));
  } else {
    alert("ID Range not valid!");
  }
  
}

function printQRCode(text, amount) {
  
  if (amount == undefined) {
    amount = 1;
  }
  
  createQRPrintJob(text, amount).then(_ => {
    uploadPrintJob()
    .catch(err => alert(err));  
  }
  )
  .catch(err => alert(err));
  
}

function createPrintJob(text, amount, fontSize) {
  return new Promise(function(resolve, reject) {

    lineArray = text.split("\n");
    for (const o in lineArray) {
      lineArray[o] = escape(lineArray[o]);
    }
    console.log('lineArray:', lineArray);
    text = lineArray.join('|');
    console.log('text:', text);
    
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (this.responseText != "Success") {
          console.log(this.responseText);
          reject("File could not be created!");
        } else {
          resolve();        
        }
    };
    xhttp.onerror = function() {
      reject("Something went wrong!")
    }
    xhttp.open("GET", "php/createFile.php?text="+text+"&amount="+amount+"&fontSize="+fontSize, true);
    xhttp.send();
    
  })
}

function createBatchPrintJob(lastID, firstID, fontSize) {
  return new Promise(function(resolve, reject) {
    
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (this.responseText != "Success") {
          console.log(this.responseText);
          reject("File could not be created!");
        } else {
          resolve();        
        }
    };
    xhttp.onerror = function() {
      reject("Something went wrong!")
    }
    xhttp.open("GET", "php/createBatchFile.php?minValue="+firstID+"&maxValue="+lastID+"&fontSize="+fontSize, true);
    xhttp.send();
    
  })
}

function createQRPrintJob(text, amount) {
  return new Promise(function(resolve, reject) {

    text = escape(text);
    
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (this.responseText != "Success") {
          console.log(this.responseText);
          reject("File could not be created!");
        } else {
          resolve();        
        }
    };
    xhttp.onerror = function() {
      reject("Something went wrong!")
    }
    xhttp.open("GET", "php/createQRCodeFile.php?text="+text+"&amount="+amount, true);
    xhttp.send();
    
  })
}

function uploadPrintJob() {
  return new Promise(function(resolve, reject) {
    
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        console.log(this.responseText);
        if (this.responseText != "Success") {
          reject("Upload unsuccessful!");
        } else {
          resolve();
        }
    };
    xhttp.open("GET", "php/uploadFile.php", true);
    xhttp.send();
    
  })
}

function checkWithin(value, minValue, maxValue) {
  return minValue <= value && value <= maxValue;
}