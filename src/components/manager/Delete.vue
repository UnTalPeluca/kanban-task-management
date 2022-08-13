<template>
  <div class="bg-white dark:bg-dark-grey rounded-lg">
    <div class="p-6 flex flex-col gap-6">
      <div class="flex justify-between items-center">
        <h4 class="text-red font-bold text-lg">Delete this {{ managerStore.delete.board ? 'board' : 'task' }}</h4>
      </div>
      <p class="text-medium-grey text-sm">{{ warning }}</p>
      <div class="flex flex-col gap-4">
        <ButtonDelete @click.stop="onDelete">Delete</ButtonDelete>
        <ButtonSecondaryLarge @click.stop="onCancel">Cancel</ButtonSecondaryLarge>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useBoardsStore } from '@/stores/boards.js';
import { useManagerStore } from '@/stores/manager.js';
import ButtonDelete from '@/components/buttons/Destructive.vue';
import ButtonSecondaryLarge from '@/components/buttons/SecondaryLarge.vue';


const boardsStore = useBoardsStore();
const managerStore = useManagerStore();

const warning = computed(() => {
  if (managerStore.delete.board) {
    return `Are you sure you want to delete the ‘${boardsStore.getCurrentBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.`
  } else {
    return `Are you sure you want to delete the ‘${boardsStore.getTask.title}’ task and its subtasks? This action cannot be reversed.`
  }
})

const onDelete = () => {
  if (managerStore.delete.board) {
    boardsStore.boards.splice(boardsStore.selectedBoard, 1)
    managerStore.hideOverlay()
  } else {
    boardsStore.getCurrentColumn.tasks.splice(boardsStore.selectedTask, 1)
    managerStore.hideOverlay()
  }
}
const onCancel = () => {
  managerStore.hideOverlay()
}
</script>