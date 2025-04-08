<script setup lang="ts">
import { pomodoroStore } from "@/store/pomodoroStore";
import { config } from "@/config/config";
import SwitchButton from "@/components/SwitchButton.vue";

const emit = defineEmits(["close"]);

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const value = parseFloat(input.value);
  if (isNaN(value)) {
    input.value = "0.1"; //TODO
  }

  switch (input.name) {
    case "Pomodoro":
      config.pomodoroTime = value;
      break;
    case "shortBreak":
      config.shortBreakTime = value;
      break;
    case "longBreak":
      config.longBreakTime = value;
      break;
    case "longBreakInterval":
      config.longBreakInterval = value;
      break;
  }
};

const handleClose = () => {
  emit("close");
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
              <input
                name="Pomodoro"
                type="number"
                class="col-start-1 row-start-2 w-full"
                min="1"
                step="1"
                :value="config.pomodoroTime"
                @input="handleInput($event)"
              />
              <label for="shortBreak" class="col-start-2">Short Break</label>
              <input
                name="shortBreak"
                type="number"
                class="col-start-2 row-start-2 w-full"
                min="1"
                step="1"
                :value="config.shortBreakTime"
                @input="handleInput($event)"
              />
              <label for="longBreak" class="col-start-3">Long Break</label>
              <input
                name="longBreak"
                type="number"
                class="col-start-3 row-start-2 w-full"
                min="1"
                step="1"
                :value="config.longBreakTime"
                @input="handleInput($event)"
              />
            </div>
          </div>

          <div class="py-2 grid justify-between items-center gap-6">
            <h3 class="font-semibold opacity-60 col-start-1">Auto Start Breaks</h3>
            <SwitchButton class="col-start-2 justify-self-end" :isActive="config.autoStartBreak" @update:isActive="config.autoStartBreak = $event" />

            <h3 class="font-semibold opacity-60 col-start-1">Auto Start Pomodoros</h3>
            <SwitchButton class="col-start-2 justify-self-end" :isActive="config.autoStartPomodoro" @update:isActive="config.autoStartPomodoro = $event" />

            <h3 class="font-semibold opacity-60 col-start-1">Long Break Interval</h3>
            <input
              name="longBreakInterval"
              type="number"
              class="w-20 px-3 py-2 rounded-md bg-stone-200 outline-none opacity-70 col-start-2"
              min="1"
              step="1"
              :value="config.longBreakInterval"
              @input="handleInput($event)"
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
