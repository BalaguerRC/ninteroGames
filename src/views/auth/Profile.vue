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
        <div class="flex centerA2">
          <div class="avatar">
            <div class="w-24 mask mask-squircle">
              <img v-bind:src="userImg" />
            </div>
          </div>

          <div class="ml-9">
            <h2 class="text-4xl font-bold">
              {{ userName }} {{ userLastName }}
            </h2>
            <p class="text-sm text-slate-400">{{ userUsername }}</p>
            <p class="text-sm text-slate-500">joined on {{ userCreated.substr(0,10) }}</p>
          </div>
        </div>

        <div>
          <a class="btn" href="/settings">Edit User</a>
        </div>
      </div>
      <div class="pt-5">
        <div class="flex centerGame">
          <h2 class="text-3xl font-bold">Games</h2>
          <p class="font-bold">Total Games: 0</p>
        </div>
        <div class="divider"></div>
      </div>

      <div class="grid grid-cols-3 gapP">
        <div class="card w-90 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        <div class="card w-90 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        <div class="card w-90 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        <div class="card w-90 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        <div class="card w-90 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userName = ref(null);
const userLastName = ref(null);
const userUsername = ref(null);
const userCreated = ref(null);
const userImg = ref(null);

const dataValidate = ref(false);

const dataUser = JSON.parse(localStorage.getItem("user_data"));

if (dataUser) {
  dataValidate.value = true;
  console.log("hay data");
  userName.value = dataUser.nombre;
  userLastName.value = dataUser.apellido;
  userUsername.value = dataUser.username;
  userCreated.value = dataUser.fechaCreacion;
  userImg.value = dataUser.profileURL;
} else {
  console.log("no hay");
  router.push("login");
}
</script>
<style>
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
/*grid-template-columns: repeat(3, minmax(0, 1fr));*/
.gapP {
  gap: 1.5rem;
}
</style>
