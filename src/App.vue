<template>
  <nav-bar />
  <router-view />
  <footer-component />
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import FooterComponent from "@/components/Footer.vue";
import { RouterView } from "vue-router";
import { useRouter } from "vue-router";
const router = useRouter();

/*onMounted(() => {
  console.log("test app")
  router.push("home");
});*/

/**
 * * <route-view/> displays the views linked to a route in the Router folder
 */
</script>
<style scoped></style>
