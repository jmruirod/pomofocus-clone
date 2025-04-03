import { reactive } from "vue";

const pomodoroTime = 5;
const shortBreakTime = 6;
const longBreakTime = 15 * 60;
const longBreakInterval = 4;
const autoStartPomodoro = true;
const autoStartBreak = true;
let interval: number;
export const pomodoroStore = reactive({
  isRunning: false,
  currentInterval: 1,
  currentBreak: 1,
  currentTime: pomodoroTime,
  tabs: [
    { name: "Pomodoro", active: true, time: pomodoroTime },
    { name: "Short Break", active: false, time: shortBreakTime },
    { name: "Long Break", active: false, time: longBreakTime },
  ],

  handleTabClick(tab: string) {
    clearInterval(interval);
    this.tabs.forEach((t) => {
      t.active = t.name == tab ? true : false;

      if (t.active) {
        this.currentTime = t.time;
      }
    });

    this.isRunning = false;
  },

  selectTab(tab: string) {
    this.tabs.forEach((t) => {
      t.active = t.name == tab ? true : false;
    });
  },

  toggleRunning() {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      const isLongBreak = this.currentInterval % longBreakInterval === 0;
      interval = setInterval(() => {
        console.log("dentro", this.currentTime);
        if (this.isRunning && this.currentTime > 0) {
          this.currentTime--;
        }

        if (this.currentTime === 0) {
          this.selectTab(this.tabs[0].active ? (isLongBreak ? this.tabs[2].name : this.tabs[1].name) : this.tabs[0].name);
          this.currentTime = this.tabs[0].active ? pomodoroTime : isLongBreak ? longBreakTime : shortBreakTime;
          if (this.tabs[0].active) {
            this.currentInterval++;
            this.currentBreak++;
          }
          this.isRunning = this.tabs[0].active ? autoStartPomodoro : autoStartBreak;
          if (!this.isRunning) {
            clearInterval(interval);
          }
        }
      }, 1000);
      console.log("inicia", interval);
    }
  },

  clearCount() {
    const response = confirm("Do you want to refresh the pomodoro count?");
    if (response) {
      this.currentInterval = 1;
      this.currentBreak = 1;
    }
  },
});
