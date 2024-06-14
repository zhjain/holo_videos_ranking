<script setup lang="ts">

const channel_id = ref('')
const new_channel = ref<any>({})

const need_add = ref(false)

const find_nothing = ref(false)

const checkChannel = async () => {
    find_nothing.value = false
    const res = await ($fetch as any)(`/api/channels/utb/${channel_id.value}`, {
        method: 'GET',
    })
    find_nothing.value = !res.data.items && !res.data.id;
    need_add.value = (res.code === 200)
    new_channel.value = res.data
}

const handleAdd = async () => {
    const res = await useAuthFetch('/api/channels', {
        method: 'POST',
        body: {
            channel_id: channel_id.value,
            channel_title: new_channel.value.items[0].snippet.title,
            channel_type: 'waiting',
            owner_channel_id: new_channel.value.items[0].snippet.channelId,
            owner_channel_title: new_channel.value.items[0].snippet.channelTitle,
            publish_time: new_channel.value.items[0].snippet.publishedAt,
            channel_view_count: Number.parseInt(new_channel.value.items[0].statistics.viewCount),
            channel_like_count: Number.parseInt(new_channel.value.items[0].statistics.likeCount) || 0,
            channel_duration: new_channel.value.items[0].contentDetails.duration,
            channel_player: new_channel.value.items[0].player.embedHtml,
        }
    })
    // channels.value.data.push(res)
}
const authStore = useAuthStore()
const showAlert = ref(true)
</script>

<template>
    <div class="p-4 flex flex-col gap-2">
        <UInput v-model="channel_id" />
        <div class="flex gap-4">
            <UButton class="flex-1" @click="checkChannel">query</UButton>
            <UButton class="flex-1" @click="() => { channel_id = ''; new_channel = {} }">clear</UButton>
        </div>
    </div>
    <div v-if="Object.keys(new_channel).length !== 0" class="p-4 flex flex-col gap-4">
        <UAlert v-if="!authStore.isLoggedIn && !find_nothing && need_add && showAlert" color="yellow" variant="subtle"
            :title="$t('attention')" :description="$t('attention_content')"
            :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'yellow', variant: 'link', padded: false }"
            @close="showAlert = false" />
        <template v-if="find_nothing">
            <UAlert icon="i-heroicons-command-line" color="red" variant="subtle" :title="$t('error')"
                :description="$t('utb_channel_not_found')" />
        </template>
        <template v-else-if="need_add">
            <span>{{ new_channel?.items[0].snippet.title }}</span>
            <span>{{ new_channel?.items[0].snippet.channelTitle }}</span>
            <span>{{ new_channel?.items[0].snippet.publishedAt }}</span>
            <span>{{ new_channel?.items[0].statistics.viewCount }}</span>
            <span>{{ new_channel?.items[0].contentDetails.duration }}</span>
            <!-- <span>{{ new_channel?.items[0].player.embedHtml }}</span> -->
            <UButton @click="handleAdd">add</UButton>
        </template>
        <template v-else>
            <span>{{ new_channel?.channel_title }}</span>
            <span>{{ new_channel?.owner_channel_title }}</span>
            <span>{{ new_channel?.publish_time }}</span>
            <span>{{ new_channel?.channel_view_count }}</span>
            <span>{{ new_channel?.channel_duration }}</span>
            <UButton>details</UButton>
        </template>
    </div>
</template>
