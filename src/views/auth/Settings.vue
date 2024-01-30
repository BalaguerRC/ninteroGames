<script setup>
    // Normal fields
    import { ref, onMounted, watch } from 'vue';
    import { useRouter } from "vue-router";
    import Swal from 'sweetalert2';
    import axios from "axios";

    const API_URL = import.meta.env.VITE_API_ENDPOINT;
    const router = useRouter();
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    
    let payload = {}

    const firstName = ref('');
    const lastName = ref('');
    const username = ref('');
    const email = ref('');
    const profileURL = ref('')

    // Password fields
    const currentPassword = ref('');
    const newPassword = ref('');
    const confirmNewPassword = ref('');

    async function saveProfile(){
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
          headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
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
        })
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
        headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
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
            headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
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

    function populateUser() {
      firstName.value = user_data.nombre;
      lastName.value = user_data.apellido;
      username.value = user_data.username;
      email.value = user_data.email;
      profileURL.value = user_data.profileURL
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

</script>

<template>
  <div class="md:container md:mx-auto">
    <div class="p-10">
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
           <input
             type="text"
             v-model="firstName"
             placeholder="First Name"
             class="input input-bordered"
             required
           />
         </div>
   
         <div class="form-control">
           <label class="label">
             <span class="label-text">Last Name</span>
           </label>
           <input
             type="text"
             v-model="lastName"
             placeholder="Last Name"
             class="input input-bordered"
             required
           />
         </div>
   
         <div class="form-control">
           <label class="label">
             <span class="label-text">Username</span>
           </label>
           <input
             type="text"
             v-model="username"
             placeholder="Username"
             class="input input-bordered"
             required
           />
         </div>
   
         <div class="form-control">
           <label class="label">
             <span class="label-text">Email</span>
           </label>
           <input
             type="email"
             v-model="email"
             placeholder="Email"
             class="input input-bordered"
             required
           />
         </div>

         <div class="form-control">
          <label class="label">
             <span class="label-text">Profile Image URL</span>
          </label>
          <div class="flex">
            <input
              type="url"
              v-model="profileURL"
              class="input input-bordered flex-1 mr-2"
              placeholder="Profile Image URL"
            />
            <button type="button" class="btn flex-initial" onclick="preview_modal.showModal()">Preview Image</button>
            <dialog id="preview_modal" class="modal">
              <div class="modal-box">
                <h3 class="text-center font-bold text-lg mb-5">Profile Image Preview</h3>
                <img class="mx-auto mask mask-circle" :src="profileURL" alt="Valid URL profile image" width="128"/>
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
           <input
             type="password"
             v-model="currentPassword"
             placeholder="Current Password"
             class="input input-bordered"
             required
           />
         </div>
   
         <div class="form-control">
           <label class="label">
             <span class="label-text">New Password</span>
           </label>
           <input
             type="password"
             v-model="newPassword"
             placeholder="New Password"
             class="input input-bordered"
             required
           />
         </div>
   
         <div class="form-control">
           <label class="label">
             <span class="label-text">Confirm New Password</span>
           </label>
           <input
             type="password"
             v-model="confirmNewPassword"
             placeholder="Confirm New Password"
             class="input input-bordered"
             required
           />
         </div>
   
         <button type="submit" class="btn btn-accent mt-4">Change Password</button>
       </form>

       <div class="divider mt-8">
         <div class="divider-content">
            <h2 class="text-2xl font-bold">Delete Account</h2>
         </div>
       </div>
   
       <form @submit.prevent="deleteAccount">
         <div class="form-control">
           <p>
             Do you wish to delete your account?
           </p>
           <input
             type="submit"
             value="Delete account"
             class="btn btn-error mt-4"
           />
         </div>
       </form>
    </div>
  </div>
</template>