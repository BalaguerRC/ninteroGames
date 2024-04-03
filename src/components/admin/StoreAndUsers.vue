<template>
  <div class="w-full">
    <h1 class="text-3xl font-bold py-4">Store</h1>
    <div class="stats shadow w-full bg-yellow-600 my-2">
      <div class="card-body">
        <h2 class="card-title">New Games!</h2>
        <table
          class="table table-xs static table-pin-rows table-pin-cols justify-center"
        >
          <thead></thead>
          <tbody>
            <tr
              class="flex justify-between items-center"
              v-for="game in GamesCount"
              :key="game._id"
            >
              <td>
                <div class="flex items-center gap-3">
                  <figure class="static">
                    <div class="avatar">
                      <div class="mask mask-squircle w-12 h-12">
                        <img :src="game.thumbnailURL" />
                        alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </figure>

                  <div>
                    <div class="font-bold">{{ game.name }}</div>
                  </div>
                </div>
              </td>
              <td class="flex buttonContent">
                <a class="btn btn-sm" :href="'/game/' + game._id">View</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-actions justify-center">
          <a class="btn btn-sm btn-link" href="/dashboard/games">View More</a>
        </div>
      </div>
    </div>
    <div class="stats shadow w-full bg-green-600 my-2">
      <div class="card-body">
        <h2 class="card-title">New News!</h2>
        <table
          class="table table-xs table-pin-rows table-pin-cols justify-center"
        >
          <thead></thead>
          <tbody>
            <tr
              class="flex justify-between items-center"
              v-for="news in NewsCount"
              :key="news._id"
            >
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img :src="news.thumbnailURL" />
                      alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ news.title }}</div>
                  </div>
                </div>
              </td>
              <td class="flex buttonContent">
                <a class="btn btn-sm" :href="'news/' + news._id">View</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-actions justify-center">
          <a class="btn btn-sm btn-link" href="/dashboard/news">View More</a>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full">
    <h1 class="text-3xl font-bold py-4">Users</h1>
    <div class="stats shadow w-full bg-blue-600 my-2">
      <div class="card-body">
        <h2 class="card-title">New Users!</h2>
        <table
          class="table table-xs table-pin-rows table-pin-cols justify-center"
        >
          <thead></thead>
          <tbody>
            <tr
              class="flex justify-between items-center"
              v-for="user in UsersCount"
              :key="user._id"
            >
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img :src="user.profileURL" />
                      alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">
                      {{ user.nombre }} {{ user.apellido }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="flex buttonContent">
                <a class="btn btn-sm" :href="'profile/' + user._id">View</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="card-actions justify-center">
          <a class="btn btn-sm btn-link" href="/dashboard/users">View More</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const UsersCount = ref([]);
const GamesCount = ref([]);
const NewsCount = ref([]);

function getAllUsers() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + `/users/getall/?limit=5&page=1`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((data) => {
      //console.log(data.data.totalDocs);
      //console.log(data.data.docs);
      UsersCount.value = data.data.docs;
    })
    .catch((err) => console.log(err));
}

function getAllGames() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/games/?limit=2&page=1", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((data) => {
      //console.log(data.data.totalDocs);
      //console.log(data.data.docs);
      GamesCount.value = data.data.docs;
    })
    .catch((err) => console.log(err));
}
function getAllNews() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/articles/?limit=2&page=1", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((data) => {
      //console.log(data.data.totalDocs);
      //console.log(data.data.docs);
      NewsCount.value = data.data.docs;
    })
    .catch((err) => console.log(err));
}

onMounted(() => {
  getAllUsers();
  getAllGames();
  getAllNews();
});
</script>
