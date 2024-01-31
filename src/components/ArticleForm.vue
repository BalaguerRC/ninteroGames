<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';
import axios from "axios";
import Editor from '@tinymce/tinymce-vue'

const props = defineProps(['articleid']);
const user_data = JSON.parse(localStorage.getItem("user_data"));

const router = useRouter();

const title = ref('');
const thumbnailURL = ref('')
const content = ref('');

function fetchArticle(article_id) {
    axios.get(import.meta.env.VITE_API_ENDPOINT + `/articles/${article_id}`)
    .then((response) => {
        if (response.status === 200) {
            console.log(response.data);
            if (user_data._id == response.data.author._id) {
                title.value = response.data.title;
                thumbnailURL.value = response.data.thumbnailURL;
                content.value = response.data.content;
            } else {
                Swal.fire({
                    background: "#252526",
                    color: "#FFF",
                    title: "You are not the author of this article!",
                    icon: "error",
                    timer: 3000,
                    showConfirmButton: false
                })
                .then(() => {
                    router.push()
                });
            }
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

function createArticle() {
    axios.post(import.meta.env.VITE_API_ENDPOINT + "/articles/create", {
        title: title.value,
        thumbnailURL: thumbnailURL.value || 'https://placehold.co/600x400',
        content: content.value
    }, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
    .then((response) => {
        if (response.status === 201) {
            Swal.fire({
                background: "#252526",
                color: "#FFF",
                title: "New article created!",
                text: "Redirecting you to news page",
                icon: "success",
                timer: 3000,
                showConfirmButton: false
            })
            .then(() => {
                router.push("/news");
            });
        } else {
            Swal.fire({
                background: "#252526",
                color: "#FFF",
                title: "There was an error!",
                icon: "error",
                html: '<pre>' + response.data.message + '</pre>'
            });
        }
    })
    .catch((error) => {
        console.log(error);
        if ('error' in error.response.data) {
        let err_text = "";
        error.response.data.error.forEach((error_msg, idx, errors) => {
            if (idx === errors.length - 1) {
            err_text = err_text + error_msg.charAt(0).toUpperCase() + error_msg.slice(1);
            } else {
            err_text = err_text + error_msg.charAt(0).toUpperCase() + error_msg.slice(1) + "\n";
            }
        });
        Swal.fire({
            background: "#252526",
            color: "#FFF",
            title: "There was an error!",
            icon: "error",
            html: '<pre>' + err_text + '</pre>'
        });
        } else {
        Swal.fire({
            background: "#252526",
            color: "#FFF",
            title: "There was an error!",
            icon: "error",
            html: '<pre>' + error.response.data.message + '</pre>'
        });
        }
    });
}

function updateArticle() {
    axios.put(import.meta.env.VITE_API_ENDPOINT + `/articles/update/${props.articleid}`,{
        title: title.value,
        thumbnailURL: thumbnailURL.value || 'https://placehold.co/600x400',
        content: content.value
    }, {
          headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
        })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
                background: "#252526",
                color: "#FFF",
                title: "Article updated successfully!",
                text: "Returning to article page...",
                icon: "success",
                timer: 3000,
                showConfirmButton: false,
                timerProgressBar: true
            })
            .then(() => {
              router.push(`/news/${props.articleid}`)
            });
          } else {
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
          if ('error' in error.response.data) {
            let err_text = "";
            error.response.data.error.forEach((error_msg, idx, errors) => {
              if (idx === errors.length - 1) {
                err_text = err_text + error_msg.charAt(0).toUpperCase() + error_msg.slice(1);
              } else {
                err_text = err_text + error_msg.charAt(0).toUpperCase() + error_msg.slice(1) + "\n";
              }
            });
            Swal.fire({
              background: "#252526",
              color: "#FFF",
              title: "There was an error!",
              icon: "error",
              html: '<pre>' + err_text + '</pre>'
            });
          } else {
            Swal.fire({
              background: "#252526",
              color: "#FFF",
              title: "There was an error!",
              icon: "error",
              html: error.response.data.message
            });
          }
        });
}

function handleForkSubmit() {
    if (props.articleid) {
        updateArticle();
    } else {
        createArticle();
    }
}

onMounted(() => {
    if (props.articleid) {
        fetchArticle(props.articleid);
    }
});

</script>

<template>
    <form @submit.prevent="handleForkSubmit">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Article title</span>
                    </label>
                    <input type="text" v-model="title" placeholder="Title of article" class="input input-bordered"
                        required />
                </div>

                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Article Thumbnail URL</span>
                    </label>
                    <div class="flex">
                        <input type="url" v-model="thumbnailURL" class="input input-bordered flex-1 mr-2"
                            placeholder="Article thumbnail URL" />
                        <button type="button" class="btn flex-initial" onclick="preview_modal.showModal()">Preview
                            Image</button>
                        <dialog id="preview_modal" class="modal">
                            <div class="modal-box">
                                <h3 class="text-center font-bold text-lg mb-5">Article Thumbnail Preview</h3>
                                <img class="mx-auto" :src="thumbnailURL" alt="Valid URL article thumbnail image"
                                    width="512" />
                                <div class="modal-action">
                                    <form method="dialog">
                                        <!-- if there is a button in form, it will close the modal -->
                                        <button class="btn">Close Preview</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>

                <label class="form-control">
                    <div class="label">
                        <span class="label-text">Your article content</span>
                    </div>
                    <!--API KEY taken from https://github.com/tinymce/tinymce-vue/blob/main/stories/index.js-->
                    <Editor aria-required="true" v-model="content" api-key="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc" :init="{
                        plugins: 'lists link image table code help wordcount',
                        skin: 'oxide-dark',
                        content_css: 'dark',
                        placeholder: 'Type your article content here...'
                    }"/>
                    <!-- <textarea class="textarea textarea-bordered h-24" placeholder="Bio"></textarea> -->
                    <!-- <div>
                    <p>{{ content }}</p>
                </div> -->
                </label>
                <div class="flex flex-row mt-4 space-x-4">
                    <button v-if="articleid" type="button" @click="router.push(`/news/${props.articleid}`)" class="btn grow">Go back to article</button>
                    <button v-else type="button" @click="router.push('/news')" class="btn grow">Go back to news page</button>
                    <button type="submit" class="btn btn-accent font-bold grow">{{ articleid ? 'Save Article' : 'Create Article' }}</button>
                </div>
    </form>
</template>