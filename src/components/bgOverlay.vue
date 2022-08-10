<template>
  <div @click="managerStore.hideOverlay" v-if="managerStore.overlay"
    class="fixed min-h-screen min-w-full bg-black bg-opacity-50 top-0 left-0 z-10">
    <slot></slot>
  </div>
</template>
<script setup>
import { useManagerStore } from '@/stores/manager.js';
const managerStore = useManagerStore();
</script>