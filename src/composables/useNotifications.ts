export function useNotifications() {
  const showNotification = async (message: string) => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(message);
        const audio = new Audio("/pomofocus-clone/sound/alarm-wood.mp3");
        audio.play();
      } else {
        console.warn("Notification permission not granted.");
      }
    });
  };

  return {
    showNotification,
  };
}
