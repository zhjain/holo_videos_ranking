<script setup lang="ts">
import VuePlyr from 'vue-plyr';
const { data }: any = await useFetch('/api/videos', {
    method: 'GET'
})

const plyrRef = ref<any>(null)

const playing = ref<boolean>(false)

const handleClick = async () => {
    console.log(data.value.data[0])
    if (plyrRef.value) {
        playing.value = !playing.value
        await plyrRef.value.player.togglePlay()
    }

}

</script>

<template>
    <UTable :rows="data.data" />
</template>
