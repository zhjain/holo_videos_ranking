<script setup lang="ts">

const columns = [{
    key: 'video_title',
    label: 'video_title'
}, {
    key: 'video_id',
    label: 'video_id'
}, {
    key: 'publish_time',
    label: 'publish_time',
    sortable: true
}, {
    key: 'video_view_count',
    label: 'video_view_count',
    sortable: true
}, {
    key: 'parsed_duration',
    label: 'parsed_duration',
    sortable: true
}, {
    key: 'owner_channel_title',
    label: 'owner_channel_title',
    sortable: true
}, {
    key: 'role'
}]


const selectedColumns = ref(columns)
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))

// Selected Rows
const selectedRows = ref<any>([])

function select(row: any) {
    const index = selectedRows.value.findIndex((item: any) => item.id === row.id)
    if (index === -1) {
        selectedRows.value.push(row)
    } else {
        selectedRows.value.splice(index, 1)
    }
}
// Actions
const actions = [
    [{
        key: 'completed',
        label: 'Completed',
        icon: 'i-heroicons-check'
    }], [{
        key: 'uncompleted',
        label: 'In Progress',
        icon: 'i-heroicons-arrow-path'
    }]
]

// Filters
const todoStatus = [{
    key: 'uncompleted',
    label: 'In Progress',
    value: false
}, {
    key: 'completed',
    label: 'Completed',
    value: true
}]


const search = ref('')
const selectedStatus = ref<any>([])
const searchStatus = computed(() => {
    if (selectedStatus.value?.length === 0) {
        return ''
    }

    if (selectedStatus?.value?.length > 1) {
        return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`
    }

    return `?completed=${selectedStatus.value[0].value}`
})

const selectedAll = ref(true)
const selectedTypes = ref<string[]>([])
const searchVideoType = computed(() => {
    if (selectedAll.value) {
        return ''
    }
    if (selectedTypes.value.length === 0) {
        return ''
    }
    return selectedTypes.value.join(',')
})

const resetFilters = () => {
    search.value = ''
    selectedStatus.value = []
    selectedAll.value = true
    selectedTypes.value = []
}

// Pagination
const sort = ref({ column: '_id', direction: 'asc' as const })
const page = ref(1)
const pageCount = ref(10)

// Data
const { data: videos, pending } = await useAsyncData<any>('videos', () => ($fetch as any)(`/api/videos`, {
    query: {
        q: search.value,
        '_page': page.value,
        '_limit': pageCount.value,
        '_sort': sort.value.column,
        '_order': sort.value.direction,
        '_type': searchVideoType.value
    }
}), {
    default: () => [],
    watch: [page, search, searchStatus, searchVideoType, pageCount, sort]
})

let lastClickTime = 0;

const handleTypeToggle = (type: string) => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;

    if (timeDiff < 300) { // 如果两次点击间隔小于300毫秒，则认为是双击
        // 双击事件处理：只选中当前类型
        selectedTypes.value = [type];
    } else {
        // 单击事件处理：切换选中状态
        if (selectedTypes.value.includes(type)) {
            selectedTypes.value = selectedTypes.value.filter(t => t !== type)
        } else {
            selectedTypes.value.push(type)
        }
    }
    selectedAll.value = selectedTypes.value.length === 0;
    lastClickTime = currentTime;
}

const pageTotal = computed(() => videos.value.data.total || 0)
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

const editing = ref(false)

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

const types = ['cover', 'origin', 'live']

const handleTypeChange = async (id: string, type: string) => {
    const res = await $fetch(`/api/videos/${id}`, {
        method: 'PUT',
        body: {
            video_type: type
        }
    })
}
const showAddDialog = ref(false)
const video_id = ref('')
const new_video = ref<any>({})

const checkVideo = async () => {
    const res = await ($fetch as any)(`/api/videos/utb/${video_id.value}`, {
        method: 'GET',
    })
    new_video.value = res.data
}

const handleAdd = async () => {
    const res = await $fetch('/api/videos', {
        method: 'POST',
        body: {
            video_id: video_id.value,
            video_title: new_video.value.items[0].snippet.title,
            video_type: 'waiting',
            owner_channel_id: new_video.value.items[0].snippet.channelId,
            owner_channel_title: new_video.value.items[0].snippet.channelTitle,
            publish_time: new_video.value.items[0].snippet.publishedAt,
            video_view_count: new_video.value.items[0].statistics.viewCount,
            video_like_count: new_video.value.items[0].statistics.likeCount,
            // video_duration: new_video.value.items[0].statistics.viewCount,
            // video_player: new_video.value.items[0].statistics.viewCount,
        }
    })
    showAddDialog.value = false
    videos.value.data.push(res)
}

</script>

<template>
    <UCard class="w-full my-4" :ui="{
        base: '',
        ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'px-4 py-5' },
        body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
        footer: { padding: 'p-4' }
    }">
        <template #header>
            <div class="flex items-center justify-between gap-3 ">
                <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                    Videos
                </h2>
                <div>
                    <UToggle v-if="userStore.userinfo?.isAdmin" v-model="editing" on-icon="i-heroicons-pencil"
                        off-icon="i-heroicons-pencil" />
                </div>
            </div>
        </template>

        <!-- Filters -->
        <div class="flex flex-col  justify-between gap-3 px-4 py-3">
            <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />

            <USelectMenu v-model="selectedStatus" :options="todoStatus" multiple placeholder="Status" class="w-40" />
            <div class="flex gap-2">
                <UButton class="hover:no-underline" :color="selectedAll ? 'primary' : 'gray'" variant="link"
                    @click="() => { selectedAll = true; selectedTypes = [] }">
                    All
                </UButton>
                <UButton class="hover:no-underline" :color="selectedTypes.includes('cover') ? 'primary' : 'gray'"
                    variant="link" @click="() => handleTypeToggle('cover')">
                    Cover
                </UButton>
                <UButton class="hover:no-underline" :color="selectedTypes.includes('origin') ? 'primary' : 'gray'"
                    variant="link" @click="() => handleTypeToggle('origin')">
                    Origin
                </UButton>
                <UButton class="hover:no-underline" :color="selectedTypes.includes('live') ? 'primary' : 'gray'"
                    variant="link" @click="() => handleTypeToggle('live')">
                    Live
                </UButton>
                <UButton :color="selectedTypes.includes('unset') ? 'primary' : 'gray'" variant="link"
                    @click="() => handleTypeToggle('unset')" class="no-underline">
                    unset
                </UButton>
            </div>
        </div>

        <!-- Header and Action buttons -->
        <div class="flex justify-between items-center w-full px-4 py-3">
            <div class="flex items-center gap-1.5">
                <span class="text-sm leading-5">Rows per page:</span>

                <USelect v-model="pageCount" :options="[3, 5, 10, 20, 30, 40]" class="me-2 w-20" size="xs" />
            </div>

            <div class="flex gap-1.5 items-center">

                <UButton icon="i-heroicons-funnel" color="gray" size="xs" @click="() => { showAddDialog = true }">
                    Add
                </UButton>

                <UButton icon="i-heroicons-funnel" color="gray" size="xs"
                    :disabled="search === '' && selectedStatus.length === 0" @click="resetFilters">
                    Reset
                </UButton>
            </div>
        </div>

        <!-- Cards -->
        <div class="flex flex-col gap-4 p-4">
            <UCard v-for="row in videos.data.records" :ui="{
                base: 'hover:cursor-pointer relative',
                background: 'hover:bg-gray-100',
                ring: '',
                shadow: 'shadow',
                body: { padding: '', base: 'flex' },
            }" :key="row.id" class="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <img :src="row.coverImage" alt="Cover Image" class="w-32 h-32 object-cover rounded-lg mr-4">
                <div class="flex-1 mr-32">
                    <div class="mb-2">
                        <h3 class="font-semibold text-lg text-gray-900 dark:text-white leading-tight">{{ row.video_title
                            }}
                        </h3>
                    </div>
                    <div class="mb-2">
                        <span class="font-medium">Publish Channel: </span>{{ row.owner_channel_title }}
                    </div>
                    <div class="mb-2">
                        <span class="font-medium">View Count: </span>{{ row.video_view_count }}
                    </div>
                    <div class="mb-2">
                        <span class="font-medium">Publish Time: </span>{{ formatFullDateTime(row.publish_time) }}
                    </div>
                    <div class="mb-2">
                        <span class="font-medium">Duration: </span>{{ formatDurationTime(row.parsed_duration) }}
                    </div>
                </div>
                <div v-if="userStore.userinfo.isAdmin && editing" class="flex absolute right-2 top-2">
                    <USelectMenu @change="(value) => handleTypeChange(row.id, value)" v-slot="{ open }"
                        v-model="row.video_type" :options="types">
                        <UButton color="gray" class="flex-1 w-24 justify-between">
                            {{ row.video_type || 'unset' }}
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
                        row.video_type || 'unset' }}
                    </UButton>
                </div>
            </UCard>
        </div>


        <!-- Number of rows & Pagination -->
        <template #footer>
            <div class="flex flex-wrap justify-between items-center">
                <div>
                    <span class="text-sm leading-5">
                        Showing
                        <span class="font-medium">{{ pageFrom }}</span>
                        to
                        <span class="font-medium">{{ pageTo }}</span>
                        of
                        <span class="font-medium">{{ pageTotal }}</span>
                        results
                    </span>
                </div>

                <UPagination v-model="page" :page-count="pageCount" :total="pageTotal" :ui="{
                    wrapper: 'flex items-center gap-1',
                    rounded: '!rounded-full min-w-[32px] justify-center',
                    default: {
                        activeButton: {
                            variant: 'outline'
                        }
                    }
                }" />
            </div>
        </template>
    </UCard>
    <UModal v-model="showAddDialog">
        <div class="p-4 flex flex-col gap-2">
            <UInput v-model="video_id" />
            <div class="flex gap-4">
                <UButton class="flex-1" @click="checkVideo">query</UButton>
                <UButton class="flex-1" @click="() => { video_id = ''; new_video = {} }">clear</UButton>
            </div>
        </div>
        <div v-if="Object.keys(new_video).length !== 0" class="p-4 flex flex-col gap-2">
            <span>{{ new_video?.items[0].snippet.title }}</span>
            <span>{{ new_video?.items[0].snippet.channelTitle }}</span>
            <span>{{ new_video?.items[0].snippet.publishedAt }}</span>
            <span>{{ new_video?.items[0].statistics.viewCount }}</span>
            <UButton @click="handleAdd">add</UButton>
        </div>
    </UModal>
</template>
