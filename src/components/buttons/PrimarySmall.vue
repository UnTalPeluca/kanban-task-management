<template>
  <div>
    <button type="button" v-bind="$attrs" class="text-white text-sm font-bold py-3 px-4 rounded-3xl bg-main-purple hover:bg-main-purple-light">
      <slot></slot>
    </button>
  </div>
</template>