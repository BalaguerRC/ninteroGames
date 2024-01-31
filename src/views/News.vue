<script setup>
import ArticleItem from '../components/ArticleItem.vue';
//import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import axios from "axios";
import Swal from 'sweetalert2';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const articles = ref();
const hasPrevPage = ref(false);
const hasNextPage = ref(true);
const prevPage = ref();
const nextPage = ref();

const page = ref(1);
const totalPages = ref()
const pageLimit = ref(10);
const pageLimitOptions = [10, 15, 20, 25, 30];

const search = ref('');
const date = ref(null);
const clearFilterButton = ref(false);

const user_data = JSON.parse(localStorage.getItem("user_data"));

function filterArticles() {
    let query_route;
    let query_body;

    if (search.value && date.value) {
        query_route = `/articles/search/${search.value}/filter?limit=${pageLimit.value}&page=${page.value}`;
        query_body = {
            gte: new Date(date.value[0]).toLocaleDateString('en-CA'),
            lte: new Date(date.value[1]).toLocaleDateString('en-CA')
        };
    } else if (date.value) {
        query_route = `/articles/filter?limit=${pageLimit.value}&page=${page.value}`;
        query_body = {
            gte: new Date(date.value[0]).toLocaleDateString('en-CA'),
            lte: new Date(date.value[1]).toLocaleDateString('en-CA')
        };
    } else if (search.value) {
        query_route = `/articles/search/${search.value}`;
        axios.get(import.meta.env.VITE_API_ENDPOINT + query_route)
        .then((response) => {
            if (response.status === 200) {
                articles.value = response.data.docs;
                hasPrevPage.value = response.data.hasPrevPage;
                hasNextPage.value = response.data.hasNextPage;
                prevPage.value = response.data.prevPage;
                nextPage.value = response.data.nextPage;

                page.value = response.data.page;
                totalPages.value = response.data.totalPages;
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
            console.log(err);
            Swal.fire({
                background: "#252526",
                color: "#FFF",
                title: "There was an error!",
                icon: "error",
                text: error.response.data.message
            });
        });
        return
    }

    axios.post(import.meta.env.VITE_API_ENDPOINT + query_route, query_body)
    .then((response) => {
        if (response.status === 200) {
                articles.value = response.data.docs;
                hasPrevPage.value = response.data.hasPrevPage;
                hasNextPage.value = response.data.hasNextPage;
                prevPage.value = response.data.prevPage;
                nextPage.value = response.data.nextPage;

                page.value = response.data.page;
                totalPages.value = response.data.totalPages;
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

function getAllArticles() {
    axios.get(import.meta.env.VITE_API_ENDPOINT + `/articles?limit=${pageLimit.value}&page=${page.value}`)
        .then((response) => {
            if (response.status === 200) {
                articles.value = response.data.docs;
                hasPrevPage.value = response.data.hasPrevPage;
                hasNextPage.value = response.data.hasNextPage;
                prevPage.value = response.data.prevPage;
                nextPage.value = response.data.nextPage;

                page.value = response.data.page;
                totalPages.value = response.data.totalPages;
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

function getArticleMiddleware() {
    if (search.value || date.value) {
        console.log("getting articles by filter");
        filterArticles();
    }
    else {
        console.log("getting all articles");
        getAllArticles();
    }
}

function onFilterArticle(event) {
    page.value = 1;
    clearFilterButton.value = true;
    console.log(search.value);
    console.log(date.value);
    getArticleMiddleware();
}

function onClearFilter(event) {
    page.value = 1;
    search.value = "";
    date.value = null;
    clearFilterButton.value = false;
    getArticleMiddleware();
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
    }
    getArticleMiddleware();
}

onMounted(() => {
    getAllArticles();
    //console.log(articles);
});

watch(pageLimit, () => {
    //console.log(new Date(date.value[0]).toLocaleDateString('en-CA'));
    //console.log(date.value);
    page.value = 1;
    getArticleMiddleware();
});

</script>

<template>
    <div class="container mx-auto mt-10">
        <div class="alert shadow-lg mb-5" v-if="user_data.tipo === 1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
                <h3 class="font-bold">Welcome <strong>{{ user_data.username }}</strong>!</h3>
                <div class="text-xs">Since you are a developer, you can publish your own article</div>
            </div>
            <button class="btn btn-sm btn-primary" @click="router.push('news/create')">Write new article</button>
        </div>
        <div class="flex flex-row mb-5 items-center gap-5">
            <input type="text" placeholder="Title Query" class="input input-bordered basis-1/2" v-model="search">
            <VueDatePicker v-model="date" input-class-name="basis-1/2" dark :clearable="true" :enable-time-picker="false" :range="true"/>
        </div>
        <div class="flex flex-row mb-5 justify-between gap-4">
            <button type="button" @click="onClearFilter" class="btn btn-outline btn-error basis-1/2" :disabled="!clearFilterButton">Clear filter</button>
            <button type="button" @click="onFilterArticle" class="btn btn-outline btn-primary basis-1/2">Filter articles</button>
        </div>
        <ArticleItem v-for="article in articles" :key="article._id" :articleObj="article" />
        <div class="my-4">
            <div class="flex items-center gap-3 justify-center">
                <div class="join">
                    <button type="button" class="join-item btn" :class="{ 'btn-disabled': page == 1 }" :data-gotonumber="1" @click="setPage">First page</button>
                    <button type="button" class="join-item btn" :class="{ 'btn-disabled': !hasPrevPage }" :data-gotonumber="prevPage" @click="setPage">Previous page</button>
                    <button type="button" class="join-item btn" :class="{ 'btn-disabled': !hasNextPage }" :data-gotonumber="nextPage" @click="setPage">Next page</button>
                    <button type="button" class="join-item btn" :class="{ 'btn-disabled': page == totalPages }" :data-gotonumber="totalPages" @click="setPage">Last page</button>
                </div>
                <span class="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {{ page }} of {{ totalPages }}
                    </strong>
                </span>
                <span class="flex items-center gap-1">
                    | Go to page:
                    <div class="tooltip" data-tip="Press enter">
                        <input :value="page" type="number" @keyup.enter="setPage" class="input input-bordered input-info input-sm w-20" placeholder="Page number"/>
                    </div>
                </span>
                <select v-model="pageLimit" class="select select-bordered select-sm">
                    <option v-for="option in pageLimitOptions" :key="'limit'+option" :value="option">
                        Show {{ option }} pages
                    </option>
                </select>
            </div>
        </div>
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