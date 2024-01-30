<template>
  <div class="md:container md:mx-auto">
    <div class="p-10">
      <div class="flex centerA">
        <div class="join">
          <button class="btn join-item btn-sm">Home</button>
          <button class="btn join-item btn-sm">News</button>
          <button class="btn join-item btn-sm">Category</button>
        </div>
        <div class="join">
          <input
            type="text"
            placeholder="Type here"
            class="input w-full max-w-xs input-sm input-bordered join-item"
          />

          <button class="btn btn-sm join-item rounded-r-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <h2 class="text-4xl font-bold pt-5">
        {{ $route.params.name }} - {{ $route.params.id }}
      </h2>

      <main>
        <div class="gameDetails">
          <div class="pr-5">
            <figure class="w-11/12">
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div>
              <h2 class="text-4xl font-bold pt-5">About</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
                exercitationem in esse molestias, suscipit illo, accusamus atque
                sequi dignissimos tenetur aut aspernatur voluptates ea eos
                dolorem iure similique consequuntur? Dolores? Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Nulla, exercitationem in
                esse molestias, suscipit illo, accusamus atque sequi dignissimos
                tenetur aut aspernatur voluptates ea eos dolorem iure similique
                consequuntur? Dolores?
              </p>
            </div>
            <div>
              <h2 class="text-4xl font-bold pt-5">Requeriments</h2>
              <div class="flex-col lg:flex-row hero-content pt-5">
                <p>
                  MÍNIMO: <br />
                  SO: Windows 10 or later 64-bit (latest update)<br />
                  Procesador: Intel Core i5-6600K or AMD Ryzen R5 1600
                  processor<br />
                  Memoria: 12 GB de RAM Gráficos: NVIDIA GeForce GTX 1050 Ti or
                  AMD Radeon RX 580<br />
                  DirectX: Versión 12
                </p>
                <p>
                  MÍNIMO: <br />
                  SO: Windows 10 or later 64-bit (latest update)<br />
                  Procesador: Intel Core i5-6600K or AMD Ryzen R5 1600
                  processor<br />
                  Memoria: 12 GB de RAM Gráficos: NVIDIA GeForce GTX 1050 Ti or
                  AMD Radeon RX 580<br />
                  DirectX: Versión 12
                </p>
              </div>
            </div>
          </div>
          <div class="sticky top-16 h-max">
            <div class="contenedor1">
              <figure class="imagenDetail">
                <img
                  src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                  alt="Shoes"
                  style="width: 180px; height: 220px"
                />
              </figure>
              <div class="pt-5 contenedorDetail">
                <table class="table table-sm">
                  <!-- head -->
                  <thead></thead>
                  <tbody>
                    <!-- row 1 -->
                    <tr>
                      <th>0.00 US$</th>
                    </tr>
                    <!-- row 2 -->
                    <tr class="justify-between">
                      <th>Category:</th>
                      <th>
                        <div class="badge">default</div>
                        <div class="badge">default</div>
                      </th>
                    </tr>
                    <tr>
                      <th>Author::</th>
                      <th><div class="badge">default</div></th>
                    </tr>
                    <tr>
                      <th>Publication Date:</th>
                      <th><div class="badge">2023-12-18</div></th>
                    </tr>
                    <tr>
                      <th>Downloads:</th>
                      <th><div class="badge">12</div></th>
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
    </div>
  </div>
</template>

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
</style>
