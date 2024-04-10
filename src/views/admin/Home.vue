<template>
  <div class="drawer">
    <div class="drawer-content">
      <!-- Navbar -->
      <nav class="w-full navbar bg-base-300">
        <div class="flex-none lg:hidden">
          <label
            for="my-drawer-2"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div class="flex-1 px-2 mx-2"><a>nintero Management</a></div>
        <div class="flex-none lg:block">
          <ul class="menu menu-horizontal">
            <!-- Navbar menu content here -->
            <li><a href="/">ninteroGames</a></li>
            <li><a href="/search">Store</a></li>
            <div class="dropdown dropdown-end">
              <div
                tabindex="0"
                role="button"
                class="btn btn-ghost btn-circle avatar"
              >
                <div class="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    v-bind:src="userImg"
                  />
                </div>
              </div>
              <ul
                tabindex="0"
                class="menu menu-sm dropdown-content bg-neutral mt-3 z-[1] p-2 shadow rounded-lg w-52"
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
                <li>
                  <a v-on:click="logOut" class="hover:bg-error">Logout</a>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </nav>
      <!-- Page content here -->

      <div class="flex flex-row justify-around">
        <div class="lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
          <div class="drawer-side">
            <label
              for="my-drawer-2"
              aria-label="close sidebar"
              class="drawer-overlay"
            ></label>
            <aside class="menu w-80 min-h-full bg-base-200 text-base-content">
              <ul>
                <li><a @click="$router.push('/dashboard')">Dashboard</a></li>
                <li>
                  <details open>
                    <summary>Users</summary>
                    <ul>
                      <li>
                        <a
                          @click="$router.push('/dashboard/users')"
                          class="hover:bg-blue-950"
                          >List</a
                        >
                      </li>
                      <li>
                        <a
                          @click="$router.push('/dashboard/requests')"
                          class="hover:bg-blue-950"
                          >Requests</a
                        >
                      </li>
                      <li>
                        <a
                          @click="$router.push('/dashboard/receipts')"
                          class="hover:bg-blue-950"
                          >Receipts</a
                        >
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details open>
                    <summary>Games</summary>
                    <ul>
                      <li>
                        <a
                          @click="$router.push('/dashboard/games')"
                          class="hover:bg-yellow-900"
                          >List</a
                        >
                      </li>
                      <li>
                        <a
                          @click="$router.push('/dashboard/categories')"
                          class="hover:bg-yellow-900"
                          >Categories</a
                        >
                      </li>
                      <li>
                        <a
                          @click="$router.push('/dashboard/gamesNotifications')"
                          class="hover:bg-yellow-900"
                          >Games Notifications</a
                        >
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details open>
                    <summary>News</summary>
                    <ul>
                      <li>
                        <a
                          @click="$router.push('/dashboard/news')"
                          class="hover:bg-green-900"
                          >List</a
                        >
                      </li>
                      <li>
                        <a
                          @click="$router.push('/dashboard/newsNotifications')"
                          class="hover:bg-green-900"
                          >News Notifications</a
                        >
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </aside>
          </div>
        </div>
        <div class="w-full"><router-view /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Dashboard from "@/components/admin/Dashboard.vue";
import StoreAndUser from "@/components/admin/StoreAndUsers.vue";
import { onMounted, ref } from "vue";
import { useRouter, RouterView } from "vue-router";
const router = useRouter();
const userImg = ref("");
const dataValidate = ref(false);

const user_data = JSON.parse(localStorage.getItem("user_data"));

onMounted(() => {
  const dataUser = JSON.parse(localStorage.getItem("user_data"));
  if (dataUser) {
    dataValidate.value = true;
    userImg.value = dataUser.profileURL;
    console.log("there is data");
    console.log("datavalidate", dataValidate.value);
  }
});

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
