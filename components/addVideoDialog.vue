<script setup lang="ts">

const video_id = ref('')
const new_video = ref<any>({})

const need_add = ref(false)

const checkVideo = async () => {
    const res = await ($fetch as any)(`/api/videos/utb/${video_id.value}`, {
        method: 'GET',
    })
    need_add.value = (res.code === 200)
    new_video.value = res.data
}

const handleAdd = async () => {
    const res = await useAuthFetch('/api/videos', {
        method: 'POST',
        body: {
            video_id: video_id.value,
            video_title: new_video.value.items[0].snippet.title,
            video_type: 'waiting',
            owner_channel_id: new_video.value.items[0].snippet.channelId,
            owner_channel_title: new_video.value.items[0].snippet.channelTitle,
            publish_time: new_video.value.items[0].snippet.publishedAt,
            video_view_count: Number.parseInt(new_video.value.items[0].statistics.viewCount),
            video_like_count: Number.parseInt(new_video.value.items[0].statistics.likeCount) || 0,
            video_duration: new_video.value.items[0].contentDetails.duration,
            video_player: new_video.value.items[0].player.embedHtml,
        }
    })
    // videos.value.data.push(res)
}
const authStore = useAuthStore()
const showAlert = ref(true)
</script>

<template>
    <div class="p-4 flex flex-col gap-2">
        <UInput v-model="video_id" />
        <div class="flex gap-4">
            <UButton class="flex-1" @click="checkVideo">query</UButton>
            <UButton class="flex-1" @click="() => { video_id = ''; new_video = {} }">clear</UButton>
        </div>
    </div>
    <div v-if="Object.keys(new_video).length !== 0" class="p-4 flex flex-col gap-4">
        <UAlert v-if="!authStore.isLoggedIn && showAlert" color="yellow" variant="subtle" :title="$t('attention')"
            :description="$t('attention_content')"
            :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'yellow', variant: 'link', padded: false }" 
            @click="console.log(123123);"
            />
        <template v-if="need_add">
            <span>{{ new_video?.items[0].snippet.title }}</span>
            <span>{{ new_video?.items[0].snippet.channelTitle }}</span>
            <span>{{ new_video?.items[0].snippet.publishedAt }}</span>
            <span>{{ new_video?.items[0].statistics.viewCount }}</span>
            <span>{{ new_video?.items[0].contentDetails.duration }}</span>
            <!-- <span>{{ new_video?.items[0].player.embedHtml }}</span> -->
            <UButton @click="handleAdd">add</UButton>
        </template>
        <template v-else>
            <span>{{ new_video?.video_title }}</span>
            <span>{{ new_video?.owner_channel_title }}</span>
            <span>{{ new_video?.publish_time }}</span>
            <span>{{ new_video?.video_view_count }}</span>
            <span>{{ new_video?.video_duration }}</span>
            <!-- <span>{{ new_video?.items[0].player.embedHtml }}</span> -->
        </template>
    </div>
</template>
