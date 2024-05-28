<script setup lang="ts">
const rankings = ref<any[]>([])
const searchType = ref('');  // 搜索类型
const hasMore = ref(true);  // 是否还有更多数据
const isLoading = ref(false);
const page = ref(1);  // 当前页面
const { data: _, pending, refresh } = useAsyncData(() => fetchRankings(page.value), {
        default: () => [],
        watch: [page]
});

async function fetchRankings(page: number) {
        isLoading.value = true;
        try {
                const response = await useAuthFetch(`/api/rankings/videos`, {
                        query: {
                                '_page': page,
                                '_limit': 20,
                                '_type': searchType.value,
                                '_condition': ''
                        }
                });
                if (response.data.length) {
                        rankings.value = [...rankings.value, ...response.data];  // 累加新加载的视频
                } else {
                        hasMore.value = false;  // 没有更多数据
                }
        } catch (error) {
                console.error("Failed to fetch rankings:", error);
        }
        isLoading.value = false;
}


</script>

<template>
        <div>
                <template v-for="item in rankings" :key="item.id">
                        <VideoRankingCard :video="item" />
                </template>
        </div>
</template> 
