<template>
  <div class="text-white relative flex flex-col gap-2">
    <label v-if="inputName" :for="inputName" class="text-medium-grey text-xs font-bold">
      {{ inputName }}
    </label>
    <textarea :name="inputName" rows="4" :id="inputName"
      class="resize-none px-4 py-2 text-black text-sm rounded transition-colors outline outline-1 outline-medium-grey/25 placeholder:text-black/25"
      :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  inputName: String
})
</script>