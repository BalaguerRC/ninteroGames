<template>
  <main>
    <div class="gameDetails">
      <div class="pr-5">
        <div>
          <ImageList :games-obj="gamesObj.gameImages" />
        </div>
        <div>
          <h2 class="text-4xl font-bold pt-5">About</h2>
          <p v-if="gamesObj.about === ''">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
            corporis magni. Ipsa maxime dolorem perferendis cumque temporibus
            asperiores eos nostrum, sint culpa a iure. Incidunt ullam
            dignissimos beatae dolorum. Odit?Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nemo, corporis magni. Ipsa maxime
            dolorem perferendis cumque temporibus asperiores eos nostrum, sint
            culpa a iure. Incidunt ullam dignissimos beatae dolorum. Odit?
          </p>
          <div class="overflow-hidden" v-html="gamesObj.about"></div>
        </div>
        <div>
          <h2 class="text-4xl font-bold pt-5">Requeriments</h2>
          <div class="flex-col lg:flex-row hero-content pt-5 containerReque">
            <p>
              MÍNIMO: <br />
              SO: {{ gamesObj.minreq?.os }}<br />
              Procesador: {{ gamesObj.minreq?.processor }}<br />
              Memoria: {{ gamesObj.minreq?.memory }}<br />
              Graphics: {{ gamesObj.minreq?.graphics }}<br />
              DirectX: {{ gamesObj.minreq?.directx }}<br />
              Storage: {{ gamesObj.minreq?.storage }}
            </p>
            <p>
              Maximo: <br />
              SO: {{ gamesObj.recreq?.os }}<br />
              Procesador: {{ gamesObj.recreq?.processor }}<br />
              Memoria: {{ gamesObj.recreq?.memory }}<br />
              Graphics: {{ gamesObj.recreq?.graphics }}<br />
              DirectX: {{ gamesObj.recreq?.directx }}<br />
              Storage: {{ gamesObj.recreq?.storage }}
            </p>
          </div>
        </div>
      </div>
      <div class="sticky top-16 h-max">
        <div class="contenedor1">
          <figure class="imagenDetail">
            <img
              :src="gamesObj.thumbnailURL"
              alt="Shoes"
              style="width: 280px; border-radius: 10px"
            />
          </figure>
          <div class="pt-5 contenedorDetail">
            <table class="table table-sm">
              <!-- head -->
              <thead></thead>
              <tbody>
                <!-- row 1 -->
                <tr>
                  <th class="text-lg" v-if="gamesObj.price != 0">
                    ${{ gamesObj.price }}
                  </th>
                  <th class="text-lg" v-if="gamesObj.price === 0">Free</th>
                </tr>
                <!-- row 2 -->
                <tr>
                  <th>Category:</th>
                  <th class="flex flex-row flex-wrap">
                    <div
                      v-for="category in gamesObj.category"
                      :key="category._id"
                    >
                      <span class="badge badge-ghost badge-sm">{{
                        category.nombre
                      }}</span>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>Author::</th>
                  <th>
                    <a
                      class="link"
                      :href="'/profile/' + gamesObj.developer?._id"
                      ><div class="badge badge-info">
                        {{ gamesObj.developer?.username }}
                      </div></a
                    >
                  </th>
                </tr>
                <tr>
                  <th>Publication Date:</th>
                  <th>
                    <div class="badge">
                      {{ gamesObj.publishDate?.substr(0, 10) }}
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>Downloads:</th>
                  <th>
                    <div class="badge">{{ gamesObj.downloads }}</div>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <a
            class="btn btn-success w-full btn-sm button"
            v-if="dataUser === null"
            @click="router.push('/login')"
            >Buy</a
          >
          <a
            class="btn btn-success w-full btn-sm button"
            v-if="!validateGameUser && dataUser != null"
            onclick="my_modal_1.showModal()"
            >Buy</a
          >
          <dialog id="my_modal_1" class="modal">
            <div class="modal-box image-full glass">
              <h3 class="font-bold text-lg">Confirm you order!</h3>

              <p class="py-4">
                Are you sure you want to buy the {{ gamesObj.name }} game?
              </p>
              <p class="pt-2 font-bold">Amount to pay: ${{ gamesObj.price }}</p>
              <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button
                    class="btn btn-sm btn-success mr-2"
                    @click="buyGame(gamesObj._id)"
                  >
                    Confirm
                  </button>
                  <button class="btn btn-sm">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <button class="btn w-full btn-sm button" v-if="validateGameUser">
            Dowload
          </button>
          <button
            :disabled="validateWishList"
            class="btn btn-outline w-full btn-sm button"
            @click="addWishList(gamesObj._id)"
            v-if="!validateGameUser"
          >
            + Add Whitelist
          </button>
        </div>
      </div>
    </div>
    <div class="gameDetails">
      <div class="w-full">
        <div class="flex flex-col gap-2">
          <div>
            <h2 class="text-4xl font-bold pt-5">Comments</h2>
          </div>
          <div class="divider" />
          <div class="join my-1">
            <input
              placeholder="comment..."
              disabled
              class="input input-bordered w-full join-item"
            />
            <button class="btn btn-success join-item" disabled>Send</button>
          </div>
          <div class="chat chat-start">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div class="chat-header">
              Nintendo
              <time class="text-xs opacity-50">12:45</time>
            </div>
            <div class="bg-slate-800 p-4 w-full border-l-4 my-2 messagge">
              You were the Chosen One!
            </div>
            <div class="chat-footer">
              <button class="btn btn-sm btn-success mr-2">Like</button>
              <button class="btn btn-sm">Dislike</button>
            </div>
          </div>
          <div class="chat chat-start">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div class="chat-header">
              Ielosky
              <time class="text-xs opacity-50">12:45</time>
            </div>
            <div class="bg-slate-800 p-4 w-full border-l-4 my-2 messagge">
              Nice
            </div>
            <div class="chat-footer">
              <button class="btn btn-sm btn-success mr-2">Like</button>
              <button class="btn btn-sm">Dislike</button>
            </div>
          </div>
        </div>
      </div>
      <div class="contenedor1">
        <div class="contenedorDetail"></div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import ImageList from "@/components/ImageList.vue";

import Swal from "sweetalert2";
import axios from "axios";

const router = useRouter();
const route = useRoute();
const token = localStorage.getItem("token");
const dataUser = JSON.parse(localStorage.getItem("user_data"));
const wlist = JSON.parse(localStorage.getItem("wishlist"));

defineProps(["gamesObj", "gamesValidate", "validateGameUser"]);

const validateWishList = ref(false);
function addWishList(id) {
  if (dataUser != null) {
    axios
      .put(
        import.meta.env.VITE_API_ENDPOINT + "/wishlist/add/" + id,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((data) => {
        console.log("wishlist", data.data);
        getWish();
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "Game added to wish list!",
          icon: "success",
          text: data.data.message,
        });

        validateWishList.value = true;
        //gamesValidate2.value = true;
        //userdata.value = data.data;
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
  } else {
    router.push("/login");
  }
}
function getWish() {
  console.log("Getting list", wlist);

  if (wlist != null) {
    //if wishlist exist then check if there is already a game saved with the same id
    wlist.map((data) => {
      if (data._id === route.params.id) {
        validateWishList.value = true;
      }
    });
  }
}

function buyGame(id) {
  console.log("Comprado", id);
  axios
    .put(
      import.meta.env.VITE_API_ENDPOINT + "/library/buy/" + id,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((data) => {
      console.log(data);
      if (data.status === 200) {
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "transaction Completed!",
          icon: "success",
          text: data.data.message,
        });
        router.push("/profile");
      }
    })
    .catch((err) => {
      console.log(err);
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
  getWish();
});
</script>

<style scoped>
/** scoped, use only on this page */
.containerReque {
  align-items: flex-start;
  justify-content: space-around;
}
.button {
  margin-top: 10px;
}
.contenedor1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.imagenDetail {
  width: 100%;
  /*height: 220px;*/
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
.contenedorDetail {
  width: 280px;
}
.centerA {
  align-items: center;
  justify-content: space-between;
}
.gameDetails {
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
}
.messagge {
  border-radius: 10px;
}
</style>
