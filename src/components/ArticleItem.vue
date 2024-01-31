<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

//const props = defineProps
defineProps(['articleObj']);
function goToArticle(articleid) {
    router.push(`/news/${articleid}`);
}
</script>

<template>
    <div class="card lg:card-side bg-base-100 shadow-xl mb-5">
        <figure><img class="w-[300px] h-[200px]" :src="articleObj.thumbnailURL" alt="article thumbnail image"/></figure>
        <div class="card-body">
            <div class="flex justify-between">
                <h2 class="card-title">{{ articleObj.title }}</h2>
                <div class="badge badge-outline">Published on: {{ new Date(articleObj.creationDate).toISOString().split("T")[0] }}</div>
            </div>
            <p>Written by: {{ articleObj.author.username }}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary" @click="goToArticle(articleObj._id)">Read article</button>
            </div>
        </div>
    </div>
</template>