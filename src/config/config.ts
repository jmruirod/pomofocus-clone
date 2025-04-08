export const config = {
  pomodoroTime: 5,
  shortBreakTime: 6,
  longBreakTime: 15,
  longBreakInterval: 4,
  autoStartPomodoro: false,
  autoStartBreak: true,

  readConfig: () => {
    const localConfigJSON = localStorage.getItem("pomoclone-config");
    if (localConfigJSON) {
      const localConfig = JSON.parse(localConfigJSON);
      config.pomodoroTime = localConfig.pomodoroTime;
      config.shortBreakTime = localConfig.shortBreakTime;
      config.longBreakTime = localConfig.longBreakTime;
      config.longBreakInterval = localConfig.longBreakInterval;
      config.autoStartPomodoro = localConfig.autoStartPomodoro;
      config.autoStartBreak = localConfig.autoStartBreak;
    }
  },

  updateLocalStorage: () => {
    localStorage.setItem("pomoclone-config", JSON.stringify(config));
  },
};
