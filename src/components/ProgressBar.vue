<script setup lang="ts">
import { pomodoroStore } from "@/store/pomodoroStore";
import { computed } from "vue";

const progress = computed(() => {
  const totalTime = pomodoroStore.getActiveTime();
  return 100 - (pomodoroStore.currentTime / totalTime) * 100;
});
</script>

<template>
  <div class="bg-[#0000001a] h-[1px] w-full flex items-center">
    <div class="bg-white h-full w-0" :style="`width: ${progress}%`"></div>
  </div>
</template>
