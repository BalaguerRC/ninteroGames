<template>
  <div class="px-20 py-4">
    <div>
      <h3 class="text-3xl font-bold pb-4">{{ textAddOrEdit }} User!</h3>
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <a href="/"
              ><svg
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard</a
            >
          </li>
          <li>
            <a href="/dashboard/users"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-4 h-4 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              Users</a
            >
          </li>
          <li>
            {{ route.params.id === undefined ? "Create" : NewUser.username }}
          </li>
        </ul>
      </div>
      <form
        v-on:submit.prevent="
          route.params.id === undefined ? addUser() : editUser()
        "
      >
        <div>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full"
              required
              v-model="NewUser.nombre"
            />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Last Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              required
              class="input input-bordered w-full"
              v-model="NewUser.apellido"
            />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Username</span>
            </div>
            <input
              v-if="route.params.id === undefined"
              type="text"
              placeholder="Type here"
              required
              class="input input-bordered w-full"
              v-model="NewUser.username"
            />
            <!--Update User-->
            <input
              v-if="route.params.id != undefined"
              type="text"
              placeholder="username..."
              required
              class="input input-bordered w-full"
              v-model="UserName"
            />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Email</span>
            </div>
            <input
              v-if="route.params.id === undefined"
              type="email"
              placeholder="Type here"
              required
              class="input input-bordered w-full"
              v-model="NewUser.email"
            />
            <!--Update User-->
            <input
              v-if="route.params.id != undefined"
              type="email"
              placeholder="Email..."
              required
              class="input input-bordered w-full"
              v-model="Email"
            />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Profile URL</span>
            </div>
            <div class="flex flex-row gap-1">
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full"
                v-model="NewUser.profileURL"
              /><button
                type="button"
                class="btn"
                onclick="preview_modal.showModal()"
              >
                Preview Image
              </button>
              <dialog id="preview_modal" class="modal">
                <div class="modal-box">
                  <h3 class="text-center font-bold text-lg mb-5">
                    Profile Image Preview
                  </h3>
                  <img
                    class="mx-auto mask mask-circle"
                    :src="
                      NewUser.profileURL
                        ? NewUser.profileURL
                        : 'https://static.thenounproject.com/png/55168-200.png'
                    "
                    alt="Valid URL profile image"
                    width="128"
                  />
                  <div class="modal-action">
                    <form method="dialog">
                      <!-- if there is a button in form, it will close the modal -->
                      <button class="btn">Close Preview</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Role</span>
            </div>
            <select class="select select-bordered" v-model="NewUser.tipo">
              <option selected :value="2">User Normal</option>
              <option :value="1">Developer</option>
              <option :value="0">Admin</option>
            </select>
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              :required="route.params.id === undefined ? true : false"
              class="input input-bordered w-full"
              v-model="NewUser.password"
            />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Confirm Password</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              :required="route.params.id === undefined ? true : false"
              class="input input-bordered w-full"
              :class="errorPass ? 'input-error' : 'none'"
              v-model="NewUser.confirmPassword"
              v-on:change="(e) => (errorPass = false)"
            />
            <div class="label" v-if="errorPass">
              <span class="label-text-alt text-error"
                >The password is not the same</span
              >
            </div>
          </label>
          <div class="form-control w-72 pt-2">
            <label class="label cursor-pointer">
              <span class="label-text">Blocked</span>
              <input
                type="checkbox"
                class="checkbox checkbox-warning"
                v-model="NewUser.blocked"
              />
            </label>
          </div>
        </div>
        <div class="modal-action">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn btn-info w-56">submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

//const Search = ref("");
const textAddOrEdit = ref("Create");
//const password = ref("");
const NewUser = ref({
  nombre: "",
  apellido: "",
  username: "",
  email: "",
  profileURL: "",
  password: "",
  confirmPassword: "",
  billetera: 0,
  tipo: 2,
  blocked: false,
});
const Email = ref(""); /**Validate if Email is newUser.Email */
const UserName = ref(""); /**Validate if UserName is newUser.username */
const errorPass = ref(false);

function addUser() {
  if (NewUser.value.password === NewUser.value.confirmPassword) {
    console.log("exito", NewUser.value);
    axios
      .post(
        import.meta.env.VITE_API_ENDPOINT + "/users/admin/register",
        NewUser.value,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((data) => {
        console.log("data", data.data);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "User Created!",
          text: "Succes",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        router.push("/dashboard/users");
        //getAllUsers();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          text: error.response.data.message
            ? error.response.data.message
            : error.response.data.result_email
            ? error.response.data.result_email
            : error.response.data.result_username
            ? error.response.data.result_username
            : error.response.data.error.map((data) => data),
        });
      });
    console.log("adding");
  } else {
    errorPass.value = true;
  }
}

function editUser() {
  if (NewUser.value.password === NewUser.value.confirmPassword) {
    axios
      .put(
        import.meta.env.VITE_API_ENDPOINT + "/users/admin/update",
        {
          userid: route.params.id,
          nombre: NewUser.value.nombre,
          apellido: NewUser.value.apellido,
          username:
            NewUser.value.username === UserName.value
              ? undefined
              : UserName.value,
          email: NewUser.value.email === Email.value ? undefined : Email.value,
          profileURL: NewUser.value.profileURL,
          password:
            NewUser.value.password === "" ? undefined : NewUser.value.password,
          /*confirmPassword:
            NewUser.value.confirmPassword === ""
              ? undefined
              : NewUser.value.confirmPassword,*/
          billetera: NewUser.value.billetera,
          tipo: NewUser.value.tipo.valueOf(),
          blocked: NewUser.value.blocked,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((data) => {
        console.log("data", data.data);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "User Created!",
          text: "Succes",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        router.push("/dashboard/users");
        //getAllUsers();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          text: error.response.data.message
            ? error.response.data.message
            : error.response.data.result_email
            ? error.response.data.result_email
            : error.response.data.result_username
            ? error.response.data.result_username
            : error.response.data.error.map((data) => data),
        });
      });
  } else {
    errorPass.value = true;
  }
}

function getUserById(id) {
  console.log(id);
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/users/getid/" + id)
    .then((data) => {
      console.log(data.data);
      NewUser.value = {
        nombre: data.data.nombre,
        apellido: data.data.apellido,
        username: data.data.username,
        email: data.data.email,
        profileURL: data.data.profileURL,
        password: "",
        confirmPassword: "",
        billetera: data.data.billetera,
        tipo: data.data.tipo,
        blocked: data.data.blocked,
      };
      Email.value = data.data.email;
      UserName.value = data.data.username;
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
  //console.log(route.params.id)
  if (route.params.id) {
    textAddOrEdit.value = "Update";
    getUserById(route.params.id);
  }
});
</script>
