<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

defineProps(['receiptObj']);

function goToGamePage(gameId) {
    router.push("/game/" + gameId);
}

</script>

<template>
    <tr class="hover">
        <th>{{ receiptObj._id }}</th>
        <td>{{ receiptObj.game.name }}</td>
        <td>{{ new Date(receiptObj.creationDate).toISOString().split("T")[0] }}</td>
        <td><a class="link link-primary font-bold italic" @click="goToGamePage(receiptObj.game._id)">View game page</a></td>
    </tr>
</template>