<script setup lang="ts">
defineProps<{
    video: any;
    editing: boolean;
}>()

const userStore = useUserStore()
const items = (id: string) =>
    [
        [{
            label: 'Profile',
            avatar: {
                src: 'https://avatars.githubusercontent.com/u/739984?v=4'
            }
        }], [{
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            shortcuts: ['E'],
            click: () => {
                console.log('Edit')
            }
        }, {
            label: 'Duplicate',
            icon: 'i-heroicons-document-duplicate-20-solid',
            shortcuts: ['D'],
            disabled: true
        }], [{
            label: 'Archive',
            icon: 'i-heroicons-archive-box-20-solid'
        }, {
            label: 'Move',
            icon: 'i-heroicons-arrow-right-circle-20-solid'
        }], [{
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            shortcuts: ['⌘', 'D'],
            click: () => {
                handleTypeChange(id, 'deleted')
            }
        }]
    ]


const types = ['cover', 'origin', 'live']
const handleTypeChange = async (id: string, type: string) => {
    const res = await $fetch(`/api/videos/${id}`, {
        method: 'PUT',
        body: {
            video_type: type
        }
    })
}

</script>

<template>
    <UCard :ui="{
        base: 'hover:cursor-pointer relative',
        background: 'hover:bg-gray-100',
        ring: '',
        shadow: 'shadow',
        body: { padding: '', base: 'flex' },
    }" class="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <img @click="$router.push(`/video/${video.id}`)" :src="`https://i.ytimg.com/vi/${video.video_id}/mqdefault.jpg`"
            alt="Cover Image" class="h-48 object-cover rounded-lg mr-4">
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
        <div v-if="userStore.userinfo.isAdmin && editing" class="flex absolute right-2 top-2">
            <USelectMenu @change="(value) => handleTypeChange(video.id, value)" v-slot="{ open }"
                v-model="video.video_type" :options="types">
                <UButton color="gray" class="flex-1 w-24 justify-between">
                    {{ video.video_type || 'unset' }}
                    <UIcon name="i-heroicons-chevron-right-20-solid"
                        class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500"
                        :class="[open && 'transform rotate-90']" />
                </UButton>
            </USelectMenu>
            <UDropdown :items="items(video.id)" :popper="{ placement: 'bottom-start' }">
                <UButton :ui="{
                    icon: {
                        base: 'text-gray-500 hover:text-gray-700'
                    }
                }" icon="i-heroicons-ellipsis-vertical-20-solid" variant="link" />
            </UDropdown>
        </div>
        <div v-else class="flex absolute right-2 top-2">
            <UButton color="gray" variant="ghost" class="flex-1 hover:bg-gray-100 justify-between">{{
                video.video_type || 'unset' }}
            </UButton>
        </div>
    </UCard>
</template>
