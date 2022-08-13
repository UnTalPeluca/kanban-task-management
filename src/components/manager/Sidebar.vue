<template>
  <div class="z-10 transition-all fixed"
  :class="managerStore.sidebar ? ['translate-x-[0]']: ['translate-x-[-100%]']">
    <div
      class="bg-white dark:bg-dark-grey min-h-[calc(100vh-80px)] w-64 lg:w-[300px] pb-10 hidden sm:flex sm:flex-col border-r border-r-lines-light dark:border-r-lines-dark">
      <p class="text-medium-grey text-xs font-bold py-4 px-6">ALL BOARDS ({{ boardsStore.boards.length }})</p>
      <div @click="onClickBoard(index)" v-for="(board, index) in boardsStore.boards" :key="index"
        class="flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer text-medium-grey font-bold   "
        :class="board?.name === boardsStore?.getCurrentBoard?.name ?
        ['bg-main-purple', 'text-white', 'fill-white', 'hover:bg-main-purple-light']
        :
        ['fill-medium-grey', 'hover:text-main-purple', 'hover:fill-main-purple', 'hover:bg-main-purple/10']">
        <IconBoard />
        <span>{{ board.name }}</span>
      </div>
      <div @click="createNewBoard()"
        class=" flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer font-bold fill-main-purple text-main-purple hover:bg-medium-grey/10">
        <IconBoard />
        <span>+ Create New Board</span>
      </div>
      <div class="flex flex-col gap-2 mt-auto">
        <DarkModeSwitch class="w-10/12 mx-auto " />
        <HideSidebar class="w-11/12" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useManagerStore } from '@/stores/manager';
import { useBoardsStore } from '@/stores/boards';
import IconBoard from '@/components/icons/IconBoard.vue';
import DarkModeSwitch from './sidebar/DarkModeSwitch.vue';
import HideSidebar from './sidebar/HideSidebar.vue';
const managerStore = useManagerStore()
const boardsStore = useBoardsStore()

const onClickBoard = (index) => {
  boardsStore.selectedBoard = index
}
const createNewBoard = () => {
  managerStore.overlay = true
  managerStore.boardForm = { visible: true, edit: false }
}
</script>