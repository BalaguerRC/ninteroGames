<template>
  <div class="card bg-base-100 shadow-xl lg:max-h-2xl rounded-lg">
    <figure>
      <img :src="searchItem.thumbnailURL" alt="Shoes" />
    </figure>
    <div class="card-body justify-between">
      <h2 class="font-bold hiddenText">{{ searchItem.name }}</h2>
      <div class="card-actions justify-between">
        <h4 v-if="searchItem.price != 0">${{ searchItem.price }}</h4>
        <h4 v-if="searchItem.price === 0">Free</h4>
        <a class="btn btn-sm btn-primary" @click="onGameItem(searchItem._id)">
          View
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

defineProps(["searchItem"]);

function onGameItem(id) {
  router.push("/game/" + id + "/");
}
</script>

<style>
.hiddenText {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.heightCard {
  max-height: 20rem;
}
.backgroundContent{
  background-color: #181D29;
}
</style>
