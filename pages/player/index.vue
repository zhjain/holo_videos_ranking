<script setup lang="ts">
import VuePlyr from 'vue-plyr';
const { data }: any = await useFetch('/api/videos', {
    method: 'GET'
})
// console.log(count.value as any,'res');

const plyrRef = ref<any>(null)

const playing = ref<boolean>(false)

const useProxy = ref<boolean>(false)

const handleClick = async () => {
    console.log(data.value.data.records[0])
    if (plyrRef.value) {
        playing.value = !playing.value
        await plyrRef.value.player.togglePlay()
    }

}

</script>

<template>
    <div>Video</div>
    <div>
        <UButton color="black" variant="solid" @click="handleClick">
            {{ playing ? "暂停" : "播放"}}
        </UButton>
        <UCheckbox v-model="useProxy" name="useProxy" label="use proxy" />
        <div>
            <ClientOnly>
                <VuePlyr ref="plyrRef">
                    <div class="plyr__video-embed"
                        v-html="useProxy ? data?.data.records[0].video_player_proxy : data?.data.records[0].video_player">
                    </div>
                </VuePlyr>
            </ClientOnly>
        </div>
    </div>
</template>
