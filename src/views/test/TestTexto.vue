<template>
  <h3>Test texto es: {{ $route.params.id }}</h3>
  <button @click="onTest" class="btn btn-sm btn-warning">atras</button>
  <button @click="subir" class="btn btn-sm btn-success">Agregar</button>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

function subir() {
  localStorage.setItem(
    "myValue",
    JSON.stringify({
      userImg: "https://ui-avatars.com/api/?name=reliks4&size=128",
    })
  );
  onTest();
}

function onTest() {
  router.push("/test");
}
</script>
