<script setup>
    import { inject,ref,provide,nextTick } from 'vue';
    import Goal from './data/Goal';
    const isAddable=inject('frontpath');//圖片默認路徑，要配合之後有可能上線

    let data=ref();
    let result=ref(undefined);
    let detailShow=ref(true);
    let slideBtn=ref([0,0]);

    init();

    function init(){
        data.value=Goal;
    }

    function changeData(event,num){
        console.log(event.target.value);

        //防呆
        if(parseInt(event.target.value)<0){
            event.target.value=0;
            return;
        }

        let old=data.value;
        old.find((d)=>d.rarity===num).count=parseInt(event.target.value);

        data.value=old;
        console.log(data.value);
    }

    function calData(){
        let count=0;
        data.value.forEach(d => {
            count += d.count*d.bind;
        });
        result.value=count;
    }

    function operateInfo(num){
        let targetInfo = document.getElementById('info'+num);

        if(targetInfo.classList.contains('open')){
            targetInfo.classList.remove('open');
            slideBtn.value[num-1]=0;
        }
        else{
            targetInfo.classList.add('open');
            slideBtn.value[num-1]=1;
        } 
            
        
    }

</script>
<template>
    <div class="">
        <div class="w-5/6 mx-auto">
            <div >
                <span class="text-red-500 font-bold text-[28px]">琉璃計算器Beta</span>
            </div>
            <div>
                <div class="flex flex-col">
                    <div class="flex flex-row flex-wrap">
                        <div class="mt-3 w-1/2 max-[500px]:w-[100%]">
                            <div v-for="i in 3" class="flex flex-row items-center my-1">
                                <img :src="isAddable+`/images/rarity${i}.png`" :alt="`rarity${i}`" 
                                class="max-w-[70px] object-cover object-center"/>
                                <div class=" flex justify-center">
                                    <span class="text-black w-[100px] text-center text-lg">&#215;</span>
                                </div>
                                <div class="border-b-black border-b-2">
                                    <input  type="number" 
                                            class="w-[40px] text-black bg-inherit text-center text-xl outline-none"
                                            @change="(event)=>changeData(event,i)" min="0"/>
                                </div>
                            </div>
                        </div>
                        
                        <div class="w-1/2 max-[500px]:w-[100%] mt-2 pl-1" v-if="detailShow">
                            <div>
                                <div class="flex">
                                    <button @click="operateInfo(1)">
                                        <img :src="isAddable+'/images/arrow_drop_down.png'" width="20" height="20" v-if="slideBtn[0]===1"/>
                                        <img :src="isAddable+'/images/arrow_drop_up.png'" width="20" height="20" v-else/>
                                    </button>
                                    <span class="text-black font-bold text-md">2025時光牌bingo目標:</span>
                                </div>
                                <ul class="[&>li]:font-bold [&>li]:my-1 slide pl-5" id="info1">
                                    <li class="text-amber-800 ">練滿1星[晨曦塔]時光牌&#215;{{ data[0].goal }}</li>
                                    <li class="text-gray-600">練滿2星[晨曦塔]時光牌&#215;{{ data[1].goal }}</li>
                                    <li class="text-yellow-600">練滿3星[晨曦塔]時光牌&#215;{{ data[2].goal }}</li>
                                </ul>
                            </div>
                            <div class="my-2">
                                <div class="flex">
                                    <button @click="operateInfo(2)">
                                        <img :src="isAddable+'/images/arrow_drop_down.png'" width="20" height="20" v-if="slideBtn[1]===1"/>
                                        <img :src="isAddable+'/images/arrow_drop_up.png'" width="20" height="20" v-else/>
                                    </button>
                                    <span class="text-black font-bold text-md">目前開放的時光牌數量:</span>
                                </div>
                                <ul class="[&>li]:font-bold [&>li]:my-1 [&>li]:text-md slide pl-5" id="info2">
                                    <li class="text-amber-800 ">1星[晨曦塔]時光牌&#215;{{ data[0].open }}</li>
                                    <li class="text-gray-600">2星[晨曦塔]時光牌&#215;{{ data[1].open }}</li>
                                    <li class="text-yellow-600">3星[晨曦塔]時光牌&#215;{{ data[2].open }}</li>
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    <div class="mt-2 flex flex-row">
                        <button class="text-black text-lg border-black font-bold rounded-md px-2" 
                            style="border-width: 2px;" @click="calData">計算</button>
                        <div v-if="result!==undefined" class="ml-1">
                            <span class="text-black text-lg font-bold  ">總共需
                                <span class="text-red-500 font-bold">{{ result }}</span>
                                個琉璃</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

    </div>
</template>
<style scoped>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .calculator{
        position: relative;
        width:100%;
        min-height: 800px;
        height: calc(100% + 50px);
        padding-bottom: 40px;
        background-image: linear-gradient(to bottom,rgb(27, 25, 25) 0%,rgb(65, 28, 28) 70%,rgb(102, 12, 12) 90%);
    }

    img{
        clip-path: inset(2% 2% 2% 2%); /* 上、右、下、左裁切 */
    }

    /*隱藏input number旁邊的調整按鈕*/
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .slide{
        height: 0;
        overflow: hidden;
        transition: height 0.3s ease-out;
    }
    .slide.open{
        height:80px;
    }

</style>