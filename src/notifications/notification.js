import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';


class NotificationManager {
  configure = () => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('[NotificationManager] onRegister token:', token);
      },
      onNotification: function (notification) {
        console.log('[NotificationManager] onNotification:', notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS==='ios',
    });
  };
  
  _buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    PushNotification.createChannel(
      {
        channelId: "12345678", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    return {
      id: id,
      channelId:'12345678',
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_launcher',
      smallIcon: options.smallIcon || 'ic_notification',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high',
      data: data,
    };
  };
  showNotification = (id, title, message, data = {}, options = {}) => {
    PushNotification.localNotification({
      ...this._buildAndroidNotification(id, title, message, data, options),
      title: title || '',
      message: message || '',
      playSound: options.playSound || true,
      soundName: options.soundName || 'default',
      userInteraction: false,
    });
  };
  cacncelAllNotifications = () => {
      PushNotification.cancelAllLocalNotifications();
  };
  unregister = () => {
    PushNotification.unregister();
  };
}

export const notificationManager = new NotificationManager()