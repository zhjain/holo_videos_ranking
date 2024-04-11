<script setup lang="ts">
import { Plyr } from 'vue-plyr';
const { data }: any = await useFetch('/api/videos', {
    method: 'GET'
})
// console.log(count.value as any,'res');

const plyrRef = ref<any>(null)

const handleClick = () => {
    if (plyrRef.value)
        console.log(plyrRef.value.plyr);
}

</script>

<template>
    <div>Video</div>
    <div>
        <div v-for="item in data?.data || []">
            {{ item.video_title }}
        </div>
        <button @click="handleClick">132132</button>
        <VuePlyr ref="plyrRef">
            <div class="plyr__video-embed" v-html="data?.data[0].video_player">
            </div>
        </VuePlyr>
    </div>
</template>
