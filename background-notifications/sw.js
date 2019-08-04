'use strict';

function Socket(secure = false, domain, port = 80, path = "") {
  return new Promise(function(resolve, reject) {

    let socket = new WebSocket(secure?"wss":"ws" + "://" + domain + ":" + port + "/"+path);
    socket.onopen = () => {resolve(socket)};
    socket.onerror = () => {reject()};
    
  })
}

self.addEventListener('install', function(event) {
  // Perform install steps
  Socket(false, "localhost", 42069, "socket")
  .then((socket) => {
    console.log("Socket opened");
    socket.onmessage = (message) => {
      console.log(message.data);
      displayNotification(message.data);
    }
  })
  .catch(() => {
    console.error("Socket could NOT be opened!");
  });
});

/**
 * Stellt Displaybenachrichtigungen bereit
 * @return [type] [description]
 */
function displayNotification(message) {
  if (Notification.permission == 'granted') {
    // navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: "",
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
          options: {
            action: 'default',
            close: true
          }
        }
      };
      self.registration.showNotification(message, options);
    // });
  }
}

self.addEventListener('notificationclose', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  console.log('Closed notification: ' + primaryKey);
  // var options = {
  //   body: 'You can\'t get rid of me!',
  //   icon: 'media/android-icon-192x192.png',
  //   vibrate: [100, 50, 100],
  //   data: {
  //     dateOfArrival: Date.now(),
  //     primaryKey: 2
  //   },
  //   actions: [
  //     {action: 'close', title: 'Close notification'}
  //   ]
  // };
  // self.registration.showNotification('Notification cleared!', options);
  // options = {
  //   body: 'You can\'t get rid of me!',
  //   icon: 'media/android-icon-192x192.png',
  //   vibrate: [100, 50, 100],
  //   data: {
  //     dateOfArrival: Date.now(),
  //     primaryKey: 3
  //   },
  //   actions: [
  //     {action: 'close', title: 'Close notification'}
  //   ]
  // };
  // self.registration.showNotification('Notification cleared!', options);

});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;
  console.log('Notification clicked: ' + primaryKey);

  if (action === 'close') {
    notification.close();
  } else {
    notification.close();
    // clients.openWindow('https://synnrekt.000webhostapp.com/dance/');

    const rootURL = new URL('/dance/', self.location.origin).href;
    console.log(rootURL);

    const promiseChain = clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then(function(windowClients) {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(rootURL)) { // use windowClient.url === rootURL to check for specific page
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(rootURL);
      }
    });

    e.waitUntil(promiseChain);

  }
});