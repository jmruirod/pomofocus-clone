<script setup lang="ts">
const props = defineProps<{
  icon?: string;
  text?: string;
}>();
</script>

<template>
  <button class="flex justify-center gap-1 py-4.5 opacity-80 hover:opacity-100 bg-slate-900/10 border-dashed border-2 border-white/50 rounded-sm font-bold">
    <img :src="`/pomofocus-clone/images/${props.icon}.png`" alt="logo" class="h-5 w-5" />
    <span class="text-white/90 hover:text-white text-sm">{{ text }}</span>
  </button>
</template>
