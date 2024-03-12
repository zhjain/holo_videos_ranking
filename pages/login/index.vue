<script setup lang="ts">

const handleClick = async () => {
    const res = await $fetch('/api/user-logs/1', {
        method: 'GET',
    })

    console.log(res);
}

</script>

<template>
    <div class="w-content m-auto">
        <div class="login-card flex flex-col gap-10 pt-10 px-10 mx-auto mt-10 w-[400px] h-[400px] border rounded">
            
            <input type="text" class="border">
            <input type="text" class="border">
            <button @click="handleClick" class="border">确定</button>
        </div>
    </div>
</template>
