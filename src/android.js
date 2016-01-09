import adb from 'adbkit';
import Promise from 'bluebird';

var client = adb.createClient();
var tracker;

function listDevices() {
  return client.listDevices()
  .then((devices) => {
    for (let device of devices) {
      console.log(device);
    }
    return devices;
  });
}
  
function startTrackingDevices() {
    client.trackDevices()
    .then(function (androidTracker) {
      tracker = androidTracker;
      tracker.on('add', function (device) {
        console.log('Added Device');
        console.log(device);
      });
      tracker.on('remove', function (device) {
        console.log('Removed Device');
        console.log(device);
      });
    });
}
  
function stopTrackingDevices() {
  if(tracker) {
    tracker.end();
  }
}
  
function installApp(appPath) {
  console.log(`Installing ${appPath} on all devices`);
  
  return client.listDevices()
  .then(function(devices) {
    return Promise.map(devices, function(device) {
      console.log(`Installing on ${device.id}`);
      return client.install(device.id, appPath)
      .then(function() {
        console.log(`Installed on ${device.is}`);
      });
    });
  });
}

function runApp(appId) {
  console.log(`Running ${appId} on all devices`);
  let activity = `${appId}/.MainActivity`;
  
  return client.listDevices()
  .then(function(devices) {
    return Promise.map(devices, function(device) {
      console.log(`Running on ${device.id}`);
      return client.startActivity(device.id, {
        wait: true,
        action: activity,
      })
      .then(function() {
        console.log(`Runned on ${device.is}`);
      });
    });
  });
}

export default {
  listDevices: listDevices,
  startTrackingDevices: startTrackingDevices,
  stopTrackingDevices: stopTrackingDevices,
  installApp: installApp,
  runApp: runApp,
}