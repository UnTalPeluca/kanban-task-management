<template>
  <div tabindex="1" ref="sidebarMobile" @blur="onBlur" class="flex flex-col bg-white dark:bg-dark-grey rounded-lg mx-auto max-w-3xs translate-y-[-40%]
  sm:hidden focus:outline-none">
    <p class="text-medium-grey text-xs font-bold py-4 px-6 ">ALL BOARDS ({{ boardsStore.boards.length }})</p>
    <div class="overflow-auto max-h-40">
      <div @click="onClickBoard(index)" v-for="(board, index) in boardsStore.boards" :key="index"
        class="flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer text-medium-grey font-bold   "
        :class="board.name === boardsStore.getCurrentBoard.name ?
        ['bg-main-purple', 'text-white', 'fill-white', 'hover:bg-main-purple-light']
        :
        ['fill-medium-grey', 'hover:text-main-purple', 'hover:fill-main-purple', 'hover:bg-main-purple/10']">
        <IconBoard />
        <span>{{ board.name }}</span>
      </div>
    </div>
    <div @click="createNewBoard()"
      class=" flex items-center gap-4 w-11/12 rounded-r-full px-6 py-3 cursor-pointer font-bold fill-main-purple text-main-purple hover:bg-medium-grey/10">
      <IconBoard />
      <span>+ Create New Board</span>
    </div>
    <div class="p-4">
      <DarkModeSwitch class="" />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useManagerStore } from '@/stores/manager';
import { useBoardsStore } from '@/stores/boards';
import IconBoard from '@/components/icons/IconBoard.vue';
import DarkModeSwitch from './sidebar/DarkModeSwitch.vue';
const managerStore = useManagerStore()
const boardsStore = useBoardsStore()
const sidebarMobile = ref(null)

const onClickBoard = (index) => {
  boardsStore.selectedBoard = index
  managerStore.hideOverlay()
}
const createNewBoard = () => {
  managerStore.overlay = true
  managerStore.boardForm = { visible: true, edit: false }
  managerStore.sidebarMobile = false
}
const onBlur = () => {
  managerStore.overlay = false
  managerStore.sidebarMobile = false
}
onMounted(() => {
  sidebarMobile.value.focus()
})
</script>