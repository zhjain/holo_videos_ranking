<script setup lang="ts">
defineProps<{
    video: any;
    editing: boolean;
}>()

</script>

<template>
    <UCard :ui="{
        base: 'hover:cursor-pointer relative',
        background: 'hover:bg-gray-100',
        ring: '',
        shadow: 'shadow',
        body: { padding: '', base: 'flex' },
    }" class="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <img @click="$router.push(`/video/${video.id}`)" :src="video.coverImage" alt="Cover Image"
            class="w-32 h-32 object-cover rounded-lg mr-4">
        <div @click="$router.push(`/video/${video.id}`)" class="flex-1 mr-32">
            <div class="mb-2">
                <h3 class="font-semibold text-lg text-gray-900 dark:text-white leading-tight">{{ video.video_title
                    }}
                </h3>
            </div>
            <div class="mb-2">
                <span class="font-medium">Publish Channel: </span>{{ video.owner_channel_title }}
            </div>
            <div class="mb-2">
                <span class="font-medium">View Count: </span>{{ video.video_view_count }}
            </div>
            <div class="mb-2">
                <span class="font-medium">Publish Time: </span>{{ formatFullDateTime(video.publish_time) }}
            </div>
            <div class="mb-2">
                <span class="font-medium">Duration: </span>{{ formatDurationTime(video.parsed_duration) }}
            </div>
        </div>
    </UCard>
</template>
