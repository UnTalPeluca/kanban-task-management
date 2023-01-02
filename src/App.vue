<template>
  <HeaderVue />
  <main>
    <div class="flex w-full ">
      <SideBar />
      <div v-dragscroll:nochilddrag
        class="relative h-full w-screen min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-auto bg-light-grey dark:bg-very-dark-grey transition-all "
        :class="managerStore.sidebar ? ['sm:translate-x-[256px] lg:translate-x-[300px] max-w-[calc(100vw+256px'] : ['translate-x-[0]']">
        <div data-dragscroll class="mx-auto w-11/12 pt-6 pb-24 ">
          <div data-dragscroll v-if="boardsStore.getColumns" class="flex">
            <Board data-dragscroll />
            <AddNewColumn class="hidden md:flex" />
          </div>
          <NoBoards v-else-if="boardsStore.boards.length === 0" />
          <EmptyBoard v-else />
        </div>
      </div>
    </div>
    <ShowSidebar v-if="!managerStore.SideBar" />
  </main>
  <bgOverlay data-no-dragscroll />
  <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 max-w-xs w-11/12 sm:max-w-md">
    <TaskView v-if="managerStore.taskView" />
    <TaskForm v-if="managerStore.taskForm.visible" />
    <Delete v-if="managerStore.delete.visible" />
    <BoardForm v-if="managerStore.boardForm.visible" />
    <SidebarMobile v-if="managerStore.sidebarMobile" />
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
import SideBar from './components/manager/Sidebar.vue';
import SidebarMobile from './components/manager/SidebarMobile.vue';
import ShowSidebar from './components/manager/sidebar/ShowSidebar.vue';

import { onMounted } from 'vue';
import { useBoardsStore } from '@/stores/boards.js';
import { useManagerStore } from '@/stores/manager.js';
import NoBoards from './components/board/NoBoards.vue';
import AddNewColumn from './components/board/AddNewColumn.vue';

const boardsStore = useBoardsStore();
const managerStore = useManagerStore();

onMounted(async () => {
  //INIT STORAGE
  boardsStore.$subscribe((mutations, state) => {
    if (!managerStore.dragging) {
      localStorage.setItem('boards', JSON.stringify(state))
    } else {
      console.log("No está guardando")
    }
  })
  const storageData = localStorage.getItem("boards")
  if (storageData === null) {
    const jsonData = await import("./assets/json/data.json")
    boardsStore.boards = jsonData.boards;
  } else {
    boardsStore.$state = JSON.parse(storageData)
  }

  //DARK MODE
  if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
    managerStore.darkmode = true;
  } else {
    localStorage.setItem('theme', 'light')
    managerStore.darkmode = false;
  }
  managerStore.$subscribe((mutations, state) => {
    localStorage.setItem('theme', (state.darkmode ? 'dark' : 'light'))
    if (state.darkmode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })
}) 
</script>
