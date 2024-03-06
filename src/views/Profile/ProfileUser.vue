<template>
  <div class="md:container md:mx-auto">
    <div class="pl-10 pr-10 pb-10">
      <div class="text-sm breadcrumbs">
        <ul>
          <li><a href="/">Home</a></li>
          <li>Profile</li>
        </ul>
      </div>
      <div class="flex centerA">
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask mask-squircle w-24">
              <img v-bind:src="userdata.profileURL" />
            </div>
          </div>
          <div>
            <div class="font-bold text-4xl">
              {{ userdata.nombre }} {{ userdata.apellido }}
            </div>
            <div class="text-sm opacity-50">
              {{ userdata.username }}
            </div>
            <div class="text-sm opacity-50 text-slate-500">
              joined on {{ userdata.fechaCreacion?.substr(0, 10) }}
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <a
            class="flex justify-between pt-2 link link-hover"
            onclick="my_modal_2.showModal()"
          >
            <p class="text-sm font-bold text-slate-400">Followers:</p>
            <p class="text-sm font-bold text-slate-400">
              {{ userdata.followersCount }}
            </p>
          </a>
          <a
            class="flex justify-between pb-2 link link-hover"
            onclick="my_modal_3.showModal()"
          >
            <p class="text-sm font-bold text-slate-400">Following:</p>
            <p class="text-sm font-bold text-slate-400">
              {{ userdata.followingCount }}
            </p>
          </a>
          <div class="py-2" v-if="!validate">
            <button class="btn btn-sm w-full btn-primary" @click="onFollow()">
              Follow
            </button>
            {{
              userdata.followers?.forEach((element) => {
                if (element._id === dataUser._id) {
                  validate = true;
                }
              })
            }}
          </div>
          <div v-if="validate">
            <button class="btn btn-sm btn-error w-full" @click="onUnFollow()">
              Unfollow
            </button>
          </div>
        </div>
      </div>
      <dialog id="my_modal_2" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 class="font-bold text-lg mb-5">Followers!</h3>
          <div class="overflow-x-auto max-h-72 py-4">
            <table
              class="table table-xs table-pin-rows table-pin-cols justify-center"
            >
              <thead></thead>
              <tbody>
                <tr
                  v-for="followers in userdata.followers"
                  :key="followers._id"
                >
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                          <img v-bind:src="followers.profileURL" />
                          alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">
                          {{ followers.nombre }} {{ followers.apellido }}
                        </div>
                        <div class="text-sm opacity-50">
                          {{ followers.username }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="flex buttonContent">
                    <a class="btn btn-sm" :href="followers._id">View</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="my_modal_3" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 class="font-bold text-lg mb-5">Following!</h3>
          <div class="overflow-x-auto max-h-72 py-4">
            <table
              class="table table-xs table-pin-rows table-pin-cols justify-center"
            >
              <thead></thead>
              <tbody>
                <tr
                  v-for="followers in userdata.following"
                  :key="followers._id"
                >
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                          <img v-bind:src="followers.profileURL" />
                          alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">
                          {{ followers.nombre }} {{ followers.apellido }}
                        </div>
                        <div class="text-sm opacity-50">
                          {{ followers.username }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="flex buttonContent">
                    <a class="btn btn-sm" :href="followers._id">View</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <div class="pt-5">
        <div class="flex centerGame">
          <h2 class="text-3xl font-bold">Games</h2>
          <p class="font-bold">Total Games: {{ userdata.libreria?.length }}</p>
        </div>
        <div class="divider"></div>
      </div>

      <div class="grid grid-cols-3 gapP">
        {{ userdata.libreria?.map((data) => data) }}
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
const dataUser = JSON.parse(localStorage.getItem("user_data"));
const route = useRoute();
const router = useRouter();
function onFollow() {
  console.log(
    "follow",
    import.meta.env.VITE_API_ENDPOINT + "/following/add/" + route.params.id
  );
  axios
    .put(
      import.meta.env.VITE_API_ENDPOINT + "/following/add/" + route.params.id,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((data) => {
      console.log(data);
      Swal.fire({
        background: "#252526",
        color: "#FFF",
        title: "There was an error!",
        icon: "success",
        text: data.data.message,
      });
      getUser();
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
function onUnFollow() {
  console.log(
    "follow",
    import.meta.env.VITE_API_ENDPOINT + "/following/remove/" + route.params.id
  );
  axios
    .put(
      import.meta.env.VITE_API_ENDPOINT +
        "/following/remove/" +
        route.params.id,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((data) => {
      console.log(data.data);
      Swal.fire({
        background: "#252526",
        color: "#FFF",
        title: "There was an error!",
        icon: "success",
        text: data.data.message,
      });
      getUser();
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
function getUser() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/users/getid/" + route.params.id)
    .then((data) => {
      console.log(data.data);
      userdata.value = data.data;
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
/*function OnProfileRoute(id) {
  console.log(id);
  router.push("/profile/" + id);
}*/

onMounted(() => {
  getUser();
});
const validate = ref(false);
</script>
<style>
.centerA {
  align-items: center;
  justify-content: space-between;
}
.centerGame {
  align-items: end;
  justify-content: space-between;
}
.centerA2 {
  align-items: center;
}
.buttonContent {
  justify-content: right;
}
/*grid-template-columns: repeat(3, minmax(0, 1fr));*/
.gapP {
  gap: 1.5rem;
}
</style>
