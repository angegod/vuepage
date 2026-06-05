<script lang="ts" setup>
import type { CardItem, CardSeriesItem } from '@/interface/card';

let props = defineProps(['card']);
let Card = ref<CardItem[]>([]);


function init(){
    let CardArray = props.card as CardSeriesItem[];

    CardArray.forEach((s)=>{
        s.card.forEach((c)=>{
            if(c.keyword&&c.keyword.length>0&&c.keyword[0]!==""){
                Card.value.push(c);
            }
        })
    });
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
        <div class="CardKeyWord grayScrollBar">
            <div v-for="c in Card">
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
<style lang="scss">

.CardKeyWord{
    @apply flex flex-row flex-wrap max-h-[20vh] overflow-y-scroll w-2/5 max-[1000px]:w-full ;
    @apply bg-stone-700/90 border-stone-600/90 border-[2px] rounded-md p-1;

    & > div{
        @apply flex flex-col w-1/2 py-2 px-1 border-dotted border-b-2 border-r-2 even:border-r-0
    }

    & > div:nth-last-child(-n+2){
        @apply border-b-0;
    }
}


</style>