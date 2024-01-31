<template>
  <div class="md:container md:mx-auto">
    <div class="p-10">
      <SearchBar />

      <h2 class="text-4xl font-bold pt-5">
        {{ $route.params.name == undefined ? null : `"${$route.params.name}"` }}
      </h2>

      <div class="flex searchGame pt-5">
        <div class="join">
          <input
            type="text"
            placeholder="Type here"
            class="input w-full max-w-xs input-sm input-bordered join-item"
            v-model="search"
          />
          <select class="select select-bordered max-w-xs select-sm join-item">
            <option selected>Category</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
          <select class="select select-bordered max-w-xs select-sm join-item">
            <option selected>Relevance</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
        <div>
          <button class="btn btn-sm ml-4" @click="onSerch">search</button>
        </div>
      </div>

      <div class="pt-5">
        <div class="pt-3">
          <div class="grid grid-cols-4 gap-3">
            <SearchItem
              v-for="searchItems in games"
              :key="searchItems.id"
              :search-item="searchItems"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchItem from "@/components/SearchItem.vue";
import { ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const search = ref("");
function onSerch() {
  //console.log(search.value);
  router.push("/search/" + search.value);
}

const games = ref([
  {
    id: 1,
    title: "name",
  },
  {
    id: 2,
    title: "name2",
  },

  {
    id: 3,
    title: "name3",
  },

  {
    id: 4,
    title: "name4",
  },

  {
    id: 5,
    title: "name5",
  },
]);
</script>

<style scoped>
/** scoped, use only on this page */

.centerA {
  align-items: center;
  justify-content: space-between;
}
.searchGame {
  align-items: center;
  justify-content: left;
}
</style>
