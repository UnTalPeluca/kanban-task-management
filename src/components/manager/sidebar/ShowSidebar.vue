<template>
  <div @click="onClickShow"
    class="fixed bottom-8 left-0 cursor-pointer p-4 pr-5 bg-main-purple hover:bg-main-purple-light rounded-r-full hidden sm:block">
    <IconShowSidebar />
  </div>
</template>
<script setup>
import { useManagerStore } from '@/stores/manager';
import IconShowSidebar from '@/components/icons/IconShowSidebar.vue';

const managerStore = useManagerStore()
const onClickShow = () => {
  managerStore.sidebar = true
}
</script>