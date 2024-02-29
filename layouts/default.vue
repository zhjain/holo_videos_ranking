<script setup lang="ts">



</script>

<template>
    <div>
        <UHeader title="STARTEND">
            <template #logo>
                
                    <h1 class="my-text text-3xl">STARTEND</h1>
            </template>
            <template #right>
                <button class="my-text">asdasd</button>
            </template>
        </UHeader>
        <slot></slot>
    </div>
</template>

<style scoped>


.my-text {
    font-family: "ZCOOL KuaiLe", sans-serif;
}
</style>
