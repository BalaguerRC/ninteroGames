<template>
  <div class="lg:px-20 md:px-10">
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-col">
        <h1 class="text-3xl font-bold py-4">Games</h1>
        <div class="text-sm breadcrumbs">
          <ul>
            <li>
              <a href="/"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  /></svg
                >Dashboard</a
              >
            </li>
            <li>Games</li>
          </ul>
        </div>
      </div>
      <a class="btn btn-sm" href="/game/create">+ Create a Game</a>
    </div>
    <!-- search bar -->
    <div class="pt-10 pb-4 flex flex-row justify-end items-center gap-2">
      <select
        class="select select-sm select-bordered w-44 max-w-xs"
        v-model="Filter"
      >
        <option selected :value="{}">Filter</option>
        <option
          v-for="options in OptionsFilter"
          :key="options.n"
          :value="options"
        >
          {{ options.field }}
        </option>
      </select>
      <form @submit.prevent="filterGame">
        <div class="join">
          <input
            class="input input-sm input-bordered join-item"
            placeholder="search"
            v-model="Search"
          />
          <button type="submit" class="btn join-item btn-sm">Search</button>
        </div>
      </form>
    </div>

    <div class="overflow-x-auto relative w-full min-h-[25rem] pb-20">
      <table class="table table-xs md:table-xs table-pin-rows w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Developer</th>
            <th>Cateogires</th>
            <th>Price</th>
            <th>Dowloads</th>
            <th>WhishListCount</th>
            <th>Blocked</th>
            <th>Creation Date</th>
            <th>Update Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="game in Games" :key="game._id">
            <div class="tooltip tooltip-right" :data-tip="game._id">
              <th>{{ game._id.slice(0, 5) }}...</th>
            </div>
            <td>
              {{ game.name }}
            </td>
            <td>
              {{ game.developer?.nombre }}
              {{ game.developer?.apellido }}
            </td>
            <td>
              <div
                class="tooltip tooltip-right"
                :data-tip="game.category?.map((data) => data.nombre).join(',')"
              >
                <div class="badge">...</div>
              </div>
            </td>
            <td>${{ game.price }}</td>
            <td>
              {{ game.downloads }}
            </td>
            <td>
              {{ game.wishlistedUsersCount }}
            </td>
            <td>
              {{ game.blocked }}
            </td>
            <td>{{ game.publishDate.slice(0, 10) }}</td>
            <td>{{ game.updateDate.slice(0, 10) }}</td>
            <td>
              <div class="dropdown dropdown-left">
                <div
                  tabindex="0"
                  role="button"
                  class="btn btn-circle btn-ghost btn-sm"
                >
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M12 3c-.825 0-1.5.675-1.5 1.5S11.175 6 12 6s1.5-.675 1.5-1.5S12.825 3 12 3m0 15c-.825 0-1.5.675-1.5 1.5S11.175 21 12 21s1.5-.675 1.5-1.5S12.825 18 12 18m0-7.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5s1.5-.675 1.5-1.5s-.675-1.5-1.5-1.5'/%3E%3C/svg%3E"
                  />
                </div>
                <ul
                  tabindex="0"
                  class="dropdown-content z-[1] menu menu-xs p-2 shadow bg-base-200 rounded-box w-52"
                >
                  <li class="">
                    <a :href="'/game/' + game._id">
                      <img :src="Eye" class="h-5 w-5" /> View Game
                    </a>
                  </li>
                  <li>
                    <a
                      class="hover:bg-yellow-600"
                      :href="'/game/update/' + game._id"
                      ><img :src="Edit" class="h-5 w-5" />Edit</a
                    >
                  </li>
                  <li>
                    <a
                      class="hover:bg-red-600"
                      onclick="my_modal_1.showModal()"
                      @click="
                        GameToDelete = {
                          id: game._id,
                          name: game.name,
                        }
                      "
                      ><img :src="Delete" class="h-5 w-5" />Delete</a
                    >
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-3xl">Warning!</h3>
        <p class="py-4">
          Are you sure to delete the game {{ GameToDelete.name }} with the id
          {{ GameToDelete.id }}?
        </p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button
              class="btn bg-red-600 hover:btn-error mr-2"
              @click="deleteGame(GameToDelete.id)"
            >
              Delete
            </button>
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
    <!-- Pagination -->
    <div class="mb-4">
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
            Show {{ option }} pages
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import Eye from "@/assets/Eye.png";
import Accept from "@/assets/Accept.webp";
import Edit from "@/assets/Edit.png";
import Delete from "@/assets/Delete.png";
import axios from "axios";
import Swal from "sweetalert2";

const Games = ref([]);
const Search = ref("");
const Filter = ref({});
const OptionsFilter = ref([
  { n: 1, name: "blocked", value: true, field: "Blocked" },
  { n: 2, name: "blocked", value: false, field: "No Blocked" },
]);

const GameToDelete = ref({ id: "", name: "" });
function getAllGames() {
  axios
    .get(
      import.meta.env.VITE_API_ENDPOINT +
        `/games/?limit=${pageLimit.value}&page=${page.value}`
    )
    .then((data) => {
      //console.log(data.data);
      console.log(data.data);
      Games.value = data.data.docs;
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
}

function filterGame() {
  console.log("search", Search.value, "filetr", Filter.value);
  let query_route;
  let query_body = {};
  //page.value = 1;
  if (Search.value != "" || Filter.value.value != null) {
    console.log("hay algo");
    query_route = `/games/filter?limit=${pageLimit.value}&&page=${page.value}`;

    query_body = {
      name: Search.value == "" ? undefined : Search.value, //keys condition {}, if search.value == "": return undefine ,otherwise return the exact value of search.value
      blocked: Filter.value.name == "blocked" ? Filter.value.value : undefined,
      /*category:
        categoriesSelected.value.length == 0
          ? undefined
          : categoriesSelected.value?.map((data) => data._id),
      price:
        priceSelected.value.value == "" ? undefined : priceSelected.value.value,
      developer:
        developerSelected.value == "" ? undefined : developerSelected.value,
      downloads: orderSelected.value == "" ? undefined : orderSelected.value,*/
    };
    axios
      .post(import.meta.env.VITE_API_ENDPOINT + query_route, query_body)
      .then((data) => {
        console.log("filter category", data.data);
        Games.value = data.data.docs;
        hasPrevPage.value = data.data.hasPrevPage;
        hasNextPage.value = data.data.hasNextPage;
        prevPage.value = data.data.prevPage;
        nextPage.value = data.data.nextPage;

        page.value = data.data.page;
        totalPages.value = data.data.totalPages;
        //validateGames.value = true;
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

function deleteGame(id) {
  console.log("delete ", id);
  axios
    .delete(import.meta.env.VITE_API_ENDPOINT + "/games/delete/" + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((data) => {
      console.log(data.data);
      Swal.fire({
        background: "#252526",
        color: "#FFF",
        title: "Game Deleted!",
        text: "Succes",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
      getAllGames();
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

onMounted(() => {
  getAllGames();
});

function getGamesMiddleware() {
  //getAllAuthors();
  if (Search.value || Filter.value.value != null) {
    console.log("getting games by filter");
    filterGame();
  } else {
    console.log("getting all games");
    getAllGames();
  }
}

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

const hasPrevPage = ref(false);
const hasNextPage = ref(true);
const prevPage = ref();
const nextPage = ref();

const page = ref(1);
const totalPages = ref();
const pageLimit = ref(10);
const pageLimitOptions = [10, 15, 20, 25, 30];

watch(pageLimit, () => {
  page.value = 1;
  getGamesMiddleware();
});
</script>
