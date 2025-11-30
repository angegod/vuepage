<script lang="ts" setup>
    import { inject,ref,provide } from 'vue';
    
    //繼承父物件中的targetCard
    let props = defineProps(['card']);
    const emit = defineEmits(["update:card"]);

    let searchWord='';

    // 路徑前綴 from app.vue provide
    const injectedFrontPath = inject<string>('frontpath', ''); // 如果沒有 provide 回傳空字串
    const isAddable = ref<string>(injectedFrontPath); // 不用在 onMounted 裡 inject，直接放頂層

    //確認抓取關鍵字輸入
    function searchWordChange(event:Event){
        let input = event.target as HTMLInputElement;
        searchWord= input.value;
    }

    //新增關鍵字
    function addWord(){
        let target=props.card.keyword;

        //避免原本就沒有關鍵字生成
        if(!target){
            target=[];
        }
        
        target.push(searchWord);
        //清除先前輸入結果
        searchWord='';
    }

    function removeWord(index:number){
        let target=props.card.keyword;

        //過濾指定索引的關鍵字
        target=target.filter((k:string,i:number)=>i!==index);

        props.card.keyword=target;
    }


</script>
<template>
    <div class="flex flex-row">
        <span class="standwardLabel">關鍵字管理</span>
        <button class="addBtn ml-3" v-on:click="addWord()">新增</button>
    </div>
    <div v-if="props.card.keyword!==undefined && props.card.keyword.length !== 0" class="overflow-y-scroll hiddenScrollbar">
        <div v-for="(k,i) in props.card.keyword" class="flex flex-row my-2">
            <div class="text-white min-w-[150px]" v-if="k!==''"><span >{{ k }}</span></div>
            <div v-if="k!==''">
                <button :id="'btns'+i" v-on:click="removeWord(i)">
                    <img :src="isAddable+'/images/delete.svg'" width="20" height="20" alt="delete" />
                </button>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @use '../../assets/css/modify.scss';
</style>
