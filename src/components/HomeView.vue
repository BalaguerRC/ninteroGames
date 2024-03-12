<template>
  <div class="md:container md:mx-auto">
    <div class="p-10">
      <SearchBar />

      <div>
        <div class="carousel w-full" v-if="validateCorousel">
          <div id="c1" class="carousel-item relative w-full pt-14">
            <CarouselItem
              :thumbnailURL="corousel.articleMostRecent?.thumbnailURL"
              :title="corousel.articleMostRecent?.title"
              :content="corousel.articleMostRecent?.content"
              :id="corousel.articleMostRecent?._id"
              :article="true"
              :author="corousel.articleMostRecent.author?.username"
              :category="'Latest News'"

            />
            <div
              class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
            >
              <a href="#c3" class="btn btn-circle">❮</a>
              <a href="#c2" class="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="c2" class="carousel-item relative w-full pt-14">
            <CarouselItem
              :thumbnailURL="corousel.gameMostDownloads?.thumbnailURL"
              :title="corousel.gameMostDownloads?.name"
              :content="corousel.gameMostDownloads?.about"
              :id="corousel.gameMostDownloads?._id"
              :article="false"
              :author="corousel.gameMostDownloads.developer?.username"
              :category="'Popular'"
            />
            <div
              class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
            >
              <a href="#c1" class="btn btn-circle">❮</a>
              <a href="#c3" class="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="c3" class="carousel-item relative w-full pt-14">
            <CarouselItem
              :thumbnailURL="corousel.gameMostRecent?.thumbnailURL"
              :title="corousel.gameMostRecent?.name"
              :content="corousel.gameMostRecent?.about"
              :id="corousel.gameMostRecent?._id"
              :article="false"
              :author="corousel.gameMostRecent.developer?.username"
              :category="'Last Game'"
            />
            <div
              class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
            >
              <a href="#c2" class="btn btn-circle">❮</a>
              <a href="#c1" class="btn btn-circle">❯</a>
            </div>
          </div>
        </div>
        <div class="carousel w-full" v-if="!validateCorousel">
          <div class="carousel-item relative w-full pt-14">
            <div class="card lg:card-side bg-base-100 shadow-xl w-full">
              <figure class="componentIMG0 componentIMG">
                <div class="skeleton h-96"></div>
              </figure>
              <div class="card-body">
                <h2 class="card-title">
                  <div class="skeleton w-32 h-8"></div>
                </h2>
                <div class="skeleton h-5 w-full"></div>
                <div class="skeleton h-5 w-full"></div>
                <div class="skeleton h-5 w-full"></div>
                <div class="skeleton h-5 w-56"></div>
                <div class="card-actions justify-end">
                  <div class="skeleton w-32 h-8"></div>
                </div>
              </div>
            </div>
            <div
              class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
            >
              <a class="btn btn-circle">❮</a>
              <a class="btn btn-circle">❯</a>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <h2 class="text-4xl font-bold">Popular</h2>
        <div class="pt-3">
          <div class="grid grid-cols-4 gap-3" v-if="validateCorousel">
            <GamesItems
              v-for="game in games"
              :key="game.downloads"
              :searchItem="game"
            />
          </div>

          <div class="grid grid-cols-4 gap-3" v-if="!validateCorousel">
            <div class="card w-90 bg-base-100 shadow-xl">
              <figure>
                <div class="skeleton h-48 w-80"></div>
              </figure>
              <div class="card-body">
                <div class="skeleton w-full h-8"></div>
                <div class="card-actions justify-between">
                  <div class="skeleton w-16 h-8"></div>
                  <div class="skeleton w-20 h-8"></div>
                </div>
              </div>
            </div>
            <div class="card w-90 bg-base-100 shadow-xl">
              <figure>
                <div class="skeleton h-48 w-80"></div>
              </figure>
              <div class="card-body">
                <div class="skeleton w-full h-8"></div>
                <div class="card-actions justify-between">
                  <div class="skeleton w-16 h-8"></div>
                  <div class="skeleton w-20 h-8"></div>
                </div>
              </div>
            </div>
            <div class="card w-90 bg-base-100 shadow-xl">
              <figure>
                <div class="skeleton h-48 w-80"></div>
              </figure>
              <div class="card-body">
                <div class="skeleton w-full h-8"></div>
                <div class="card-actions justify-between">
                  <div class="skeleton w-16 h-8"></div>
                  <div class="skeleton w-20 h-8"></div>
                </div>
              </div>
            </div>
            <div class="card w-90 bg-base-100 shadow-xl">
              <figure>
                <div class="skeleton h-48 w-80"></div>
              </figure>
              <div class="card-body">
                <div class="skeleton w-full h-8"></div>
                <div class="card-actions justify-between">
                  <div class="skeleton w-16 h-8"></div>
                  <div class="skeleton w-20 h-8"></div>
                </div>
              </div>
            </div>
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
import GamesItems from "@/components/Search/SearchItem.vue";
import SearchBar from "@/components/SearchBar.vue";

import { onMounted, ref } from "vue";
import axios from "axios";
const games = ref([]);
const corousel = ref({});
const validateCorousel = ref(false);

onMounted(() => {
  //console.log(import.meta.env.VITE_API_ENDPOINT + "/game/sortdownloads");
  getSortDownloads();
  getCorousel();
  console.log("corousel", corousel.value);
});

function getCorousel() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/homepage/carousel")
    .then((data) => {
      console.log("corousel", data.data);
      corousel.value = data.data;
      console.log("corousel", corousel.value);
      validateCorousel.value = true;
    })
    .catch((err) => console.log(er));
}
function getSortDownloads() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/games/sortdownloads")
    .then((data) => {
      console.log(data.data);
      games.value = data.data;
    });
}

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
