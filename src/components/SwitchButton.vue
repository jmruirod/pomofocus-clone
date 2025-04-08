<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  isActive: boolean;
}>();

const localIsActive = ref(props.isActive);

const emit = defineEmits(["update:isActive"]);

const handleClick = () => {
  localIsActive.value = !localIsActive.value;
  emit("update:isActive", localIsActive.value);
};
</script>

<template>
  <div
    class="h-8 w-14 px-0.5 flex items-center rounded-full cursor-pointer transition-colors"
    :class="{ 'bg-zinc-300': !localIsActive, 'bg-lime-600/60 justify-end': localIsActive }"
    @click="handleClick"
  >
    <div class="h-7 w-7 bg-white rounded-full shadow-md"></div>
  </div>
</template>
