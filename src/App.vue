<template>
  <div className="navbar  bg-base-200 w-full">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">
        <router-link :to="{ name: 'home' }">Home</router-link>
      </a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li>
          <a><router-link :to="{ name: 'about' }">About</router-link></a>
        </li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul className="p-2 bg-base-100 rounded-t-none">
              <li>
                <a><router-link :to="{ name: 'login' }">Login</router-link></a>
              </li>
              <li><a>Link 2</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
  <router-view />
</template>

<script setup>
import { RouterView } from "vue-router";

/**
 * * <route-view/> displays the views linked to a route in the Router folder 
*/
</script>
<style scoped></style>
