<script setup lang="ts">
    let props = defineProps(['isUnused']);
</script>
<template>
    <div class="max-[500px]:[&>div]:w-5/6 mt-2 bg-stone-700/90 rounded-md" v-if="props.isUnused">
        <div class="flex flex-col gap-3 p-2 ">
            <div>
                <h2 class="text-red-500 font-bold text-xl">重要公告</h2>
            </div>
            <div class="flex flex-col">
                <span class="text-white">該頁面資料自8/1起不再更新，相關新資料已搬至新網站</span>
                <span class="text-white">新網站:
                    <a class="text-stone-400 underline" href="https://angegod.github.io/TosCard/" target="_blank">https://angegod.github.io/TosCard/</a>
                </span>
            </div>
            <div class="flex flex-col">
                <span class="text-white">詳細原因可以參考這篇</span>
                <span class="text-white">
                    <a class="text-stone-400 underline" href="https://angegod.github.io/TosCard/" target="_blank">文章</a>
                </span>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @use '../assets/css/card.scss';
</style>
