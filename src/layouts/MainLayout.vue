<template>
    <div class="main-layout">
        <header>
            <div class="navbar bg-base-100">
              <div class="flex-1">
                <a class="btn btn-ghost normal-case text-xl">我的应用</a>
              </div>
              <div class="flex-none">
                <ul class="menu menu-horizontal px-1">
                  <li><a>首页</a></li>
                  <li>
                    <details>
                      <summary>
                        更多
                      </summary>
                      <ul class="p-2 bg-base-100">
                        <li><a>关于我们</a></li>
                        <li><a>联系我们</a></li>
                      </ul>
                    </details>
                  </li>
                </ul>
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

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MainLayout'
})
</script>

<style scoped>
/* 在这里添加您的样式 */
</style>
