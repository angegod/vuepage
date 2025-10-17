<script lang="ts" setup>
import type { CardItem, CardSeriesItem } from '@/interface/card';

let props = defineProps(['card']);
let Card = ref<CardItem[]>([]);


function init(){
    let CardArray = props.card as CardSeriesItem[];

    CardArray.forEach((s)=>{
        s.card.forEach((c)=>{
            if(c.keyword[0]!==""){
                Card.value.push(c);
            }
        })
    });
    console.log(Card);
}


onMounted(()=>{
    init();
});

</script>
<template>
    <div class="flex flex-col mt-3 mx-auto">
        <div>
            <span class="text-red-600 font-bold text-lg">目前支援特殊關鍵字</span>
        </div>
        <div class="flex flex-row flex-wrap max-h-[20vh] overflow-y-scroll w-2/5 max-[1000px]:w-full grayScrollBar bg-stone-700/90 rounded-md p-1">
            <div class="flex flex-col w-1/2 my-2" v-for="c in Card">
                <div>
                    <span class="text-amber-500 font-bold">{{c.id +" "+ c.name }}</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-white" v-for="k in c.keyword">{{ k }}</span>
                </div>
            </div>
        </div>
       
    </div>    

</template>
<style scoped lang="scss">


</style>