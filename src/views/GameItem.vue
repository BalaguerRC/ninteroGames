<template>
  <div class="md:container md:mx-auto">
    <div class="p-10">
      <SearchBar />
      <div
        class="alert shadow-lg mt-5"
        v-if="user_data && user_data._id === games.developer?._id"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-info shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 class="font-bold">
            Welcome <strong>{{ user_data.username }}</strong
            >!
          </h3>
          <div class="text-xs">This is your game, then you can upgrade.</div>
        </div>
        <button
          class="btn btn-sm btn-primary"
          @click="router.push('/game/update/' + games?._id)"
        >
          Update game
        </button>
      </div>

      <div v-if="validateGameExist && validateGame">
        <h2 class="text-4xl font-bold pt-5">
          {{ games?.name }}
        </h2>

        <GameDetail
          :games-obj="games"
          :games-validate="validateWishList"
          :validate-game-user="validateGameUser"
        />
      </div>

      <div v-if="!validateGame">
        <div class="skeleton w-96 h-10"></div>
        <div class="gameDetails">
          <div class="pr-5 w-full">
            <div class="">
              <div class="">
                <div class="skeleton w-full heightSkeleton"></div>
              </div>
              <div class="pt-5">
                <div class="skeleton w-96 h-10"></div>
                <div class="skeleton w-full h-52 mt-2"></div>
              </div>
              <div class="pt-5 flex-col lg:flex-row hero-content">
                <div class="w-full">
                  <div class="skeleton w-96 h-10"></div>
                  <div class="skeleton w-full h-52 mt-2"></div>
                </div>
                <div class="w-full">
                  <div class="skeleton w-96 h-10"></div>
                  <div class="skeleton w-full h-52 mt-2"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="h-max">
            <div class="skeleton w-full h-52"></div>
            <div class="skeleton w-96 h-10 mt-2"></div>
            <div class="skeleton w-96 h-10 mt-2"></div>
            <div class="skeleton w-96 h-10 mt-2"></div>
          </div>
        </div>
      </div>
      <div v-if="!validateGameExist">
        <h2>The game doesnt exist</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SearchBar from "@/components/SearchBar.vue";
//import GameDetails from "@/components/GameDetail.vue";
import GameDetail from "../components/GameDetail.vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";

const user_data = JSON.parse(localStorage.getItem("user_data"));

const route = useRoute();
const router = useRouter();
const games = ref({});
const validateGameExist = ref(true);
const validateGame = ref(false);
const wishList = ref([]);
const validateWishList = ref(false);
console.log(route.params.id);
onMounted(() => {
  getGame();
  getWish();
  if (user_data!=null) {
    getUser();
  }
});
function getGame() {
  console.log(
    import.meta.env.VITE_API_ENDPOINT + "/games/selectid/" + route.params.id
  );
  axios
    .get(
      import.meta.env.VITE_API_ENDPOINT + "/games/selectid/" + route.params.id
    )
    .then((data) => {
      console.log("data", data);
      console.log(data.data);
      games.value = data.data;
      validateGame.value = true;
    })
    .catch((err) => {
      console.log(err);
      validateGameExist.value = false;
    });
}

function getWish() {
  const wlist = JSON.parse(localStorage.getItem("wishlist"));
  if (wlist) {
    wlist.map((data) => {
      if (data._id === route.params.id) {
        console.log("hay similitud");
        validateWishList.value = true;
      }
    });
    wishList.value.push({ id: wlist.map((data) => data._id) });
  } else {
    validateWishList.value = false;
  }
}

const userData = ref({});
const validateGameUser = ref(false);
function getUser() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/users/getid/" + user_data._id)
    .then((data) => {
      console.log("my data", data.data);
      userData.value = data.data;
      //userFollowers.value = data.data.followers;
      //validateGameUser.value = true;
      //validateFollowing();
      validatingGame();
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
function validatingGame() {
  userData.value.libreria.forEach((data) =>
    data._id === route.params.id
      ? (validateGameUser.value = true)
      : (validateGameUser.value = false)
  );
}
</script>
<style scoped>
/** scoped, use only on this page */

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
.heightSkeleton {
  height: 40rem;
}
</style>
