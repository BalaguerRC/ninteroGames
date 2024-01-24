<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" v-on:submit.prevent="login">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              class="input input-bordered"
              v-model="email"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              v-model="password"
              required
            />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover"
                >Forgot password?</a
              >
            </label>
          </div>

          <div class="form-control mt-3">
            <button class="btn btn-success">Login</button>
          </div>
        </form>
        <div
          style="padding-left: 32px; padding-right: 32px; padding-bottom: 32px"
        >
          <div class="form-control">
            <a href="signup" class="btn btn-warning">Sign In</a>
          </div>
        </div>
      </div>
    </div>
    <div class="toast">
      <div role="alert" class="alert alert-error" v-if="error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ errorMsg }}</span>
        <div>
          <button class="btn btn-sm btn-circle" v-on:click="reWrite">X</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const dataUser = JSON.parse(localStorage.getItem("user_data"));

const email = ref("");
const password = ref("");
const error = ref(false);
const errorMsg = ref("");

function login() {
  let json = {
    email: email.value,
    password: password.value,
  };
  axios
    .post(import.meta.env.VITE_API_ENDPOINT + "/users/login", json)
    .then((response) => {
      console.log("esto es", response);
      if (response.status == 200) {
        console.log("Todo correcto");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_data", JSON.stringify(response.data.user));
        router.push("/"); //redirecting when everything is ok :3
      } else {
        error.value = !error.value;
        errorMsg.value = response.response.data.message;
      }
    })
    .catch((err) => {
      error.value = !error.value;
      errorMsg.value = err.response.data?.message;
    });
}
function reWrite() {
  error.value = !error.value;
  errorMsg.value = "";
}

if(dataUser){
  router.push("/")
}

/**
 * Notes
 * *referencing the variables with the input, we use v-model, v-model is used in html
 * * v-on:submit.prevent="method", is an event to execute a method
 * * v-on:click  is an click event like a "onClick"
 */
</script>
