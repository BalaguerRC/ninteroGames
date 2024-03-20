<script setup>
import NotificationItem from "../../components/NotificationItem.vue";
//import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import Swal from 'sweetalert2';

const notifications = ref(null);
const notificationType = ref("articles");
const hasPrevPage = ref(false);
const hasNextPage = ref(true);
const prevPage = ref();
const nextPage = ref();

const page = ref(1);
const totalPages = ref()
const pageLimit = ref(10);
const pageLimitOptions = [10, 15, 20, 25, 30];

function getAllNotifications() {
    notifications.value = null;
    axios.get(import.meta.env.VITE_API_ENDPOINT + `/notifications/${notificationType.value}/get/byself?limit=${pageLimit.value}&page=${page.value}`, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
    })
        .then((response) => {
            if (response.status === 200) {
                notifications.value = response.data.docs;
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
    getAllNotifications();
}

onMounted(() => {
    getAllNotifications();
    //console.log(articles);
});

watch(pageLimit, () => {
    //console.log(new Date(date.value[0]).toLocaleDateString('en-CA'));
    //console.log(date.value);
    page.value = 1;
    getAllNotifications();
});

watch(notificationType, () => {
    getAllNotifications();
});
</script>

<template>
    <div class="container mx-auto mt-10">
        <div role="tablist" class="tabs tabs-boxed font-bold">
            <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Article Notifications" value="articles" v-model="notificationType" checked/>
            <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Game Notifications" value="games" v-model="notificationType" />
        </div>
        <div v-if="notifications">
            <div v-if="notifications.length == 0" class="text-center mt-4 mb-8">
                <span class="italic">No notifications to show</span>
            </div>
            <div v-else>
                <NotificationItem v-for="notification in notifications" :key="notification._id" :notificationObj="notification" />
            </div>
        </div>
        <div v-else class="text-center my-4">
            <span class="loading loading-spinner loading-lg"></span>
        </div>
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
        <!-- <ArticleItem v-for="article in articles" :key="article._id" :articleObj="article" /> -->
    </div>
</template>