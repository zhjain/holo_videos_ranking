<script setup lang="ts">
import VuePlyr from 'vue-plyr';
const { data }: any = await useFetch('/api/videos', {
    method: 'GET'
})
// console.log(count.value as any,'res');

const plyrRef = ref<any>(null)

const playing = ref<boolean>(false)

const handleClick = async () => {
    if (plyrRef.value) {
        playing.value = !playing.value
        await plyrRef.value.player.togglePlay()
    }

}

</script>

<template>
    <div>Video</div>
    <div>
        <!-- <div v-for="item in data?.data || []">
            {{ item.video_title }}
        </div> -->
        <UButton color="black" variant="solid" @click="handleClick">
            {{ playing ? "暂停" : "播放"}}
        </UButton>
        <div class="hidden">
            <ClientOnly>
                <VuePlyr ref="plyrRef">
                    <div class="plyr__video-embed" v-html="data?.data[0].video_player">
                    </div>
                </VuePlyr>
            </ClientOnly>
        </div>
    </div>
</template>
