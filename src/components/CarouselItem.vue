<template>
  <div class="card lg:card-side rounded-lg bg-base-100 w-full lg:h-96">
    <figure class="lg:w-full lg:max-w-2xl md:w-full">
      <img class="h-full" :src="thumbnailURL" alt="Album" />
    </figure>
    <div class="card-body">
      <div class="flex flex-col">
        <div class="flex justify-between">
          <h2 class="card-title">{{ title }}</h2>
          <span class="badge badge-primary badge-lg my-2">{{ category }}</span>
        </div>

        <h2 class="text-sm opacity-50">by {{ author }}</h2>
      </div>

      <p
        v-html="content.length > 470 ? content.slice(0, 270) + '...' : content"
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
.borderIMG {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
</style>
