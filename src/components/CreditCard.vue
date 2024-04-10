<template>
  <div class="tooltip tooltip-bottom" data-tip="Credit Card">
    <div class="dropdown dropdown-end">
      <a class="btn btn-ghost btn-circle" tabindex="0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="white"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2m0 14H4v-6h16zm0-10H4V6h16z"
          ></path>
        </svg>
      </a>
      <ul
        tabindex="1"
        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-info rounded-lg w-96"
      >
        <li class="py-2 text-1xl font-bold">Credit Card</li>
        <div class="flex flex-row justify-start label">
          <span>Total Cash: ${{ wallet }}</span>
        </div>
        <div class="divider"></div>
        <div class="flex flex-col gap-3">
          <div class="flex justify-between flex-row w-full gap-1">
            <div class="w-full">
              <div class="label">
                <span class="label-text">Card number*</span>
              </div>
              <input class="input input-sm w-full" placeholder="0000 000..." />
            </div>
            <div class="w-20">
              <div class="label">
                <span class="label-text">CVC*</span>
              </div>
              <input class="input input-sm w-full" placeholder="000" />
            </div>
          </div>
          <div class="flex justify-between flex-row w-full gap-1">
            <div class="w-full">
              <div class="label">
                <span class="label-text">Name*</span>
              </div>
              <input class="input input-sm w-full" placeholder="name..." />
            </div>
            <div class="w-full">
              <div class="label">
                <span class="label-text">Expiration date*</span>
              </div>
              <input class="input input-sm w-full" placeholder="MMYY" />
            </div>
          </div>
          <div class="w-full pt-5">
            <div class="flex justify-between items-center flex-row w-full">
              <div class="label">
                <span class="label-text">Amount</span>
              </div>
              <div class="join items-center gap-2">
                <p>US$</p>
                <input
                  class="input input-bordered w-24 input-sm"
                  placeholder="0"
                  type="number"
                  v-model="amount"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="flex flex-row justify-end">
          <button class="btn btn-sm">reload</button>
        </div>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const amount = ref(0);
const wallet = ref(0);

function getUserById(id) {
  console.log(id);
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/users/getid/" + id)
    .then((data) => {
      console.log("cash",data.data);
      wallet.value = data.data.billetera;
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

const dataUser = JSON.parse(localStorage.getItem("user_data"));

onMounted(() => {
  getUserById(dataUser._id);
});
</script>
<style>
.tab:is(input[type="radio"]) {
  width: 100px;
  font-weight: 700;
}
</style>
