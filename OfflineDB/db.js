var connection = indexedDB.open("offlineDB");

connection.onsuccess = function(event) {
  db = connection.result;
  console.log("Connection established!");
}

connection.onupgradeneeded = function(event) {
  // The database did not previously exist, so create object stores and indexes.
  var db = event.target.result;
  var table2 = db.createObjectStore("tbl_2", {keyPath: "id"});
  var v1Index = table2.createIndex("by_v1", "v1", { unique: false });
  var v2Index = table2.createIndex("by_v2", "v2", { unique: false });
  var v3Index = table2.createIndex("by_v3", "v3", { unique: false });
  var queue = db.createObjectStore("queue", {keyPath: "id", autoIncrement:true });
  var queueStore = table2.createIndex("by_store", "store", { unique: false });
  var queueKey = table2.createIndex("by_key", "key", { unique: false });

};

function getRecord(store, vID) {

  let tx = db.transaction([store], "readonly");
  let txObj = tx.objectStore(store);

  let request = txObj.get(vID);
  request.onsuccess = function() {
    let matching = request.result;
    if (matching !== undefined) {
      // A match was found.
      console.log(matching.id + ", " + matching.v1 + ", " + matching.v2+ ", " + matching.v3);
    } else {
      // No match was found.
       console.log("No matching record!");
    }
  };

}

function addRecord(store, vID, value1, value2, value3) {

  let tx = db.transaction([store], "readwrite");
  let txObj = tx.objectStore(store);

  console.log(store+", "+vID+", "+value1+", "+value2+", "+value3);
  let request = txObj.put({v1: value1, v2: value2, v3: value3, id: vID});

  request.onsuccess = function() {

    console.log("Success!");

    // getRecord(store, request.result);

  }

}

function deleteRecord(store, vID) {

  let tx = db.transaction([store], "readwrite");
  let txObj = tx.objectStore(store);

  let request = txObj.delete(vID);

  request.onsuccess = function() {
    console.log("Success!");
  }

}

function fetchTable(table) {

  let xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      let responseObj = JSON.parse(this.responseText);

      for (record in responseObj) {
        // Extract records here
        // console.log("addRecord("+"\""+table+"\""+", "+responseObj[record].id+", "+"\""+responseObj[record].value1+"\""+", "+"\""+responseObj[record].value2+"\""+", "+"\""+responseObj[record].value3+"\""+");");

        addRecord(table, parseInt(responseObj[record].id), responseObj[record].value1, responseObj[record].value2, responseObj[record].value3);

      }

    }

  }

  xhttp.open("POST", "fetchTable", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("tbl="+table);

}

function commitAdd(table, id, value1, value2, value3) {

  let xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Commit successful!");
      console.log("Query: "+this.responseText);
    } else if (this.readyState == 4 && this.status != 200) {
      console.log("Couldn't reach database!");
    }

  }

  xhttp.open("POST", "commit", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("type=add&tbl="+table+"&id="+id+"&v1="+value1+"&v2="+value2+"&v3="+value3);

}

function commitChange(table, id, value1, value2, value3) {

  let xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Commit successful!");
      console.log("Query: "+this.responseText);
    } else if (this.readyState == 4 && this.status != 200) {
      console.log("Couldn't reach database!");
    }

  }

  xhttp.open("POST", "commit", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("type=change&tbl="+table+"&id="+id+"&v1="+value1+"&v2="+value2+"&v3="+value3);

}

function commitDelete(table, id) {

  let xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Commit successful!");
      console.log("Query: "+this.responseText);
    } else if (this.readyState == 4 && this.status != 200) {
      console.log("Couldn't reach database!");
    }

  }

  xhttp.open("POST", "commit", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("type=delete&tbl="+table+"&id="+id);

}

function addToQueue(queueStore, queueKey) {

  let tx = db.transaction(["queue"], "readwrite");
  let txObj = tx.objectStore("queue");

  let request = txObj.put({store: queueStore, key: queueKey});

  request.onsuccess = function() {

    console.log("Success!");

    // navigator.serviceWorker.ready.sync.register('queue').then(() => {
    //     console.log('Sync \'queue\' registered');
    // });

  }

}
