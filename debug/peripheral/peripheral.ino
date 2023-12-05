#include <ArduinoBLE.h>
#include <Arduino_LSM6DS3.h>

#define BLE_UUID_IMU_SERVICE "2711"
#define BLE_UUID_ACCELEROMETER_X "2101"
#define BLE_UUID_ACCELEROMETER_Y "2102"
#define BLE_UUID_ACCELEROMETER_Z "2103"

#define BLE_UUID_GYROSCOPE_X "2104"
#define BLE_UUID_GYROSCOPE_Y "2105"
#define BLE_UUID_GYROSCOPE_Z "2106"

#define BLE_DEVICE_NAME "IMU Data Streamer"
#define BLE_LOCAL_NAME "IMU Data Streamer"

BLEService imuService(BLE_UUID_IMU_SERVICE);

BLEFloatCharacteristic accelerometerCharacteristicX(BLE_UUID_ACCELEROMETER_X, BLERead | BLENotify);
BLEFloatCharacteristic accelerometerCharacteristicY(BLE_UUID_ACCELEROMETER_Y, BLERead | BLENotify);
BLEFloatCharacteristic accelerometerCharacteristicZ(BLE_UUID_ACCELEROMETER_Z, BLERead | BLENotify);
BLEFloatCharacteristic gyroscopeCharacteristicX(BLE_UUID_GYROSCOPE_X, BLERead | BLENotify);
BLEFloatCharacteristic gyroscopeCharacteristicY(BLE_UUID_GYROSCOPE_Y, BLERead | BLENotify);
BLEFloatCharacteristic gyroscopeCharacteristicZ(BLE_UUID_GYROSCOPE_Z, BLERead | BLENotify);

float ax, ay, az, gx, gy, gz;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);

  // initialize IMU
  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1)
      ;
  }

  Serial.print("Accelerometer sample rate = ");
  Serial.print(IMU.accelerationSampleRate());
  Serial.println("Hz");

  // initialize BLE
  if (!BLE.begin()) {
    Serial.println("Starting Bluetooth® Low Energy module failed!");
    while (1)
      ;
  }

  // set advertised local name and service UUID
  BLE.setDeviceName(BLE_DEVICE_NAME);
  BLE.setLocalName(BLE_LOCAL_NAME);
  BLE.setAdvertisedService(imuService);

  imuService.addCharacteristic(accelerometerCharacteristicX);
  imuService.addCharacteristic(accelerometerCharacteristicY);
  imuService.addCharacteristic(accelerometerCharacteristicZ);
  imuService.addCharacteristic(gyroscopeCharacteristicX);
  imuService.addCharacteristic(gyroscopeCharacteristicY);
  imuService.addCharacteristic(gyroscopeCharacteristicZ);

  BLE.addService(imuService);

  accelerometerCharacteristicX.writeValue(0);
  accelerometerCharacteristicY.writeValue(0);
  accelerometerCharacteristicZ.writeValue(0);
  gyroscopeCharacteristicX.writeValue(0);
  gyroscopeCharacteristicY.writeValue(0);
  gyroscopeCharacteristicZ.writeValue(0);

  // start advertising
  BLE.advertise();

  Serial.println("BLE Accelerometer Peripheral");
}

void loop() {
  BLEDevice central = BLE.central();

  if (IMU.accelerationAvailable()) {
    digitalWrite(LED_BUILTIN, HIGH);
    IMU.readAcceleration(ax, ay, az);

    accelerometerCharacteristicX.writeValue(ax);
    accelerometerCharacteristicY.writeValue(ay);
    accelerometerCharacteristicZ.writeValue(az);
  } else {
    digitalWrite(LED_BUILTIN, LOW);
  }

  if (IMU.gyroscopeAvailable()) {
    digitalWrite(LED_BUILTIN, HIGH);
    IMU.readGyroscope(gx, gy, gz);

    gyroscopeCharacteristicX.writeValue(gx);
    gyroscopeCharacteristicY.writeValue(gy);
    gyroscopeCharacteristicZ.writeValue(gz);
  } else {
    digitalWrite(LED_BUILTIN, LOW);
  }
}