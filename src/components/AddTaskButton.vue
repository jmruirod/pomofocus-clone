<script setup lang="ts">
import ButtonTemplate from "./ButtonTemplate.vue";

defineProps<{
  icon?: string;
  text?: string;
}>();
</script>

<template>
  <ButtonTemplate
    :icon="icon"
    :text="text"
    size="5"
    class="flex justify-center w-full py-4.5 bg-slate-900/10 border-dashed border-2 border-white/50 font-bold"
  />
</template>
