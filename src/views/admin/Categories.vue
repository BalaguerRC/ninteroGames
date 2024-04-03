<template>
  <div class="lg:px-20 md:px-10">
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-col">
        <h1 class="text-3xl font-bold py-4">Categories</h1>
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
                  /></svg
                >Dashboard</a
              >
            </li>
            <li>Categories</li>
          </ul>
        </div>
      </div>
      <button class="btn btn-sm" onclick="my_modal_2.showModal()">
        + Add Category
      </button>
    </div>

    <dialog id="my_modal_2" class="modal">
      <form class="modal-box">
        <h3 class="font-bold text-lg">Create a Category</h3>
        <div class="form-control">
          <label class="label">Name</label>
          <input
            class="input input-bordered"
            placeholder="name..."
            v-model="name"
          />
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
            <button @click="createCategory" class="btn ml-2 btn-info">
              Create
            </button>
          </form>
        </div>
      </form>
    </dialog>
    <dialog id="my_modal_3" class="modal">
      <form class="modal-box">
        <h3 class="font-bold text-lg">
          Update Category id:{{ CategoryToEdit.id }}
        </h3>
        <div class="form-control">
          <label class="label">Name</label>
          <input
            class="input input-bordered"
            placeholder="name..."
            v-model="CategoryToEdit.name"
          />
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
            <button
              @click="editCategory"
              class="btn ml-2 btn-info"
              :disabled="CategoryToEdit.name === nameCategoryById"
            >
              Update
            </button>
          </form>
        </div>
      </form>
    </dialog>
    <!-- search bar -->
    <div class="pt-10 pb-4 flex flex-row justify-end items-center">
      <form v-on:submit.prevent="">
        <div class="join">
          <input
            class="input input-sm input-bordered join-item"
            disabled
            placeholder="search"
          />
          <button type="button" class="btn join-item btn-sm" disabled>
            Search
          </button>
        </div>
      </form>
    </div>

    <div class="overflow-x-auto relative w-full min-h-[25rem] pb-20">
      <table class="table table-sm md:table-sm table-pin-rows w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Creation Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="category in categories" :key="category._id">
            <div class="tooltip tooltip-right" :data-tip="category._id">
              <th>{{ category._id }}</th>
            </div>
            <td>
              {{ category.nombre }}
            </td>
            <td>{{ category.fechaCreacion.slice(0, 10) }}</td>
            <td>
              <div class="dropdown dropdown-left">
                <div
                  tabindex="0"
                  role="button"
                  class="btn btn-circle btn-ghost btn-sm"
                >
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M12 3c-.825 0-1.5.675-1.5 1.5S11.175 6 12 6s1.5-.675 1.5-1.5S12.825 3 12 3m0 15c-.825 0-1.5.675-1.5 1.5S11.175 21 12 21s1.5-.675 1.5-1.5S12.825 18 12 18m0-7.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5s1.5-.675 1.5-1.5s-.675-1.5-1.5-1.5'/%3E%3C/svg%3E"
                  />
                </div>
                <ul
                  tabindex="0"
                  class="dropdown-content z-[1] menu menu-xs p-2 shadow bg-base-200 rounded-box w-52"
                >
                  <li>
                    <a
                      class="hover:bg-yellow-600"
                      href="#Add"
                      @click="
                        CategoryToEdit = {
                          id: category._id,
                          name: category.nombre,
                        };
                        getCategoryByID(category._id);
                      "
                      onclick="my_modal_3.showModal()"
                      ><img :src="Edit" class="h-5 w-5" />Edit</a
                    >
                  </li>
                  <li>
                    <a
                      class="hover:bg-red-600"
                      onclick="my_modal_1.showModal()"
                      @click="
                        CategoryToDelete = {
                          id: category._id,
                          name: category.nombre,
                        }
                      "
                      ><img :src="Delete" class="h-5 w-5" />Delete</a
                    >
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-3xl">Warning!</h3>
        <p class="py-4">
          Are you sure to delete the {{ CategoryToDelete.name }} receipt with
          the id {{ CategoryToDelete.id }}?
        </p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button
              class="btn bg-red-600 hover:btn-error mr-2"
              @click="deleteCategory(CategoryToDelete.id)"
            >
              Delete
            </button>
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
    <!-- Pagination -->
    <div class="mb-4">
      <div class="flex items-center gap-3 justify-center">
        <div class="join">
          <button
            type="button"
            class="join-item btn btn-sm"
            :class="{ 'btn-disabled': page == 1 }"
            :data-gotonumber="1"
            @click="setPage"
          >
            First page
          </button>
          <button
            type="button"
            class="join-item btn btn-sm"
            :class="{ 'btn-disabled': !hasPrevPage }"
            :data-gotonumber="prevPage"
            @click="setPage"
          >
            Previous page
          </button>
          <button
            type="button"
            class="join-item btn btn-sm"
            :class="{ 'btn-disabled': !hasNextPage }"
            :data-gotonumber="nextPage"
            @click="setPage"
          >
            Next page
          </button>
          <button
            type="button"
            class="join-item btn btn-sm"
            :class="{ 'btn-disabled': page == totalPages }"
            :data-gotonumber="totalPages"
            @click="setPage"
          >
            Last page
          </button>
        </div>
        <span class="flex items-center gap-1">
          <div>Page</div>
          <strong> {{ page }} of {{ totalPages }} </strong>
        </span>
        <span class="flex items-center gap-1">
          | Go to page:
          <div class="tooltip" data-tip="Press enter">
            <input
              :value="page"
              type="number"
              @keyup.enter="setPage"
              class="input input-bordered input-info input-sm w-20"
              placeholder="Page number"
            />
          </div>
        </span>
        <select v-model="pageLimit" class="select select-bordered select-sm">
          <option
            v-for="option in pageLimitOptions"
            :key="'limit' + option"
            :value="option"
          >
            Show {{ option }} pages
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import Edit from "@/assets/Edit.png";
import Delete from "@/assets/Delete.png";
import axios from "axios";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const Search = ref("");
const name = ref("");
//const idToEdit = ref(0);
const CategoryToEdit = ref({ id: 0, name: "" });
const nameCategoryById = ref(""); //category name to validates if it's similar to CategoryToEdit.name
const CategoryToDelete = ref({ id: "", name: "" });

const categories = ref([]);

function createCategory() {
  console.log("category", name.value);
  axios
    .post(
      import.meta.env.VITE_API_ENDPOINT + "/categories/post",
      { nombre: name.value },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((data) => {
      console.log("data", data.data);
      Swal.fire({
        background: "#252526",
        color: "#FFF",
        title: "Category Created!",
        text: "Succes",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
      router.push("/dashboard/categories#");
      getAllCategories();
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        background: "#252526",
        color: "#FFF",
        title: "There was an error!",
        icon: "error",
        text: error.response.data.result_nombre
          ? error.response.data.result_nombre
          : error.response.data.message
          ? error.response.data.message
          : error.response.data.error.map((data) => data),
      });
    });
}
function getCategoryByID(id) {
  axios
    .get(import.meta.env.VITE_API_ENDPOINT + `/categories/getid/${id}`)
    .then((data) => {
      //console.log(data.data);
      nameCategoryById.value = data.data.nombre;
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
function editCategory() {
  console.log(
    "updated",
    CategoryToEdit.value.id,
    CategoryToEdit.value.name,
    nameCategoryById.value
  );
  if (CategoryToEdit.value.name != nameCategoryById.value) {
    axios
      .put(
        import.meta.env.VITE_API_ENDPOINT +
          `/categories/put/${CategoryToEdit.value.id}`,
        {
          nombre: CategoryToEdit.value.name,
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
          title: "Category Updated!",
          text: "Succes",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        //router.push("/dashboard/users");
        getAllCategories();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          text: error.response.data.result_nombre
            ? error.response.data.result_nombre
            : error.response.data.message
            ? error.response.data.message
            : error.response.data.error.map((data) => data),
        });
      });
  }
}
function getAllCategories() {
  axios
    .get(
      import.meta.env.VITE_API_ENDPOINT +
        `/categories/getpaginate/?limit=${pageLimit.value}&page=${page.value}`
    )
    .then((data) => {
      //console.log(data.data);
      console.log(data.data);
      categories.value = data.data.docs;
      hasPrevPage.value = data.data.hasPrevPage;
      hasNextPage.value = data.data.hasNextPage;
      prevPage.value = data.data.prevPage;
      nextPage.value = data.data.nextPage;

      page.value = data.data.page;
      totalPages.value = data.data.totalPages;
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
function deleteCategory(id) {
  console.log("delete ", id);
  axios
    .delete(import.meta.env.VITE_API_ENDPOINT + "/categories/delete/" + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((data) => {
      console.log(data.data);
      Swal.fire({
        background: "#252526",
        color: "#FFF",
        title: "Category Deleted!",
        text: "Succes",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
      getAllCategories();
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

onMounted(() => {
  getAllCategories();
});

function getCategoriesMiddleware() {
  //getAllAuthors();
  if (Search.value) {
    console.log("getting categories by filter");
    //filter();
  } else {
    console.log("getting all categories");
    getAllCategories();
  }
}

function setPage(event) {
  if (page.value > totalPages.value) {
    page.value = totalPages.value;
  }
  if (page.value < 1) {
    page.value = 1;
  }

  if (event.target.tagName == "BUTTON") {
    page.value = parseInt(event.target.dataset.gotonumber) || null;
  } else if (event.target.tagName == "INPUT") {
    page.value = parseInt(event.target.value) || 1;
  }
  console.log("cambio de pagina");
  getCategoriesMiddleware();
}

const hasPrevPage = ref(false);
const hasNextPage = ref(true);
const prevPage = ref();
const nextPage = ref();

const page = ref(1);
const totalPages = ref();
const pageLimit = ref(10);
const pageLimitOptions = [10, 15, 20, 25, 30];

watch(pageLimit, () => {
  page.value = 1;
  getCategoriesMiddleware();
});
</script>
