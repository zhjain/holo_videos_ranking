<script setup lang="ts">

const channel_handle = ref('')
const new_channel = ref<any>({})

const need_add = ref(false)

const find_nothing = ref(false)

const checkChannel = async () => {
    find_nothing.value = false
    const res = await ($fetch as any)(`/api/channels/utb/${channel_handle.value}`, {
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
            channel_id: new_channel.value.items[0].id,
            channel_custom_url: new_channel.value.items[0].snippet.customUrl,
            channel_name: new_channel.value.items[0].snippet.title,
            channel_type: 'waiting',
            channel_description: new_channel.value.items[0].snippet.description,
            channel_avatar: new_channel.value.items[0].snippet.thumbnails.medium.url,
            channel_created_time: new_channel.value.items[0].snippet.publishedAt,
            channel_subscriber_count: Number.parseInt(new_channel.value.items[0].statistics.subscriberCount),
            channel_view_count: Number.parseInt(new_channel.value.items[0].statistics.viewCount),
            video_list: new_channel.value.items[0].contentDetails.relatedPlaylists.uploads,
        }
    })
}
</script>

<template>
    <div class="p-4 flex flex-col gap-2">
        <UInput v-model="channel_handle" />
        <div class="flex gap-4">
            <UButton class="flex-1" @click="checkChannel">query</UButton>
            <UButton class="flex-1" @click="() => { channel_handle = ''; new_channel = {} }">clear</UButton>
        </div>
    </div>
    <div v-if="Object.keys(new_channel).length !== 0" class="p-4 flex flex-col gap-4">
        <template v-if="find_nothing">
            <UAlert icon="i-heroicons-command-line" color="red" variant="subtle" :title="$t('error')"
                :description="$t('utb_channel_not_found')" />
        </template>
        <template v-else-if="need_add">
            <p class="flex gap-4">
                <UAvatar size="2xl" :src="new_channel?.items[0].snippet.thumbnails.medium.url" />
            <div class="flex flex-col">
                <span class="font-bold text-xl"> {{ new_channel?.items[0].snippet.title }}</span>
                <span class="text-sm">{{ new_channel?.items[0].statistics.subscriberCount }}</span>
                <span class="text-sm">{{ new_channel?.items[0].snippet.publishedAt }}</span>
            </div>
            </p>
            <span>{{ new_channel?.items[0].snippet.description }}</span>
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
