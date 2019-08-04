function submitForm(form) {
  
  for (let n = 0; n < form.querySelector("#files  ").files.length; n++) {
    uploadFile(form.querySelector("#files").files[n])
    .then(fileName => {
      console.log("Uploaded file " + (n+1) + " (now " + fileName + ")");
      // form.querySelector("#files").files.remove(form.querySelector("#files").files[n]);
    })
    .catch(err => {
      console.log("Upload failed for file " + (n+1) + ": " + err);
    })
  }
  
}

function uploadFile(file) {
  return new Promise(function(resolve, reject) {
    
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (this.responseText != "Failed!") {
          resolve(this.responseText);
        } else {
          reject(this.responseText);
        }
    };
    xhttp.open("POST", "upload.php", true);
    let formData = new FormData();
    formData.append("file", file);
    xhttp.send(formData);
    
  })
}