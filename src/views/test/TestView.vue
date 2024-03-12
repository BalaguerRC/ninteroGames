<template>
  <h3>Test view</h3>
  <div class="w-10 rounded-full" v-if="dataValidate">
    <img alt="Tailwind CSS Navbar component" v-bind:src="userImg" />
  </div>
  <button @click="onTest" class="btn btn-sm">test 1</button>
  <button @click="subir" class="btn btn-sm btn-success">Agregar</button>
  <button @click="salir" class="btn btn-sm btn-warning">salir</button>

  <div class="card">
    <p v-html="truncatedContent"></p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";

const content = ref(
  "<p>Fortnite is a 2017 video game developed by the company Epic Games released as different software packages featuring six different game modes, but sharing the same game engine and mechanics. It was announced at the Spike Video Game Awards in 2011.</p>\n<p>Fortnite is a 2017 video game developed by the company <strong>Epic Games</strong> released as different software packages featuring six different game modes, but sharing the same game engine and mechanics. It was announced at the Spike Video Game Awards in 2011.</p>\n<p>Fortnite is a 2017 video game developed by the company Epic Games released as different software packages featuring six different game modes, but sharing the same game engine and mechanics. It was announced at the Spike Video Game Awards in 2011.</p>"
); // Aquí pones tu texto largo
const maxLength = 200; // Máxima longitud del texto permitida

const truncatedContent = computed(() => {
  if (content.value.length > maxLength) {
    return content.value.slice(0, maxLength) + "...";
  } else {
    return content.value;
  }
});

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

<style scoped>
.truncated {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
