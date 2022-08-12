<template>
  <div class="w-full rounded-md bg-light-grey flex items-center justify-center gap-6 p-4 py-3 dark:bg-very-dark-grey">
    <IconLightTheme class="fill-medium-grey" />
    <label
      class="bg-main-purple hover:bg-main-purple-light cursor-pointer min-w-[40px] min-h-[22px] p-1 rounded-xl relative">
      <div class="rounded-full h-[14px] w-[14px] bg-white transition-all absolute"
        :class="store.darkmode ? 'translate-x-[18px]' : ''" />
      <input v-bind="$attrs" v-model="store.darkmode" type="checkbox" class="cursor-pointer absolute hidden">
    </label>
    <IconDarkTheme class="fill-medium-grey" />
  </div>
</template>
<script setup>
import { useManagerStore } from '@/stores/manager';
import IconLightTheme from '@/components/icons/IconLightTheme.vue';
import IconDarkTheme from '@/components/icons/IconDarkTheme.vue';

const store = useManagerStore()

</script>