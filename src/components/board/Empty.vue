<template>
  <div
    class="flex flex-col items-center gap-4 absolute top-1/2 translate-y-[-50%] left-1/2 translate-x-[-50%] w-11/12 max-w-sm">
    <p class="text-center text-lg font-bold text-medium-grey">This board is empty. Create a new column to get started.
    </p>
    <BtnPrimarySmall :large="false" :fullWidth="false">+ Add New Column</BtnPrimarySmall>
  </div>
</template>

<script setup>
import BtnPrimarySmall from '@/components/buttons/PrimarySmall.vue'
</script>