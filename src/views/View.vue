<script setup>
import NavBar from "@/components/NavBar.vue";
import { useRouter,RouterView } from "vue-router";
const router = useRouter();

console.log("test view");

</script>

<template>
  <nav-bar />
  <router-view />
</template>
