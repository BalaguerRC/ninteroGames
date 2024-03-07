<template>
  <div class="md:container md:mx-auto">
    <div class="p-10">
      <SearchBar />
      <div
        class="alert shadow-lg mt-5"
        v-if="user_data && user_data._id === games.developer?._id"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-info shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 class="font-bold">
            Welcome <strong>{{ user_data.username }}</strong
            >!
          </h3>
          <div class="text-xs">This is your game, then you can upgrade.</div>
        </div>
        <button
          class="btn btn-sm btn-primary"
          @click="router.push('/game/update/' + games?._id)"
        >
          Update game
        </button>
      </div>

      <div v-if="validateGame">
        <h2 class="text-4xl font-bold pt-5">
          {{ games?.name }}
        </h2>

        <GameDetail :games-obj="games" :games-validate="validateWishList" />
      </div>
      <div v-if="!validateGame">
        <h2>The game doesnt exist</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";
//import GameDetails from "@/components/GameDetail.vue";
import GameDetail from "../components/GameDetail.vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const user_data = JSON.parse(localStorage.getItem("user_data"));

const route = useRoute();
const router = useRouter();
const games = ref({});
const validateGame = ref(true);

console.log(route.params.id);
onMounted(() => {
  getGame();
  getWish();
});
function getGame() {
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
}
const wishList = ref([]);
const validateWishList = ref(false);
function getWish() {
  const wlist = JSON.parse(localStorage.getItem("wishlist"));
  if (wlist) {
    wlist.map((data) => {
      if (data._id === route.params.id) {
        console.log("hay similitud");
        validateWishList.value = true;
      }
    });
    wishList.value.push({ id: wlist.map((data) => data._id) });
  }
}
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
