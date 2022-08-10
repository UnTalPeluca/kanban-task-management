<template>
  <div class="bg-white rounded-lg p-1">
    <div class="p-5 pr-3 flex flex-col gap-6 max-h-[90vh] overflow-y-scroll">
      <div class="flex justify-between items-center">
        <h4 class="text-black font-bold text-lg">{{ managerStore.taskForm.edit ? 'Edit Task' : 'Add New Task' }}</h4>
      </div>
      <BaseInput v-model="form.task.title" inputName="Title" placeholder="e.g. Take coffee break" />
      <BaseTextarea v-model="form.task.description" inputName="Description"
        placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little." />
      <div class="flex flex-col gap-3">
        <p class="text-medium-grey text-xs font-bold">Subtasks</p>
        <div class="flex items-center justify-between gap-4" v-for="(subtask, index) in form.task.subtasks"
          :key="index">
          <BaseInput v-model="subtask.title"
            :placeholder="subtaskPlaceholders[index] ? subtaskPlaceholders[index] : 'Your subtask title...'" />
          <IconCross @click="deleteSubtask(index)" class="cursor-pointer" />
        </div>
        <ButtonSecondaryLarge @click="addSubtask">+ Add New Subtask</ButtonSecondaryLarge>
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-medium-grey text-xs font-bold">Status</p>
        <BaseSelect @onClickOption="updateColumn" :value="columnName" />
      </div>
      <ButtonPrimaryLarge @click.prevent="onSubmit">
        {{ managerStore.taskForm.edit ? 'Save Changes' : 'Create Task' }}
      </ButtonPrimaryLarge>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useBoardsStore } from '@/stores/boards.js';
import { useManagerStore } from '@/stores/manager.js';
import BaseSelect from '@/components/form/BaseSelect.vue';
import BaseInput from '@/components/form/BaseInput.vue';
import BaseTextarea from '../form/BaseTextarea.vue';
import IconCross from '../icons/IconCross.vue';
import ButtonPrimaryLarge from '../buttons/PrimaryLarge.vue';
import ButtonSecondaryLarge from '../buttons/SecondaryLarge.vue';

const boardsStore = useBoardsStore();
const managerStore = useManagerStore();

const columnName = ref('')

const form = ref({
  task: {
    title: '',
    description: '',
    subtasks: [{ title: '', isCompleted: false }, { title: '', isCompleted: false }]
  },
  column: 0
})
const subtaskPlaceholders = {
  0: 'e.g. Make coffee',
  1: 'e.g. Drink coffee & smile'
}
const deleteSubtask = (index) => {
  if (form.value.task.subtasks.length === 2) {
    form.value.task.subtasks[index].title = ''
    form.value.task.subtasks[index].isCompleted = false
  } else {
    form.value.task.subtasks.splice(index, 1)
  }
}
const addSubtask = () => {
  form.value.task.subtasks.push({ title: '', isCompleted: false })
}
const onSubmit = () => {
  if (managerStore.taskForm.edit) {
    boardsStore.saveTaskChanges({ task: form.value.task, column: form.value.column })
  } else {
    boardsStore.getColumns[form.value.column].tasks.push(form.value.task)
  }
  managerStore.hideOverlay()
}
const updateColumn = ({ index, name }) => {
  form.value.column = index
  columnName.value = name
}

//EDIT MODE
if (managerStore.taskForm.edit) {
  form.value.task = JSON.parse(JSON.stringify(boardsStore.getTask))
  form.value.column = JSON.parse(JSON.stringify(boardsStore.selectedColumn))
  columnName.value = JSON.parse(JSON.stringify(boardsStore.getColumnsNames[boardsStore.selectedColumn]))
} else {
  columnName.value = JSON.parse(JSON.stringify(boardsStore.getColumnsNames[0]))
}

</script>