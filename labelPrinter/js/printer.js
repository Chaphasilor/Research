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

function generateIDs(lastID, firstID, trailing) {
  
  if (firstID == undefined) {
    firstID = 1;
  }
  
  if (checkWithin(firstID, -999, 9999) && (lastID, -999, 9999) && (lastID - firstID) > 0 && (lastID - firstID) < 500) {
      createBatchPrintJob(lastID, firstID, trailing, 11).then(_ => {
        // uploadPrintJob()
        // .catch(err => alert(err));  
      }
      )
      .catch(err => alert(err));
  } else {
    alert("ID Range not valid!");
  }
  
}

function generateIDsWithText(lastID, firstID, digitCount, text, textFontSize) {

  console.log(lastID, firstID, digitCount, text, textFontSize);
  
  if (firstID == undefined) {
    firstID = 1;
  }
  
  if (checkWithin(firstID, -999, 9999) && (lastID, -999, 9999) && (lastID - firstID) > 0 && (lastID - firstID) < 500) {
    if (digitCount > 4) {
      alert("No more than 4 digits!");
    } else {
      createBatchPrintJobWithText(lastID, firstID, digitCount, text, 11, textFontSize).then(_ => {
        uploadPrintJob()
        .catch(err => alert(err));  
      }
      )
      .catch(err => alert(err));
    }
  } else {
    alert("ID Range not valid!");
  }
  
}

async function printQRCode(text, amount, apfel) {
  
  if (amount == undefined) {
    amount = 1;
  }
  
  try {

    await createQRPrintJob(text, amount, apfel)
    uploadPrintJob()

  } catch (err) {
    alert(err)
  }
  
}

function printQRCodeWithText(data, text, amount) {

  console.log(data, text, amount);
  
  if (amount == undefined) {
    amount = 1;
  }
  
  createQRPrintJobWithText(data, text, amount).then(_ => {
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

function createBatchPrintJob(lastID, firstID, trailing, fontSize) {
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
    xhttp.open("GET", "php/createBatchFile.php?minValue="+firstID+"&maxValue="+lastID+"&trailing="+trailing+"&fontSize="+fontSize, true);
    xhttp.send();
    
  })
}

function createBatchPrintJobWithText(lastID, firstID, digitCount, text, fontSize, textFontSize) {
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
    xhttp.open("GET", "php/createBatchFileWithText.php?minValue="+firstID+"&maxValue="+lastID+"&digitCount="+digitCount+"&text="+text+"&fontSize="+fontSize+"&textFontSize="+textFontSize, true);
    xhttp.send();
    
  })
}

function createQRPrintJob(text, amount, apfel) {
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
    if (apfel) {
      xhttp.open("GET", "php/createQRCodeFileApfel.php?text="+text+"&amount="+amount, true);
    } else {
      xhttp.open("GET", "php/createQRCodeFile.php?text="+text+"&amount="+amount, true);
    }
    xhttp.send();
    
  })
}

function createQRPrintJobWithText(data, text, amount) {
  return new Promise(function(resolve, reject) {

    console.log(data, text, amount);

    data = escape(data);
    
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
    xhttp.open("GET", "php/createQRCodeFileWithText.php?data="+data+"&text="+text+"&amount="+amount, true);
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