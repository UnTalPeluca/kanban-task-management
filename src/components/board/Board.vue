<template>
  <div class="flex gap-6 ">
    <section data-dragscroll v-for="(column, columnIndex) in boardsStore.getColumns" :key="columnIndex"
      class="min-w-[280px] last:pr-6 box-content">
      <div class="flex items-center gap-3 pb-6 ">
        <div class="rounded-full h-4 w-4" :style="{ backgroundColor: bulletColors(columnIndex) }"></div>
        <h2 class="text-medium-grey font-bold text-xs uppercase">
          {{ column.name }} ( {{ column.tasks.length }} )
        </h2>
      </div>
      <TransitionGroup tag="div" name="tasks" data-dragscroll class="flex flex-col gap-5">
        <BoardTask @click="onClickTask(columnIndex, taskIndex)" v-for="(task, taskIndex) in column?.tasks"
          :key="taskIndex" :task="task" />
      </TransitionGroup>
    </section>
  </div>
</template>
<script setup>
import BoardTask from "@/components/board/Task.vue";
import { useBoardsStore } from '@/stores/boards.js';
import { useManagerStore } from '@/stores/manager';

const managerStore = useManagerStore();
const boardsStore = useBoardsStore();
const onClickTask = (column, task) => {
  boardsStore.selectedColumn = column
  boardsStore.selectedTask = task;
  managerStore.taskView = true;
  managerStore.overlay = true;
}
const bulletColors = (index) => {
  const color = [
    '#49C4E5',
    '#8471F2',
    '#67E2AE'
  ]
  if (color[index]) {
    return color[index]
  } else {
    let rand = Math.random();
    rand = Math.floor(rand * 360);
    rand = rand + 1;
    const randomColor = `hsl(${rand}, 80%, 70%)`
    return randomColor
  }
}

</script>

<style>
.tasks-enter-from {
  opacity: 0;
  transform: scale(0.75);
}

.tasks-enter-to {
  opacity: 1;
  transform: scale(1);
}

.tasks-enter-active {
  transition: all 0.5s ease;

}
</style>