<script setup>
import ArticleItem from '../components/ArticleItem.vue';
//import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import { ref, reactive, computed, onMounted } from "vue";
import axios from "axios";
import Swal from 'sweetalert2';

const articles = ref();

const search = ref('');
const dateRange = reactive({
    start: null,
    end: null
});

function filterArticles() {
    
}

const filteredArticles = computed(() => {
    return this.articles.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(this.search.toLowerCase());
        const dateMatch = !this.dateRange.start || !this.dateRange.end || (new Date(article.publicationDate) >= this.dateRange.start && new Date(article.publicationDate) <= this.dateRange.end);
        return titleMatch && dateMatch;
    });
})

function getAllArticles() {
    axios.get(import.meta.env.VITE_API_ENDPOINT + '/articles')
    .then((response) => {
        if (response.status === 200) {
            articles.value = response.data;
        } else {
            console.log(response.data);
            Swal.fire({
              background: "#252526",
              color: "#FFF",
              title: "There was an error!",
              icon: "error",
              html: '<pre>' + err.response.data.message + '</pre>'
            });
        }
    })
    .catch((err) => {
        console.log(err);
        Swal.fire({
            background: "#252526",
            color: "#FFF",
            title: "There was an error!",
            icon: "error",
            text: err.response.data.message
        });
    });
}

onMounted(() => {
    getAllArticles();
    //console.log(articles);
});

</script>

<template>
    <div class="container mx-auto">
        <ArticleItem v-for="article in articles" :key="article._id" :articleObj="article"/>
        <!-- <div class="flex items-center mb-4">
            <input type="text" v-model="search" placeholder="Search articles" class="input input-bordered mr-2" />
            <DatePicker v-model="dateRange" class="mr-2" />
            <button class="btn btn-primary" @click="filterArticles">Filter</button>
        </div> -->
            
        <!-- <router-link v-for="article in filteredArticles" :key="article.id" :to="`/article/${article.id}`"
            class="card card-compact bg-base-100 shadow-xl">
            <figure><img :src="article.thumbnail" alt="Article thumbnail" /></figure>
            <div class="card-body">
                <h2 class="card-title">{{ article.title }}</h2>
                <p class="text-gray-500">{{ article.publicationDate }}</p>
            </div>
        </router-link> -->
    </div>
</template>