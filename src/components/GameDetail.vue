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
                  <th
                    v-for="category in gamesObj.category"
                    :key="category._id"
                    class="flex flex-col"
                  >
                    <span class="badge badge-ghost badge-sm">{{
                      category.nombre
                    }}</span>
                  </th>
                </tr>
                <tr>
                  <th>Author::</th>
                  <th>
                    <a class="link" @click="onProfile(gamesObj.developer?._id)"
                      ><div class="badge">
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
          <button class="btn btn-success w-full btn-sm button" v-if="!validateDownload">Buy</button>
          <button class="btn w-full btn-sm button" v-if="validateDownload">Dowload</button>
          <button
            :disabled="gamesValidate"
            class="btn btn-outline w-full btn-sm button"
            @click="addWishList(gamesObj._id)"
          >
            + Add Whitelist
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import ImageList from "@/components/ImageList.vue";

import Swal from "sweetalert2";
import axios from "axios";
const validateDownload = ref(false);
const router = useRouter();

defineProps(["gamesObj", "gamesValidate"]);
function onProfile(id) {
  router.push("/profile/" + id);
}
function addWishList(id) {
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
      Swal.fire({
        background: "#252526",
        color: "#FFF",
        title: "There was an error!",
        icon: "success",
        text: data.data.message,
      });
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
}
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
</style>
