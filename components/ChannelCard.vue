<script setup lang="ts">
defineProps<{
    channel: any;
}>()

const userStore = useUserStore()
const items = [
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
        shortcuts: ['⌘', 'D']
    }]
]


// const types = ['cover', 'origin', 'live']
// const handleTypeChange = async (id: string, type: string) => {
//     const res = await $fetch(`/api/channel/${id}`, {
//         method: 'PUT',
//         body: {
//             channel_type: type
//         }
//     })
// }
</script>

<template>
    <UCard :ui="{
        base: 'hover:cursor-pointer relative',
        background: 'hover:bg-gray-100',
        ring: '',
        shadow: 'shadow',
        body: { padding: '', base: 'flex' },
    }" class="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <UAvatar :src="channel.channel_avatar" />
        <div @click="$router.push(`/channel/${channel.channel_custom_url}`)" class="flex-1 mr-32">
            <div class="mb-2">
                <h3 class="font-semibold text-lg text-gray-900 dark:text-white leading-tight">{{ channel.channel_name
                    }}
                </h3>
            </div>
            <div class="mb-2">
                <span class="font-medium">Subscriber Count: </span>{{ channel.channel_subscriber_count }}
            </div>
            <div class="mb-2">
                <span class="font-medium">Created Time: </span>{{ formatFullDateTime(channel.channel_created_time) }}
            </div>

        </div>
        <!-- <div v-if="userStore.userinfo.isAdmin && editing" class="flex absolute right-2 top-2">
            <USelectMenu @change="(value) => handleTypeChange(channel.id, value)" v-slot="{ open }"
                v-model="channel.channel_type" :options="types">
                <UButton color="gray" class="flex-1 w-24 justify-between">
                    {{ channel.channel_type || 'unset' }}
                    <UIcon name="i-heroicons-chevron-right-20-solid"
                        class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500"
                        :class="[open && 'transform rotate-90']" />
                </UButton>
            </USelectMenu>
            <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                <UButton :ui="{
                    icon: {
                        base: 'text-gray-500 hover:text-gray-700'
                    }
                }" icon="i-heroicons-ellipsis-vertical-20-solid" variant="link" />
            </UDropdown>
        </div>
        <div v-else class="flex absolute right-2 top-2">
            <UButton color="gray" variant="ghost" class="flex-1 hover:bg-gray-100 justify-between">{{
                channel.channel_type || 'unset' }}
            </UButton>
        </div> -->
    </UCard>
</template>
