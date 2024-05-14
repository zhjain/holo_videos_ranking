<script setup lang="ts">



</script>

<template>
    <div>
        <div class="h-12 bg-slate-100 ">
            <div class="w-header m-auto h-full flex justify-between">
                <h2
                    class=" text-center font-mine text-4xl font-bold bg-gradient-to-br from-blue-500 to-purple-500 text-transparent bg-clip-text">
                    title
                </h2>
                <div class="flex gap-4">
                    <ULink to="/" class="flex items-center" active-class="text-primary"
                        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                        home
                    </ULink>
                    <ULink to="/channel" class="flex items-center" active-class="text-primary"
                        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                        channel
                    </ULink>
                    <ULink to="/video" class="flex items-center" active-class="text-primary"
                        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                        video
                    </ULink>
                    <ULink to="/player" class="flex items-center" active-class="text-primary"
                        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                        player
                    </ULink>
                </div>
                <div
                    class="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    {{ useUserStore().userinfo?.user?.username }}
                </div>
            </div>
        </div>
        <div class="w-content m-auto">
            <slot></slot>
        </div>
    </div>
</template>
