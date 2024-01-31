<template>
  <div class="card w-90 bg-base-100 shadow-xl">
    <figure>
      <img
        src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        alt="Shoes"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ searchItem.title }} - {{ searchItem.id }}</h2>
      <div class="card-actions justify-end">
        <button
          class="btn btn-primary"
          @click="onGameItem(searchItem.id, searchItem.title)"
        >
          view
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

defineProps(["searchItem"]);

function onGameItem(id, title) {
  router.push("/game/" + id + "/" + title);
}
</script>
