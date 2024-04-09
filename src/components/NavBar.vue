<template>
  <div
    class="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur"
  >
    <nav className="navbar w-full p-2">
      <div class="flex-1">
        <a class="btn btn-ghost hover:bg-base-100 text-xl" href="/">nintero</a>
      </div>

      <div class="flex-none" v-if="dataValidate">
        <CreditCard />
        <div class="tooltip tooltip-bottom" data-tip="Wishlist">
          <div class="dropdown dropdown-end">
            <button class="btn btn-ghost btn-circle" tabindex="1">
              <div class="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                  <span
                    class="badge badge-xs badge-primary indicator-item"
                  ></span>
                </svg>
              </div>
            </button>
            <ul
              tabindex="1"
              class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-72"
            >
              <li class="py-2 text-1xl font-bold">Wishlist</li>
              <div v-if="wishlist.length === 0" class="text-center py-5">
                There are no games
              </div>
              <li v-for="list in wishlist" :key="list._id">
                <div class="flex justify-between">
                  <a>{{ list.name }}</a>
                  <div class="join">
                    <a class="btn btn-sm join-item" :href="'/game/' + list._id"
                      >View</a
                    >
                    <a
                      class="btn btn-sm btn-error btn-circle join-item"
                      @click="removeWishListItem(list._id)"
                      >X</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="tooltip tooltip-bottom" data-tip="Notifications">
          <a
            class="btn btn-ghost btn-circle"
            tabindex="0"
            @click="onNotifications"
          >
            <div class="indicator">
              <svg
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span class="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </a>
        </div>
        <div class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar"
          >
            <div class="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" v-bind:src="userImg" />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-neutral mt-3 z-[1] p-2 shadow rounded-box w-52"
          >
            <div class="p-3 flex flex-col gap-1">
              <div
                class="text-lg font-bold"
                v-if="user_data?.username.length != 9"
              >
                {{ user_data?.username.slice(0, 9) }}...
              </div>
              <div
                class="text-lg font-bold"
                v-if="user_data?.username.length === 9"
              >
                {{ user_data?.username }}
              </div>
              <div class="text-sm opacity-50">{{ user_data?.email }}</div>
            </div>

            <div class="divider m-0" />
            <li>
              <a v-on:click="onProfile"> Profile </a>
            </li>
            <li v-if="typeUser === 0">
              <a class="justify-between" href="/dashboard"
                >Dashboard <span class="badge">New</span></a
              >
            </li>
            <li><a v-on:click="onSettings">Settings</a></li>
            <div class="divider m-0" />
            <li><a v-on:click="logOut" class="hover:bg-error">Logout</a></li>
          </ul>
        </div>
      </div>

      <div class="flex-none" v-if="!dataValidate">
        <div class="p-2">
          <button
            class="btn btn-outline btn-warning btn-sm"
            v-on:click="onSignUp"
          >
            Sign Up
          </button>
        </div>
        <div class="p-2">
          <button class="btn btn-primary btn-sm" v-on:click="onSignIn">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";
import CreditCard from "@/components/CreditCard.vue";

const user_data = JSON.parse(localStorage.getItem("user_data"));

const router = useRouter();

const dataValidate = ref(false);
const typeUser = ref(0);
const userImg = ref("");

const wishlist = ref([]);
const wishListValidate = ref(false);

function getWishList() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/wishlist/get", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((data) => {
      console.log("wishlist", data.data);
      localStorage.setItem("wishlist", JSON.stringify(data.data.wishlist));
      //wishListValidate.value = true;
      wishlist.value = data.data.wishlist;
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
}

function removeWishListItem(id) {
  axios
    .put(
      import.meta.env.VITE_API_ENDPOINT + "/wishlist/remove/" + id,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((data) => {
      console.log("wishlist", data.data);
      getWishList();
      //wishlist.value = data.data.wishlist;
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
  const dataUser = JSON.parse(localStorage.getItem("user_data"));
  if (dataUser) {
    dataValidate.value = true;
    userImg.value = dataUser.profileURL;
    typeUser.value = dataUser.tipo;
    console.log("there is data");
    console.log("datavalidate", dataValidate.value);
  }
  getWishList();
});

watch(userImg, (newValue) => {
  console.log("there are changes...", newValue);
});

function onSignIn() {
  router.push("/login");
}
function onSignUp() {
  router.push("/signup");
}

function onProfile() {
  router.push("/profile");
}

function onSettings() {
  router.push("/settings");
}

function onNotifications() {
  router.push("/notifications");
}

function logOut() {
  router.push("/logout");
  userImg.value = "";
  dataValidate.value = false;
}
</script>

<style scoped></style>
