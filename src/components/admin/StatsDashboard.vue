<template>
  <h1 class="text-3xl font-bold py-4">Dashboard</h1>
  <div class="grid grid-cols-3 gap-4 py-2">
    <div class="stats shadow bg-blue-600">
      <div class="stat">
        <div class="stat-figure">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"
            ></path>
          </svg>
        </div>
        <div class="stat-title text-gray-300 text-1xl font-bold">
          Total Users
        </div>
        <div class="stat-value" v-if="UsersCount">{{ UsersCount }}</div>
        <span v-else class="loading loading-spinner loading-lg"></span>
      </div>
    </div>
    <div class="stats shadow bg-blue-600">
      <div class="stat">
        <div class="stat-figure">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              d="m16.6 10.88-1.42-1.42-4.24 4.25-2.12-2.13L7.4 13l3.54 3.54z"
            ></path>
            <path
              d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2m0 14H5V8h14z"
            ></path>
          </svg>
        </div>
        <div class="stat-title text-gray-300 text-1xl font-bold">
          Total Requests
        </div>
        <div v-if="RequestsCount" class="stat-value">{{ RequestsCount }}</div>
        <span v-else class="loading loading-spinner loading-lg"></span>
      </div>
    </div>
    <div class="stats shadow bg-blue-600">
      <div class="stat">
        <div class="stat-figure">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path d="m12 2-5.5 9h11z"></path>
            <circle cx="17.5" cy="17.5" r="4.5"></circle>
            <path d="M3 13.5h8v8H3z"></path>
          </svg>
        </div>
        <div class="stat-title text-gray-300 text-1xl font-bold">
          Total Categories
        </div>
        <div v-if="CategoriesCount" class="stat-value">{{ CategoriesCount }}</div>
        <span v-else class="loading loading-spinner loading-lg"></span>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-4 py-2">
    <div class="stats shadow bg-yellow-600">
      <div class="stat">
        <div class="stat-figure">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              d="m21.58 16.09-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91M11 11H9v2H8v-2H6v-1h2V8h1v2h2zm4-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1"
            ></path>
          </svg>
        </div>
        <div class="stat-title text-gray-300 text-1xl font-bold">
          Total Games
        </div>
        <div v-if="GamesCount" class="stat-value">{{ GamesCount }}</div>
        <span v-else class="loading loading-spinner loading-lg"></span>
      </div>
    </div>
    <div class="stats shadow bg-green-600">
      <div class="stat">
        <div class="stat-figure">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
          >
            <path
              d="m22 3-1.67 1.67L18.67 3 17 4.67 15.33 3l-1.66 1.67L12 3l-1.67 1.67L8.67 3 7 4.67 5.33 3 3.67 4.67 2 3v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zM11 19H4v-6h7zm9 0h-7v-2h7zm0-4h-7v-2h7zm0-4H4V8h16z"
            ></path>
          </svg>
        </div>
        <div class="stat-title text-gray-300 text-1xl font-bold">
          Total News
        </div>
        <div v-if="NewsCount" class="stat-value">{{ NewsCount }}</div>
        <span v-else class="loading loading-spinner loading-lg"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const UsersCount = ref(0);
const RequestsCount = ref(0);
const CategoriesCount = ref(0);
const GamesCount = ref(0);
const NewsCount = ref(0);

function getAllUsers() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + `/users/getall`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((data) => {
      //console.log(data.data.totalDocs);
      //console.log(data.data.docs);
      UsersCount.value = data.data.totalDocs;
    })
    .catch((err) => console.log(err));
}

function getAllRequests() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/request/get", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((data) => {
      //console.log(data.data.totalDocs);
      //console.log(data.data.docs);
      RequestsCount.value = data.data.totalDocs;
    })
    .catch((err) => {
      Swal.fire({
        background: "#252526",
        color: "#FFF",
        title: "There was an error!",
        icon: "error",
        text: err.response.data.message,
      });
    });
}
function getAllCategories() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/categories/getpaginate", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((data) => {
      //console.log(data.data.totalDocs);
      //console.log(data.data.docs);
      CategoriesCount.value = data.data.totalDocs;
    })
    .catch((err) => console.log(err));
}
function getAllGames() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/games/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((data) => {
      //console.log(data.data.totalDocs);
      //console.log(data.data.docs);
      GamesCount.value = data.data.totalDocs;
    })
    .catch((err) => console.log(err));
}
function getAllNews() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/articles/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((data) => {
      //console.log(data.data.totalDocs);
      //console.log(data.data.docs);
      NewsCount.value = data.data.totalDocs;
    })
    .catch((err) => console.log(err));
}

onMounted(() => {
  getAllUsers();
  getAllRequests();
  getAllCategories();
  getAllGames();
  getAllNews();
});
</script>
