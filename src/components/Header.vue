<template>
  <header class="bg-white dark:bg-dark-grey top-0 left-0 w-full">
    <div class="mx-auto max-w-sm w-11/12 flex items-center h-16 gap-4">
      <div>
        <img src="@/assets/icons/logo-mobile.svg" height="25" width="24" alt="">
      </div>
      <div @click="showSidebar" class="flex items-center gap-2 group cursor-pointer md:hidden">
        <h1 class="text-black dark:text-white font-bold text-lg cursor-pointer">{{ boardsStore.getCurrentBoard?.name }}
        </h1>
        <IconArrowDown v-if="!managerStore.sidebar" />
        <IconArrowUp v-else />
      </div>
      <h1 class="text-black font-bold text-lg cursor-pointer hidden md:block">{{ boardsStore.getCurrentBoard?.name }}
      </h1>
      <div class="flex items-center gap-4 ml-auto">
        <AddButtonMobile />
        <Dropdown target="Board" @onClickEdit="editTask" @onClickDelete="deleteTask" />
      </div>
    </div>
  </header>
</template>
<script setup>
import AddButtonMobile from '@/components/buttons/AddTaskMobile.vue'
import { useBoardsStore } from '@/stores/boards';
import { useManagerStore } from '@/stores/manager';
import Dropdown from '@/components/manager/Dropdown.vue';
import IconArrowDown from './icons/IconArrowDown.vue';
import IconArrowUp from './icons/IconArrowUp.vue';

const boardsStore = useBoardsStore()
const managerStore = useManagerStore()

const editTask = () => {
  managerStore.overlay = true
  managerStore.boardForm = { edit: true, visible: true }
}
const deleteTask = () => {
  managerStore.overlay = true
  managerStore.delete = { board: true, visible: true }
}
const showSidebar = () => {
  managerStore.sidebar = true;
}
</script>