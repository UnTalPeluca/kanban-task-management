<template>
  <header class="bg-white top-0 left-0 w-full">
    <HeaderVue />
  </header>
  <main>
    <div class="flex min-w-full">
      <SideBar />
      <div v-dragscroll:nochilddrag
        class="w-full relative h-full  min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-auto bg-light-grey ">
        <div data-dragscroll class="mx-auto max-w-sm w-11/12 pt-4 pb-24">
          <Board data-dragscroll v-if="boardsStore.getColumns" />
          <div v-else-if="!boardsStore.boards"></div>
          <EmptyBoard v-else />
        </div>
        <bgOverlay data-no-dragscroll />
      </div>
    </div>
  </main>
  <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 max-w-xs w-11/12">
    <TaskView />
    <TaskForm v-if="managerStore.taskForm.visible" />
    <Delete v-if="managerStore.delete.visible" />
    <BoardForm v-if="managerStore.boardForm.visible" />
  </div>
</template >
  
    <script setup>
import EmptyBoard from './components/board/Empty.vue';
import Board from './components/board/Board.vue'
import HeaderVue from './components/Header.vue';
import bgOverlay from './components/bgOverlay.vue';
import TaskView from './components/manager/TaskView.vue'
import TaskForm from './components/manager/TaskForm.vue';
import Delete from './components/manager/Delete.vue';
import BoardForm from './components/manager/BoardForm.vue';

import { onMounted } from 'vue';
import { useBoardsStore } from '@/stores/boards.js';
import { useManagerStore } from '@/stores/manager.js';
import SideBar from './components/manager/Sidebar.vue';


const boardsStore = useBoardsStore();
const managerStore = useManagerStore();
onMounted(async () => {
  boardsStore.$subscribe((mutations, state) => {
    localStorage.setItem('data', JSON.stringify(state))
  })
  const storageData = localStorage.getItem("data")
  if (storageData === null) {
    const jsonData = await import("./assets/json/data.json")
    boardsStore.boards = jsonData.boards;
  } else {
    boardsStore.$state = JSON.parse(storageData)
  }
}) 
</script>
