<template>
  <article class="group flex flex-col bg-white dark:bg-dark-grey p-4 rounded-lg cursor-pointer shadow-task max-w-[280px]">
    <h3 class="text-black dark:text-white font-bold select-none pointer-events-none"
      :class="managerStore.dragging ? '' : 'group-hover:text-main-purple'">
      {{ task.title }}
    </h3>
    <p class="text-xs text-medium-grey font-bold select-none pointer-events-none">{{ subtasksCompleted }} substasks</p>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import { useManagerStore } from '../../stores/manager';
const managerStore = useManagerStore()
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const subtasksCompleted = computed(() => {
  const completed = props.task.subtasks.filter((sub) => sub.isCompleted).length;
  const total = props.task.subtasks.length;
  return `${completed} of ${total}`
})
</script>