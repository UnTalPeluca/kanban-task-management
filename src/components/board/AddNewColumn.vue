<template>
  <div class="flex items-center min-h-full pt-11">
    <div @click="addNewColumn"
      class="h-full flex items-center min-w-[280px] cursor-pointer bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA]/50 dark:from-dark-grey dark:to-dark-grey/25 rounded-md text-medium-grey hover:text-main-purple ">
      <p class="text-2xl text-center w-full font-bold select-none">+ New Column</p>
    </div>
  </div>
</template>
<script setup>
import { useManagerStore } from '@/stores/manager.js';
const managerStore = useManagerStore();

const addNewColumn = () => {
  managerStore.boardForm = { visible: true, edit: true }
  managerStore.overlay = true
}
</script>