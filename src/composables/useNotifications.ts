import { ref } from "vue";

export function useNotifications() {
  const notificationPermission = ref<NotificationPermission>("default");

  const requestPermission = async () => {
    notificationPermission.value = await Notification.requestPermission();
  };

  const showNotification = (message: string) => {
    if (notificationPermission.value === "granted") {
      new Notification(message);
      const audio = new Audio("/sound/alarm-wood.mp3");
      audio.play();
    } else {
      console.warn("Notification permission not granted.");
    }
  };

  return {
    notificationPermission,
    requestPermission,
    showNotification,
  };
}
