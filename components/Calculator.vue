<script lang="ts" setup>
    import { inject,ref,provide,nextTick, onMounted } from 'vue';
    import Goal from './data/Goal.ts';
    import CalculatorHint from '@/components/hint/CalculatorHint.vue';
    import type { GoalItem } from './data/Goal.ts';
    
    const isAddable = ref<string>('');
    let data =ref<GoalItem[]>(Goal);
    let result=ref<number|undefined>(undefined);


    function init(){
        data.value=Goal.map(item => ({ ...item })); // 簡單淺拷貝（已足夠）
        result.value = undefined;
    }

    function changeData(event: Event, num: number):void{
        const input = event.target as HTMLInputElement;
        const value = parseInt(input.value);

        // 防呆：負數變 0
        if (value < 0) {
            input.value = '0';
            return;
        }

        const old = [...data.value!] as GoalItem[]; // 先複製一份陣列
        const target = old.find(d => d.rarity === num);
        if (target) {
            target.count = value;
        }

        data.value = old;
    }

    function calData(){
        let count=0;
        data.value.forEach(d => {
            if(d.count > 0)
                count += d.count*d.bind;
        });
        result.value=count;
    }

    //元件掛載時
    onMounted(()=>{
        isAddable.value = inject('frontpath') as string;

        init();
    });
</script>
<template>
    <div class="">
        <div class="w-5/6 mx-auto">
            <div class="flex flex-row items-center">
                <span class="text-amber-900 font-bold text-[28px] max-[500px]:text-[24px]">琉璃計算器</span>
                <CalculatorHint />
            </div>
            <div>
                <div class="flex flex-col">
                    <div class="flex flex-row flex-wrap">
                        <div class="mt-3 w-1/2 max-[500px]:w-full">
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