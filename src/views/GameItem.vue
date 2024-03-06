<template>
  <div class="md:container md:mx-auto">
    <div class="p-10">
      <SearchBar />

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
import { useRoute } from "vue-router";

const route = useRoute();
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
