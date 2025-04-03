<script setup lang="ts">
import ButtonTemplate from "./ButtonTemplate.vue";

defineProps<{
  icon?: string;
  text?: string;
}>();
</script>

<template>
  <ButtonTemplate :icon="icon" :text="text" size="4" class="bg-white/20 text-black active:translate-y-0.5 transition-all" />
</template>
