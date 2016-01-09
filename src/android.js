import adb from 'adbkit';

var client = adb.createClient();
var tracker;

export default {
  listDevices: function listDevices() {
    return client.listDevices()
    .then((devices) => {
      for (let device of devices) {
        console.log(device);
      }
    });
  },
  
  startTrackingDevices: function trackDevices() {
     client.trackDevices()
     .then((androidTracker) => {
       tracker = androidTracker;
       tracker.on('add', (device) => {
         console.log('Added Device');
         console.log(device);
       });
       tracker.on('remove', (device) => {
         console.log('Removed Device');
         console.log(device);
       });
     });
  },
  
  stopTrackingDevices: function stopTrackingDevices() {
    if(tracker) {
      tracker.end();
    }
  },
  
  installApp: function installApp() {
    
  },
}