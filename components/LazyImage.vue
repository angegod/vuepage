<script setup>
import { inject,ref,provide } from 'vue';
let props = defineProps(['imageLink','id']);

const isAddable=inject('frontpath');//圖片默認路徑，要配合之後有可能上線
let isloaded=ref(false);//判斷照片是否加載完畢

const emit = defineEmits(['refresh']);
let isHovered=ref(false);

//如果需要刪除該資料
function deleteCard(){
    emit('deleteCard',props.id);
}

//照片顯示緩衝
function imgloadStatus(cardId){
    var node=document.getElementById(cardId);

    if(node.complete&&!node.error){
        setTimeout(()=>{
            //console.log(node.src +" is loaded");
            isloaded.value=true;
        },2000)   
    }
    else{
        isloaded.value=false;
    }
}

</script>
<template>
    <div class="inline-block relative" @mouseenter="isHovered= true" @mouseleave="isHovered= false">
        <img :src="isAddable+'/images/loading2.gif'" class="max-w-[100px] " v-if="!isloaded" alt="loading_GIF"/>
        <img :src="isAddable+props.imageLink" alt="5555" 
            @load="event=>imgloadStatus('cardImg'+props.id)" :id="'cardImg'+props.id" :alt="'時光牌圖片'"
            class="max-w-[100px] rounded-[1rem] border-2 border-solid border-transparent" v-show="isloaded"/>
        
        <img :src="isAddable+'/images/delete.svg'" alt="delete" 
            class="absolute top-0 right-0 w-[30px] cursor-pointer"  
            v-show="isloaded&&isHovered" @click.stop="deleteCard()" />
    </div>

</template>
<style scoped>



</style>

