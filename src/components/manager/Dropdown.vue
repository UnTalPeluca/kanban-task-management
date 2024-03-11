<template>
  <div tabindex="1" class="group cursor-pointer relative">
    <IconVerticalEllipsis />
    <div class="absolute right-36 top-8 hidden group-focus:block">
      <div class="bg-white dark:bg-very-dark-grey rounded-lg text-sm w-36 flex flex-col fixed z-10 shadow-lg">
        <p @click="emit('onClickEdit', target)" class="text-medium-grey hover:text-main-purple dark:hover:text-light-grey  text-xs font-bold w-full p-4 ">Edit {{ target }}</p>
        <p @click="emit('onClickDelete', target)" class="text-red hover:text-red-light text-xs font-bold w-full p-4 ">Delete {{ target }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import IconVerticalEllipsis from '../icons/IconVerticalEllipsis.vue';

const props = defineProps({
  target: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['onClickEdit', 'onClickDelete'])
</script>