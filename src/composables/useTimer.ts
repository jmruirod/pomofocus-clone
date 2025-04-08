import { ref } from "vue";

export function useTimer() {
  const isRunning = ref(false);
  const currentTime = ref(0);
  let interval: number;

  function startTimer(callback: () => void, intervalTime: number = 1000) {
    isRunning.value = true;
    interval = setInterval(() => {
      if (isRunning.value && currentTime.value > 0) {
        currentTime.value--;
      }

      if (currentTime.value <= 0) {
        callback();
      }
    }, intervalTime);
  }

  function stopTimer() {
    isRunning.value = false;
    clearInterval(interval);
  }

  function setTime(time: number) {
    currentTime.value = time * 60;
  }

  return {
    isRunning,
    currentTime,
    startTimer,
    stopTimer,
    setTime,
  };
}
