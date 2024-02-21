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
              v-for="searchItems in game"
              :key="searchItems._id"
              :search-item="searchItems"
            />
          </div>
        </div>
      </div>

      <div class="my-4">
        <div class="flex items-center gap-3 justify-center">
          <div class="join">
            <button
              type="button"
              class="join-item btn btn-sm"
              :class="{ 'btn-disabled': page == 1 }"
              :data-gotonumber="1"
              @click="setPage"
            >
              First page
            </button>
            <button
              type="button"
              class="join-item btn btn-sm"
              :class="{ 'btn-disabled': !hasPrevPage }"
              :data-gotonumber="prevPage"
              @click="setPage"
            >
              Previous page
            </button>
            <button
              type="button"
              class="join-item btn btn-sm"
              :class="{ 'btn-disabled': !hasNextPage }"
              :data-gotonumber="nextPage"
              @click="setPage"
            >
              Next page
            </button>
            <button
              type="button"
              class="join-item btn btn-sm"
              :class="{ 'btn-disabled': page == totalPages }"
              :data-gotonumber="totalPages"
              @click="setPage"
            >
              Last page
            </button>
          </div>
          <span class="flex items-center gap-1">
            <div>Page</div>
            <strong> {{ page }} of {{ totalPages }} </strong>
          </span>
          <span class="flex items-center gap-1">
            | Go to page:
            <div class="tooltip" data-tip="Press enter">
              <input
                :value="page"
                type="number"
                @keyup.enter="setPage"
                class="input input-bordered input-info input-sm w-20"
                placeholder="Page number"
              />
            </div>
          </span>
          <select v-model="pageLimit" class="select select-bordered select-sm">
            <option
              v-for="option in pageLimitOptions"
              :key="'limit' + option"
              :value="option"
            >
              Show 10 pages
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchItem from "@/components/Search/SearchItem.vue";
import { onMounted, ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import { useRouter } from "vue-router";
import axios from "axios";

const game = ref([]);
onMounted(() => {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/games/")
    .then((data) => {
      console.log(data.data);
      console.log(data.data.docs);
      game.value = data.data.docs;
    })
    .catch((err) => console.log(err));
});
const router = useRouter();

const search = ref("");
function onSerch() {
  //console.log(search.value);
  router.push("/search/" + search.value);
}
const articles = ref();
const hasPrevPage = ref(false);
const hasNextPage = ref(true);
const prevPage = ref();
const nextPage = ref();

const page = ref(1);
const totalPages = ref();
const pageLimit = ref(10);
const pageLimitOptions = [10, 15, 20, 25, 30];
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
