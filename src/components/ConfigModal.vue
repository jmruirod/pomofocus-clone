<script setup lang="ts">
import { pomodoroStore } from "@/store/pomodoroStore";
import { config } from "@/config/config";
import SwitchButton from "@/components/SwitchButton.vue";
import { ref } from "vue";

const form = ref({
  pomodoroTime: config.pomodoroTime,
  shortBreakTime: config.shortBreakTime,
  longBreakTime: config.longBreakTime,
  longBreakInterval: config.longBreakInterval,
  autoStartBreak: config.autoStartBreak,
  autoStartPomodoro: config.autoStartPomodoro,
});

const emit = defineEmits(["close"]);

const checkInput = (input: number) => {
  let value = input;
  if (isNaN(value) || value <= 0 || value > 999) {
    value = 1;
  }
  return value;
};

const checkInputs = () => {
  form.value.pomodoroTime = checkInput(form.value.pomodoroTime);
  form.value.shortBreakTime = checkInput(form.value.shortBreakTime);
  form.value.longBreakTime = checkInput(form.value.longBreakTime);
  form.value.longBreakInterval = checkInput(form.value.longBreakInterval);
};

const updateConfig = () => {
  config.pomodoroTime = form.value.pomodoroTime;
  config.shortBreakTime = form.value.shortBreakTime;
  config.longBreakTime = form.value.longBreakTime;
  config.longBreakInterval = form.value.longBreakInterval;
  config.autoStartBreak = form.value.autoStartBreak;
  config.autoStartPomodoro = form.value.autoStartPomodoro;
};

const handleClose = () => {
  emit("close");
  checkInputs();
  updateConfig();
  pomodoroStore.updateStore();
  config.updateLocalStorage();
};
</script>
<template>
  <div class="fixed bg-black/40 top-0 left-0 right-0 bottom-0 flex items-center justify-center py-17" @click="handleClose">
    <div class="bg-white min-w-sm max-w-sm rounded-md shadow-md" @click.stop>
      <header class="border-b-1 border-stone-200 grid grid-flow-col justify-between items-center px-4 py-3">
        <h1 class="font-bold col-start-2 opacity-40">SETTINGS</h1>
        <button class="col-start-3 cursor-pointer opacity-40 hover:opacity-60 transition-all" @click="handleClose">
          <img src="/images/remove-black-sm.png" alt="close" class="w-4 active:scale-80" />
        </button>
      </header>

      <main class="flex flex-col gap-2 p-4 divide-y-2 divide-stone-200">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2 opacity-40">
            <img src="/images/clock-black.png" alt="clock" class="w-4" />
            <h2 class="font-semibold">TIMER</h2>
          </div>

          <div class="py-2 flex flex-col gap-1">
            <h3 class="font-semibold opacity-60">Times (minutes)</h3>
            <div
              class="grid grid-cols-3 gap-x-9 [&>label]:opacity-40 [&>label]:font-semibold [&>label]:text-sm [&>input]:px-3 [&>input]:py-2 [&>input]:rounded-md [&>input]:bg-stone-200 [&>input]:outline-none [&>input]:opacity-70"
            >
              <label for="Pomodoro" class="col-start-1">Pomodoro</label>
              <input name="Pomodoro" type="number" class="col-start-1 row-start-2 w-full" min="1" step="1" v-model="form.pomodoroTime" />
              <label for="shortBreak" class="col-start-2">Short Break</label>
              <input name="shortBreak" type="number" class="col-start-2 row-start-2 w-full" min="1" step="1" v-model="form.shortBreakTime" />
              <label for="longBreak" class="col-start-3">Long Break</label>
              <input name="longBreak" type="number" class="col-start-3 row-start-2 w-full" min="1" step="1" v-model="form.longBreakTime" />
            </div>
          </div>

          <div class="py-2 grid justify-between items-center gap-6">
            <h3 class="font-semibold opacity-60 col-start-1">Auto Start Breaks</h3>
            <SwitchButton class="col-start-2 justify-self-end" :isActive="form.autoStartBreak" @update:isActive="form.autoStartBreak = $event" />

            <h3 class="font-semibold opacity-60 col-start-1">Auto Start Pomodoros</h3>
            <SwitchButton class="col-start-2 justify-self-end" :isActive="form.autoStartPomodoro" @update:isActive="form.autoStartPomodoro = $event" />

            <h3 class="font-semibold opacity-60 col-start-1">Long Break Interval</h3>
            <input
              name="longBreakInterval"
              type="number"
              class="w-20 px-3 py-2 rounded-md bg-stone-200 outline-none opacity-70 col-start-2"
              min="1"
              step="1"
              v-model="form.longBreakInterval"
            />
          </div>
        </div>
      </main>

      <footer class="flex justify-end rounded-b-md p-4 bg-stone-200 opacity-80">
        <button
          class="bg-black opacity-95 hover:opacity-100 active:scale-95 transition-all text-white px-6 py-1.5 rounded-md cursor-pointer"
          @click="handleClose"
        >
          OK
        </button>
      </footer>
    </div>
  </div>
</template>
