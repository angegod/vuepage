<script setup>
    import { inject,ref,provide } from 'vue';
    import { computed } from 'vue';
    
    //繼承父物件中的targetCard
    let props = defineProps(['card']);
    const emit = defineEmits(["update:card"]);

    let searchWord='';

    const isAddable=inject('frontpath');//圖片默認路徑，要配合之後有可能上線
    if(isAddable!==''){
        var currentpath=window.location.href;
        if(currentpath.includes("https://angegod.github.io/vuepage"))
            window.location.href = "https://angegod.github.io/vuepage";
        else
            window.location.href = "http://localhost:5173/vuepage";
    }

    //確認抓取關鍵字輸入
    function searchWordChange(event){
        searchWord=event.target.value;
    }

    //新增關鍵字
    function addWord(){
        let target=props.card.keyword;

        //避免原本就沒有關鍵字生成
        if(target===undefined||target===null){
            target=[];
        }
        
        target.push(searchWord);
        console.log(target);
        //清除先前輸入結果
        searchWord='';
    }

    function removeWord(index){
        let target=props.card.keyword;

        //過濾指定索引的關鍵字
        target=target.filter((k,i)=>i!==index);

        props.card.keyword=target;
    }

</script>
<template>
    <span class="standwardLabel">關鍵字管理</span>
    <div>
        <input type="text" v-bind:value="searchWord" placeholder="搜尋關鍵字" @input=" event=>searchWordChange(event)" class="colorSelect"/>
        <button class="rounded-sm bg-gray-600 min-w-[50px] text-white" v-on:click="addWord()">新增</button>
    </div>
    <div v-if="props.card.keyword!==undefined && props.card.keyword.length !== 0" class="overflow-y-scroll hiddenScrollbar">
        <div v-for="(k,i) in props.card.keyword" class="flex flex-row my-2">
            <div class="text-white min-w-[200px]" v-if="k!==''"><span >{{ k }}</span></div>
            <div v-if="k!==''">
                <button class="removeBtn" :id="'btns'+i" v-on:click="removeWord(i)">移除</button>
            </div>
        </div>
    </div>
</template>
