<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">视频列表</h1>
    <div v-if="videoStore.loading" class="flex justify-center items-center h-64">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    <div v-else-if="videoStore.error" class="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{{ videoStore.error }}</span>
    </div>
    <div v-else-if="videoStore.videos.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="video in videoStore.videos" :key="video.id" class="card bg-base-100 shadow-xl">
        <figure><img :src="video.video_pic" :alt="video.video_title" class="w-full h-48 object-cover" /></figure>
        <div class="card-body">
          <h2 class="card-title">{{ video.video_title }}</h2>
          <p>频道: {{ video.owner_channel_title }}</p>
          <div class="flex justify-between text-sm">
            <span>观看: {{ video.video_view_count }}</span>
            <span>点赞: {{ video.video_like_count }}</span>
          </div>
          <p>时长: {{ video.video_duration }}</p>
          <p>发布: {{ new Date(video.publish_time).toLocaleDateString() }}</p>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-info">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <span>暂无视频</span>
    </div>
    
    <div class="join mt-4 flex justify-center" v-if="videoStore.videos.length">
      <button 
        class="join-item btn"
        :disabled="videoStore.pagination.current === 1" 
        @click="videoStore.setPage(videoStore.pagination.current - 1)"
      >
        «
      </button>
      <button class="join-item btn">第 {{ videoStore.pagination.current }} 页</button>
      <button 
        class="join-item btn"
        :disabled="videoStore.pagination.current === Math.ceil(videoStore.pagination.total / videoStore.pagination.limit)" 
        @click="videoStore.setPage(videoStore.pagination.current + 1)"
      >
        »
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useVideoStore } from '@/store/videoStore'

export default defineComponent({
  name: 'VideoIndex',
  setup() {
    const videoStore = useVideoStore()

    onMounted(() => {
      videoStore.fetchVideos()
    })

    return {
      videoStore
    }
  }
})
</script>

<style scoped>
.video-list {
  padding: 20px;
}
.video-item {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}
.video-thumbnail {
  width: 200px;
  height: auto;
  margin-right: 20px;
}
.video-info {
  flex: 1;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination button {
  margin: 0 10px;
  padding: 5px 10px;
}
</style>
