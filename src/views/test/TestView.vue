<template>
  <h3>Test view</h3>
  <div class="w-10 rounded-full" v-if="dataValidate">
    <img alt="Tailwind CSS Navbar component" v-bind:src="userImg" />
  </div>
  <button @click="onTest" class="btn btn-sm">test 1</button>
  <button @click="subir" class="btn btn-sm btn-success">Agregar</button>
  <button @click="salir" class="btn btn-sm btn-warning">salir</button>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const dataValidate = ref(false);
const userImg = ref("");

onMounted(() => {
  const storedValue = JSON.parse(localStorage.getItem("myValue"));
  if (storedValue) {
    dataValidate.value = true;
    userImg.value = storedValue.userImg;
  }
});

watch(userImg, (newValue) => {
  console.log("Hubo un cambio", newValue);
});

function salir() {
  localStorage.removeItem("myValue");
  userImg.value = "";
  dataValidate.value = false;
}

function subir() {
  localStorage.setItem(
    "myValue",
    JSON.stringify({
      userImg: "https://ui-avatars.com/api/?name=reliks4&size=128",
    })
  );
}

function onTest() {
  router.push("/test/1");
}
</script>
