<template>
  <div class="flex centerA">
    <div class="join">
      <a class="btn join-item  btn-sm" href="/">Home</a>
      <button class="btn join-item btn-sm" @click="onNews">News</button>
    </div>
    <form class="join" @submit.prevent="onSerch">
      <input
        type="text"
        placeholder="search a game"
        class="input w-full max-w-xs rounded-badge input-sm input-bordered join-item"
        v-model="search"
      />

      <button
        class="btn btn-sm join-item rounded-r-full"
        type="submit"
        :disabled="
          $route.fullPath.slice(0, 8) === '/search' ||
          $route.fullPath.slice(0, 8) === '/search/'
            ? true
            : false
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="white"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"
          ></path>
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

const search = ref("");

function onNews() {
  router.push("/news");
}
function onHome() {
  router.push("/");
}
function onTest() {
  router.push("/test");
}
function onSerch() {
  //console.log(search.value);
  router.push("/search/" + search.value);
}
</script>

<style scoped>
/** scoped, use only on this page */

.centerA {
  align-items: center;
  justify-content: space-between;
}
</style>
