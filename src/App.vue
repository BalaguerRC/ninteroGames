<template>
  <router-view />
</template>

<script setup>
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
