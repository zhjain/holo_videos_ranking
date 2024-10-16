<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">频道列表</h1>
    <div v-if="channelStore.loading" class="flex justify-center items-center h-64">
      <div class="loading loading-spinner loading-lg"></div>
    </div>
    <div v-else-if="channelStore.error" class="alert alert-error shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{{ channelStore.error }}</span>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="channel in channelStore.channels" :key="channel.id" class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <figure class="px-10 pt-10">
          <img :src="channel.channel_avatar" :alt="channel.channel_name" class="rounded-xl w-32 h-32 object-cover" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ channel.channel_name }}</h2>
          <p class="text-sm text-gray-500">{{ channel.channel_nick }}</p>
          <p class="text-sm">订阅数: {{ formatNumber(channel.channel_subscriber_count) }}</p>
          <p class="text-sm">观看次数: {{ formatNumber(channel.channel_view_count) }}</p>
          <div class="card-actions">
            <button class="btn btn-primary" @click="goToChannelDetail(channel.channel_nick)">查看详情</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 flex justify-center">
      <div class="btn-group">
        <button class="btn" :disabled="channelStore.current === 1" @click="changePage(channelStore.current - 1)">«</button>
        <button class="btn">Page {{ channelStore.current }}</button>
        <button class="btn" :disabled="channelStore.current * channelStore.size >= channelStore.total" @click="changePage(channelStore.current + 1)">»</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useChannelStore } from '@/store/channelStore'

const router = useRouter()
const channelStore = useChannelStore()

onMounted(() => {
  channelStore.fetchChannels()
})

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US')
}

const goToChannelDetail = (nick: string) => {
  router.push({ name: 'ChannelHome', params: { nick } })
}

const changePage = (page: number) => {
  channelStore.fetchChannels(page)
}
</script>
