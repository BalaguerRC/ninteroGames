<template>
  <div>
    <div class="pt-5">
      <div class="flex centerGame">
        <h2 class="text-3xl font-bold">My Games</h2>
        <p class="font-bold">Total Games: {{ myGames?.length }}</p>
      </div>
      <div class="divider"></div>
    </div>
    <div class="containerGames">
      <div class="grid grid-cols-3 gapP p-2" v-if="validateGames">
        <div
          class="card w-90 bg-base-100 shadow-xl rounded-lg"
          v-for="libreria in myGames"
          :key="libreria._id"
        >
          <figure>
            <img :src="libreria.thumbnailURL" alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="font-bold hiddenText">{{ libreria.name }}</h2>
            <p class="font-bold">${{ libreria.price }}</p>
            <div class="card-actions justify-end">
              <a class="btn btn-primary btn-sm" :href="'/game/' + libreria._id"
                >view</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="Nothing" v-if="myGames?.length === 0">
        <div class="NothingChild">THERE NO GAMES</div>
      </div>
      <div class="grid grid-cols-3 gapP p-2" v-if="!validateGames">
        <div class="card w-90 bg-base-100 shadow-xl">
          <figure>
            <div class="skeleton w-full h-56"></div>
          </figure>
          <div class="card-body">
            <div class="skeleton w-full h-8"></div>
            <div class="card-actions justify-end">
              <div class="skeleton w-20 h-8"></div>
            </div>
          </div>
        </div>
        <div class="card w-90 bg-base-100 shadow-xl">
          <figure>
            <div class="skeleton w-full h-56"></div>
          </figure>
          <div class="card-body">
            <div class="skeleton w-full h-8"></div>
            <div class="card-actions justify-end">
              <div class="skeleton w-20 h-8"></div>
            </div>
          </div>
        </div>
        <div class="card w-90 bg-base-100 shadow-xl">
          <figure>
            <div class="skeleton w-full h-56"></div>
          </figure>
          <div class="card-body">
            <div class="skeleton w-full h-8"></div>
            <div class="card-actions justify-end">
              <div class="skeleton w-20 h-8"></div>
            </div>
          </div>
        </div>
        <div class="card w-90 bg-base-100 shadow-xl">
          <figure>
            <div class="skeleton w-full h-56"></div>
          </figure>
          <div class="card-body">
            <div class="skeleton w-full h-8"></div>
            <div class="card-actions justify-end">
              <div class="skeleton w-20 h-8"></div>
            </div>
          </div>
        </div>
        <div class="card w-90 bg-base-100 shadow-xl">
          <figure>
            <div class="skeleton w-full h-56"></div>
          </figure>
          <div class="card-body">
            <div class="skeleton w-full h-8"></div>
            <div class="card-actions justify-end">
              <div class="skeleton w-20 h-8"></div>
            </div>
          </div>
        </div>
        <div class="card w-90 bg-base-100 shadow-xl">
          <figure>
            <div class="skeleton w-full h-56"></div>
          </figure>
          <div class="card-body">
            <div class="skeleton w-full h-8"></div>
            <div class="card-actions justify-end">
              <div class="skeleton w-20 h-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import Swal from "sweetalert2";
import axios from "axios";

const userdata = ref({});
const myGames = ref([]);

const validateGames = ref(false);

const route = useRoute();
//const router = useRouter();

function getUser() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/users/getid/" + route.params.id)
    .then((data) => {
      console.log(data.data);
      userdata.value = data.data;
      validateGames.value = true;
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

function getMyGames() {
  axios
    .post(import.meta.env.VITE_API_ENDPOINT + "/games/filter?limit=9&&page=1", {
      developer: route.params.id,
    })
    .then((data) => {
      //console.log("filter category", data.data);
      myGames.value = data.data.docs;
      validateGames.value = true;
    })
    .catch((error) => {
      console.log(error);

      if (error.response.status === 404) {
        console.log("filter error");
        validateGames.value = true;
      } else {
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          text: error.response.data.message,
        });
      }
    });
}
onMounted(() => {
  getMyGames();
  //getUser();
});
</script>
