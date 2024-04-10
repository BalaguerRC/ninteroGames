<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();

const article = ref(null);

const user_data = JSON.parse(localStorage.getItem("user_data"));
const user_is_author = ref(false);

function fetchArticle(article_id) {
    axios.get(import.meta.env.VITE_API_ENDPOINT + `/articles/${article_id}`)
    .then((response) => {
        if (response.status === 200) {
            article.value = response.data;
            console.log(article.value);
            user_is_author.value = user_data._id == article.value.author._id;
        } else {
            console.log(response.data);
            Swal.fire({
                background: "#252526",
                color: "#FFF",
                title: "There was an error!",
                icon: "error",
                html: response.data.message
            });
        }
    })
    .catch((error) => {
        console.log(error);
        Swal.fire({
            background: "#252526",
            color: "#FFF",
            title: "There was an error!",
            icon: "error",
            text: error.response.data.message
        });
    });
}

async function onDeleteArticle() {
    Swal.fire({
        background: "#252526",
        color: "#FFF",
        title: "Are you sure?",
        text: "You won't be able to undo this",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085D6",
        cancelButtonColor: "#D33",
        confirmButtonText: "Yes, delete it!"
    })
        .then((answer) => {
            if (answer.isConfirmed) {
                axios.delete(import.meta.env.VITE_API_ENDPOINT + `/articles/delete/${article.value._id}`, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                })
                    .then((response) => {
                        if (response.status === 200) {
                            console.log(response.data);
                            Swal.fire({
                                background: "#252526",
                                color: "#FFF",
                                title: "Article deleted!",
                                text: "Returning to the news page...",
                                icon: "success",
                                timer: 4000,
                                showConfirmButton: false,
                                timerProgressBar: true
                            })
                            .then(() => {
                                router.push("/news")
                            });
                        } else {
                            console.log(response.data);
                            Swal.fire({
                                background: "#252526",
                                color: "#FFF",
                                title: "There was an error!",
                                icon: "error",
                                text: response.data.message
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            background: "#252526",
                            color: "#FFF",
                            title: "There was an error!",
                            icon: "error",
                            text: error.response.data.message
                        });
                    });
            }
        });
}

onBeforeMount(() => {
    //console.log('before mount invoked')
    fetchArticle(route.params.articleid);
});
</script>

<template>
<div class="container mx-auto min-h-[50rem]">
    <div class="m-10" v-if="article">
        <div class="text-sm breadcrumbs py-5">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/news">News</a></li>
            <li>{{ article.title }}</li>
          </ul>
        </div>
        <div class="mb-3">
            <h1 class="font-bold text-4xl">{{ article.title }}</h1>
        </div>
        <div class="divider"></div>
        <div class="my-3">
            <img :src="article.thumbnailURL" alt="article image thumbnail" class="rounded w-max">
        </div>
        <div class="mb-3">
            <p class="italic">Updated on: {{ new Date(article.lastUpdateDate).toISOString().split("T")[0] }}</p>
        </div>
        <div class="overflow-hidden" v-html="article.content"></div>
        <div class="my-5">
            <p class="italic">Written by: <span class="font-bold">{{ article.author.username }}</span></p>
        </div>
        <div class="flex flex-row" :class="{'space-x-4': user_is_author}">
            <button type="button" @click="router.push('/news')" class="btn " :class="{'grow': user_is_author, 'btn-block': !user_is_author}">Go back to news page</button>
            <button v-if="user_is_author" type="button" @click="onDeleteArticle" class="btn btn-error grow font-bold">Delete article</button>
            <button v-if="user_is_author" type="button" @click="router.push(`/news/update/${route.params.articleid}`)" class="btn btn-warning grow font-bold">Update article</button>
        </div>
    </div>
    <div class="m-10 text-center" v-else>
        <span class="loading loading-spinner loading-lg"></span>
    </div>
</div>
</template>