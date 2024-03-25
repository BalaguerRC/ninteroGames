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
        <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal">
            <!-- Navbar menu content here -->
            <li><a href="/">ninteroGames</a></li>
            <li><a href="/search">Store</a></li>
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
            <ul class="menu w-80 min-h-full bg-base-200 text-base-content">
              <li><a @click="$router.push('/dashboard')">Dashboard</a></li>
              <li>
                <details class="bg-blue-950" open>
                  <summary>Users</summary>
                  <ul>
                    <li>
                      <a @click="$router.push('/dashboard/users')">Users</a>
                    </li>
                    <li>
                      <a @click="$router.push('/dashboard/requests')"
                        >Requests</a
                      >
                    </li>
                    <li>
                      <a @click="$router.push('/dashboard/bills')">Bills</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details class="bg-yellow-900" open>
                  <summary>Games</summary>
                  <ul>
                    <li>
                      <a @click="$router.push('/dashboard/games')">Games</a>
                    </li>
                    <li>
                      <a @click="$router.push('/dashboard/categories')"
                        >Categories</a
                      >
                    </li>
                    <li>
                      <a @click="$router.push('/dashboard/gamesNotifications')"
                        >Games Notifications</a
                      >
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <details class="bg-green-900" open>
                  <summary>News</summary>
                  <ul>
                    <li><a @click="$router.push('/dashboard/news')">News</a></li>
                    <li>
                      <a @click="$router.push('/dashboard/newsNotifications')"
                        >News Notifications</a
                      >
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
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
import { useRouter, RouterView } from "vue-router";
</script>
