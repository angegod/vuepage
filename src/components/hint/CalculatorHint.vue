<script setup>
import { ref } from 'vue';
import Popper from 'vue3-popper';
import Goal from '../data/Goal.js';
import Card from '../data/Card.js';

let data=ref(null);

//初始化
init();


function init(){
    data.value=Goal;

    //目前只有一個系列 所以先默認只抓第一個系列
    let target =Card[0].card;

    //分離出三個稀有度
    for(var i = 1;i<=3;i++){
        let targetRarity = i;

        data.value[targetRarity-1].open = target.filter((c)=>c.rarity === targetRarity).length;
    }
}

</script>
<template>
    <Popper arrow placement="bottom-start" hover>
        <div class="flex ml-1">
            <span class="text-white cursor-help bg-black w-[20px] h-[20px] text-center rounded-xl">?</span>
        </div>
        <template #content>
             <div class="max-[500px]:w-[100%] mt-2 p-2 rounded-md bg-[rgb(255,249,196)]" v-if="data !==null ">
                <div>
                    <div class="flex">
                        <span class="text-black font-bold text-md">2025時光牌bingo目標:</span>
                    </div>
                    <ul class="[&>li]:font-bold [&>li]:my-1 slide pl-5" id="info1">
                        <li class="text-amber-800 ">練滿1星[晨曦塔]時光牌&#215;{{ data[0].goal }}</li>
                        <li class="text-gray-600">練滿2星[晨曦塔]時光牌&#215;{{ data[1].goal }}</li>
                        <li class="text-yellow-500">練滿3星[晨曦塔]時光牌&#215;{{ data[2].goal }}</li>
                    </ul>
                </div>
                <div class="my-2">
                    <div class="flex">
                        <span class="text-black font-bold text-md">目前開放的時光牌數量:</span>
                    </div>
                    <ul class="[&>li]:font-bold [&>li]:my-1 [&>li]:text-md slide pl-5" id="info2">
                        <li class="text-amber-800 ">1星[晨曦塔]時光牌&#215;{{ data[0].open }}</li>
                        <li class="text-gray-600">2星[晨曦塔]時光牌&#215;{{ data[1].open }}</li>
                        <li class="text-yellow-500">3星[晨曦塔]時光牌&#215;{{ data[2].open }}</li>
                    </ul>
                </div>  
            </div>
        </template>
    </Popper>
</template>