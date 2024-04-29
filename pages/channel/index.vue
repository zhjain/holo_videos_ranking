<script setup lang="ts">
const { data }: any = await useFetch('/api/channels', {
    method: 'GET'
})
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
</script>

<template>
        <h1>Hello World</h1>
        <UTable :columns="columns" :rows="data.data" />
</template>
