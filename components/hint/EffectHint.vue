<script lang="ts" setup>
import Popper from 'vue3-popper';

let description=[{
    type:'即時效果',
    description:'當時晷滿能量後，以該能量珠起手並拖至任一腳色頭像身上並放手，可以觸發的效果'
},{
    type:'回合效果',
    description:'當時晷掛在任一腳色頭像上且能量尚未歸0時，可以觸發的效果'
},{
    type:'連動效果',
    description:'當時晷掛在任一腳色頭像上，以該腳色珠起手並首消該腳色珠可以觸發的效果'
}]

</script>
<template>
    <Popper arrow placement="bottom-start" hover>
        <div class="flex justify-center items-center ml-1  bg-black/90 w-[20px] h-[20px] rounded-xl">
            <span class="text-white cursor-help">?</span>
        </div>
        <template #content>
            <div class="bg-black/90 rounded-md p-2 border-[2px] border-gray-700">
                <div>
                    <span class="text-stone-500">此區塊可以選擇下方篩選的功能只能出現在哪個效果裏頭，以下是每個效果觸發時機的簡述:</span>
                </div>
                <div class="flex flex-col">
                    <div class="flex flex-col my-1" v-for="d in description">
                        <span class="text-amber-600 font-bold">{{ d.type }}</span>
                        <span class="text-stone-300">{{ d.description }}</span>
                    </div>
                </div>
                <div class="mt-1">
                    <span class="text-stone-500">此項目一律採用or搜尋，只要指定類型的技能有出現在指定位置中其中一個地方就算符合</span>
                </div>
            </div>
        </template>
    </Popper>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>