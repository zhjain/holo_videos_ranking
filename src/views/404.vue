<template>
  <div class="not-found">
    <h1>404</h1>
    <p>抱歉,您访问的页面不存在。</p>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound'
})
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
}
</style>
