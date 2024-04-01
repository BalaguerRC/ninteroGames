<script setup>
// Normal fields
import { ref, onMounted, watch } from 'vue';
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';
import axios from "axios";
import ReceiptHistoryTableRow from '../../components/ReceiptHistoryTableRow.vue';

const router = useRouter();
const user_data = JSON.parse(localStorage.getItem("user_data"));

let payload = {}

const firstName = ref('');
const lastName = ref('');
const username = ref('');
const email = ref('');
const profileURL = ref('')

// Receipts object and paginations
const receipts = ref(null);

const hasPrevPage = ref(false);
const hasNextPage = ref(true);
const prevPage = ref();
const nextPage = ref();

const page = ref(1);
const totalPages = ref()
const pageLimit = ref(10);
const pageLimitOptions = [10, 15, 20, 25, 30];

// Password fields
const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

// Booleans to show settings sections
const showUserSettings = ref(true);
const showReceiptHistory = ref(false);
const showAdvancedSettings = ref(false);

function btnShowUserSettings() {
  page.value = 1;

  showReceiptHistory.value = false;
  showAdvancedSettings.value = false;
  showUserSettings.value = true;
}

function btnShowReceiptHistory() {
  populateUser();
  getAllReceipts();

  showAdvancedSettings.value = false;
  showUserSettings.value = false;
  showReceiptHistory.value = true;
}

function btnShowAdvancedSettings() {
  populateUser();
  page.value = 1;

  showReceiptHistory.value = false;
  showUserSettings.value = false;
  showAdvancedSettings.value = true;
}

function logOut() {
  router.push("/logout");
}

async function saveProfile() {
  // Test if payload is empty. If it is, then all fields are the same as the current user
  if (Object.keys(payload).length === 0) {
    Swal.fire({
      background: "#252526",
      color: "#FFF",
      title: "No fields have changed!",
      icon: "warning",
      timer: 2500,
      showConfirmButton: false
    })
  } else {
    axios.put(import.meta.env.VITE_API_ENDPOINT + "/users/update",
      payload, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            background: "#252526",
            color: "#FFF",
            title: "User profile updated successfully!",
            icon: "success",
            timer: 3000,
            showConfirmButton: false
          })
            .then(() => {
              localStorage.setItem("user_data", JSON.stringify(response.data.user))
              router.push("/home")
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
      .catch((err) => {
        console.log(err);
        if ('error' in err.response.data) {
          let err_text = "";
          err.response.data.error.forEach((error_msg, idx, errors) => {
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
            html: '<pre>' + err.response.data.message + '</pre>'
          });
        }
      });
  }
}

async function changePassword() {
  console.log(currentPassword)
  axios.put(import.meta.env.VITE_API_ENDPOINT + "/users/password", {
    oldPassword: currentPassword.value,
    newPassword: newPassword.value,
    confirmPassword: confirmNewPassword.value
  },
    {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "Password changed successfully!",
          text: "Logging you out now...",
          icon: "success",
          timer: 4000,
          showConfirmButton: false,
          timerProgressBar: true
        })
          .then(() => {
            router.push("/logout")
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
    .catch((err) => {
      console.log(err);
      if ('error' in err.response.data) {
        let err_text = "";
        err.response.data.error.forEach((error_msg, idx, errors) => {
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
          html: '<pre>' + err.response.data.message + '</pre>'
        });
      }
    });
}

async function deleteAccount() {
  Swal.fire({
    background: "#252526",
    color: "#FFF",
    title: "Are you sure?",
    text: "You won't be able to get your account back",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085D6",
    cancelButtonColor: "#D33",
    confirmButtonText: "Yes, delete it!"
  })
    .then((answer) => {
      if (answer.isConfirmed) {
        axios.delete(import.meta.env.VITE_API_ENDPOINT + "/users/delete", {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
          .then((response) => {
            if (response.status === 200) {
              console.log(response.data);
              Swal.fire({
                background: "#252526",
                color: "#FFF",
                title: "Account deleted!",
                text: "Returning to the homescreen...",
                icon: "success",
                timer: 4000,
                showConfirmButton: false,
                timerProgressBar: true
              })
                .then(() => {
                  router.push("/logout")
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
    });
}

async function submitDeveloperRequest() {
  axios.post(import.meta.env.VITE_API_ENDPOINT + "/request/post", {}, {
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
  })
    .then((response) => {
      if (response.status == 201) {
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "Application sent!",
          icon: "success",
          text: "Your request to become a developer will be reviewed soon."
        });
      } else {
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
      if (error.response.status == 422) {
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "Cannot send application",
          icon: "warning",
          text: "You have already submitted a request to become a developer."
        });
      } else {
        Swal.fire({
          background: "#252526",
          color: "#FFF",
          title: "There was an error!",
          icon: "error",
          text: error.response.data.message
        });
      }
    });
}

function populateUser() {
  firstName.value = user_data.nombre;
  lastName.value = user_data.apellido;
  username.value = user_data.username;
  email.value = user_data.email;
  profileURL.value = user_data.profileURL
}

function getAllReceipts() {
  receipts.value = null;
  axios.get(import.meta.env.VITE_API_ENDPOINT + `/receipts/getself?limit=${pageLimit.value}&page=${page.value}`, {
    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
  })
    .then((response) => {
      if (response.status === 200) {
        receipts.value = response.data.docs;
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
  getAllReceipts();
}

onMounted(() => {
  populateUser();

});

// Watching profile properties to change and save
watch(firstName, (newFirstName) => {
  if (newFirstName != user_data.nombre) {
    payload.nombre = newFirstName;
  } else {
    if (payload.hasOwnProperty("nombre") && newFirstName == user_data.nombre) {
      delete payload.nombre;
    }
  }
})

watch(lastName, (newLastName) => {
  if (newLastName != user_data.apellido) {
    payload.apellido = newLastName;
  } else {
    if (payload.hasOwnProperty("apellido") && newLastName == user_data.apellido) {
      delete payload.apellido;
    }
  }
})

watch(username, (newUserName) => {
  if (newUserName != user_data.username) {
    payload.username = newUserName;
  } else {
    if (payload.hasOwnProperty("username") && newUserName == user_data.username) {
      delete payload.username;
    }
  }
})

watch(email, (newEmail) => {
  if (newEmail != user_data.email) {
    payload.email = newEmail;
  } else {
    if (payload.hasOwnProperty("email") && newEmail == user_data.email) {
      delete payload.email;
    }
  }
})

watch(profileURL, (newProfileURL) => {
  if (newProfileURL != user_data.profileURL) {
    payload.profileURL = newProfileURL;
  } else {
    if (payload.hasOwnProperty("profileURL") && newProfileURL == user_data.profileURL) {
      delete payload.profileURL;
    }
  }
})

watch(pageLimit, () => {
  //console.log(new Date(date.value[0]).toLocaleDateString('en-CA'));
  //console.log(date.value);
  page.value = 1;
  getAllReceipts();
});

</script>

<template>
  <div class="md:container md:mx-auto p-10 flex flex-row gap-3">
    <div class="shadow bg-base-200 basis-1/4 p-5 rounded-lg flex flex-col justify-between">
      <div class="space-y-7">
        <button type="button" class="btn btn-block font-bold" @click="btnShowUserSettings"><svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-6 w-6 fill-neutral-content">
            <path
              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
          </svg>User data</button>
        <button type="button" class="btn btn-block font-bold" @click="btnShowReceiptHistory"><svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="h-6 w-6 fill-neutral-content">
            <path
              d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z" />
          </svg>Receipt history</button>
        <button type="button" class="btn btn-block font-bold" @click="btnShowAdvancedSettings"><svg
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="h-6 w-6 fill-neutral-content">
            <path
              d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
          </svg>Advanced</button>
      </div>
      <div class="mt-7">
        <button type="button" class="font-bold btn btn-error btn-block" @click="logOut">Log out</button>
      </div>
    </div>
    <!-- <div class="shadow bg-base-200 basis-1/4 p-5 rounded-lg space-y-7">
      <button type="button" class="btn btn-block font-bold"><svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512" class="h-6 w-6 fill-neutral-content">
          <path
            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>User data</button>
      <button type="button" class="btn btn-block font-bold"><svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512" class="h-6 w-6 fill-neutral-content">
          <path
            d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.3-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8V488c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zM96 240c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z" />
        </svg>Receipt history</button>
      <button type="button" class="btn btn-block font-bold"><svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512" class="h-6 w-6 fill-neutral-content">
          <path
            d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.9 8.4 167.2 8 160.4 8h-.7c-6.8 0-13.5 .4-20.1 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM112 176a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 304a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
        </svg>Advanced</button>
      <button type="button" class="font-bold btn btn-error btn-block">Log out</button>
    </div> -->

    <div class="shadow basis-3/4 p-5 rounded">
      <div id="usersettings" v-if="showUserSettings">
        <div class="divider">
          <div class="divider-content">
            <h1 class="text-3xl font-bold">User Settings</h1>
          </div>
        </div>


        <form @submit.prevent="saveProfile">
          <div class="form-control">
            <label class="label">
              <span class="label-text">First Name</span>
            </label>
            <input type="text" v-model="firstName" placeholder="First Name" class="input input-bordered" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Last Name</span>
            </label>
            <input type="text" v-model="lastName" placeholder="Last Name" class="input input-bordered" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input type="text" v-model="username" placeholder="Username" class="input input-bordered" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input type="email" v-model="email" placeholder="Email" class="input input-bordered" required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Profile Image URL</span>
            </label>
            <div class="flex">
              <input type="url" v-model="profileURL" class="input input-bordered flex-1 mr-2"
                placeholder="Profile Image URL" />
              <button type="button" class="btn flex-initial" onclick="preview_modal.showModal()">Preview Image</button>
              <dialog id="preview_modal" class="modal">
                <div class="modal-box">
                  <h3 class="text-center font-bold text-lg mb-5">Profile Image Preview</h3>
                  <img class="mx-auto mask mask-circle" :src="profileURL" alt="Valid URL profile image" width="128" />
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

          <button type="submit" class="btn btn-accent mt-4">Save Profile</button>
        </form>

        <div class="divider mt-8">
          <div class="divider-content">
            <h2 class="text-2xl font-bold">Change Password</h2>
          </div>
        </div>

        <form @submit.prevent="changePassword">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Current Password</span>
            </label>
            <input type="password" v-model="currentPassword" placeholder="Current Password" class="input input-bordered"
              required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">New Password</span>
            </label>
            <input type="password" v-model="newPassword" placeholder="New Password" class="input input-bordered"
              required />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm New Password</span>
            </label>
            <input type="password" v-model="confirmNewPassword" placeholder="Confirm New Password"
              class="input input-bordered" required />
          </div>

          <button type="submit" class="btn btn-accent mt-4">Change Password</button>
        </form>


      </div>

      <div id="receipthistory" v-else-if="showReceiptHistory">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>Receipt Id</th>
              <th>Game name</th>
              <th>Receipt Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody v-if="receipts && receipts.length != 0">
            <ReceiptHistoryTableRow v-for="receipt in receipts" :key="receipt._id" :receiptObj="receipt"/>
          </tbody>
          <tbody v-else-if="receipts && receipts.length == 0">
            <th colspan="4" class="text-center">
              <span class="italic">No receipts to show</span>
            </th>
          </tbody>
          <tbody v-else>
            <th colspan="4" class="text-center">
              <span class="loading loading-spinner loading-lg"></span>
            </th>
          </tbody>
        </table>
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
      </div>
      <div id="advancedsettings" v-else-if="showAdvancedSettings">
        <div class="divider mt-8">
          <div class="divider-content">
            <h2 class="text-2xl font-bold">Advanced Settings</h2>
          </div>
        </div>

        <form @submit.prevent="submitDeveloperRequest">
          <div class="form-control ">
            <p>
              Turn your passion for gaming into an exciting career!
            </p>
            <p class="mt-3">
              Do you love video games? Have you always wanted to create your own? It's time to make it happen!
              Publishing your own games allows you to express your creativity and connect with a global audience of
              gamers. With resources like Unity and online tutorials, it's now easier than ever to get started! Join the
              developer community and start bringing your ideas to life today.
            </p>
            <p class="mt-3">
              If you have any problems, please contact us at nintero@example.com.
            </p>
            <div class="alert shadow-lg mt-4" v-if="user_data && user_data.tipo === 1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="stroke-info shrink-0 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <div class="text-xs">Since you are already a developer, there's no need to apply for anything! Go make
                  games!</div>
              </div>
            </div>
            <input type="submit" value="Send Application" class="btn btn-primary mt-4 font-bold"
              :class="{'btn-disabled': user_data && user_data.tipo === 1 || user_data.tipo === 0}" />
          </div>
        </form>
        <div class="divider mt-8">
          <div class="divider-content">
            <h2 class="text-2xl font-bold">Danger Zone</h2>
          </div>
        </div>

        <form @submit.prevent="deleteAccount">
          <div class="form-control">
            <p>
              Ready to say goodbye? Deleting your account is easy. Just contact us if you have any problems and we'll
              take care of the rest. Thank you for being part of our community!
            </p>
            <input type="submit" value="Delete account" class="btn btn-error mt-4 font-bold" />
          </div>
        </form>
      </div>
    </div>

  </div>
</template>