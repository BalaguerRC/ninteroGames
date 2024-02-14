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
const router = useRouter();

const dataValidate = ref(false);
const userImg = ref("");

onMounted(() => {
  const dataUser = JSON.parse(localStorage.getItem("user_data"));
  if (dataUser) {
    dataValidate.value = true;
    userImg.value = dataUser.profileURL;
    console.log("there is data");
    console.log("datavalidate", dataValidate.value);
  }
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
