<template>
  <div class="md:container md:mx-auto">
    <div class="m-10">
      <div class="divider">
        <div class="divider-content">
          <h1 class="text-3xl font-bold" v-if="route.params.id === undefined">
            Publish a new game
          </h1>
          <h1 class="text-3xl font-bold" v-if="route.params.id != undefined">
            Update Game
          </h1>
        </div>
      </div>
      <div
        class="alert shadow-lg mt-5"
        v-if="user_data && user_data.tipo === 0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="stroke-warning shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 class="font-bold pb-1">
            Welcome <strong>{{ user_data.username }}</strong
            >!
          </h3>
          <div class="text-sm font-bold">
            This section is ONLY for testing purposes. Once the test is finished
            REMOVE it from the store.
          </div>
          <div class="text-sm">
            PD: This section should be used by developers.
          </div>
        </div>
      </div>
      <div>
        <form
          class="flex justify-around"
          @submit.prevent="
            route.params.id ? onPublishUpdate(route.params.id) : onPublish()
          "
        >
          <div class="sticky top-16 h-max p-5">
            <h1 class="text-2xl font-bold py-2">Thumbnail</h1>
            <figure>
              <img
                :src="imgThumbnail"
                alt="Shoes"
                style="width: 500px; border-radius: 2%"
              />
            </figure>
            <label class="form-control pt-3">
              <div class="join">
                <input
                  type="url"
                  class="input input-bordered flex-1 join-item"
                  placeholder="urls..."
                  v-model="imgThumbnail2"
                  :readonly="imgThumbnail == imgThumbnail2 ? true : false"
                  required
                />
                <button
                  type="button"
                  class="btn flex-initial join-item"
                  @click="changeThumbnail"
                  :disabled="imgThumbnail == imgThumbnail2 ? true : false"
                >
                  Addthumbnail
                </button>
                <a class="btn btn-error join-item" @click="changeImage()">
                  X
                </a>
              </div>
            </label>
            <label class="form-control">
              <h1 class="text-2xl font-bold py-2">Image List</h1>
              <div class="form-control">
                <div class="flex flex-wrap justify-center w-full py-2 gap-5">
                  <div v-for="imgs in imgList" :key="imgs" :id="imgs">
                    <a>
                      <div class="avatar">
                        <div class="w-20 mask mask-squircle">
                          <img
                            :src="imgs"
                            alt="Tailwind-CSS-Avatar-component"
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <label class="label">
                  <span class="label-text">Images URLs</span>
                </label>

                <div class="join">
                  <input
                    type="url"
                    class="input input-bordered flex-1 join-item"
                    placeholder="urls..."
                    :value="imgList?.map((option) => option).join(', ')"
                    readonly
                    required
                  />
                  <button
                    type="button"
                    class="btn flex-initial join-item"
                    onclick="preview_modal.showModal()"
                  >
                    Add Urls
                  </button>
                </div>
                <dialog id="preview_modal" class="modal">
                  <div class="modal-box">
                    <h3 class="text-center font-bold text-lg mb-5">
                      Images URLs
                    </h3>
                    <div class="flex justify-center w-full py-2 gap-5">
                      <div v-for="imgs in imgList" :key="imgs" :id="imgs">
                        <a>
                          <div class="avatar">
                            <div class="w-20 mask mask-squircle">
                              <img
                                :src="imgs"
                                alt="Tailwind-CSS-Avatar-component"
                              />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <label class="label">
                      <span class="label-text">URLs</span>
                    </label>
                    <div class="join w-full">
                      <input
                        type="url"
                        class="input input-bordered flex-1 w-full join-item"
                        placeholder="urls..."
                        v-model="imgForList"
                      />
                      <a
                        class="btn btn-accent join-item"
                        @click="addImgInImageLIst"
                        >Add Img</a
                      ><a class="btn btn-error join-item" @click="imgList = []"
                        >Clear All</a
                      >
                    </div>

                    <div class="modal-action">
                      <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </label>
            <label class="form-control" v-if="validateAdmin">
              <h1 class="text-2xl font-bold py-5">Block</h1>
              <label class="label cursor-pointer py-2">
                <span class="label-text">Block game?</span>
                <input type="checkbox" v-model="blocked" class="checkbox" />
              </label>
            </label>
          </div>

          <div class="w-full p-5">
            <div class="form-control">
              <h1 class="text-2xl font-bold py-2">Principal</h1>
              <div class="flex-col lg:flex-row hero-content containerReque p-0">
                <div class="w-full">
                  <label class="label">
                    <span class="label-text">Game title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Title of game"
                    class="input input-bordered w-full"
                    required
                    v-model="title"
                  />
                </div>
                <div>
                  <label class="label">
                    <span class="label-text">Price US$</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0"
                    class="input input-bordered w-32"
                    required
                    v-model="price"
                  />
                </div>
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Select category</span>
              </label>
              <div class="flex-col lg:flex-row hero-content containerReque p-0">
                <input
                  type="text"
                  placeholder="category..."
                  class="input input-bordered w-full"
                  :value="
                    categoriesSelected
                      ?.map((option) => option.nombre)
                      .join(', ')
                  "
                  required
                  readonly
                />
                <div class="dropdown dropdown-top">
                  <div tabindex="0" role="button" class="btn btn-outline w-40">
                    Category
                    <svg
                      width="12px"
                      height="12px"
                      class="hidden h-2 w-2 fill-current opacity-60 sm:inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 2048 2048"
                    >
                      <path
                        d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"
                      ></path>
                    </svg>
                  </div>
                  <ul
                    tabindex="0"
                    class="dropdown-content z-[2] menu bg-base-200 w-56 p-2 rounded-box"
                  >
                    <label
                      class="label cursor-pointer"
                      v-for="category in categories"
                      :key="category._id"
                    >
                      <span class="label-text">{{ category.nombre }}</span>
                      <input
                        class="checkbox checkbox-sm"
                        type="checkbox"
                        :value="category"
                        v-model="categoriesSelected"
                      />
                    </label>
                  </ul>
                </div>
              </div>
            </div>

            <label class="form-control">
              <div class="label">
                <span class="label-text">About the game</span>
              </div>
              <!--API KEY taken from https://github.com/tinymce/tinymce-vue/blob/main/stories/index.js-->
              <Editor
                aria-required="true"
                api-key="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                :init="{
                  plugins: 'lists link image table code help wordcount',
                  skin: 'oxide-dark',
                  content_css: 'dark',
                  placeholder: 'Type your article content here...',
                }"
                v-model="About"
              />
              <!-- <textarea class="textarea textarea-bordered h-24" placeholder="Bio"></textarea> -->
              <!-- <div>
                    <p>{{ content }}</p>
                </div> -->
            </label>

            <label class="form-control">
              <h1 class="text-2xl font-bold py-2">Requeriments</h1>
              <div class="flex-col lg:flex-row hero-content p-0 containerReque">
                <div class="w-full">
                  <h2 class="text-1xl font-bold pt-5">Minimun:</h2>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">SO:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="so..."
                      class="input input-bordered"
                      required
                      v-model="requeMN.os"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Processor:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="processor..."
                      class="input input-bordered"
                      required
                      v-model="requeMN.processor"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Memory:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="memory..."
                      class="input input-bordered"
                      required
                      v-model="requeMN.memory"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Graphics:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="graphics..."
                      class="input input-bordered"
                      required
                      v-model="requeMN.graphics"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">DirectX</span>
                    </label>
                    <input
                      type="text"
                      placeholder="directX..."
                      class="input input-bordered"
                      required
                      v-model="requeMN.directx"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Storage</span>
                    </label>
                    <input
                      type="text"
                      placeholder="storage..."
                      class="input input-bordered"
                      required
                      v-model="requeMN.storage"
                    />
                  </div>
                </div>
                <div class="w-full">
                  <h2 class="text-1xl font-bold pt-5">Maximuns:</h2>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">SO:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="so..."
                      class="input input-bordered"
                      required
                      v-model="requeMX.os"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Processor:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="processor..."
                      class="input input-bordered"
                      required
                      v-model="requeMX.processor"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Memory:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="memory..."
                      class="input input-bordered"
                      required
                      v-model="requeMX.memory"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Graphics:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="graphics..."
                      class="input input-bordered"
                      required
                      v-model="requeMX.graphics"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">DirectX</span>
                    </label>
                    <input
                      type="text"
                      placeholder="directX..."
                      class="input input-bordered"
                      required
                      v-model="requeMX.directx"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Storage</span>
                    </label>
                    <input
                      type="text"
                      placeholder="storage..."
                      class="input input-bordered"
                      required
                      v-model="requeMX.storage"
                    />
                  </div>
                </div>
              </div>
            </label>

            <div class="flex flex-row mt-4 space-x-4">
              <a
                type="button"
                class="btn grow"
                href="/search"
                v-if="!validateAdmin"
              >
                Back
              </a>
              <a
                type="button"
                class="btn grow"
                href="/dashboard/games"
                v-if="validateAdmin"
              >
                Back
              </a>
              <button
                type="submit"
                class="btn btn-accent font-bold grow"
                v-if="!route.params.id"
              >
                Publish
              </button>
              <button
                type="submit"
                class="btn btn-accent font-bold grow"
                v-if="route.params.id && !validateAdmin"
              >
                Update
              </button>
              <button
                type="submit"
                class="btn btn-accent font-bold grow"
                v-if="route.params.id && validateAdmin"
              >
                Update By Admin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import Editor from "@tinymce/tinymce-vue";
import axios from "axios";
import Swal from "sweetalert2";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

//https://i.pinimg.com/originals/24/f5/0f/24f50f3054c5eccd7a37f1b3e906021c.png
const imgNull = ref(
  "https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
);
const router = useRouter();
const route = useRoute();

const user_data = JSON.parse(localStorage.getItem("user_data"));

const title = ref("");
const categories = ref([]);
const categoriesSelected = ref([]);
const About = ref("");
const price = ref(0);
const blocked = ref(false);
const requeMN = ref({
  os: "",
  processor: "",
  memory: "",
  graphics: "",
  directx: "",
  storage: "",
});
const requeMX = ref({
  os: "",
  processor: "",
  memory: "",
  graphics: "",
  directx: "",
  storage: "",
});

const validateAdmin = ref(false);

const imgThumbnail = ref("");
const imgThumbnail2 = ref("");

const imgList = ref([]);
const imgForList = ref("");

onMounted(() => {
  //console.log(imgList.value);
  if (imgThumbnail.value == "") {
    console.log("test image");
    imgThumbnail.value = imgNull.value;
  }
  if (route.params.id) {
    getGameId(route.params.id);
  }
  if (user_data.tipo === 0) {
    validateAdmin.value = true;
  }
  getAllCategories();
});

function changeThumbnail() {
  if (imgThumbnail2.value != "") {
    console.log("test change", imgThumbnail2.value);
    imgThumbnail.value = imgThumbnail2.value;
  }

  //imgThumbnail2.value = imgThumbnail.value;
}
function changeImage() {
  imgThumbnail.value =
    "https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg";
  imgThumbnail2.value = "";
}
function addImgInImageLIst() {
  if (imgForList.value != "") {
    console.log("image", imgForList.value);
    imgList.value.push(imgForList.value);
    console.log("imgList", imgList.value);
    imgForList.value = "";
  }
}
function getAllCategories() {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/categories/get")
    .then((data) => {
      console.log("category", data.data);
      categories.value = data.data;
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        background: "#252526",
        color: "#FFF",
        title: "There was an error!",
        icon: "error",
        text: error.response.data.message,
      });
    });
}
function onPublish() {
  console.log("data to send", {
    name: title.value,
    about: About.value,
    category: categoriesSelected.value?.map((data) => data._id),
    thumbnailURL: imgThumbnail.value,
    gameImages: imgList.value?.map((option) => option),
    price: price.value,
    minreq: {
      os: requeMN.value.os,
      processor: requeMN.value.processor,
      memory: requeMN.value.memory,
      graphics: requeMN.value.graphics,
      directx: requeMN.value.directx,
      storage: requeMN.value.storage,
    },
    recreq: {
      os: requeMX.value.os,
      processor: requeMX.value.processor,
      memory: requeMX.value.memory,
      graphics: requeMX.value.graphics,
      directx: requeMX.value.directx,
      storage: requeMX.value.storage,
    },
  });

  if (
    categoriesSelected.value.length != 0 &&
    imgList.value.length != 0 &&
    About.value != ""
  ) {
    console.log("Ready To send");
    axios
      .post(
        import.meta.env.VITE_API_ENDPOINT + "/games/create",
        {
          name: title.value,
          about: About.value,
          category: categoriesSelected.value?.map((data) => data._id),
          thumbnailURL: imgThumbnail.value,
          gameImages: imgList.value?.map((option) => option),
          price: price.value,
          minreq: {
            os: requeMN.value.os,
            processor: requeMN.value.processor,
            memory: requeMN.value.memory,
            graphics: requeMN.value.graphics,
            directx: requeMN.value.directx,
            storage: requeMN.value.storage,
          },
          recreq: {
            os: requeMX.value.os,
            processor: requeMX.value.processor,
            memory: requeMX.value.memory,
            graphics: requeMX.value.graphics,
            directx: requeMX.value.directx,
            storage: requeMX.value.storage,
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((data) => {
        console.log("data", data.data.game._id);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "Game Created!",
          text: "Redirecting you to news page",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        router.push("/game/" + data.data.game._id);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          text: error.response.data.message,
        });
      });
  } else {
    Swal.fire({
      background: "#252526",
      color: "#FFF",
      title: "Error when publishing!",
      icon: "error",
      text:
        categoriesSelected.value.length === 0
          ? "Select a category"
          : imgList.value.length === 0
          ? "Add an image in the Image Urls field"
          : "Fill in the About field",
    });
  }
}

//params ID
function getGameId(id) {
  console.log(import.meta.env.VITE_API_ENDPOINT + "/games/selectid/" + id);
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + "/games/selectid/" + id)
    .then((data) => {
      console.log("Game by ID", data.data);
      //games.value = data.data;
      title.value = data.data.name;
      price.value = data.data.price;
      categoriesSelected.value = data.data.category?.map((data) => data);
      imgThumbnail.value = data.data.thumbnailURL;
      imgThumbnail2.value = data.data.thumbnailURL;
      imgList.value = data.data.gameImages?.map((data) => data);
      About.value = data.data.about;
      blocked.value = data.data.blocked;
      requeMN.value.os = data.data.minreq.os;
      requeMN.value.processor = data.data.minreq.processor;
      requeMN.value.memory = data.data.minreq.memory;
      requeMN.value.graphics = data.data.minreq.graphics;
      requeMN.value.directx = data.data.minreq.directx;
      requeMN.value.storage = data.data.minreq.storage;

      requeMX.value.os = data.data.recreq.os;
      requeMX.value.processor = data.data.recreq.processor;
      requeMX.value.memory = data.data.recreq.memory;
      requeMX.value.graphics = data.data.recreq.graphics;
      requeMX.value.directx = data.data.recreq.directx;
      requeMX.value.storage = data.data.recreq.storage;
    })
    .catch((err) => {
      console.log(err);
    });
}

function onPublishUpdate(id) {
  if (user_data.tipo === 0) {
    onPublishUpdateAdmin(id);
  } else {
    if (
      categoriesSelected.value.length != 0 &&
      imgList.value.length != 0 &&
      About.value != ""
    ) {
      console.log("Ready To Update", id);
      axios
        .put(
          import.meta.env.VITE_API_ENDPOINT + "/games/update/" + id,
          {
            name: title.value,
            about: About.value,
            category: categoriesSelected.value?.map((data) => data._id),
            thumbnailURL: imgThumbnail.value,
            gameImages: imgList.value?.map((option) => option),
            price: price.value,
            minreq: {
              os: requeMN.value.os,
              processor: requeMN.value.processor,
              memory: requeMN.value.memory,
              graphics: requeMN.value.graphics,
              directx: requeMN.value.directx,
              storage: requeMN.value.storage,
            },
            recreq: {
              os: requeMX.value.os,
              processor: requeMX.value.processor,
              memory: requeMX.value.memory,
              graphics: requeMX.value.graphics,
              directx: requeMX.value.directx,
              storage: requeMX.value.storage,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((data) => {
          console.log("data", data.data.game._id);
          Swal.fire({
            background: "#252526",
            color: "#FFF",
            title: "Game Updated!",
            text: "Redirecting you to news page",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          });
          router.push("/game/" + data.data.game._id);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            background: "#252526",
            color: "#FFF",
            title: "There was an error!",
            icon: "error",
            text: error.response.data.message,
          });
        });
    } else {
      Swal.fire({
        background: "#252526",
        color: "#FFF",
        title: "Error when publishing!",
        icon: "error",
        text:
          categoriesSelected.value.length === 0
            ? "Select a category"
            : imgList.value.length === 0
            ? "Add an image in the Image Urls field"
            : "Fill in the About field",
      });
    }
  }
}

function onPublishUpdateAdmin(id) {
  if (
    categoriesSelected.value.length != 0 &&
    imgList.value.length != 0 &&
    About.value != ""
  ) {
    console.log("Ready To Update by Admin", id);
    axios
      .put(
        import.meta.env.VITE_API_ENDPOINT + "/games/admin/update/" + id,
        {
          name: title.value,
          about: About.value,
          category: categoriesSelected.value?.map((data) => data._id),
          thumbnailURL: imgThumbnail.value,
          gameImages: imgList.value?.map((option) => option),
          price: price.value,
          blocked: blocked.value,
          minreq: {
            os: requeMN.value.os,
            processor: requeMN.value.processor,
            memory: requeMN.value.memory,
            graphics: requeMN.value.graphics,
            directx: requeMN.value.directx,
            storage: requeMN.value.storage,
          },
          recreq: {
            os: requeMX.value.os,
            processor: requeMX.value.processor,
            memory: requeMX.value.memory,
            graphics: requeMX.value.graphics,
            directx: requeMX.value.directx,
            storage: requeMX.value.storage,
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((data) => {
        console.log("data", data.data.game._id);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "Game Updated!",
          text: "Redirecting you to news page",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        router.push("/dashboard/games");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          text: error.response.data.message,
        });
      });
  } else {
    Swal.fire({
      background: "#252526",
      color: "#FFF",
      title: "Error when publishing!",
      icon: "error",
      text:
        categoriesSelected.value.length === 0
          ? "Select a category"
          : imgList.value.length === 0
          ? "Add an image in the Image Urls field"
          : "Fill in the About field",
    });
  }
}
</script>
<style>
.containerReque {
  align-items: flex-start;
  justify-content: space-between;
}
</style>
