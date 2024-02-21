<template>
  <div class="md:container md:mx-auto">
    <div class="p-10">
      <SearchBar />

      <div>
        <div class="carousel w-full">
          <div id="slide1" class="carousel-item relative w-full pt-14">
            <CarouselItem />
            <div
              class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
            >
              <a href="#slide2" class="btn btn-circle">❮</a>
              <a href="#slide2" class="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide2" class="carousel-item relative w-full pt-14">
            <CarouselItem />
            <div
              class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
            >
              <a href="#slide1" class="btn btn-circle">❮</a>
              <a href="#slide1" class="btn btn-circle">❯</a>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <h2 class="text-4xl font-bold">Popular</h2>
        <div class="pt-3">
          <div class="grid grid-cols-4 gap-3">
            <PopularGames
              v-for="game in games"
              :key="game.downloads"
              :gameObj="game"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
import CarouselItem from "@/components/CarouselItem.vue";
import PopularGames from "@/components/Home/PopularGamesItem.vue";
import SearchBar from "@/components/SearchBar.vue";

import { onMounted, ref } from "vue";
import axios from "axios";
const games = ref([]);

onMounted(() => {
  //console.log(import.meta.env.VITE_API_ENDPOINT + "/game/sortdownloads");
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/games/sortdownloads")
    .then((data) => {
      console.log(data.data);
      games.value = data.data;
    });
});

function onNews() {
  router.push("/news");
}
function onSerch() {
  router.push("/search");
}
</script>
<style scoped>
/** scoped, use only on this page */

.centerA {
  align-items: center;
  justify-content: space-between;
}
</style>
