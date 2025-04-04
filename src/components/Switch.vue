<script setup>
    import {ref } from 'vue';
    let props = defineProps(['hideable','text1','text2']);
    let p=ref(false);
    
    const emit = defineEmits(['refresh'])
    
    //按鈕點選並且改動文字
    function toggle(){
        p.value=!p.value;
        //呼叫父物件重整
        emit('refresh','');
    }
  
    //抓到目前該物件的狀態，這個方法會給父物件呼叫作使用
    function getBool(){
        return p.value;
    }

    defineExpose({
        getBool
    })

</script>
<template>
  <div class="flex max-[450px]:flex-row mb-3 pt-1.5">
    <label class="switch max-w-[300px] mr-3">
        <input type="checkbox" @click="toggle()">
        <div class="slider round"></div>
    </label>
    <div class="max-w-[150px]">
        <span class="text-xl text-white hint" v-if="!props.hideable">{{ (p)?props.text2:props.text1 }}</span>
    </div>
  </div>
  
</template>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
<style scoped>

@import '@/css/switch.css';
</style>