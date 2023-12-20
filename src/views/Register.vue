<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Sign In now!</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" v-on:submit.prevent="signUp">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              class="input input-bordered"
              v-model="name"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="last name"
              class="input input-bordered"
              v-model="lastName"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              class="input input-bordered"
              v-model="username"
              required
            />
          </div>
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
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              class="input input-bordered"
              v-model="confirmPassword"
              required
            />
          </div>
          <div class="form-control mt-3">
            <button class="btn btn-warning">Sign In</button>
          </div>
        </form>
        <div
          style="padding-left: 32px; padding-right: 32px; padding-bottom: 32px"
        >
          <div class="form-control">
            <label class="label">
              <a href="login" class="label-text-alt link link-hover"
                >Do you have an account? Login</a
              >
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="toast toast-start">
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
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const name = ref("");
const lastName = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref(false);
const errorMsg = ref("");

function signUp() {
  let json = {
    nombre: name.value,
    apellido: lastName.value,
    username: username.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  axios
    .post(import.meta.env.VITE_API_ENDPOINT + "/users/register", json)
    .then((data) => {
      console.log(data);
      if (data.status == 201) {
        console.log("Ok");
        router.push("login"); //redirecting whenn everythin is ok :3
      }
    })
    .catch((err) => {
      console.log("esto es", err);
      if (err.response.data.found == true) {
        error.value = !error.value;
        errorMsg.value = err.response.data.result_username
          ? err.response.data.result_username + ". "
          : null + err.response.data.result_email
          ? err.response.data.result_email + ". "
          : null;
      } else {
        error.value = !error.value;
        errorMsg.value = err.response.data.errors[0];
      }
    });
}
function reWrite() {
  error.value = !error.value;
  errorMsg.value = "";
}

</script>
