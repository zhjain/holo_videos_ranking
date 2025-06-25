<script lang="ts">
import { goto } from "$app/navigation";
import ChannelCard from "$lib/components/channels/ChannelCard.svelte";
import Pagination from "$lib/components/common/Pagination.svelte";
import { userStore } from "$lib/stores/userStore";

export let data;
let search = "";

function handleSearchInput(e: Event) {
  search = (e.target as HTMLInputElement).value;
  goto(`/channel?q=${search}`);
}
</script>

<div class="container mx-auto space-y-6 px-4 py-8">
  <div class="mb-4 flex items-center justify-between">
    <div class="flex space-x-2">
      <!-- <input
        type="text"
        placeholder="搜索频道"
        class="input input-bordered input-sm w-full max-w-xs"
        value={search}
        on:input={handleSearchInput} /> -->
      {#if $userStore.isAdmin}
        <button class="btn btn-sm btn-primary">添加频道</button>
      {/if}
    </div>
  </div>
  {#await data.channels}
    <div>加载中...</div>
  {:then channelData}
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {#each channelData.records as channel (channel.id)}
        <ChannelCard {channel} />
      {/each}
    </div>
    <Pagination
      current={channelData.pagination.current}
      total={channelData.pagination.total}
      size={channelData.pagination.size}
      basePath="/channel" />
  {:catch error}
    <div class="text-red-500">加载失败: {error.message}</div>
  {/await}
</div>
