<script lang="ts">
import VideoCard from "$lib/components/videos/VideoCard.svelte";
import LoadMoreTrigger from "$lib/components/common/LoadMoreTrigger.svelte";
import { userStore } from "$lib/stores/userStore";
import { customFetch } from "$lib/api.js";
import { goto } from "$app/navigation";
import Pagination from "$lib/components/common/Pagination.svelte";
import Modal from "$lib/components/common/Modal.svelte";
import toast from "svelte-french-toast";
import { onMount } from "svelte";

export let data;

let showModal = false;
const canEditVideo = userStore.hasPermission("video:update");
const canAddVideo = userStore.hasPermission("video:create");
let videoId = "";
let videoInfo: any = {};

function videoInfoIsNull() {
  return Object.keys(videoInfo).length === 0;
}

async function handleAddVideo() {
  if (videoId.trim()) {
    try {
      const res = await customFetch(
        `/api/youtube/video/${videoId}`,
        { method: "GET" },
        true
      );
      if (res.code === 200) {
        videoInfo = res.data;
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("视频获取失败");
    }
  }
}

async function handleSaveVideo() {
  try {
    const res = await customFetch(
      `/api/videos`,
      {
        method: "POST",
        body: JSON.stringify(videoInfo)
      },
      true
    );
    if (res.code === 200) {
      toast.success("视频保存成功");
      showModal = false;
      videoId = "";
      videoInfo = {};
    } else {
      toast.error(res.message);
    }
  } catch (error) {
    toast.error("视频保存失败");
  }
}
</script>

{#if canAddVideo}
  <div class="mb-4 flex justify-end">
    <button
      class="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      on:click={() => (showModal = true)}>
      添加视频
    </button>
  </div>
{/if}

{#await data.videos}
  <div class="container mx-auto px-4 py-8">
    <div>加载中...</div>
  </div>
{:then videoData}
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col justify-center gap-4">
      {#each videoData.records as video}
        <VideoCard {video} {canEditVideo} />
      {/each}
    </div>
    {#if videoData.pagination}
      <Pagination
        current={videoData.pagination.current}
        total={videoData.pagination.total}
        size={videoData.pagination.size}
        basePath="/video" />
    {/if}
  </div>
{:catch error}
  <div class="container mx-auto px-4 py-8">
    <div class="text-red-500">加载失败: {error.message}</div>
  </div>
{/await}

<Modal bind:showModal>
  <div class="mb-4 flex items-center justify-between">
    <h2 class="text-xl font-bold">添加视频</h2>
    <button
      on:click={() => (showModal = false)}
      class="text-gray-500 hover:text-gray-700">
      ✕
    </button>
  </div>
  <div class="w-96 rounded-lg bg-white p-6">
    <div class="space-y-4">
      <div>
        <label class="mb-2 block">
          视频链接
          <input
            type="text"
            bind:value={videoId}
            class="w-full rounded-md border p-2"
            placeholder="请输入视频id或链接" />
        </label>
      </div>
      {#if videoInfoIsNull()}
        <div class="flex justify-end space-x-2">
          <button
            class="rounded-md bg-gray-200 px-4 py-2 text-gray-700"
            on:click={() => (showModal = false)}>
            取消
          </button>
          <button
            class="rounded-md bg-green-500 px-4 py-2 text-white"
            on:click={handleAddVideo}>
            确认
          </button>
        </div>
      {:else}
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <img
              src={videoInfo.video_pic}
              alt={videoInfo.video_title}
              class="h-16 w-24 rounded-md object-cover" />
            <h3 class="font-semibold">{videoInfo.video_title}</h3>
          </div>
          <div class="flex justify-end space-x-2">
            <button
              class="rounded-md bg-gray-200 px-4 py-2 text-gray-700"
              on:click={() => (showModal = false)}>
              取消
            </button>
            <button
              class="rounded-md bg-green-500 px-4 py-2 text-white"
              on:click={handleSaveVideo}>
              保存到数据库
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</Modal>
