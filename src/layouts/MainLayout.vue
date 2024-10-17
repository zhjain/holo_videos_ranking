<template>
    <div class="main-layout">
        <header>
            <div class="navbar bg-base-100 flex justify-center">
              <div class="flex-none">
                <router-link to="/" class="btn btn-ghost normal-case text-xl">我的应用</router-link>
              </div>
              <div class="flex-auto justify-center">
                <ul class="menu menu-horizontal px-1 space-x-4">
                  <li><router-link :to="{ name: 'Home' }" class="btn btn-ghost rounded-lg text-lg font-semibold transition-colors duration-300 hover:bg-primary hover:text-white" :class="{ 'bg-primary text-white': isRouteActive('Home') }">首页</router-link></li>
                  <li><router-link :to="{ name: 'Channel' }" class="btn btn-ghost rounded-lg text-lg font-semibold transition-colors duration-300 hover:bg-primary hover:text-white" :class="{ 'bg-primary text-white': isRouteActive('Channel') }">频道</router-link></li>
                  <li><router-link :to="{ name: 'Video' }" class="btn btn-ghost rounded-lg text-lg font-semibold transition-colors duration-300 hover:bg-primary hover:text-white" :class="{ 'bg-primary text-white': isRouteActive('Video') }">视频</router-link></li>
                </ul>
              </div>
              <div class="flex-none">
                <!-- <div class="dropdown dropdown-end">
                  <label tabindex="0" class="avatar">
                    <div class="w-8 rounded-full border">
                      <img src="@/assets/png/0.png" alt="" />
                    </div>
                  </label>
                </div> -->
                <a href="https://github.com/zhjain/holo_videos_ranking" target="_blank" class="avatar">
                  <Icon icon="mdi:github" class="text-3xl" />
                </a>
              </div>
            </div>
        </header>
        <main>
            <router-view></router-view>
        </main>
        <footer>
            <!-- 在这里添加您的底部内容 -->
        </footer>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()

const isRouteActive = (routeName: string) => {
    return route.name === routeName || route.path.startsWith('/' + routeName.toLowerCase())
}
</script>

<style scoped>
.active {
  background-color: #ddd;
  color: #333;
}
</style>
