<template>
  <div class="min-w-[280px] min-h-full relative ">
    <div
      class="h-[calc(100vh-142px)] pr-6 sticky top-0 left-0 text-2xl font-bold select-none flex justify-center items-center pt-11">
      <button @click="addNewColumn" class="w-full h-full bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA]/50 dark:from-dark-grey dark:to-dark-grey/25 rounded-md 
        text-medium-grey hover:text-main-purple cursor-pointer">
        + New Column
      </button>
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