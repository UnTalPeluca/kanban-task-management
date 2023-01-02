<template>
  <div class="flex gap-6 ">
    <section data-dragscroll v-for="(column, columnIndex) in boardsStore.getColumns" :key="columnIndex"
      class="min-w-[280px] last:pr-6 box-content flex flex-col" @dragover.prevent>
      <div class="flex items-center gap-3 pb-6 ">
        <div class="rounded-full h-4 w-4" :style="{ backgroundColor: bulletColors(columnIndex) }"></div>
        <h2 class="text-medium-grey font-bold text-xs uppercase">
          {{ column.name }} ( {{ column.tasks.length }} )
        </h2>
      </div>
      <TransitionGroup tag="div" name="tasks" data-dragscroll class="flex flex-col gap-5">
        <div v-for="(task, taskIndex) in column?.tasks" :key="task.id">
          <BoardTask :task="task" @click="onClickTask(columnIndex, taskIndex)"
            @dragstart="onDragTask($event, task, columnIndex, taskIndex)"
            @dragenter="onDragEnterTask($event, task, columnIndex, taskIndex)" draggable="true"
            @dragend="onDragEnd($event)" @dragleave.prevent="onDragLeaveTask($event)"
            :class="[(tempTask?.taskIndex === taskIndex) && (tempTask?.columnIndex === columnIndex) ? tempTaskStyle : '', (draggedTask?.task?.id === task.id) ? 'opacity-50' : '']" />
        </div>
      </TransitionGroup>
      <div @dragenter="onDragEnterColumn(columnIndex)" class="h-full mt-5" />
    </section>
  </div>
</template>
<script setup>
import BoardTask from "@/components/board/Task.vue";
import { useBoardsStore } from '@/stores/boards.js';
import { useManagerStore } from '@/stores/manager';
import { ref } from "vue";

const managerStore = useManagerStore();
const boardsStore = useBoardsStore();
const draggedTask = ref(null)
let tempTaskStyle = ['border-main-purple', 'border-2']
const tempTask = ref(null) //For visual feedback
const onDragTask = (evt, task, columnIndex, taskIndex) => {
  managerStore.dragging = true
  draggedTask.value = {
    el: evt.target,
    task,
    columnIndex,
    taskIndex
  }
  evt.dataTransfer.dropEffect = 'move'
  evt.dataTransfer.effectAllowed = 'move'
}
const onDragEnterColumn = (columnIndex) => {
  if (columnIndex !== draggedTask.value.columnIndex) {
    removeTempTask()
    boardsStore.boards[boardsStore.selectedBoard].columns[columnIndex].tasks.push(draggedTask.value.task)
    tempTask.value = {
      columnIndex,
      taskIndex: boardsStore.boards[boardsStore.selectedBoard].columns[columnIndex].tasks.length - 1
    }
  }
}
const onDragEnterTask = (evt, task, columnIndex, taskIndex) => {
  if (draggedTask.value.task.id !== task.id) {
    removeTempTask()
    boardsStore.boards[boardsStore.selectedBoard].columns[columnIndex].tasks.splice(taskIndex, 0, draggedTask.value.task)
    tempTask.value = {
      columnIndex,
      taskIndex
    }
  } else {

  }
}
const onDragLeaveTask = (evt) => {

}
const onDragEnd = (evt) => {
  if (tempTask.value) {
    managerStore.dragging = false
    const sameColumn = draggedTask.value?.columnIndex === tempTask.value?.columnIndex
    const isAbove = draggedTask.value?.taskIndex > tempTask.value?.taskIndex
    if (sameColumn && isAbove) {
      boardsStore.boards[boardsStore.selectedBoard].columns[draggedTask.value.columnIndex].tasks.splice(draggedTask.value.taskIndex + 1, 1)
    } else {
      boardsStore.boards[boardsStore.selectedBoard].columns[draggedTask.value.columnIndex].tasks.splice(draggedTask.value.taskIndex, 1)
    }
  }
  draggedTask.value = null
  tempTask.value = null
}
const removeTempTask = () => {
  if (tempTask.value) {
    boardsStore.boards[boardsStore.selectedBoard].columns[tempTask.value.columnIndex].tasks.splice(tempTask.value.taskIndex, 1)
    tempTask.value = null
  }
}

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
    rand = Math.floor(rand * 360) + 1;
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