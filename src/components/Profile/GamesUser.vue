<template>
  <div>
    <div class="pt-5">
      <div class="flex centerGame">
        <h2 class="text-3xl font-bold">Games</h2>
        <p class="font-bold">Total Games: {{ userdata.libreria?.length }}</p>
      </div>
      <div class="divider"></div>
    </div>
    <div class="bg-gray-800 containerGames">
      <div class="grid grid-cols-3 gapP p-2" v-if="validateGames">
        <div
          class="card w-90 bg-base-100 shadow-xl"
          v-for="libreria in userdata.libreria"
          :key="libreria._id"
        >
          <figure>
            <img :src="libreria.thumbnailURL" alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="font-bold hiddenText">{{ libreria.name }}</h2>
            <div class="card-actions justify-end">
              <a class="btn btn-primary btn-sm" :href="'/game/' + libreria._id"
                >view</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="Nothing" v-if="userdata.libreria?.length === 0">
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

const validateGames = ref(false);

const dataUser = JSON.parse(localStorage.getItem("user_data"));
const route = useRoute();
const router = useRouter();

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
onMounted(() => {
  getUser();
});
</script>
