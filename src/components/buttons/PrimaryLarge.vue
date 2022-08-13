<template>
  <div>
    <button type="button" v-bind="$attrs" class="w-full text-sm font-bold py-2.5 px-4 rounded-3xl text-white bg-main-purple hover:bg-main-purple-light">
      <slot></slot>
    </button>
  </div>
</template>