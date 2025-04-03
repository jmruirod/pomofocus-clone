<script setup lang="ts">
defineProps<{
  icon?: string;
  text?: string;
  size?: string;
}>();
</script>

<template>
  <button class="flex items-center opacity-80 hover:opacity-100 gap-2 rounded-sm" :class="{ 'py-1.5 px-3': text, 'p-2': !text }">
    <img v-if="icon" :src="`/images/${icon}.png`" alt="logo" :class="`h-${size} w-${size}`" />
    <span v-if="text" class="text-white/90 hover:text-white">{{ text }}</span>
  </button>
</template>
