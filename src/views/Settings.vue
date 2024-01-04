<script setup>
    // Normal fields
    import { ref } from 'vue';
    const firstName = ref('');
    const lastName = ref('');
    const username = ref('');
    const email = ref('');

    // Password fields
    const currentPassword = ref('');
    const newPassword = ref('');
    const confirmNewPassword = ref('');

    async function saveProfile(){
        // TODO
        alert("LOL");
    }

    async function changePassword() {
        // TODO
        alert("LMAO");
    }
</script>

<template>
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
           />
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
           />
         </div>
   
         <button type="submit" class="btn btn-accent mt-4">Change Password</button>
       </form>
    </div>
</template>