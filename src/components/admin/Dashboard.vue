<template>
  <div class="p-4">
    <Stats />
    <div class="flex flex-row gap-4 justify-around">
      <StoreAndUser />
    </div>
  </div>
</template>
<script setup>
import Dashboard from "@/components/admin/Dashboard.vue";
import StoreAndUser from "@/components/admin/StoreAndUsers.vue";
import Stats from "@/components/admin/StatsDashboard.vue";
</script>
