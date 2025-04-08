<script setup lang="ts">
const props = defineProps<{
  icon?: string;
  text?: string;
  size?: string;
}>();

const sizeClass = `h-${props.size} w-${props.size}`;
</script>

<template>
  <button class="flex items-center opacity-80 hover:opacity-100 gap-1 rounded-sm p-2" :class="{ 'md:py-1.5 md:px-3': text, 'md:p-2': !text }">
    <img v-if="icon" :src="`/images/${icon}.png`" alt="logo" :class="sizeClass" />
    <span v-if="text" class="text-white/90 hover:text-white text-sm hidden md:inline">{{ text }}</span>
  </button>
</template>
