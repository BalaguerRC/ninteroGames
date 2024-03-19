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
            <div class="flex flex-row items-center">
              <div class="font-bold text-4xl">
                {{ userdata.nombre }} {{ userdata.apellido }}
              </div>
              <div class="badge badge-warning mx-2" v-if="userdata.tipo === 1">developer</div>
              <div class="badge badge-info mx-2" v-if="userdata.tipo ===0 ">Admin</div>
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
            <a
              class="btn btn-sm w-full btn-primary"
              @click="
                () => {
                  onFollow();
                }
              "
            >
              Follow
            </a>
          </div>
          <div class="py-2" v-if="validate">
            <a
              class="btn btn-sm btn-error w-full"
              @click="
                () => {
                  onUnFollow();
                }
              "
            >
              Unfollow
            </a>
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

      <div role="tablist" class="tabs tabs-lifted tabs-sm pt-4">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          class="tab"
          aria-label="Games"
          checked
        />
        <div
          role="tabpanel"
          class="tab-content bg-base-100 border-base-300 rounded-box p-4"
        >
          <GamesUser />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          class="tab"
          aria-label="My Games"
          :disabled="userdata.tipo != 1"
        />
        <div
          role="tabpanel"
          class="tab-content bg-base-100 border-base-300 rounded-box p-4"
        >
          <MyGamesUser />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GamesUser from "@/components/Profile/GamesUser.vue";
import MyGamesUser from "@/components/Profile/MyGamesUser.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import Swal from "sweetalert2";
import axios from "axios";

const userdata = ref({});
const userFollowers = ref([]);
const validateGames = ref(false);

const dataUser = JSON.parse(localStorage.getItem("user_data"));
const route = useRoute();
const router = useRouter();
function onFollow() {
  if (dataUser === null) {
    router.push("/login");
  } else {
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
          title: "Following!",
          icon: "success",
          text: data.data.message,
        });
        validate.value = true;
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
        title: "Un Follow!",
        icon: "success",
        text: data.data.message,
      });

      getUser();
      validate.value = false;
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
      userFollowers.value = data.data.followers;
      validateGames.value = true;
      validateFollowing();
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
  if (dataUser != null) {
    if (dataUser._id === route.params.id) {
      console.log("My Profile");
      router.push("/profile");
    }
  }
  getUser();
  //validateFollowing();
});
/*watch(validateGames, () => {
  console.log("hay cambios");
});*/
function validateFollowing() {
  if (dataUser != null) {
    userFollowers.value.forEach((data) =>
      data._id === dataUser._id
        ? (validate.value = true)
        : (validate.value = false)
    );
  }
}
const validate = ref(false);
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
.content {
  height: 100vh;
}
.hiddenText {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tab:is(input[type="radio"]) {
  width: 150px;
  font-weight: 700;
}
</style>
