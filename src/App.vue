<script setup lang="ts">
import HeaderButton from "@/components/HeaderButton.vue";
import AddTaskButton from "@/components/AddTaskButton.vue";
import TabBar from "@/components/TabBar.vue";
import ConfigModal from "@/components/ConfigModal.vue";
import { computed, ref, watch } from "vue";
import { useFormat } from "@/composables/useFormat";
import ProgressBar from "@/components/ProgressBar.vue";
import { pomodoroStore } from "@/store/pomodoroStore";
import LoadingScreen from "@/components/LoadingScreen.vue";
pomodoroStore.initializeStore();

const loading = ref(true);
setTimeout(() => {
  loading.value = false;
}, 1000);

const { formatTime } = useFormat();
const text = computed(() => (pomodoroStore.tabs[0].active ? "Time to focus!" : "Time for a break!"));
document.title = `${formatTime(pomodoroStore.currentTime)} - ${text.value}`;

const showConfigModal = ref(false);

watch(
  () => pomodoroStore.currentTime,
  (currentTime) => {
    document.title = `${formatTime(currentTime)} - ${text.value}`;
  },
);
</script>

<template>
  <LoadingScreen v-if="loading" />

  <div
    v-if="!loading"
    class="h-screen flex flex-col items-center px-4 bg-red-800/80 transition-colors duration-500 ease-in-out"
    :class="{ 'bg-red-800/80': pomodoroStore.tabs[0].active, 'bg-teal-800/80': pomodoroStore.tabs[1].active, 'bg-sky-800/80': pomodoroStore.tabs[2].active }"
  >
    <div class="flex flex-col gap-6 w-full max-w-2xl items-center">
      <header class="w-full">
        <div class="flex items-center justify-between py-3">
          <a href="/" class="flex items-center gap-2">
            <img src="/images/icon-white2.png" alt="logo" class="h-5 w-5" />
            <h1 class="text-xl font-bold text-white">Pomofocus</h1>
          </a>
          <div class="flex items-center gap-3">
            <HeaderButton icon="graph-white" text="Report" />
            <HeaderButton icon="config-white" text="Settings" @click="showConfigModal = true" />
            <HeaderButton icon="user-white" text="Sign in" />
            <HeaderButton icon="threedots-white" />
          </div>
        </div>
        <ProgressBar class="-mt-px" />
      </header>

      <main class="flex flex-col items-center justify-between mt-6 w-full max-w-lg bg-white/10 py-7 rounded-md">
        <TabBar />
        <div class="p-6 text-8xl md:text-9xl font-bold text-white">{{ formatTime(pomodoroStore.currentTime) }}</div>
        <div class="grid grid-cols-[1fr_200px_1fr] w-full items-center">
          <button
            class="col-start-2 font-bold text-2xl rounded-sm px-16 py-3 bg-white -translate-y-2 transition-all"
            :class="{
              'shadow-[0px_6px_0px_rgb(235,235,235)] active:shadow-none active:translate-y-0': !pomodoroStore.isRunning,
              'translate-y-0': pomodoroStore.isRunning,
              'text-red-800/80': pomodoroStore.tabs[0].active,
              'text-teal-800/80': pomodoroStore.tabs[1].active,
              'text-cyan-800/80': pomodoroStore.tabs[2].active,
            }"
            @click="pomodoroStore.toggleRunning()"
          >
            {{ pomodoroStore.isRunning ? "PAUSE" : "START" }}
          </button>

          <button v-if="pomodoroStore.isRunning" class="col-start-3 mx-auto hover:opacity-80 transition-all" @click="pomodoroStore.startNextTab()">
            <img src="/images/next-white3.png" alt="logo" class="h-[22px] w-[22px]" />
          </button>
        </div>
      </main>

      <section class="flex flex-col items-center w-full max-w-lg">
        <div class="flex flex-col items-center">
          <button class="text-white opacity-80 hover:opacity-100 transition-all" @click="pomodoroStore.clearCount()">
            #{{ pomodoroStore.currentInterval }}
          </button>
          <span class="text-white text-lg">{{ text }}</span>
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

  <ConfigModal v-if="showConfigModal" @close="showConfigModal = false" />
</template>

<style scoped></style>
