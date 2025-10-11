<script lang="ts">
    import { ref } from 'vue';
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
    import 'vue3-carousel/dist/carousel.css';

    import type { CardItem } from '@/interface/card';
    import type { funcDataItem, skillItem } from '@/interface/funcData';

    // Carousel 實例
    const cardSlide = ref<any>(null);

    // 處理跳頁
    function slideItem(event: Event, length: number) {
        const target = event.target as HTMLInputElement;
        const val = Number(target.value);

        if (isNaN(val) || val > length || val <= 0) {
            alert("該編號卡片資料沒有找到!!");
            return;
        }

        // 呼叫 carousel 的 slideTo 方法
        cardSlide.value?.slideTo(val - 1);
    }
</script>
<script lang="ts" setup>
    import { inject,provide,defineModel,watch } from 'vue';
    import axios from 'axios';
    import AddCard from '../components/AddCard.vue';
    import EditBasic from '@/components/editfunc/EditBasic.vue';
    import EditKeyword from '@/components/editfunc/EditKeyword.vue';
    import EditTag from '@/components/editfunc/EditTag.vue';

    import {useModifyStore} from '@/components/store/modifyData.ts';

    const modifyStore = useModifyStore();

    /*let Card = [] as CardItem[];//原始資料
    let funcData = [] as funcDataItem[];
    
    let seriesId=ref<number>(1);//系列ID
    let showSkill=ref<skillItem[]>([]);
    let func=ref<funcDataItem[]>([]);//避免因為篩選導致原本遺失
    let CardArray=ref<CardItem[]>([]);//更動過後的資料(暫存)
    let selectCardId=ref<number>(1);*/

    let {func,funcData,CardArray,Card,selectCardId,targetCard,showSkill,seriesId} = storeToRefs(modifyStore); 


    let keyword='';
    let searchWord='';

    let popup=ref<InstanceType<typeof AddCard>>();

    //功能列表
    let editFunc=ref([{
        name:"基本資訊",
        mode:"edit_basic"
    },{
        name:"效果敘述",
        mode:"edit_description"
    },{
        name:"即時效果標籤",
        mode:"edit_tag"
    },{
        name:"回合效果標籤",
        mode:"edit_roundTag"
    },{
        name:"連動效果標籤",
        mode:"edit_comboTag"
    },{
        name:"關鍵字",
        mode:"edit_keyword"
    },{
        name:"圖片管理",
        mode:"edit_img"
    },{
        name:"刪除卡片",
        mode:"delete"
    }]);

    //當前編輯模式
    let editMode=ref('edit_basic');

    // 路徑前綴 from app.vue provide
    const isAddable = ref(''); 
    const config = useRuntimeConfig();

    function loadData(){
        //目前先寫找指定找第一個系列的時光牌
        axios.post('http://localhost:5000/card/get',{get:seriesId.value}).then((response)=>{
            if(response.data=="發生錯誤"){
                console.log('沒有發現相關資料');
                return;
            }

            //需要將原有資料跟會更動的分開

            let initData = {
                Card:response.data.card,
                funcData:response.data.func,
                func:JSON.parse(JSON.stringify(response.data.func)),
                CardArray:JSON.parse(JSON.stringify(response.data.card))
            }

            modifyStore.init(initData);

            changeCard(1);
        }).catch((error)=>{
            console.log(error);
            alert('伺服器尚未開啟請稍後再試!!');

            //window.location.assign(window.location.origin+`/`);
        });
    }

    
    function changeSeries(index:number){

        let target=document.getElementById('series'+index) as HTMLButtonElement;
        if(target.classList.contains('clicked'))
            target.classList.remove('clicked')
        else
            target.classList.add('clicked');

        seriesId.value=index;
        loadData();
    }
    

    //新增搜尋關鍵字
    function addWord(){
        let targetCard = CardArray.value.find((c)=>c.id===selectCardId.value) as CardItem;
        let target = targetCard.keyword;

        //避免原本就沒有關鍵字生成
        if(target===undefined||target===null){
            target=[];
        }
        
        target.push(searchWord);
        //清除先前輸入結果
        targetCard.keyword=target;
        console.log(targetCard.keyword);
        searchWord='';
    }

    function removeWord(index:number){
        let targetCard = CardArray.value.find((c)=>c.id===selectCardId.value) as CardItem;
        let target = targetCard.keyword;

        target=target.filter((k,i)=>i!==index);

        targetCard.keyword=target;
    }

    function SaveClick(){
        if(!confirm("將會儲存你所做的所有更改，如果確定覆蓋則按確定")){
            return;
        }
        //將資料推送後端 該系列全部直接全部覆蓋
        try{            
            
            let json={
                getId:seriesId.value,//告訴他要覆蓋哪個系列的?
                newData:CardArray.value//更動過的資料 
            };
            console.log(json);

            axios.post('http://localhost:5000/card/edit',json).then((response)=>{
                console.log(response);
                alert(response.data);
                
                //將提交上去的資料做備份 使用深拷貝
                Card=JSON.parse(JSON.stringify(CardArray.value));
            });
        }catch(error){
            console.log(error)
        }
    }

    function changeCard(index:number){
        selectCardId.value = index;
        targetCard.value = CardArray.value.find((c)=>c.id===selectCardId.value) as CardItem;

        changeShowSkill();
    }

    function deleteCard(){

        let data ={
            series:seriesId.value,
            id:selectCardId.value
        };


        axios.post('http://localhost:5000/card/delete',data).then((response)=>{
            console.log(response);
            
            CardArray.value=CardArray.value.filter((c)=>c.id!==selectCardId.value);
            console.log(CardArray.value);
            //將提交上去的資料做備份 使用深拷貝
            Card=JSON.parse(JSON.stringify(CardArray.value));

            changeCard(CardArray.value[0].id);
            alert("卡片刪除成功!");
            
        });
    }

    function RecoverClick(){
        CardArray.value = JSON.parse(JSON.stringify(Card.value));
        funcData.value = JSON.parse(JSON.stringify(funcData.value));

        targetCard.value = CardArray.value.find((c)=>c.id === selectCardId.value) as CardItem;

        
        changeShowSkill();
    }

    function changeShowSkill(){
        //將原先的資料叫出來 使用深拷貝copy出來避免有任何被更動過的風險
        let oldData=JSON.parse(JSON.stringify(targetCard.value)) as CardItem;

        //清空
        showSkill.value=[];

        let targetTagLst = [] as number[];
        if(editMode.value === 'edit_tag'){
            targetTagLst = oldData.tag;
        }else if(editMode.value === 'edit_comboTag'){
            targetTagLst = oldData.comboTag ?? [];
        }else if(editMode.value === 'edit_roundTag'){
            targetTagLst = oldData.roundTag ?? [];
        }

        //最後加入到顯示技能列表內
        targetTagLst.forEach((t)=>{
            funcData.value.forEach((type)=>{
                let targetskill=type.data.find((data)=>data.id===t) as skillItem;
                if(targetskill!==undefined){
                    showSkill.value.push(targetskill);
                }
            });
        });
    }


    //雙擊label顯示該input
    function showInputBox(event: Event) {
        const target = event.target as HTMLElement | null;
        if (!target || !target.parentElement) return;

        const targetInputBox = target.parentElement.querySelector('textarea') as HTMLTextAreaElement | null;
        if (!targetInputBox) return;

        targetInputBox.classList.remove('hidden');
        target.classList.add('hidden');
    }

    //敘述修改
    function descModify(event:KeyboardEvent,type:string,index?:number){
        let targetCard = CardArray.value[selectCardId.value-1] as CardItem;

        //如果是按下Enter 則儲存
        if(event.key==="Enter" && index !== undefined){
            const input = event.target as HTMLInputElement;
            const inputValue = input.value;

            switch(type){
                case 'instant':
                    targetCard.instantEffect[index] = inputValue;
                    break;
                case 'round' :
                    targetCard.roundEffect[index]= inputValue;
                    break;
                case 'combo' :
                    targetCard.comboEffect[index] = inputValue;
                    break;
            }

            let targetSpan= input.parentElement?.querySelector('span') as HTMLSpanElement;
            targetSpan.classList.remove('hidden');
            input.classList.add('hidden');
            return;
        }

        //如果是按下Esc 則還原
        if(event.key==="Escape"){
            
        }

        if(event.key==="Delete"){
            switch(type){
                case 'instant':
                    break;
                case 'round' :
                    targetCard.roundEffect = targetCard.roundEffect.filter((d,i)=>i!==index);
                    break;
                case 'combo' :
                    targetCard.comboEffect=targetCard.comboEffect.filter((d,i)=>i!==index);
                    break;
            }
        }
        
    }

    function addDesc(type:string){
        let t=CardArray.value.find((c)=>c.id===selectCardId.value) as CardItem;
        switch(type){
            case 'round':
                t.roundEffect.push('回合效果');
                break;
            case 'instant':
                t.instantEffect.push('即時效果');
                break;
            case 'combo':
                t.comboEffect.push('連動效果');
                break;
        }
    }

    //移除敘述 目前默認移除最後一個，並且一定會至少保留一段敘述
    function removeDesc(type:string){
        let t=CardArray.value.find((c)=>c.id===selectCardId.value) as CardItem;

        switch(type){
            case 'round':
                if(t.roundEffect.length===1)
                    break;
                t.roundEffect=t.roundEffect.filter((d,i)=>i!==(t.roundEffect.length-1));
                break;
            case 'instant':
                if(t.instantEffect.length===1)
                    break;
                t.instantEffect=t.instantEffect.filter((d,i)=>i!==(t.instantEffect.length-1));
                break;
            case 'combo':
                if(t.comboEffect.length===1)
                    break;
                t.comboEffect=t.comboEffect.filter((d,i)=>i!==(t.comboEffect.length-1));
                break;
        }
    }
   

    function addCard(){
        if(popup.value){
            let overlay = document.getElementById('overlay') as HTMLDivElement;

            overlay.style.display='block';
            popup.value.setFunc(func.value);
        }
    }

    function closeHandle(){
        let overlay = document.getElementById('overlay') as HTMLDivElement;
        overlay.style.display='none';
    }

    function changeEditMode(modeName:string){
        editMode.value=modeName;
    }

    function changeCardDataFromChild(data:CardItem[]){
        Card.value = data;
        CardArray.value=JSON.parse(JSON.stringify(Card)) as CardItem[];
    }

    //監聽targetCard在任一子物件中是否有被修改過?
    watch(targetCard,(newValue, oldValue) => {
        if (!newValue) return; // 確保不是 undefined

        CardArray.value[newValue.id - 1] = newValue
    },{ deep: true })

    provide('close',closeHandle);//提供關閉彈出視窗方法


    onMounted(()=>{
        //僅在測試環境下才回生效
        if(process.env.NODE_ENV !== "development")
            window.location.assign(`${window.location.origin}/${config.public.projectName}/`);

        isAddable.value = inject('frontpath') as string;

        loadData();
    });
</script>
<template>
    <div class="main">
        <div class="w-4/5 mx-auto mb-2">
            <span class="text-white text-xl">系列</span>
            <div class="flex flex-row">
                <button class="addBtn mr-5 w-[100px]" @click="changeSeries(1)" id="series1">晨曦塔</button>
                <button class="addBtn mr-5 w-[100px]" @click="changeSeries(2)" id="series2">測試塔</button>
            </div>
        </div>
        <div class="w-4/5 mx-auto flex flex-row justify-evenly">
            <div class="w-1/2 min-h-[500px] flex flex-row" v-if="targetCard!==undefined">
                <div class="CardImage w-1/2">
                    <span class="text-white font-bold text-xl">{{ targetCard.name }}</span>
                    <img :src="isAddable+targetCard.fullimage" alt="全身圖" class="max-h-[500px]"/>
                </div>
                <div class="Details flex flex-col w-1/2 mt-5 [&>div]:mb-5" v-show="false">
                    <div>
                        <div class="flex flex-row">
                            <span class="standwardLabel">即時效果</span>
                            <button class="addBtn ml-5 " @click="addDesc('instant')">新增</button>
                            <button class="addBtn ml-5 " @click="removeDesc('instant')" v-if="targetCard?.instantEffect?.length >1">刪除</button>
                        </div>
                        <div v-for="(effect,index) in targetCard.instantEffect" class="mb-3 flex flex-col">
                            <span class="text-white font-bold" v-on:dblclick="showInputBox">{{ effect }}</span>
                            <textarea  class="hidden bg-gray-600 text-white h-auto rounded-sm min-h-[50px]" v-on:keydown="event=>descModify(event,'instant',index)">{{ effect }}</textarea>
                        </div>
                    </div>
                    <div>
                        <div class="flex flex-row">
                            <span class="standwardLabel">回合效果</span>
                            <button class="addBtn ml-5" @click="addDesc('round')">新增</button>
                            <button class="addBtn ml-5" @click="removeDesc('round')" v-if="targetCard?.roundEffect?.length >1">刪除</button>
                        </div>
                        <div v-for="(effect,index) in targetCard.roundEffect" class="mb-3 flex flex-col">
                            <span class="text-white font-bold" v-on:dblclick="showInputBox">{{ effect }}</span>
                            <textarea class="hidden bg-gray-600 text-white h-auto rounded-sm min-h-[50px]" v-on:keydown="event=>descModify(event,'round',index)">{{ effect }}</textarea>
                        </div>
                    </div>
                    <div>
                        <div class="flex flex-row">
                            <span class="standwardLabel">連動效果</span>
                            <button class="addBtn ml-5" @click="addDesc('combo')">新增</button>
                            <button class="addBtn ml-5" @click="removeDesc('combo')" v-if="targetCard?.comboEffect?.length >1">刪除</button>
                        </div>
                        <div v-for="(effect,index) in targetCard.comboEffect" class="mb-3 flex flex-col">
                            <span class="text-white font-bold" v-on:dblclick="showInputBox">{{ effect }}</span>
                            <textarea  class="hidden bg-gray-600 text-white h-auto rounded-sm min-h-[50px]" v-on:keydown="event=>descModify(event,'combo',index)">{{ effect }}</textarea>
                        </div>
                    </div> 
                </div>
                <div>
                    <span class="text-red-700 text-lg">選擇要編輯的項目:</span>
                    <div class="flex flex-col">
                        <div v-for="f in editFunc" class="my-2 flex flex-row cursor-pointer" @click="changeEditMode(f.mode)">
                            <img :src="isAddable+'/images/arrow_right.png'" width="20" height="20"/>
                            <span class="text-red-500 text-md" v-if="f.mode==='delete'">{{f.name}}</span>
                            <span class="text-white text-md" v-else>{{f.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if=" editMode == 'edit_basic' && targetCard" class="w-2/5 pl-3 right mt-5 h-[500px] relative ">
                <EditBasic  v-model:card="targetCard" />
            </div>
            <div v-if="editMode == 'edit_tag' && targetCard" class="w-2/5 pl-3 right mt-5 h-[500px] relative ">
                <EditTag  :title="'即時技能標籤'" :tag-type="'instant'" />
            </div>
            <div v-if="editMode == 'edit_roundTag' && targetCard" class="w-2/5 pl-3 right mt-5 h-[500px] relative ">
                <EditTag  :title="'回合技能標籤'" :tag-type="'round'" />
            </div>
            <div v-if="editMode == 'edit_comboTag' && targetCard" class="w-2/5 pl-3 right mt-5 h-[500px] relative ">
                <EditTag  :title="'連動技能標籤'" :tag-type="'combo'" />
            </div>
            <div class="w-2/5 pl-3 right mt-5 h-[500px] relative " v-if="editMode == 'edit_keyword' && targetCard">
                <EditKeyword v-model:card="targetCard"/>
            </div>
            <div class="w-2/5 pl-3 right mt-5 h-[500px] relative " v-if="editMode == 'edit_description' && targetCard">
                <div>
                    <span class="text-amber-800 text-[18px]">效果敘述</span>
                </div>
                <div class="my-5">
                    <div class="flex flex-row">
                        <span class="standwardSubLabel">即時效果</span>
                        <button class="addBtn ml-5 " @click="addDesc('instant')">新增</button>
                        <button class="addBtn ml-5 " @click="removeDesc('instant')" v-if="targetCard?.instantEffect?.length >1">刪除</button>
                    </div>
                    <div v-for="(effect,index) in targetCard.instantEffect" class="mb-3 flex flex-col">
                        <span class="text-white font-bold" v-on:dblclick="showInputBox">{{ effect }}</span>
                        <textarea  class="hidden bg-gray-600 text-white h-auto rounded-sm min-h-[50px]" v-on:keydown="event=>descModify(event,'instant',index)">{{ effect }}</textarea>
                    </div>
                </div>
                <div class="my-5">
                    <div class="flex flex-row my-1">
                        <span class="standwardSubLabel">回合效果</span>
                        <button class="addBtn ml-5" @click="addDesc('round')">新增</button>
                        <button class="addBtn ml-5" @click="removeDesc('round')" v-if="targetCard?.roundEffect?.length >1">刪除</button>
                    </div>
                    <div v-for="(effect,index) in targetCard.roundEffect" class="mb-3 flex flex-col">
                        <span class="text-white font-bold" v-on:dblclick="showInputBox">{{ effect }}</span>
                        <textarea class="hidden bg-gray-600 text-white h-auto rounded-sm min-h-[50px]" v-on:keydown="event=>descModify(event,'round',index)">{{ effect }}</textarea>
                    </div>
                </div>
                <div class="my-5">
                    <div class="flex flex-row my-1">
                        <span class="standwardSubLabel">連動效果</span>
                        <button class="addBtn ml-5" @click="addDesc('combo')">新增</button>
                        <button class="addBtn ml-5" @click="removeDesc('combo')" v-if="targetCard?.comboEffect?.length >1">刪除</button>
                    </div>
                    <div v-for="(effect,index) in targetCard.comboEffect" class="mb-3 flex flex-col">
                        <span class="text-white font-bold" v-on:dblclick="showInputBox">{{ effect }}</span>
                        <textarea  class="hidden bg-gray-600 text-white h-auto rounded-sm min-h-[50px]" v-on:keydown="event=>descModify(event,'combo',index)">{{ effect }}</textarea>
                    </div>
                </div>
            </div>
            <div class="w-2/5 pl-3 right mt-5 h-[500px] relative " v-if="editMode == 'delete' && targetCard">
                <div>
                    <span class="text-amber-800 text-[18px]">刪除卡片</span>
                </div>
                <div class="flex flex-col mt-2 justify-start">
                    <span class="text-white">經過此操作後，該筆資料將永久刪除，按下下面按鈕以確認操作</span>
                    <button class="removeBtn w-[100px]" @click="deleteCard">確認刪除</button>
                </div>
            </div>
            
        </div>
        <div class="w-3/5 mx-auto my-3">
            <button class="removeBtn min-w-[150px] mb-3" v-on:click="SaveClick()">儲存</button>
            <button class="removeBtn min-w-[150px] mb-3" v-on:click="RecoverClick()">還原</button>
        </div>
        <div class="slide w-4/5 mx-auto mt-3 pt-3">
            <div class="ml-5 mb-3">
                <span class="text-white">請輸入要卡片編號:</span>
                <div class="flex flex-row">
                    <input type="number" class="w-[100px] rounded-md text-center" @change="event=>slideItem(event,CardArray.length)"/>
                    <button class="addBtn ml-3 px-3" @click="()=>addCard()">添加卡片</button>
                </div>
            </div>
            <Carousel :wrap-around="true" :items-to-show="5" ref="cardSlide" >
                <Slide v-for="(c,index) in CardArray" :key="index">
                    <div class="flex-col [&>span]:block cursor-pointer" v-on:click="changeCard(c.id)">
                        <img :src="isAddable+c.image" width="160" alt="not found"/>
                        <span 
                            class="w-full text-center text-white rounded-md" 
                            :class="{
                                'bg-amber-900': c.rarity === 1,
                                'bg-slate-500': c.rarity === 2,
                                'bg-yellow-600': c.rarity === 3
                            }">{{ c.id }}</span>
                    </div>
                </Slide>
            </Carousel>
        </div>
        
        <div class='overlay' id="overlay">
            <div class='popup max-[500px]:w-[80%] max-[500px]:min-w-[200px]'>
                <div class='close' v-on:click="closeHandle">&#10006;</div>
                <AddCard ref="popup" :max="CardArray.length+1" :func="func" @close="closeHandle" @updateCard="changeCardDataFromChild"/>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @use '../assets/css/modify.scss';
</style>