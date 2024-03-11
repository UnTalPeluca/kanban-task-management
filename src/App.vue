<template>
  <HeaderVue />
  <main>
    <div class="flex w-full ">
      <SideBar />
      <div v-dragscroll:nochilddrag
        class="relative h-full w-screen max-h-[calc(100vh-64px)] bg-light-grey dark:bg-very-dark-grey"
        :class="managerStore.sidebar ? 'sm:pl-[256px] lg:pl-[300px]' : ''">
        <div data-dragscroll class="p-6 w-full overflow-auto max-h-[calc(100vh-64px)] transition-all">
          <Board data-dragscroll v-if="boardsStore.getColumns" />
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
</template>

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

const boardsStore = useBoardsStore();
const managerStore = useManagerStore();

onMounted(async () => {
  //INIT STORAGE
  boardsStore.$subscribe((mutations, state) => {

    localStorage.setItem('boards', JSON.stringify(state))

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
