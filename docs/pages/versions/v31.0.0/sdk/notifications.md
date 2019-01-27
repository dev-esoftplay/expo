---
title: Notifications
---

import withDocumentationElements from '~/components/page-higher-order/withDocumentationElements';

export default withDocumentationElements(meta);

Provides access to remote notifications (also known as push notifications) and local notifications (scheduling and immediate) related functions.

## Subscribing to Notifications

### `Expo.Notifications.addListener(listener)`

#### Arguments

-   **listener : `function`** -- A callback that is invoked when a remote or local notification is received or selected, with a Notification object.

#### Returns

An [EventSubscription](#eventsubscription) object that you can call remove() on when you would like to unsubscribe the listener.

### Related types

### `EventSubscription`

Returned from `addListener`.

-   **remove() : `function`** -- Unsubscribe the listener from future notifications.
    `Notification`

An object that is passed into each event listener when a notification is received:

-   **origin : `string`** -- Either `selected` or `received`. `selected` if the notification was tapped on by the user, `received` if the notification was received while the user was in the app.
-   **data : `object`** -- Any data that has been attached with the notification.
-   **remote : `boolean`** -- `true` if the notification is a push notification, `false` if it is a local notification.

## Notifications

### `Expo.Notifications.getExpoPushTokenAsync()`

#### Returns

Returns a Promise that resolves to a token string. This token can be provided to the Expo notifications backend to send a push notification to this device. [Read more in the Push Notifications guide](../../guides/push-notifications/#push-notifications).

The Promise will be rejected if the app does not have permission to send notifications. Be sure to check the result of `Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS)` before attempting to get an Expo push token.

### `Expo.Notifications.presentLocalNotificationAsync(localNotification)`

Trigger a local notification immediately.

#### Arguments

-   **localNotification : `object`** -- An object with the properties described in [LocalNotification](#localnotification).

#### Returns

A Promise that resolves to a unique notification id.

### `Expo.Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)`

Schedule a local notification to fire at some specific time in the future or at a given interval.

#### Arguments

-   **localNotification : `object`** --

      An object with the properties described in [LocalNotification](#localnotification).

-   **schedulingOptions : `object`** --

      An object that describes when the notification should fire.

    -   **time** (_date_ or _number_) -- A Date object representing when to fire the notification or a number in Unix epoch time. Example: `(new Date()).getTime() + 1000` is one second from now.
    -   **repeat** : `optional` : `string` -- `'minute'`, `'hour'`, `'day'`, `'week'`, `'month'`, or `'year'`.
    - : `Android only` **intervalMs** : `optional` : `number` -- Repeat interval in number of milliseconds

#### Returns

A Promise that resolves to a unique notification id.

### `Expo.Notifications.dismissNotificationAsync(localNotificationId)`

_Android only_. Dismisses the notification with the given id.

#### Arguments

-   **localNotificationId : `number`** -- A unique id assigned to the notification, returned from `scheduleLocalNotificationAsync` or `presentLocalNotificationAsync`.

### `Expo.Notifications.dismissAllNotificationsAsync()`

_Android only_. Clears any notifications that have been presented by the app.

### `Expo.Notifications.cancelScheduledNotificationAsync(localNotificationId)`

Cancels the scheduled notification corresponding to the given id.

#### Arguments

-   **localNotificationId : `number`** -- A unique id assigned to the notification, returned from `scheduleLocalNotificationAsync` or `presentLocalNotificationAsync`.

### `Expo.Notifications.cancelAllScheduledNotificationsAsync()`

Cancel all scheduled notifications.

### `Expo.Notifications.createChannelAndroidAsync(id, channel)`

_Android only_. On Android 8.0+, creates a new notification channel to which local and push notifications may be posted. Channels are visible to your users in the OS Settings app as "categories", and they can change settings or disable notifications entirely on a per-channel basis. NOTE: after calling this method, you may no longer be able to alter the settings for this channel, and cannot fully delete the channel without uninstalling the app. Notification channels are required on Android 8.0+, but use this method with caution and be sure to plan your channels carefully.

According to the [Android docs](https://developer.android.com/training/notify-user/channels),

>You should create a channel for each distinct type of notification you need to send. You can also create notification channels to reflect choices made by users of your app. For example, you can set up separate notification channels for each conversation group created by a user in a messaging app.

On devices with Android 7.1 and below, Expo will "polyfill" channels for you by saving your channel's settings and automatically applying them to any notifications you designate with the `channelId`.

#### Arguments

-   **id : `string`** -- A unique string to assign as the ID of this channel. When you present notifications later, you will pass this ID in order to associate them with your channel.
-   **channel : `object`** -- An object with the properties described in [ChannelAndroid](#channelandroid).

### `Expo.Notifications.deleteChannelAndroidAsync(id)`

_Android only_. On Android 8.0+, deletes the notification channel with the given ID. Note that the OS Settings UI will display the number of deleted notification channels to the user as a spam prevention mechanism, so the only way to fully delete a channel is to uninstall the app or clearing all app data.

#### Arguments

-   **id : `string`** -- ID string of the channel to delete.

### Related types

#### LocalNotification
An object used to describe the local notification that you would like to present or schedule.

-   **title : `string`** -- title text of the notification
-   **body : `string`** -- body text of the notification.
-   **data : `optional` : `object`** -- any data that has been attached with the notification.
-   **ios : `optional` : `object`** -- notification configuration specific to iOS.
    -   **sound** : `optional` : `boolean` -- if `true`, play a sound. Default: `false`.
-   **android : `optional` : `object`** -- notification configuration specific to Android.
    -   **channelId** : `optional, but recommended` : `string` -- ID of the channel to post this notification to in Android 8.0+. If null, defaults to the "Default" channel which Expo will automatically create for you. If you don't want Expo to create a default channel, make sure to always specify this field for all notifications.
    -   **icon** : `optional` : `string` -- URL of icon to display in notification drawer.
    -   **color** : `optional` : `string` -- color of the notification icon in notification drawer.
    -   **sticky** : `optional` : `boolean` -- if `true`, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: `false`.
    -   **link** : `optional` : `string` -- external link to open when notification is selected.

#### ChannelAndroid
An object used to describe an Android notification channel that you would like to create.

-   **name : `string`** -- user-facing name of the channel (or "category" in the Settings UI). Required.
-   **description : `optional` : `string`** -- user-facing description of the channel, which will be displayed in the Settings UI.
-   **sound : `optional` : `boolean`** -- if `true`, notifications posted to this channel will play a sound. Default: `false`.
-   **priority : `optional` : `min | low | default | high | max`** -- Android may present notifications in this channel differently according to the priority. For example, a `high` priority notification will likely to be shown as a heads-up notification. Note that the Android OS gives no guarantees about the user-facing behavior these abstractions produce -- for example, on many devices, there is no noticeable difference between `high` and `max`.
-   **vibrate : `optional` (_boolean_ or _array_)** -- if `true`, vibrate the device whenever a notification is posted to this channel. An array can be supplied instead to customize the vibration pattern, e.g. - `[ 0, 500 ]` or `[ 0, 250, 250, 250 ]`. Default: `false`.
-   **badge : `optional` : `boolean`** -- if `true`, unread notifications posted to this channel will cause the app launcher icon to be displayed with a badge on Android 8.0+. If `false`, notifications in this channel will never cause a badge. Default: `true`.

## App Icon Badge Number (iOS)

### `Expo.Notifications.getBadgeNumberAsync()`

#### Returns

Returns a promise that resolves to the number that is displayed in a badge on the app icon. This method returns zero when there is no badge (or when on Android).

### `Expo.Notifications.setBadgeNumberAsync(number)`

Sets the number displayed in the app icon's badge to the given number. Setting the number to zero will both clear the badge and the list of notifications in the device's notification center on iOS. On Android this method does nothing.

## Standalone App Only

### `Expo.Notifications.getDevicePushTokenAsync(config)`

Note: Most people do not need to use this. It is easier to use `getExpoPushTokenAsync` unless you have a specific reason to need the actual device tokens. We also don't guarantee that the iOS and Android clients will continue expecting the same push notification payload format.

Returns a native APNS, FCM or GCM token that can be used with another push notification service. If firebase cloud messaging is configured on your standalone Android app ([see guide here](../../guides/using-fcm/)), it will return an FCM token, otherwise it will return a GCM token.

#### Arguments

-   **config : `object`** -- An object with the following fields:
    -   **gcmSenderId : `string`** -- GCM sender ID.

#### Returns

A Promise that resolves to an object with the following fields:
-   **type : `string`** -- Either "apns", "fcm", or "gcm".
-   **data : `string`** -- The push token as a string.
