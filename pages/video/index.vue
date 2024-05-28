<script setup lang="ts">

const userStore = useUserStore()

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
const { data: videos, pending } = await useAsyncData<any>('videos', () => useAuthFetch<any>(`/api/videos`, {
    query: {
        q: search.value,
        '_page': page.value,
        '_limit': pageCount.value,
        '_sort': sort.value.column,
        '_order': sort.value.direction,
        '_type': searchVideoType.value,
        '_admin': !!userStore?.userinfo?.isAdmin
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


const typess = [{
    label: 'Cover',
    value: 'cover'
}, {
    label: 'Origin',
    value: 'origin'
}, {
    label: 'Live',
    value: 'live'
}, {
    label: 'Waiting',
    value: 'waiting',
    needAdmin: true
}, {
    label: 'Rejected',
    value: 'rejected',
    needAdmin: true
}, {
    label: 'Unset',
    value: 'unset'
}]


const showAddDialog = ref(false)


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
        <div class="flex flex-col justify-between gap-3 px-4 py-3">
            <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />

            <div class="flex gap-2">
                <UButton class="hover:no-underline" :color="selectedAll ? 'primary' : 'gray'" variant="link"
                    @click="() => { selectedAll = true; selectedTypes = [] }">
                    All
                </UButton>
                <template v-for="btn in typess" :key="btn.value">
                    <UButton v-if="!btn.needAdmin || userStore.userinfo?.isAdmin" class="hover:no-underline"
                        :color="selectedTypes.includes(btn.value) ? 'primary' : 'gray'" variant="link"
                        @click="() => handleTypeToggle(btn.value)">
                        {{ btn.label }}
                    </UButton>
                </template>
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
            <VideoCard v-for="video in videos.data.records" :key="video.id" :video="video" :editing="editing" />
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

        <AddVideoDialog />
    </UModal>
</template>
