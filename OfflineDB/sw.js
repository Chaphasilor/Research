self.addEventListener('sync', function(event) {
  if (event.tag == 'queue') {
    event.waitUntil(checkStateOfQueue());
  }
});

function getLastQueue() {

  var connection = indexedDB.open("offlineDB");

  connection.onsuccess = function(event) {
    db = connection.result;
    console.log("Connection established!");

    let tx = db.transaction(["queue"], "readonly");
    let txObj = tx.objectStore("queue");

    // var index = txObj.index('id');
    var idCursor = txObj.openCursor(null, 'prev');
    var maxIdObject = null;

    idCursor.onsuccess = function (event) {
        if (event.target.result) {
            maxIdObject = event.target.result.value.id; //the object with the highest id
            console.log(maxIdObject);
        }
    };

    tx.oncomplete = function (event) {

      db.close();
      syncToDB(maxIdObject);

    };

  }

}

function syncToDB(id) {

  var connection = indexedDB.open("offlineDB");

  connection.onsuccess = function(event) {
    db = connection.result;
    console.log("Connection established!");

    let tx = db.transaction(["queue"], "readonly");
    let txObj = tx.objectStore("queue");

    let request = txObj.get(id);
    request.onsuccess = function() {
      let matching = request.result;
      if (matching !== undefined) {
        // A match was found.
        console.log(matching.id + ", " + matching.store + ", " + matching.key);
        deleteRecord('queue', id);

      } else {
        // No match was found.
         console.log("No matching record!");
      }
    };

    tx.oncomplete = function (event) {
      db.close();
    };

    // fetch('commit.php').then(function(response) { // Post request via fetch?
    //   console.log(response);
    //   return response;
    // })

  }

}

// // function syncQueue() {
// //
//   var queueEmpty = false;
//
//   while (!queueEmpty) {
//     console.log("test");
//
//     queueEmpty = await checkStateOfQueue();
//
//     console.log("Queue state: " + queueEmpty);
//
//     queueEmpty = true;
//
//   }
// //
// // }

function checkStateOfQueue() {

  var connection = indexedDB.open("offlineDB");
  connection.onsuccess = function(event) {

    db = connection.result;
    console.log("Connection established!");

    let tx = db.transaction(["queue"], "readonly");
    let txObj = tx.objectStore("queue");

    let request = txObj.count();
    request.onsuccess = function() {
      console.log(request.result);
      if (request.result > 0) {

        getLastQueue();
        // checkStateOfQueue();
      }
    };

    tx.oncomplete = function (event) {
      db.close();
    };

  }

  // has to return promise (resolve/reject)!!!

}

function deleteRecord(store, vID) {

  var connection = indexedDB.open("offlineDB");
  connection.onsuccess = function(event) {

    db = connection.result;
    console.log("Connection established!");

    let tx = db.transaction([store], "readwrite");
    let txObj = tx.objectStore(store);

    let request = txObj.delete(vID);

    request.onsuccess = function() {
      console.log("Success!");
    }

    tx.oncomplete = function (event) {
      db.close();
      checkStateOfQueue();
    };

  }

}


// registration.sync.register('queue').then(() => {
//     console.log('Sync \'queue\' registered');
// });
