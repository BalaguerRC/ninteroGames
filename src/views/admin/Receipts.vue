<template>
  <div class="lg:px-20 md:px-10">
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-col">
        <h1 class="text-3xl font-bold py-4">Receipts</h1>
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
            <li>Receipts</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- search bar -->
    <div class="pt-10 pb-4 flex flex-row justify-end items-center">
      <form v-on:submit.prevent="">
        <div class="join">
          <input
            class="input input-sm input-bordered join-item"
            disabled
            placeholder="search"
          />
          <button type="button" class="btn join-item btn-sm" disabled>
            Search
          </button>
        </div>
      </form>
    </div>

    <div class="overflow-x-auto relative w-full min-h-[25rem]">
      <table class="table table-sm md:table-sm table-pin-rows w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Game</th>
            <th>Creation Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="receipt in receipts" :key="receipt._id">
            <div class="tooltip tooltip-right" :data-tip="receipt._id">
              <th>{{ receipt._id.slice(0, 10) }}...</th>
            </div>
            <td>
              {{ receipt.user?.nombre }}
              {{ receipt.user?.apellido }}
            </td>
            <td>
              {{ receipt.game?.name }}
            </td>
            <td>{{ receipt.creationDate.slice(0, 10) }}</td>
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
                    <a :href="'/profile/' + receipt.user?._id">
                      <img :src="Eye" class="h-5 w-5" /> View User
                    </a>
                  </li>
                  <li>
                    <a
                      class="hover:bg-red-600"
                      onclick="my_modal_1.showModal()"
                      @click="
                        ReceiptsToDelete = {
                          id: receipt._id,
                          name: receipt.user?.nombre,
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
          Are you sure to delete the {{ ReceiptsToDelete.name }} receipt with the
          id {{ ReceiptsToDelete.id }}?
        </p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button
              class="btn bg-red-600 hover:btn-error mr-2"
              @click="deleteReceipt(ReceiptsToDelete.id)"
            >
              Delete
            </button>
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
    <!-- Pagination -->
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
import Delete from "@/assets/Delete.png";
import axios from "axios";
import Swal from "sweetalert2";

const Search = ref("");
const ReceiptsToDelete = ref({ id: "", name: "" });

const receipts = ref([]);
function getAllReceipts() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/receipts/getall", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((data) => {
      //console.log(data.data);
      console.log(data.data);
      receipts.value = data.data.docs;
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
function deleteReceipt(id) {
  console.log("delete ", id);
  /*axios
    .delete(import.meta.env.VITE_API_ENDPOINT + "/receipts/delete/" + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((data) => {
      console.log(data.data);
      Swal.fire({
        background: "#252526",
        color: "#FFF",
        title: "Receipt Deleted!",
        text: "Succes",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
      getAllReceipts();
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        background: "#252526",
        color: "#FFF",
        title: "There was an error!",
        icon: "error",
        text: error.response.data.message
          ? error.response.data.message
          : error.response.data.error.map((data) => data),
      });
    });*/
}

onMounted(() => {
  getAllReceipts();
});

function getReceiptsMiddleware() {
  //getAllAuthors();
  if (Search.value) {
    console.log("getting requests by filter");
    //filter();
  } else {
    console.log("getting all requests");
    getAllReceipts();
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
  getReceiptsMiddleware();
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
  getReceiptsMiddleware();
});
</script>
