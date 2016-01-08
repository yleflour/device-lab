import adb from 'adbkit';

var client = adb.createClient();

export default {
  listDevices: function listDevices() {
    return client.listDevices()
    .then((devices) => {
      for (let device of devices) {
        console.log(device);
        client.getProperties(device.id)
        .then((properties) => {
          console.log(properties);
        });
      }
    });
  }
}