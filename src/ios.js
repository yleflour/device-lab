import iosDevice from 'node-ios-device';
import Promise from 'bluebird';

Promise.promisifyAll(iosDevice);

var trackingDevices;

export default {
  listDevices: function listDevices() {
    return iosDevice.devicesAsync()
    .then(function (devices) {
      for (let device of devices) {
        console.log(device);
      }
    });
  },
  
  startTrackingDevices: function trackDevices() {
     trackingDevices = iosDevice.trackDevices(function (err, devices) {
      console.log('Connected devices:');
      console.log(devices);
    });
  },
  
  stopTrackingDevices: function stopTrackingDevices() {
    if(trackingDevices) {
      trackingDevices();
    }
  }
}