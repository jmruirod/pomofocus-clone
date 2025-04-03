<script setup lang="ts">
import { pomodoroStore } from "../store/pomodoroStore";
</script>

<template>
  <div class="flex items-center justify-center gap-1">
    <button
      v-for="tab in pomodoroStore.tabs"
      :key="tab.name"
      class="py-0.5 px-3 rounded-sm text-white active:translate-y-0.5 transition-transform"
      :class="{ 'bg-slate-900/20 font-bold': tab.active }"
      @click="pomodoroStore.handleTabClick(tab.name)"
    >
      {{ tab.name }}
    </button>
  </div>
</template>
