<template>
  <div
    class="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur"
  >
    <nav className="navbar w-full p-2">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/">nintero</a>
      </div>

      <div class="flex-none" v-if="dataValidate">
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
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-72"
          >
            <li>Wishlist</li>
            <div v-if="wishlist.length===0" class="text-center py-2">There are no games</div>
            <li v-for="list in wishlist" :key="list._id">
              <div class="flex justify-between">
                <a>{{ list.name }}</a>
                <div class="flex">
                  <a class="btn btn-sm" :href="'/game/' + list._id">View</a>
                  <a
                    class="btn btn-sm btn-error btn-circle"
                    @click="removeWishListItem(list._id)"
                    >X</a
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="dropdown dropdown-end">
          <button class="btn btn-ghost btn-circle" tabindex="0">
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
          </button>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-72"
          >
            <li>Notifications</li>
            <li>
              <a class="justify-between">
                Good news about this game
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>New assets in this game</a></li>
            <li><a>El peso, nueva competencia de nintendo</a></li>
          </ul>
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
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a class="justify-between" v-on:click="onProfile">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a v-on:click="onSettings">Settings</a></li>
            <li><a v-on:click="logOut">Logout</a></li>
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

const router = useRouter();

const dataValidate = ref(false);
const userImg = ref("");

const wishlist = ref([]);

function getWishList() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/wishlist/get", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((data) => {
      console.log("wishlist", data.data);
      wishlist.value = data.data.wishlist;
      localStorage.setItem("wishlist", JSON.stringify(data.data.wishlist));
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

function logOut() {
  router.push("/logout");
  userImg.value = "";
  dataValidate.value = false;
}
</script>

<style scoped></style>
