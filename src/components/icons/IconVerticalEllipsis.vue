<template>
  <div>
    <svg class="fill-medium-grey" width="5" height="20" xmlns="http://www.w3.org/2000/svg">
      <g fill-rule="evenodd">
        <circle cx="2.308" cy="2.308" r="2.308" />
        <circle cx="2.308" cy="10" r="2.308" />
        <circle cx="2.308" cy="17.692" r="2.308" />
      </g>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  fill: {
    type: String,
    default: "#828FA3"
  }
})
</script>