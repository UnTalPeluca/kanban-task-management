<template>
  <div class="text-white relative flex flex-col gap-2 w-full">
    <label v-if="inputName" :for="inputName" class="text-medium-grey dark:text-white text-xs font-bold">
      {{ inputName }}
    </label>
    <input :id="inputName"
      class="peer px-4 py-2 text-black dark:text-white dark:bg-dark-grey text-sm rounded transition-colors outline outline-1 outline-medium-grey/25
      cursor-pointer hover:outline-main-purple focus:outline-main-purple placeholder:text-black/25 dark:placeholder:text-white/25"
      :class="error ? 'outline-red' : ''" :value="modelValue" @input="onInput($event)" v-bind="$attrs" />
    <p v-if="error" class="absolute right-4 bottom-2 text-red text-xs sm:text-sm">
      Can't be empty
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const props = defineProps({
  modelValue: String,
  inputName: String,
  isRequired: {
    type: Boolean,
    default: true
  }
})
const error = ref(false)
const emit = defineEmits(['update:modelValue'])
const onInput = (e) => {
  if (props.isRequired && !e.target.value.trim()) {
    error.value = true
    emit('update:modelValue', e.target.value)
  } else {
    error.value = false
    emit('update:modelValue', e.target.value)
  }
}
defineExpose({
  error
})
</script>

<style>
</style>