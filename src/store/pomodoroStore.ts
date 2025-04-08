import { reactive } from "vue";
import { useTimer } from "@/composables/useTimer";
import { useTabs } from "@/composables/useTabs";
import { useNotifications } from "@/composables/useNotifications";
import { config } from "@/config/config";
import { TabType } from "@/enum/TabType";

export const pomodoroStore = reactive({
  currentInterval: 1,
  ...useTimer(),
  ...useTabs(),
  ...useNotifications(),

  initializeStore() {
    config.readConfig();
    this.updateTabsTime();
    this.setTime(this.getActiveTime());
  },

  updateStore() {
    this.updateTabsTime();

    if (!this.isRunning) {
      this.setTime(this.getActiveTime());
    }
  },

  handleTabClick(tab: TabType) {
    this.stopTimer();
    this.selectTab(tab);
    this.setTime(this.getActiveTime());
  },

  startNextTab() {
    const isLongBreak = this.currentInterval % config.longBreakInterval === 0;
    const message = this.getActiveTab() === TabType.Pomodoro ? "Time to focus!" : isLongBreak ? "Time to take a long break!" : "Time to take a short break!";
    const nextTab = this.getActiveTab() === TabType.Pomodoro ? (isLongBreak ? TabType.LongBreak : TabType.ShortBreak) : TabType.Pomodoro;
    this.stopTimer();
    this.showNotification(message);
    this.selectTab(nextTab);
    this.setTime(this.getActiveTime());

    if (this.getActiveTab() === TabType.Pomodoro) {
      this.currentInterval++;
    }

    setTimeout(() => {
      if (this.getActiveTab() === TabType.Pomodoro ? config.autoStartPomodoro : config.autoStartBreak) {
        this.startTimer(() => this.startNextTab());
      }
    }, 700);
  },

  toggleRunning() {
    if (this.isRunning) {
      this.stopTimer();
    } else {
      this.startTimer(() => this.startNextTab());
    }
  },

  clearCount() {
    const response = confirm("Do you want to refresh the pomodoro count?");
    if (response) {
      this.currentInterval = 1;
    }
  },
});
