<script setup lang="ts">
import HeaderButton from "./components/HeaderButton.vue";
import AddTaskButton from "./components/AddTaskButton.vue";
import TabBar from "./components/TabBar.vue";
import { pomodoroStore } from "./store/pomodoroStore";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};
</script>

<template>
  <div
    class="h-screen transition-colors duration-500 ease-in-out"
    :class="{ 'bg-red-700/70': pomodoroStore.tabs[0].active, 'bg-teal-700/80': pomodoroStore.tabs[1].active, 'bg-cyan-800/70': pomodoroStore.tabs[2].active }"
  >
    <div class="flex flex-col gap-6 mx-auto w-2xl">
      <header class="flex items-center justify-between py-3 border-b-1 border-slate-600">
        <a href="/" class="flex items-center gap-2">
          <img src="/images/icon-white2.png" alt="logo" class="h-5 w-5" />
          <h1 class="text-xl font-bold text-white">Pomofocus</h1>
        </a>
        <div class="flex items-center gap-3">
          <HeaderButton icon="graph-white" text="Report" />
          <HeaderButton icon="config-white" text="Settings" />
          <HeaderButton icon="user-white" text="Sign in" />
          <HeaderButton icon="threedots-white" />
        </div>
      </header>

      <main class="min-h-[300px] mt-6 mx-auto w-lg bg-white/10 flex flex-col items-center justify-between py-7 rounded-md">
        <TabBar />
        <div class="p-6 text-9xl font-bold text-white">{{ formatTime(pomodoroStore.currentTime) }}</div>
        <div class="grid grid-cols-[1fr_200px_1fr] w-full items-center">
          <button
            class="col-start-2 font-bold text-2xl rounded-sm px-16 py-3 bg-white -translate-y-2 transition-all"
            :class="{
              'shadow-[0px_6px_0px_rgb(235,235,235)] active:shadow-none active:translate-y-0': !pomodoroStore.isRunning,
              'translate-y-0': pomodoroStore.isRunning,
              'text-red-800/70': pomodoroStore.tabs[0].active,
              'text-teal-800/70': pomodoroStore.tabs[1].active,
              'text-cyan-800/70': pomodoroStore.tabs[2].active,
            }"
            @click="pomodoroStore.toggleRunning()"
          >
            {{ pomodoroStore.isRunning ? "PAUSE" : "START" }}
          </button>

          <button v-if="pomodoroStore.isRunning" class="col-start-3 mx-auto hover:opacity-80 transition-all">
            <img src="/images/next-white3.png" alt="logo" class="h-[22px] w-[22px]" />
          </button>
        </div>
      </main>

      <section class="flex flex-col items-center mx-auto w-lg">
        <div class="flex flex-col items-center">
          <button class="text-white opacity-80 hover:opacity-100 transition-all" @click="pomodoroStore.clearCount()">
            #{{ pomodoroStore.tabs[0].active ? pomodoroStore.currentInterval : pomodoroStore.currentBreak }}
          </button>
          <span class="text-white text-lg">{{ pomodoroStore.tabs[0].active ? "Time to focus!" : "Time for a break!" }}</span>
        </div>

        <div class="flex flex-col w-full gap-4">
          <div class="flex justify-between items-center border-b-2 border-white pt-1 pb-3">
            <div class="text-white text-lg font-bold">Tasks</div>
            <HeaderButton icon="threedots-white" />
          </div>

          <AddTaskButton icon="plus-circle-white" text="Add Task" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
