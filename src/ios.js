import iosDevice from 'node-ios-device';
import Promise from 'bluebird';

Promise.promisifyAll(iosDevice);

var trackingDevices;

function listDevices() {
  return iosDevice.devicesAsync()
  .then(function (devices) {
    for (let device of devices) {
      console.log(device);
    }
    return devices;
  });
}
  
function startTrackingDevices() {
    trackingDevices = iosDevice.trackDevices(function (err, devices) {
    console.log('Connected devices:');
    console.log(devices);
  });
}
  
function stopTrackingDevices() {
  if(trackingDevices) {
    trackingDevices();
  }
}

function installApp(appPath) {
  console.log(`Installing ${appPath} on all devices`);
  
  return listDevices()
  .then(function(devices) {
    return Promise.map(devices, function(device) {
      console.log(`Installing on ${device.name}`);
      return iosDevice.installAppAsync(device.udid, appPath)
      .then(function() {
        console.log(`Installed on ${device.name}`);
      });
    });
  });
}

export default {
  listDevices: listDevices,
  startTrackingDevices: startTrackingDevices,
  stopTrackingDevices: stopTrackingDevices,
  installApp: installApp,
}