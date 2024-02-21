<template>
  <div class="card w-72 bg-base-100 shadow-xl">
    <figure>
      <img :src="gameObj.thumbnailURL" alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="font-bold hiddenText">{{ gameObj.name }}</h2>
      <div class="card-actions justify-between">
        <h4>${{ gameObj.price }}</h4>
        <a
          class="btn btn-sm btn-primary"
          @click="goToGame(gameObj._id)"
        >
          View
      </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
defineProps(["gameObj"]);

function goToGame(gameId) {
  router.push(`/game/${gameId}`);
}
</script>

<style>
.hiddenText {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
