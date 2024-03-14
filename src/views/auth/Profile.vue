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
              <img v-bind:src="userImg" />
            </div>
          </div>
          <div>
            <div class="font-bold text-4xl">
              {{ userName }} {{ userLastName }}
            </div>
            <div class="text-sm opacity-50">
              {{ userUsername }}
            </div>
            <div class="text-sm opacity-50 text-slate-500">
              joined on {{ userCreated.substr(0, 10) }}
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
              {{ userData.followersCount }}
            </p>
          </a>
          <a
            class="flex justify-between pb-2 link link-hover"
            onclick="my_modal_3.showModal()"
          >
            <p class="text-sm font-bold text-slate-400">Following:</p>
            <p class="text-sm font-bold text-slate-400">
              {{ userData.followingCount }}
            </p>
          </a>
          <div>
            <a class="btn btn-sm btn-warning w-full" href="/settings">Edit User</a>
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
                  v-for="followers in userData.followers"
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
                    <a class="btn btn-sm" :href="'/profile/' + followers._id"
                      >View</a
                    >
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
                  v-for="followers in userData.following"
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
                    <a class="btn btn-sm" :href="'/profile/' + followers._id"
                      >View</a
                    >
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
          <p class="font-bold">Total Games: {{ userData.libreria?.length }}</p>
        </div>
        <div class="divider"></div>
      </div>

      <div class="bg-gray-800 containerGames">
        <div class="grid grid-cols-3 gapP p-2" v-if="validateGames">
          <div
            class="card w-90 bg-base-100 shadow-xl"
            v-for="libreria in userData.libreria"
            :key="libreria._id"
          >
            <figure>
              <img :src="libreria.thumbnailURL" alt="Shoes" />
            </figure>
            <div class="card-body">
              <h2 class="font-bold hiddenText">{{ libreria.name }}</h2>
              <div class="card-actions justify-end">
                <a
                  class="btn btn-primary btn-sm"
                  :href="'/game/' + libreria._id"
                  >view</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="Nothing" v-if="userData.libreria?.length === 0">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";

const router = useRouter();
const userName = ref(null);
const userLastName = ref(null);
const userUsername = ref(null);
const userCreated = ref(null);
const userImg = ref(null);

const userData = ref({});

const dataValidate = ref(false);

const dataUser = JSON.parse(localStorage.getItem("user_data"));

if (dataUser) {
  dataValidate.value = true;
  console.log("hay data");
  userName.value = dataUser.nombre;
  userLastName.value = dataUser.apellido;
  userUsername.value = dataUser.username;
  userCreated.value = dataUser.fechaCreacion;
  userImg.value = dataUser.profileURL;
} else {
  console.log("no hay");
  router.push("login");
}
const validateGames = ref(false);
function getUser() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/users/getid/" + dataUser._id)
    .then((data) => {
      console.log(data.data);
      userData.value = data.data;
      //userFollowers.value = data.data.followers;
      validateGames.value = true;
      //validateFollowing();
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
<style>
.Nothing {
  width: 100%; /* Ancho del contenedor */
  min-height: 46.5rem;
  display: flex; /* Utilizamos flexbox para centrar horizontalmente */
  justify-content: center; /* Centramos horizontalmente */
  align-items: center; /* Centramos verticalmente */
}
.NothingChild {
  text-align: center; /* Alineación del texto dentro del div (opcional) */
  font-weight: 800;
  font-size: 20px;
}
.containerGames {
  max-height: 47.5rem;
  min-height: 47.5rem;
  overflow-x: auto;
  border-radius: 10px;
}
.centerA {
  align-items: center;
  justify-content: space-between;
}
.buttonContent {
  justify-content: right;
}
.centerGame {
  align-items: end;
  justify-content: space-between;
}
.centerA2 {
  align-items: center;
}
/*grid-template-columns: repeat(3, minmax(0, 1fr));*/
.gapP {
  gap: 1.5rem;
}
</style>
