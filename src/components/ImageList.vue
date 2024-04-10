<template>
  <div class="carousel w-full">
    <div
      class="carousel-item w-full"
      v-for="games in gamesObj"
      :key="games"
      :id="games"
    >
      <img :src="games" class="w-full" style="border-radius: 10px" />
    </div>
  </div>
  <div class="flex justify-center w-full py-2 gap-5">
    <div v-for="games in gamesObj" :key="games" :id="games">
      <a :href="'#' + games">
        <div class="avatar">
          <div
            class="w-14 rounded-2xl "
            :class="
              route.hash === '#' + games
                ? 'ring ring-primary ring-offset-base-100 ring-offset-2'
                : 'none'
            "
          >
            <img :src="games" alt="Tailwind-CSS-Avatar-component" />
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

defineProps(["gamesObj"]);
const route = useRoute();
const router = useRouter();

function test() {
  /*for (let index = 0; index < gamesObj?.length; index++) {
    console.log(index);
  }*/
  console.log("desde test");
}
/*onMounted(() => {
  test();
});*/

/**
<div :id="gamesObj" class="carousel-item relative w-full">
    <img :src="gamesObj" class="w-full" />
    <div
      class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
    >
      <a href="#slide4" class="btn btn-circle">{{ gamesObj }}</a>
      <a href="#slide2" class="btn btn-circle">❯</a>
    </div>
  </div>
 */
</script>

<style>
.bordered {
  /*border-color: white;
  border-width: 10px;*/
  box-shadow: 0px 5px 14px 1px white;
}
</style>
