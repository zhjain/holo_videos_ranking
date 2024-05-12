<script setup lang="ts">

const columns = [{
    key: 'channel_nick',
    label: 'channel_nick'
}, {
    key: 'channel_created_time',
    label: 'channel_created_time',
    sortable: true
}, {
    key: 'channel_subscriber_count',
    label: 'channel_subscriber_count',
    sortable: true
}, {
    key: 'channel_name',
    label: 'channel_name',
    sortable: true
}, {
    key: 'role'
}]


const selectedColumns = ref(columns)
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))

// Selected Rows
const selectedRows = ref<any>([])

function select(row: any) {
    const index = selectedRows.value.findIndex((item:any) => item.id === row.id)
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

const resetFilters = () => {
    search.value = ''
    selectedStatus.value = []
}

// Pagination
const sort = ref({ column: '_id', direction: 'asc' as const })
const page = ref(1)
const pageCount = ref(10)


// Data
const { data: channels, pending } = await useAsyncData<any>('channels', () => ($fetch as any)(`/api/channels`, {
    query: {
        q: search.value,
        '_page': page.value,
        '_limit': pageCount.value,
        '_sort': sort.value.column,
        '_order': sort.value.direction
    }
}), {
    default: () => [],
    watch: [page, search, searchStatus, pageCount, sort]
})
const pageTotal = computed(()=> channels.value.data.total || 0 )
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

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
            <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                Channels
            </h2>
        </template>

        <!-- Filters -->
        <div class="flex items-center justify-between gap-3 px-4 py-3">
            <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />

            <USelectMenu v-model="selectedStatus" :options="todoStatus" multiple placeholder="Status" class="w-40" />
        </div>

        <!-- Header and Action buttons -->
        <div class="flex justify-between items-center w-full px-4 py-3">
            <div class="flex items-center gap-1.5">
                <span class="text-sm leading-5">Rows per page:</span>

                <USelect v-model="pageCount" :options="[3, 5, 10, 20, 30, 40]" class="me-2 w-20" size="xs" />
            </div>

            <div class="flex gap-1.5 items-center">
                <UDropdown v-if="selectedRows.length > 1" :items="actions" :ui="{ width: 'w-36' }">
                    <UButton icon="i-heroicons-chevron-down" trailing color="gray" size="xs">
                        Mark as
                    </UButton>
                </UDropdown>

                <USelectMenu v-model="selectedColumns" :options="columns" multiple>
                    <UButton icon="i-heroicons-view-columns" color="gray" size="xs">
                        Columns
                    </UButton>
                </USelectMenu>

                <UButton icon="i-heroicons-funnel" color="gray" size="xs"
                    :disabled="search === '' && selectedStatus.length === 0" @click="resetFilters">
                    Reset
                </UButton>
            </div>
        </div>

        <!-- Table -->
        <UTable v-model="selectedRows" v-model:sort="sort" :rows="channels.data.records" :columns="columnsTable" :loading="pending"
            sort-asc-icon="i-heroicons-arrow-up" sort-desc-icon="i-heroicons-arrow-down" sort-mode="manual"
            class="w-full" :ui="{ td: { base: 'max-w-[0] truncate' }, default: { checkbox: {  } } }"
            @select="select">
            <template #completed-data="{ row }">
                <UBadge size="xs" :label="row.completed ? 'Completed' : 'In Progress'"
                    :color="row.completed ? 'emerald' : 'orange'" variant="subtle" />
            </template>

            <template #channel_created_time-data="{row}">
                {{formatFullDateTime(row.channel_created_time)}}
            </template>
            <template #actions-data="{ row }">
                <UButton v-if="!row.completed" icon="i-heroicons-check" size="2xs" color="emerald" variant="outline"
                    :ui="{ rounded: 'rounded-full' }" square />

                <UButton v-else icon="i-heroicons-arrow-path" size="2xs" color="orange" variant="outline"
                    :ui="{ rounded: 'rounded-full' }" square />
            </template>
        </UTable>

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
</template>
