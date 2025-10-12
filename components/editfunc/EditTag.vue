<script lang="ts" setup>
import { defineProps } from 'vue';
import { useModifyStore } from '../store/modifyData';
import type { funcDataItem, skillItem } from '@/interface/funcData';


let props = defineProps(['title','tagType']);
const store = useModifyStore();

//從共用資料區 拿取資料
let {func,funcData,CardArray,selectCardId,showSkill,targetCard} = storeToRefs(store);

let targetTagLst = ref<number[]>([]);

let selectTagLst = ref<funcDataItem[]>(JSON.parse(JSON.stringify(funcData.value)));

//標籤選擇Element
let tagSelect = ref<string>('0');

let keyword = '';

//關鍵字搜尋技能標籤
function keywordChange(event:Event){
    let input = event.target as HTMLInputElement;
    keyword = input.value;


    selectTagLst.value = JSON.parse(JSON.stringify(funcData.value));
    if(keyword===''){
        return;
    }

    //技能搜尋結果
    let filterArr = [] as funcDataItem[];
    
    funcData.value.forEach((type)=>{
        let result=[] as skillItem[];
        type.data.forEach((f)=>{
            if(f.name.includes(keyword))
                result.push(f);
        });

        if(result.length!==0){
            //使用深拷貝 copy
            let insertType = JSON.parse(JSON.stringify(type));
            insertType.data = result;
            filterArr.push(insertType);
        }
    });

    if(filterArr.length!==0)
        selectTagLst.value=filterArr;
}

//添加技能標籤
function addTag(){
    const tagIndex = parseInt(tagSelect.value);
    if (tagIndex === 0) return;


    let targetTag :skillItem | undefined;

    func.value.forEach((type)=>{
        let t=type.data.find((f)=>f.id===tagIndex) as skillItem;
        if(t===undefined)
            return;
        targetTag=t;

    });

    if(!targetTag||showSkill.value.includes(targetTag)||tagIndex===0){
        return;
    }


    showSkill.value.push(targetTag);
    showSkill.value=showSkill.value.sort((a,b)=>{return a.id-b.id});

    targetTagLst.value.push(tagIndex);
    targetTagLst.value.sort((a,b)=>{return a-b});

    ModifyToCardTag();
}


//移除技能標籤
function removeTag(index:number){
    showSkill.value = showSkill.value.filter((t,i)=>i!==index);
    //let targetCard = CardArray.value.find((c)=>c.id===selectCardId.value) as CardItem;
        
    //將更正合併到原本資料中
    targetTagLst.value = targetTagLst.value.filter((f,i)=>i!==index);
    
    console.log("目前作業卡片:"+selectCardId.value);
    console.log(targetCard.value);
    ModifyToCardTag();
}

//將更動合併至targetCard
function ModifyToCardTag(){
    switch(props.tagType){
        case "instant":
            targetCard.value.tag = targetTagLst.value;
            break;
        case "round":
            targetCard.value.roundTag = targetTagLst.value;
            break;
        case "combo":
            targetCard.value.comboTag = targetTagLst.value;
            break;
        default:
            break;
    }
}


function updateTargetTagList() {
    showSkill.value = [];

    switch(props.tagType){
        case "instant":
            targetTagLst.value = targetCard.value.tag??[];
            break;
        case "round":
            targetTagLst.value = targetCard.value.roundTag??[];
            break;
        case "combo":
            targetTagLst.value = targetCard.value.comboTag??[];
            break;
        default:
            break;
    }

    //最後加入到顯示技能列表內
    targetTagLst.value.forEach((t)=>{
        funcData.value.forEach((type)=>{
            let targetskill=type.data.find((data)=>data.id===t) as skillItem;
            if(targetskill!==undefined){
                showSkill.value.push(targetskill);
            }
        });
    });
}



onMounted(()=>{
    updateTargetTagList();
});

//監聽targetCard更動
watch(
    ()=>targetCard.value,
    ()=>{
        updateTargetTagList()
    },{ deep: true }
);
</script>
<template>
    <div class="flex-col">
        <span class="standwardLabel">{{ props.title }}</span>
        <div class="mb-3">
            <input type="text" v-bind:value="keyword" placeholder="技能關鍵字" @input=" event=>keywordChange(event)" class="colorSelect"/>
        </div>
        <div v-if="selectTagLst.length!==0">
            <select class="colorSelect w-[150px]" v-model="tagSelect">
                <option :value="0">{{'請選擇'}}</option>
                <optgroup v-for="types in selectTagLst" :label="types.typeName">
                    <option v-for="f in types.data" :value="f.id" class="bg-amber-900">{{ f.name }}</option>
                </optgroup>
            </select>
            <button class="rounded-sm bg-gray-600 min-w-[50px] text-white" v-on:click="addTag()">新增</button>
        </div>
        <div v-else>
            <span class="text-yellow-500 font-bold text-lg">沒有找到匹配技能標籤</span>
        </div>
    </div>
    <div class="mb-2 flex-col" >
        <div class="overflow-y-scroll hiddenScrollbar">
            <div class="flex flex-col">
                <div v-for="(skill,i) in showSkill" class="flex flex-row my-1">
                    <div class="w-1/5"><span class="text-white">{{ skill.id }}</span></div>
                    <div class="w-2/5"><span class="text-white">{{ skill.name }}</span></div>
                    <div class="w-2/5">
                        <button class="removeBtn" :id="'btns'+i" v-on:click="removeTag(i)">移除</button>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @use '../../assets/css/modify.scss';
</style>