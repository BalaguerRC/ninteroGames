<template>
  <div class="md:container md:mx-auto">
    <div class="p-10">
      <SearchBar />
      <div
        class="alert shadow-lg mt-5"
        v-if="user_data && user_data.tipo === 1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-info shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 class="font-bold">
            Welcome <strong>{{ user_data.username }}</strong
            >!
          </h3>
          <div class="text-xs">
            Since you are a developer, you can publish your own game
          </div>
        </div>
        <button
          class="btn btn-sm btn-primary"
          @click="router.push('/game/create')"
        >
          Publish a new game
        </button>
      </div>

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
          <input
            type="text"
            placeholder="categories..."
            class="input w-full max-w-xs input-sm input-bordered join-item"
            readonly
            :value="
              categoriesSelected?.map((option) => option.nombre).join(', ')
            "
          />
          <div class="dropdown w-full">
            <div
              tabindex="0"
              role="button"
              class="btn btn-outline btn-sm w-full"
            >
              Category
              <svg
                width="12px"
                height="12px"
                class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path
                  d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
                ></path>
              </svg>
            </div>
            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu bg-base-200 w-56 p-0 [&_li>*]:rounded-none"
            >
              <label
                class="label cursor-pointer"
                v-for="category in categories"
                :key="category._id"
              >
                <span class="label-text">{{ category.nombre }}</span>
                <input
                  class="checkbox checkbox-sm"
                  type="checkbox"
                  :value="category"
                  v-model="categoriesSelected"
                />
              </label>
            </ul>
          </div>
          <select
            class="select select-bordered max-w-xs select-sm join-item"
            v-model="priceSelected"
          >
            <option selected value="">Prices</option>
            <option v-for="prices in price" :key="prices.value" :value="prices">
              {{ prices.label }}
            </option>
          </select>

          <select
            class="select select-bordered max-w-xs select-sm join-item"
            v-model="developerSelected"
          >
            <option selected value="">Developers</option>
            <option v-for="dvs in developers" :key="dvs._id" :value="dvs._id">
              {{ dvs.username }}
            </option>
          </select>
          <select
            class="select select-bordered max-w-xs select-sm join-item"
            v-model="orderSelected"
          >
            <option selected value="">Order by</option>
            <option
              v-for="orders in orderBy"
              :key="orders.value"
              :value="orders.value"
            >
              {{ orders.label }}
            </option>
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
          <select
            v-model="pageLimit"
            class="select select-bordered select-sm"
            disabled
          >
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
import { onMounted, ref, watch } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const user_data = JSON.parse(localStorage.getItem("user_data"));

const route = useRoute();
const search = ref("");
const game = ref([]);

const price = ref([
  { label: "US$ 10", value: 10 },
  { label: "US$ 20", value: 20 },
  { label: "US$ 30", value: 30 },
  { label: "US$ 50", value: 50 },
  { label: "US$ 100", value: 100 },
  { label: "MAX US$ 200", value: 200 },
]);
const priceSelected = ref("");

const developers = ref([]);
const developerSelected = ref("");

const orderBy = ref([
  { label: "Most downloads", value: "DESC" },
  { label: "Least downloads", value: "ASCD" },
]);
const orderSelected = ref("");

function getAllAuthors() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/users/get/developers")
    .then((data) => {
      if (data.status === 200) {
        console.log("authors", data.data);
        developers.value = data.data;
      } else {
        console.log(data.data);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          html: data.data.message,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        background: "#252526",
        color: "#FFF",
        title: "There was an error!",
        icon: "error",
        text: error.response.data.message,
      });
    });
}
function getAllGames() {
  axios
    .get(
      import.meta.env.VITE_API_ENDPOINT + "/games/?limit=8&page=" + page.value
    )
    .then((data) => {
      //console.log(data.data);
      //console.log(data.data.docs);
      game.value = data.data.docs;

      hasPrevPage.value = data.data.hasPrevPage;
      hasNextPage.value = data.data.hasNextPage;
      prevPage.value = data.data.prevPage;
      nextPage.value = data.data.nextPage;

      page.value = data.data.page;
      totalPages.value = data.data.totalPages;
    })
    .catch((err) => console.log(err));
}
function getAllCategories() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/categories/get")
    .then((data) => {
      console.log("category", data.data);
      categories.value = data.data;
    })
    .catch((err) => console.log(err));
}
function filterGame() {
  let query_route;
  let query_body = {};
  /*console.log(
    "From filter",
    search.value,
    "Categorie",
    categoriesSelected.value.length,
    "price",
    priceSelected.value,
    "developer",
    developerSelected.value,
    "ordered",
    orderSelected.value
  );*/
  if (
    search.value != "" ||
    categoriesSelected.value.length != 0 ||
    priceSelected.value != "" ||
    developerSelected.value != "" ||
    orderSelected.value != ""
  ) {
    query_route = `/games/filter?limit=8&&page=${page.value}`;

    query_body = {
      name: search.value == "" ? undefined : search.value, //keys condition {}, if search.value == "": return undefine ,otherwise return the exact value of search.value
      category:
        categoriesSelected.value.length == 0
          ? undefined
          : categoriesSelected.value?.map((data) => data._id),
      price:
        priceSelected.value.value == "" ? undefined : priceSelected.value.value,
      developer:
        developerSelected.value == "" ? undefined : developerSelected.value,
      downloads: orderSelected.value == "" ? undefined : orderSelected.value,
    };
    axios
      .post(import.meta.env.VITE_API_ENDPOINT + query_route, query_body)
      .then((data) => {
        console.log("filter category", data.data);
        game.value = data.data.docs;

        hasPrevPage.value = data.data.hasPrevPage;
        hasNextPage.value = data.data.hasNextPage;
        prevPage.value = data.data.prevPage;
        nextPage.value = data.data.nextPage;

        page.value = data.data.page;
        totalPages.value = data.data.totalPages;
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          text: error.response.data.message,
        });
      });
  } else {
    console.log("else getAll");
    getAllGames();
  }
}

/**
function filterGame() {
  let query_route;
  let query_body = {};
  console.log(
    "From filter",
    search.value,
    categoriesSelected.value.length,
    priceSelected.value.value,
    developerSelected.value
  );
  if (
    search.value &&
    categoriesSelected.value.length != 0 &&
    priceSelected.value.value != "" &&
    developerSelected.value != ""
  ) {
    query_route = `/games/filter?limit=8&&page=${page.value}`;
    query_body = {
      name: search.value,
      category: categoriesSelected.value?.map((data) => data._id),
      price: priceSelected.value.value,
      developer: developerSelected.value,
    };
    axios
      .post(import.meta.env.VITE_API_ENDPOINT + query_route, query_body)
      .then((data) => {
        console.log("filter category");
        game.value = data.data.docs;

        hasPrevPage.value = data.data.hasPrevPage;
        hasNextPage.value = data.data.hasNextPage;
        prevPage.value = data.data.prevPage;
        nextPage.value = data.data.nextPage;

        page.value = data.data.page;
        totalPages.value = data.data.totalPages;
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          text: error.response.data.message,
        });
      });
  } else if (
    (search.value && categoriesSelected.value.length != 0) ||
    priceSelected.value.value != ""
  ) {
    console.log("prueba con ||");
    query_route = `/games/filter?limit=8&&page=${page.value}`;
    query_body = {
      name: search.value,
      category:
        categoriesSelected.value.length == 0
          ? undefined
          : categoriesSelected.value?.map((data) => data._id),
      price: priceSelected.value.value,
    };
    axios
      .post(import.meta.env.VITE_API_ENDPOINT + query_route, query_body)
      .then((data) => {
        console.log("filter category");
        game.value = data.data.docs;

        hasPrevPage.value = data.data.hasPrevPage;
        hasNextPage.value = data.data.hasNextPage;
        prevPage.value = data.data.prevPage;
        nextPage.value = data.data.nextPage;

        page.value = data.data.page;
        totalPages.value = data.data.totalPages;
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          text: error.response.data.message,
        });
      });
  } else if (search.value && categoriesSelected.value.length != 0) {
    query_route = `/games/filter?limit=8&&page=${page.value}`;
    query_body = {
      name: search.value,
      category: categoriesSelected.value?.map((data) => data._id),
    };
    axios
      .post(import.meta.env.VITE_API_ENDPOINT + query_route, query_body)
      .then((data) => {
        console.log("filter category");
        game.value = data.data.docs;

        hasPrevPage.value = data.data.hasPrevPage;
        hasNextPage.value = data.data.hasNextPage;
        prevPage.value = data.data.prevPage;
        nextPage.value = data.data.nextPage;

        page.value = data.data.page;
        totalPages.value = data.data.totalPages;
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          text: error.response.data.message,
        });
      });
  } else if (search.value) {
    query_route = `/games/filter?limit=8&&page=${page.value}`;
    console.log(import.meta.env.VITE_API_ENDPOINT + query_route);
    axios
      .post(import.meta.env.VITE_API_ENDPOINT + query_route, {
        name: search.value,
      })
      .then((data) => {
        if (data.status === 200) {
          game.value = data.data.docs;

          hasPrevPage.value = data.data.hasPrevPage;
          hasNextPage.value = data.data.hasNextPage;
          prevPage.value = data.data.prevPage;
          nextPage.value = data.data.nextPage;

          page.value = data.data.page;
          totalPages.value = data.data.totalPages;
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error in search! ",
          icon: "error",
          text: error.response.data.message,
        });
      });
  } else if (categoriesSelected.value.length != 0) {
    query_route = `/games/filter?limit=8&&page=${page.value}`;
    query_body.category = categoriesSelected.value?.map((data) => data._id);
    axios
      .post(import.meta.env.VITE_API_ENDPOINT + query_route, query_body)
      .then((data) => {
        console.log("filter category");
        game.value = data.data.docs;

        hasPrevPage.value = data.data.hasPrevPage;
        hasNextPage.value = data.data.hasNextPage;
        prevPage.value = data.data.prevPage;
        nextPage.value = data.data.nextPage;

        page.value = data.data.page;
        totalPages.value = data.data.totalPages;
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          text: error.response.data.message,
        });
      });
  } else if (priceSelected.value.value != "") {
    query_route = `/games/filter?limit=8&&page=${page.value}`;
    query_body = {
      price: priceSelected.value.value,
    };
    axios
      .post(import.meta.env.VITE_API_ENDPOINT + query_route, query_body)
      .then((data) => {
        console.log("filter category");
        game.value = data.data.docs;

        hasPrevPage.value = data.data.hasPrevPage;
        hasNextPage.value = data.data.hasNextPage;
        prevPage.value = data.data.prevPage;
        nextPage.value = data.data.nextPage;

        page.value = data.data.page;
        totalPages.value = data.data.totalPages;
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          text: error.response.data.message,
        });
      });
  } else if (developerSelected.value != "") {
    console.log("developer");
    query_route = `/games/filter?limit=8&&page=${page.value}`;
    query_body = {
      developer: developerSelected.value,
    };
    axios
      .post(import.meta.env.VITE_API_ENDPOINT + query_route, query_body)
      .then((data) => {
        console.log("filter category");
        game.value = data.data.docs;

        hasPrevPage.value = data.data.hasPrevPage;
        hasNextPage.value = data.data.hasNextPage;
        prevPage.value = data.data.prevPage;
        nextPage.value = data.data.nextPage;

        page.value = data.data.page;
        totalPages.value = data.data.totalPages;
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          text: error.response.data.message,
        });
      });
  } else {
    getAllGames();
  }
}
 */
function setPage(event) {
  if (page.value > totalPages.value) {
    page.value = totalPages.value;
  }
  if (page.value < 1) {
    page.value = 1;
  }

  if (event.target.tagName == "BUTTON") {
    page.value = parseInt(event.target.dataset.gotonumber) || null;
  } else if (event.target.tagName == "INPUT") {
    page.value = parseInt(event.target.value) || 1;
  }
  console.log("cambio de pagina");
  getGamesMiddleware();
}

const router = useRouter();

function onSerch() {
  //console.log(search.value);
  //console.log("category", categorySeleceted.value);
  router.push("/search/" + search.value);
  filterGame();
}
const hasPrevPage = ref(false);
const hasNextPage = ref(true);
const prevPage = ref();
const nextPage = ref();

const page = ref(1);
const totalPages = ref();
const pageLimit = ref(10);
const pageLimitOptions = [10, 15, 20, 25, 30];

const categories = ref([]);
const categoriesSelected = ref([]);

function getGamesMiddleware() {
  //getAllAuthors();
  if (
    search.value ||
    categoriesSelected.value.length != 0 ||
    priceSelected.value != "" ||
    developerSelected.value != "" ||
    orderSelected.value != ""
  ) {
    console.log("getting games by filter");
    filterGame();
  } else {
    console.log("getting all games");
    getAllGames();
  }
}

onMounted(() => {
  if (route.params.name) {
    search.value = route.params.name == undefined ? "" : route.params.name;
    getGamesMiddleware();
  } else {
    getAllGames();
  }
  getAllAuthors();
  getAllCategories();
});

watch(pageLimit, () => {
  page.value = 1;
  getGamesMiddleware();
});
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
