<script lang="ts">
import { onMount } from "svelte";
import TimeRangeSelector from "$lib/components/common/TimeRangeSelector.svelte";
import VideoTypeSelector from "$lib/components/common/VideoTypeSelector.svelte";
import VideoRankingCard from "$lib/components/rankings/VideoRankingCard.svelte";
import LoadMoreTrigger from "$lib/components/common/LoadMoreTrigger.svelte";
import { customFetch } from "$lib/api.js";

export let data;

const timeRanges = [
    { label: "全部", value: "all" },
    { label: "日榜", value: "day" },
    { label: "周榜", value: "week" },
    { label: "月榜", value: "month" },
    { label: "半年榜", value: "half_year" },
    { label: "年榜", value: "year" }
];
const videoTypes = [
    { label: "全部", value: "all" },
    { label: "原创", value: "origin" },
    { label: "翻唱", value: "cover" },
    { label: "现场", value: "live" }
];

let rankings = data.records;
let currentPage = 1;
let loading = false;
let hasMore = true;
let selectedTimeRange = timeRanges[5].value;
let selectedVideoType = videoTypes[0].value;

function changeTimeRange(value: string) {
    if (selectedTimeRange === value) return;
    currentPage = 1;
    selectedTimeRange = value;
    loadRankings();
}

function changeVideoType(value: string) {
    if (selectedVideoType === value) return;
    currentPage = 1;
    selectedVideoType = value;
    loadRankings();
}

async function loadRankings() {
    loading = true;
    if (currentPage === 1) rankings = [];
    try {
        const { data } = await customFetch<any>(
            `/api/rankings/videos?page=${currentPage}&limit=20&type=${selectedVideoType}&timeRange=${selectedTimeRange}`
        );
        rankings = [...rankings, ...data.records];
        hasMore = data.records.length > 0;
    } catch (error) {
        console.error("加载失败:", error);
    } finally {
        loading = false;
    }
}

onMount(() => {
    // 页面加载完成
});

function loadMore() {
    if (loading) return;
    currentPage++;
    loadRankings();
}
</script>

<div class="space-y-6">
    <TimeRangeSelector {timeRanges} selected={selectedTimeRange} onChange={changeTimeRange} />
    <!-- <VideoTypeSelector {videoTypes} selected={selectedVideoType} onChange={changeVideoType} /> -->
    <div class="min-h-screen space-y-4">
        {#each rankings as video, index}
            <VideoRankingCard {video} rank={index + 1} timeRange={selectedTimeRange} />
        {/each}
        <LoadMoreTrigger {loading} {hasMore} {loadMore} />
    </div>
</div>
