<template>
  <button class="btn" @click="counter++">test {{ counter }}</button>
</template>

<script setup>
import {ref} from "vue"

const counter = ref(0)
</script>