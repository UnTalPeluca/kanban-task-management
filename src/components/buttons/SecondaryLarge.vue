<template>
  <div>
    <button
      type="button" v-bind="$attrs" class="w-full text-sm font-bold py-2.5 px-4 rounded-3xl text-main-purple bg-main-purple/10 dark:bg-white hover:bg-main-purple-light hover:text-white dark:text-main-purple ">
      <slot></slot>
    </button>
  </div>
</template>