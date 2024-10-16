<template>
  <div class="main-layout">
    <header>
      <!-- 在这里添加您的头部内容 -->
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <!-- 在这里添加您的底部内容 -->
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout'
})
</script>

<style scoped>
/* 在这里添加您的样式 */
</style>
