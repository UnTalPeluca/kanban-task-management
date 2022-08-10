<template>
  <div class="bg-white rounded-lg p-1">
    <div class="p-5 pr-3 flex flex-col gap-6 max-h-[90vh] overflow-y-scroll">
      <div class="flex justify-between items-center">
        <h4 class="text-black font-bold text-lg">{{ managerStore.boardForm.edit ? 'Edit Board' : 'Add New Board' }}</h4>
      </div>
      <BaseInput v-model="board.name" inputName="Board Name" placeholder="e.g. Web Design" />
      <div class="flex flex-col gap-3">
        <p class="text-medium-grey text-xs font-bold">Board Columns</p>
        <div class="flex items-center justify-between gap-4" v-for="(column, index) in board.columns" :key="index">
          <BaseInput v-model="column.name"
            :placeholder="columnsPlaceholders[index] ? columnsPlaceholders[index] : 'Your Column title...'" />
          <IconCross @click="deleteColumn(index)" class="cursor-pointer" />
        </div>
        <ButtonSecondaryLarge @click="addColumn">+ Add New Column</ButtonSecondaryLarge>
      </div>
      <ButtonPrimaryLarge @click.prevent="onSubmit">
        {{ managerStore.boardForm.edit ? 'Save Changes' : 'Create New Board' }}
      </ButtonPrimaryLarge>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useBoardsStore } from '@/stores/boards.js';
import { useManagerStore } from '@/stores/manager.js';
import BaseInput from '@/components/form/BaseInput.vue';
import IconCross from '@/components/icons/IconCross.vue';
import ButtonPrimaryLarge from '@/components/buttons/PrimaryLarge.vue';
import ButtonSecondaryLarge from '@/components/buttons/SecondaryLarge.vue';

const boardsStore = useBoardsStore();
const managerStore = useManagerStore();

const board = ref({
  name: '',
  columns: []
})
const columnsPlaceholders = {
  0: 'e.g. Todo...',
  1: 'e.g. Doing...',
  2: 'e.g. Done...'
}
const deleteColumn = (index) => {
  {
    board.value.columns.splice(index, 1)
  }
}
const addColumn = () => {
  board.value.columns.push({ name: '', tasks: [] })
}
const onSubmit = () => {
  if (managerStore.boardForm.edit) {
    boardsStore.boards[boardsStore.selectedBoard] = board.value
  } else {
    boardsStore.boards.push(board.value)
  }
  managerStore.hideOverlay()
}

//EDIT MODE
if (managerStore.boardForm.edit) {
  board.value.name = JSON.parse(JSON.stringify(boardsStore.boards[boardsStore.selectedBoard].name))
  board.value.columns = JSON.parse(JSON.stringify(boardsStore.getCurrentBoard.columns))
} else {
  board.value.columns = [{ name: '', tasks: [] }, { name: '', tasks: [] }]
}
</script>