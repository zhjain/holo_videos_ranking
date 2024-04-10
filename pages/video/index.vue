<script setup lang="ts">
const { data }: any = await useFetch('/api/videos', {
    method: 'GET'
})
// console.log(count.value as any,'res');


</script>

<template>
    <div>Video</div>
    <div>
        <div v-for="item in data?.data || []">
            {{ item.video_title }}
        </div>
    </div>
</template>
