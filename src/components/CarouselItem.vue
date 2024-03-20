<template>
  <div class="card lg:card-side bg-base-100 shadow-xl w-full heigthCard">
    <figure class="componentIMG0 componentIMG">
      <img
        class="h-full"
        :src="thumbnailURL"
        alt="Album"
        style="border-top-left-radius: 10px; border-bottom-left-radius: 10px"
      />
    </figure>
    <div class="card-body">
      <div class="flex flex-col">
        <div class="flex justify-between">
          <h2 class="card-title">{{ title }}</h2>
          <span class="badge badge-accent badge-lg my-2">{{ category }}</span>
        </div>

        <h2 class="text-sm opacity-50">by {{ author }}</h2>
      </div>

      <p
        v-html="content.length > 270 ? content.slice(0, 270) + '...' : content"
        v-if="!article"
      ></p>
      <p
        v-html="content.length > 270 ? content.slice(0, 270) + '...' : content"
        v-if="article"
      ></p>
      <div class="card-actions justify-end">
        <a class="btn btn-active btn-sm" :href="'game/' + id" v-if="!article"
          >view ></a
        >
        <a class="btn btn-active btn-sm" :href="'news/' + id" v-if="article"
          >Read More ></a
        >
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps([
  "thumbnailURL",
  "title",
  "content",
  "article",
  "id",
  "author",
  "category",
]);
</script>
<style>
.componentIMG0 {
  width: 100%;
}
.componentIMG {
  max-width: 750px;
}
.heigthCard{
  height: 25rem;
}
</style>
