<template>
  <div class="md:container md:mx-auto">
    <div class="p-10">
      <div class="flex centerA" id="#">
        <div class="join">
          <button class="btn join-item btn-sm">Home</button>
          <button class="btn join-item btn-sm">News</button>
          <button class="btn join-item btn-sm">Category</button>
        </div>
        <div class="join">
          <input
            type="text"
            placeholder="Type here"
            class="input w-full max-w-xs input-sm input-bordered join-item"
          />

          <button class="btn btn-sm join-item rounded-r-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div v-if="validateGame">
        <h2 class="text-4xl font-bold pt-5">
          {{ games?.name }}
        </h2>

        <GameDetail :games-obj="games" />
      </div>
      <div v-if="!validateGame">
        <h2>The game doesnt exist</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
//import GameDetails from "@/components/GameDetail.vue";
import GameDetail from "../components/GameDetail.vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const games = ref({});
const validateGame = ref(true);

console.log(route.params.id);
onMounted(() => {
  console.log(
    import.meta.env.VITE_API_ENDPOINT + "/games/selectid/" + route.params.id
  );
  axios
    .get(
      import.meta.env.VITE_API_ENDPOINT + "/games/selectid/" + route.params.id
    )
    .then((data) => {
      console.log("data", data);
      console.log(data.data);
      games.value = data.data;
    })
    .catch((err) => {
      console.log(err);
      validateGame.value = false;
    });
});
</script>
<style scoped>
/** scoped, use only on this page */

.button {
  margin-top: 10px;
}
.contenedor1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.imagenDetail {
  width: 100%;
  /*height: 220px;*/
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contenedorDetail {
  width: 280px;
}
.centerA {
  align-items: center;
  justify-content: space-between;
}
.gameDetails {
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
}
</style>
