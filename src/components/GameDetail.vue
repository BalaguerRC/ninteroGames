<template>
  <main>
    <div class="gameDetails">
      <div class="pr-5">
        <figure class="w-11/12">
          <img
            :src="gamesObj.gameImages"
            alt="Shoes"
            style="width: 847px; height: 500px"
          />
        </figure>
        <div>
          <h2 class="text-4xl font-bold pt-5">About</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
            exercitationem in esse molestias, suscipit illo, accusamus atque
            sequi dignissimos tenetur aut aspernatur voluptates ea eos dolorem
            iure similique consequuntur? Dolores? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nulla, exercitationem in esse
            molestias, suscipit illo, accusamus atque sequi dignissimos tenetur
            aut aspernatur voluptates ea eos dolorem iure similique
            consequuntur? Dolores?
          </p>
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
              DirectX: {{ gamesObj.minreq?.directx }}
            </p>
            <p>
              Maximo: <br />
              SO: {{ gamesObj.recreq?.os }}<br />
              Procesador: {{ gamesObj.recreq?.processor }}<br />
              Memoria: {{ gamesObj.recreq?.memory }}<br />
              Graphics: {{ gamesObj.recreq?.graphics }}<br />
              DirectX: {{ gamesObj.recreq?.directx }}
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
              style="width: 280px"
            />
          </figure>
          <div class="pt-5 contenedorDetail">
            <table class="table table-sm">
              <!-- head -->
              <thead></thead>
              <tbody>
                <!-- row 1 -->
                <tr>
                  <th class="text-lg">${{ gamesObj.price }}</th>
                </tr>
                <!-- row 2 -->
                <tr>
                  <th>Category:</th>
                  <th v-for="category in gamesObj.category" :key="category._id" class="flex flex-col">
                    <span class="badge badge-ghost badge-sm">{{
                      category.nombre
                    }}</span>
                  </th>
                </tr>
                <tr>
                  <th>Author::</th>
                  <th>
                    <div class="badge">{{ gamesObj.developer?.username }}</div>
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
          <button class="btn w-full btn-sm button">Dowload</button>
          <button class="btn btn-outline w-full btn-sm button">
            + Add Whitelist
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
defineProps(["gamesObj"]);
</script>

<style scoped>
/** scoped, use only on this page */
.containerReque {
  align-items: flex-start;
  justify-content: space-between;
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
