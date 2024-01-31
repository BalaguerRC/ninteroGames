<script setup>
import ArticleForm from '../components/ArticleForm.vue';
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
    <div class="md:container md:mx-auto">
        <div class="m-10">
            <div class="divider">
                <div class="divider-content">
                    <h1 class="text-3xl font-bold">Update Article</h1>
                </div>
            </div>
            <ArticleForm :articleid="route.params.articleid"/>
        </div>
    </div>
</template>