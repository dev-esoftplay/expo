---
title: Location
---

import withDocumentationElements from '~/components/page-higher-order/withDocumentationElements';
import SnackEmbed from '~/components/plugins/SnackEmbed';

export default withDocumentationElements(meta);

This module allows reading geolocation information from the device. Your app can poll for the current location or subscribe to location update events.

You must request permission to access the user's location before attempting to get it. To do this, you will want to use the [Permissions](../permissions/) API. You can see this in practice in the following example.

<SnackEmbed snackId="H14SNiW3g" />

### `Location.hasServicesEnabledAsync()`

Checks whether location services are enabled by the user.

#### Returns

Returns a promise resolving to `true` if location services are enabled on the device, or `false` if not.

### `Location.requestPermissionsAsync()`

Requests the user for location permissions, similarly to `Permissions.askAsync(Permissions.LOCATION)`.

#### Returns

Returns a promise that resolves when the permissions are granted and rejects when denied.

### `Location.getCurrentPositionAsync(options)`

Get the current position of the device.

#### Arguments

-   **options : `object`** -- A map of options:
    -   **accuracy : `[Location.Accuracy](#expolocationaccuracy)`** -- Location manager accuracy. Pass one of [Location.Accuracy](#expolocationaccuracy) enum values. For low-accuracy the implementation can avoid geolocation providers that consume a significant amount of power (such as GPS).
    -   **maximumAge : `number`** -- (Android only). If specified, allow returning a previously cached position that is at most this old in milliseconds. If not specified, always gets a new location. On iOS this option is ignored and a new location is always returned.

#### Returns

Returns a promise resolving to an object representing [Location](#typelocation) type.

### `Location.watchPositionAsync(options, callback)`

Subscribe to location updates from the device. Please note that updates will only occur while the application is in the foreground. To get location updates while in background you'll need to use [`Location.startLocationUpdatesAsync`](#expolocationstartlocationupdatesasync).

#### Arguments

-   **options : `object`** -- A map of options:
    -   **accuracy (_[Location.Accuracy](#expolocationaccuracy)_** -- Location manager accuracy. Pass one of [Location.Accuracy](#expolocationaccuracy) enum values. For low accuracy the implementation can avoid geolocation providers that consume a significant amount of power (such as GPS).
    -   **timeInterval : `number`** -- Minimum time to wait between each update in milliseconds.
    -   **distanceInterval : `number`** -- Receive updates only when the location has changed by at least this distance in meters.

-   **callback : `function`** --

      This function is called on each location update. It is passed exactly one parameter: an object representing [Location](#typelocation) type.

#### Returns

Returns a promise resolving to a subscription object, which has one field:

-   **remove : `function`** -- Call this function with no arguments to remove this subscription. The callback will no longer be called for location updates.

### `Location.getProviderStatusAsync()`

Check status of location providers.

#### Returns

Returns a promise resolving to an object with the following fields:

-   **locationServicesEnabled : `boolean`** -- Whether location services are enabled. See [Location.hasServicesEnabledAsync](#expolocationhasservicesenabledasync) for a more convenient solution to get this value.
-   **gpsAvailable : `boolean`** (android only) -- If the GPS provider is available, if yes, location data will be from GPS.
-   **networkAvailable : `boolean`** (android only) -- If the network provider is available, if yes, location data will be from cellular network.
-   **passiveAvailable : `boolean`** (android only) -- If the passive provider is available, if yes, location data will be determined passively.

### `Location.getHeadingAsync()`

Gets the current heading information from the device

#### Returns

Object with:

- **magHeading : `number`** — measure of magnetic north in degrees
- **trueHeading : `number`** — measure of true north in degrees (needs location permissions, will return -1 if not given)
- **accuracy : `number`** — level of callibration of compass.
  - 3: high accuracy, 2: medium accuracy, 1: low accuracy, 0: none
  - Reference for iOS: 3: < 20 degrees uncertainty, 2: < 35 degrees, 1: < 50 degrees, 0: > 50 degrees


### `Location.watchHeadingAsync(callback)`

Subscribe to compass updates from the device.

#### Arguments

- **callback : `function`** --

    This function is called on each compass update. It is passed exactly one parameter: an object with the following fields:

    - **magHeading : `number`** — measure of magnetic north in degrees
    - **trueHeading : `number`** — measure of true north in degrees (needs location permissions, will return -1 if not given)
    - **accuracy : `number`** — level of callibration of compass.
    	- 3: high accuracy, 2: medium accuracy, 1: low accuracy, 0: none
    	- Reference for iOS: 3: < 20 degrees uncertainty, 2: < 35 degrees, 1: < 50 degrees, 0: > 50 degrees

#### Returns

Returns a promise resolving to a subscription object, which has one field:

- **remove (function)** — Call this function with no arguments to remove this subscription. The callback will no longer be called for location updates.

### `Location.geocodeAsync(address)`

Geocode an address string to latitiude-longitude location.

> **Note**: Geocoding is resource consuming and has to be used reasonably. Creating too many requests at a time can result in an error so they have to be managed properly.
>
> On Android, you must request a location permission (`Permissions.LOCATION`) from the user before geocoding can be used.

#### Arguments

- **address : `string`** -- A string representing address, eg. "Baker Street London"

#### Returns

Returns a promise resolving to an array (in most cases its size is 1) of geocoded location objects with the following fields:

-   **latitude : `number`** -- The latitude in degrees.
-   **longitude : `number`** -- The longitude in degrees.
-   **altitude : `number`** -- The altitude in meters above the WGS 84 reference ellipsoid.
-   **accuracy : `number`** -- The radius of uncertainty for the location, measured in meters.

### `Location.reverseGeocodeAsync(location)`

Reverse geocode a location to postal address.

> **Note**: Geocoding is resource consuming and has to be used reasonably. Creating too many requests at a time can result in an error so they have to be managed properly.

> On Android, you must request a location permission (`Permissions.LOCATION`) from the user before geocoding can be used.

#### Arguments

-   **location : `object`** -- An object representing a location:

    -   **latitude : `number`** -- The latitude of location to reverse geocode, in degrees.
    -   **longitude : `number`** -- The longitude of location to reverse geocode, in degrees.


#### Returns

Returns a promise resolving to an array (in most cases its size is 1) of address objects with following fields:

-   **city : `string`** -- City name of the address.
-   **street : `string`** -- Street name of the address.
-   **region : `string`** -- Region/area name of the address.
-   **postalCode : `string`** -- Postal code of the address.
-   **country : `string`** -- Localized country name of the address.
-   **name : `string`** -- Place name of the address, for example, "Tower Bridge".

### `Location.setApiKey(apiKey)`

Sets a Google API Key for using Geocoding API. This method can be useful for Android devices that do not have Google Play Services, hence no Geocoder Service. After setting the key using Google's API will be possible.

#### Arguments

-   **apiKey : `string`** -- API key collected from Google Developer site.

### `Location.installWebGeolocationPolyfill()`

Polyfills `navigator.geolocation` for interop with the core React Native and Web API approach to geolocation.

## Background Location

Background Location API can notify your app about new locations, also while it's in background. There are some requirements in order to use Background Location API:

- `Permissions.LOCATION` permission must be granted. On iOS it must be granted with `Always` option — see [`Permissions.LOCATION`](../permissions#expopermissionslocation) for more details.
- `"location"` background mode must be specified in `Info.plist` file. See [background tasks configuration guide](../task-manager#configuration). (*iOS only*)
- Background location task must be defined in the top-level scope, using [TaskManager.defineTask](../task-manager#taskmanagerdefinetasktaskname-task).

### `Location.startLocationUpdatesAsync(taskName, options)`

Registers for receiving location updates that can also come when the app is in the background.

#### Arguments

-   **taskName : `string`** -- Name of the task receiving location updates.
-   **options : `object`** -- An object of options passed to the location manager.
    -   **accuracy : `[Location.Accuracy](#expolocationaccuracy)`** -- Location manager accuracy. Pass one of [Location.Accuracy](#expolocationaccuracy) enum values. For low-accuracy the implementation can avoid geolocation providers that consume a significant amount of power (such as GPS).
    -   **timeInterval : `number`** -- Minimum time to wait between each update in milliseconds. Default value depends on `accuracy` option. (**Android only**)
    -   **distanceInterval : `number`** -- Receive updates only when the location has changed by at least this distance in meters. Default value may depend on `accuracy` option.
    -   **showsBackgroundLocationIndicator : `boolean`** -- A boolean indicating whether the status bar changes its appearance when location services are used in the background. Defaults to `false`. (**Takes effect only on iOS 11.0 and later**)

#### Returns

A promise resolving once the task with location updates is registered.

#### Task parameters

Background location task will be receiving following data:

-   **locations : `Array&lt;[Location](#typelocation)&gt;`** - An array of the new locations.

```javascript
import { TaskManager } from 'expo';

TaskManager.defineTask(YOUR_TASK_NAME, ({ data: { locations }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  console.log('Received new locations', locations);
});
```

### `Location.stopLocationUpdatesAsync(taskName)`

Stops location updates for given task.

#### Arguments

-   **taskName : `string`** -- Name of the background location task to stop.

#### Returns

A promise resolving as soon as the task is unregistered.

### `Location.hasStartedLocationUpdatesAsync(taskName)`

#### Arguments

-   **taskName : `string`** -- Name of the location task to check.

#### Returns

A promise resolving to boolean value indicating whether the location task is started or not.

## Geofencing

Geofencing API notifies your app when the device enters or leaves geographical regions you set up.
To make it work in the background, it uses [TaskManager](../task-manager) Native API under the hood. There are some requirements in order to use Geofencing API:

- `Permissions.LOCATION` permission must be granted. On iOS it must be granted with `Always` option — see [`Permissions.LOCATION`](../permissions#expopermissionslocation) for more details.
- `"location"` background mode must be specified in `Info.plist` file. See [background tasks configuration guide](../task-manager#configuration). (*iOS only*)
- Geofencing task must be defined in the top-level scope, using [`TaskManager.defineTask`](../task-manager#taskmanagerdefinetasktaskname-task).

### `Location.startGeofencingAsync(taskName, regions)`

Starts geofencing for given regions. When the new event comes, the task with specified name will be called with the region that the device enter to or exit from.
If you want to add or remove regions from already running geofencing task, you can just call `startGeofencingAsync` again with the new array of regions.

#### Arguments

-   **taskName : `string`** -- Name of the task that will be called when the device enters or exits from specified regions.
-   **regions : `array`** -- Array of region objects to be geofenced.
    -   **identifier : `string`** -- The identifier of the region object. Defaults to auto-generated UUID hash.
    -   **latitude : `number`** -- The latitude in degrees of region's center point. *required*
    -   **longitude : `number`** -- The longitude in degrees of region's center point. *required*
    -   **radius : `number`** -- The radius measured in meters that defines the region's outer boundary. *required*
    -   **notifyOnEnter : `boolean`** -- Boolean value whether to call the task if the device enters the region. Defaults to `true`.
    -   **notifyOnExit : `boolean`** -- Boolean value whether to call the task if the device exits the region. Defaults to `true`.

#### Returns

A promise resolving as soon as the task is registered.

#### Task parameters

Geofencing task will be receiving following data:
-   **eventType : `[Location.GeofencingEventType](#expolocationgeofencingeventtype)`** -- Indicates the reason for calling the task, which can be triggered by entering or exiting the region. See [Location.GeofencingEventType](#expolocationgeofencingeventtype).
-   **region : `[Region](#typeregion)`** -- Object containing details about updated region. See [Region](#typeregion) for more details.

```javascript
import { Location, TaskManager } from 'expo';

TaskManager.defineTask(YOUR_TASK_NAME, ({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (eventType === Location.GeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
});
```

### `Location.stopGeofencingAsync(taskName)`

Stops geofencing for specified task. It unregisters the background task so the app will not be receiving any updates, especially in the background.

#### Arguments

-   **taskName : `string`** -- Name of the task to unregister.

#### Returns

A promise resolving as soon as the task is unregistered.

### `Location.hasStartedGeofencingAsync(taskName)`

#### Arguments

-   **taskName : `string`** -- Name of the geofencing task to check.

#### Returns

A promise resolving to boolean value indicating whether the geofencing task is started or not.

## Types

### Type `Location`

Object of type `Location` contains following keys:

-   **coords : `object`** -- The coordinates of the position, with the following fields:
    -   **latitude : `number`** -- The latitude in degrees.
    -   **longitude : `number`** -- The longitude in degrees.
    -   **altitude : `number`** -- The altitude in meters above the WGS 84 reference ellipsoid.
    -   **accuracy : `number`** -- The radius of uncertainty for the location, measured in meters.
    -   **altitudeAccuracy : `number`** -- The accuracy of the altitude value, in meters (iOS only).
    -   **heading : `number`** -- Horizontal direction of travel of this device, measured in degrees starting at due north and continuing clockwise around the compass. Thus, north is 0 degrees, east is 90 degrees, south is 180 degrees, and so on.
    -   **speed : `number`** -- The instantaneous speed of the device in meters per second.
-   **timestamp : `number`** -- The time at which this position information was obtained, in milliseconds since epoch.

### Type `Region`

Object of type `Region` includes following fields:

-   **identifier : `string`** -- The identifier of the region object passed to `startGeofencingAsync` or auto-generated.
-   **latitude : `number`** -- The latitude in degress of region's center point.
-   **longitude : `number`** -- The longitude in degress of region's center point.
-   **radius : `number`** -- The radius measured in meters that defines the region's outer boundary.
-   **state : `[Location.GeofencingRegionState](#expolocationgeofencingregionstate)`** -- One of [Location.GeofencingRegionState](#expolocationgeofencingregionstate) region state. Determines whether the device is inside or outside a region.

## Enums

### `Location.Accuracy`

| Accuracy                     | Value | Description                                                                                   |
| ---------------------------- | ----- | --------------------------------------------------------------------------------------------- |
| `Accuracy.Lowest`            |   1   | Accurate to the nearest three kilometers.                                                     |
| `Accuracy.Low`               |   2   | Accurate to the nearest kilometer.                                                            |
| `Accuracy.Balanced`          |   3   | Accurate to within one hundred meters.                                                        |
| `Accuracy.High`              |   4   | Accurate to within ten meters of the desired target.                                          |
| `Accuracy.Highest`           |   5   | The best level of accuracy available.                                                         |
| `Accuracy.BestForNavigation` |   6   | The highest possible accuracy that uses additional sensor data to facilitate navigation apps. |

### `Location.GeofencingEventType`

| Event type                  | Value | Description                                        |
| --------------------------- | ----- | -------------------------------------------------- |
| `GeofencingEventType.Enter` |   1   | Emitted when the device entered observed region.   |
| `GeofencingEventType.Exit`  |   2   | Occurs as soon as the device left observed region. |

### `Location.GeofencingRegionState`

| Region state                    | Value | Description                                     |
| ------------------------------- | ----- | ----------------------------------------------- |
| `GeofencingRegionState.Inside`  |   1   | Indicates that the device is inside the region. |
| `GeofencingRegionState.Outside` |   2   | Inverse of inside state.                        |
