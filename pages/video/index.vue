<script setup lang="ts">
import VuePlyr from 'vue-plyr';
const { data }: any = await useFetch('/api/videos', {
    method: 'GET'
})
// console.log(count.value as any,'res');

const plyrRef = ref<any>(null)

const handleClick = async () => {
    if (plyrRef.value) {
        console.log(plyrRef.value.player);
        await plyrRef.value.player.togglePlay()
        console.log(plyrRef.value.player.play);
    }

}

</script>

<template>
    <div>Video</div>
    <div>
        <div v-for="item in data?.data || []">
            {{ item.video_title }}
        </div>
        <button @click="handleClick">132132</button>
        <ClientOnly>
            <VuePlyr ref="plyrRef">
                <div class="plyr__video-embed hidden" v-html="data?.data[0].video_player">
                </div>
            </VuePlyr>
        </ClientOnly>
    </div>
</template>
