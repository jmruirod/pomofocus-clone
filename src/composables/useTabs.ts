import { TabType } from "@/enum/TabType";
import { config } from "@/config/config";
import { ref } from "vue";

interface Tab {
  name: TabType;
  active: boolean;
  time: number;
}

export function useTabs() {
  const tabs = ref([
    { name: TabType.Pomodoro, active: true, time: config.pomodoroTime },
    { name: TabType.ShortBreak, active: false, time: config.shortBreakTime },
    { name: TabType.LongBreak, active: false, time: config.longBreakTime },
  ]);
  let activeIndex = tabs.value.findIndex((tab: Tab) => tab.active);

  function selectTab(tabName: TabType) {
    const index = tabs.value.findIndex((tab) => tab.name === tabName);
    if (index !== -1) {
      tabs.value[activeIndex].active = false;
      tabs.value[index].active = true;
      activeIndex = index;
    }
  }

  function getActiveTab() {
    return tabs.value[activeIndex].name;
  }

  function getActiveTime() {
    return tabs.value[activeIndex].time;
  }

  function updateTabsTime() {
    tabs.value = tabs.value.map((tab) => {
      let time: number;
      switch (tab.name) {
        case TabType.Pomodoro:
          time = config.pomodoroTime;
          break;
        case TabType.ShortBreak:
          time = config.shortBreakTime;
          break;
        case TabType.LongBreak:
          time = config.longBreakTime;
          break;
        default:
          time = tab.time;
      }
      return { ...tab, time };
    });
  }

  return {
    tabs,
    activeIndex,
    selectTab,
    getActiveTab,
    getActiveTime,
    updateTabsTime,
  };
}
