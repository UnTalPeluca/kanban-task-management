<template>
  <div v-if="managerStore.sidebar" class="z-10">
    <div @click="onClickOverlay" class="fixed min-h-screen min-w-full bg-black bg-opacity-50 top-0 left-0 md:hidden" />
    <div
      class="max-w-3xs bg-white dark:bg-dark-grey w-full fixed top-52 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-lg">
      <p class="text-medium-grey text-xs font-bold py-4 px-6">ALL BOARDS ({{ boardsStore.boards.length }})</p>
      <div @click="onClickBoard(index)" v-for="(board, index) in boardsStore.boards" :key="index"
        class="flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer text-medium-grey font-bold   "
        :class="board.name === boardsStore.getCurrentBoard.name ?
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
      <DarkModeSwitch />
    </div>
  </div>
</template>
<script setup>
import { useManagerStore } from '@/stores/manager';
import { useBoardsStore } from '@/stores/boards';
import IconBoard from '@/components/icons/IconBoard.vue';
import DarkModeSwitch from './sidebar/DarkModeSwitch.vue';
const managerStore = useManagerStore()
const boardsStore = useBoardsStore()

const onClickBoard = (index) => {
  boardsStore.selectedBoard = index
}
const onClickOverlay = () => {
  managerStore.sidebar = false
}
const createNewBoard = () => {
  managerStore.overlay = true
  managerStore.boardForm = { visible: true, edit: false }
  managerStore.sidebar = false
}
</script>