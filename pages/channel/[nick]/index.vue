<script setup lang="ts">
const route = useRoute()
const links = [{
    label: 'Home',
    icon: 'i-heroicons-home',
    to: `/channel/${route.params.nick}/featured`
}, {
    label: 'Videos',
    icon: 'i-heroicons-play-circle',
    to: `/channel/${route.params.nick}/videos`
},
    // 频道数据图表


{
    label: 'Chart',
    icon: 'i-heroicons-chart-pie',
    to: `/channel/${route.params.nick}/charts`
}]
</script>

<template>
    <p>{{ $route.params.nick }}</p>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>
