<script>
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
    import 'vue3-carousel/dist/carousel.css';
    import { ref } from 'vue';
    let cardSlide=ref(null);

    export default {
        name: 'App',
        components: {
            Carousel,
            Slide,
            Pagination,
            Navigation,
        },methods:{
            slideItem:function(event,length){
                if(event.target.value>length||event.target.value<0){
                    alert("該編號卡片資料沒有找到!!");
                }else{
                    let val=event.target.value;
                    cardSlide.value.data.slideTo(val-1);
                }
            }        
        }
        ,data(){
            
        }
    }
</script>
<script setup>
    import { inject,ref,provide,defineModel,watch } from 'vue';
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
    import axios from 'axios';
    import AddCard from '../components/AddCard.vue';
    import EditBasic from './editfunc/EditBasic.vue';
    import EditKeyword from './editfunc/EditKeyword.vue';

    let Card=[];//原始資料
    let funcData=[];
    let seriesId=ref(1);//系列ID
    let showSkill=ref([]);
    let func=ref([]);//避免因為篩選導致原本遺失
    let CardArray=ref([]);//更動過後的資料(暫存)
    let selectCardId=ref(1);
    let keyword='';
    let searchWord='';
    let popup=ref(null);
    let targetCard=ref({});

    //功能列表
    let editFunc=ref([{
        name:"基本資訊",
        mode:"edit_basic"
    },{
        name:"效果敘述",
        mode:"edit_description"
    },{
        name:"技能標籤",
        mode:"edit_tag"
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
    const injectedFrontPath = inject('frontpath', ''); // 如果沒有 provide 回傳空字串
    const isAddable = ref(injectedFrontPath); // 不用在 onMounted 裡 inject，直接放頂層
    


    function loadData(){
        //目前先寫找指定找第一個系列的時光牌
        axios.post('http://localhost:5000/card/get',{get:seriesId.value}).then((response)=>{
            console.log(response.data);
            Card=response.data.card;
            funcData=response.data.func;

            if(response.data=="發生錯誤"){
                console.log('沒有發現相關資料');
                return;
            }
                
            //需要將原有資料跟會更動的分開
            func.value=JSON.parse(JSON.stringify(funcData));
            CardArray.value=JSON.parse(JSON.stringify(Card));

            
            changeCard(1);
        }).catch((error)=>{
            alert('伺服器尚未開啟請稍後再試!!');
            window.location=window.location.origin+'/vuepage/';
        });
    }

    
    function changeSeries(index){

        let target=document.getElementById('series'+index);
        if(target.classList.contains('clicked'))
            target.classList.remove('clicked')
        else
            target.classList.add('clicked');

        seriesId.value=parseInt(index);
        loadData();
    }
    
    function removeTag(index){
        showSkill.value=showSkill.value.filter((t,i)=>i!==index);
        
           
        //將更正合併到原本資料中
        let oldTag=CardArray.value.find((c)=>c.id===parseInt(selectCardId.value)).tag;
        CardArray.value.find((c)=>c.id===parseInt(selectCardId.value)).tag=oldTag.filter((f,i)=>i!==index);
        console.log(CardArray.value.find((c)=>c.id===parseInt(selectCardId.value)));
    }

    function addTag(){
        var tagIndex=parseInt(document.getElementById('tagSelect').value);
        var targetTag={};

        func.value.forEach((type)=>{
            let t=type.data.find((f)=>f.id===tagIndex);
            if(t===undefined)
                return;
            targetTag=t;

        });

        if(showSkill.value.includes(targetTag)||tagIndex===0){
            return;
        }

        //console.log(targetTag);

        showSkill.value.push(targetTag);
        //console.log(showSkill.value);

        showSkill.value=showSkill.value.sort((a,b)=>{return a.id-b.id});

        CardArray.value.find((c)=>c.id===selectCardId.value).tag.push(tagIndex);

        CardArray.value.find((c)=>c.id===selectCardId.value).tag=CardArray.value.find((c)=>c.id===selectCardId.value).tag.sort((a,b)=>{return a-b});
        console.log(Card.find((c)=>c.id===selectCardId.value).tag);//備份的
        console.log(CardArray.value.find((c)=>c.id===selectCardId.value).tag);//有更動過的

    }
    //新增搜尋關鍵字
    function addWord(){
        let target=CardArray.value.find((c)=>c.id===selectCardId.value).keyword;

        //避免原本就沒有關鍵字生成
        if(target===undefined||target===null){
            target=[];
        }
        
        target.push(searchWord);
        console.log(target);
        //清除先前輸入結果
        CardArray.value.find((c)=>c.id===selectCardId.value).keyword=target;
        console.log(CardArray.value.find((c)=>c.id===selectCardId.value).keyword);
        searchWord='';
    }

    function removeWord(index){
        let target=CardArray.value.find((c)=>c.id===selectCardId.value).keyword;

        target=target.filter((k,i)=>i!==index);

        CardArray.value.find((c)=>c.id===selectCardId.value).keyword=target;

        console.log(CardArray.value.find((c)=>c.id===selectCardId.value).keyword);
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

    function changeCard(index){
        //console.log(index);
        selectCardId.value=index;
        targetCard.value=CardArray.value.find((c)=>c.id===selectCardId.value);

        //清空
        showSkill.value=[];
        //console.log(func.value);
        targetCard.value.tag.forEach((t)=>{
            funcData.forEach((type)=>{
                let targetskill=type.data.find((data)=>data.id===t);
                if(targetskill!==undefined){
                    showSkill.value.push(targetskill);
                }
            });
        });
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


    //關鍵字搜尋
    function keywordChange(event){
        keyword = event.target.value
        console.log(keyword);

        if(keyword===''){
            func.value=funcData;//復原
            return;
        }

        let filterArr=[];
        funcData.forEach((type)=>{
            let result=[];
            type.data.forEach((f)=>{
                if(f.name.includes(keyword))
                    result.push(f);
            })            
            if(result.length!==0){
                console.log(result);
                let insertType=type;
                insertType.data=result;
                filterArr.push(insertType);
            }
        });

        if(filterArr.length!==0)
            func.value=filterArr;
        else
            func.value=[];
    }

    function searchWordChange(event){
        searchWord=event.target.value;

        console.log(searchWord);
    }

    function RecoverClick(){
        let target=Card.find((c)=>c.id===selectCardId.value);
        if(target===undefined||target===null)
            return;

        //將原先的資料叫出來 使用深拷貝copy出來避免有任何倍更動過的風險
        let oldData=JSON.parse(JSON.stringify(target));
        
        
        //清空
        showSkill.value=[];
        
        oldData.tag.forEach((t)=>{
            funcData.forEach((type)=>{
                let targetskill=type.data.find((data)=>data.id===t);
                if(targetskill!==undefined){
                    showSkill.value.push(targetskill);
                }
            });
        });
        targetCard.value=oldData;

        //覆蓋原本修改過
        //CardArray.value.find((c)=>c.id===selectCardId.value)=oldData;
        Object.assign(target,oldData);
    }


    //雙擊label顯示該input
    function showInputBox(event){
        let targetInputBox=event.target.parentElement.querySelector('textarea');
        targetInputBox.classList.remove('hidden');
        event.target.classList.add('hidden');
    }

    //敘述修改
    function descModify(event,type,index=undefined){
        console.log(event.key);
        //如果是按下Enter 則儲存
        if(event.key==="Enter"){
            
            switch(type){
                case 'instant':
                    CardArray.value[selectCardId.value-1].instantEffect[index]=event.target.value;
                    break;
                case 'round' :
                    CardArray.value[selectCardId.value-1].roundEffect[index]=event.target.value;
                    break;
                case 'combo' :
                    CardArray.value[selectCardId.value-1].comboEffect[index]=event.target.value;
                    break;
            }

            console.log(CardArray.value.find((c)=>c.id===selectCardId.value));

            let targetSpan=event.target.parentElement.querySelector('span');
            targetSpan.classList.remove('hidden');
            event.target.classList.add('hidden');
            return;
        }

        //如果是按下Esc 則還原
        if(event.key==="Esc"){
            
        }

        if(event.key==="Delete"){
            switch(type){
                case 'instant':
                    break;
                case 'round' :
                    CardArray.value.find((c)=>c.id===selectCardId.value).roundEffect=CardArray.value.find((c)=>c.id===selectCardId.value).roundEffect.filter((d,i)=>i!==index);
                    break;
                case 'combo' :
                    CardArray.value.find((c)=>c.id===selectCardId.value).comboEffect=CardArray.value.find((c)=>c.id===selectCardId.value).comboEffect.filter((d,i)=>i!==index);
                    break;
            }
        }
        
    }

    function addDesc(type){
        let t=CardArray.value.find((c)=>c.id===selectCardId.value);
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
    function removeDesc(type){
        let t=CardArray.value.find((c)=>c.id===selectCardId.value);

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
        document.getElementById('overlay').style.display='block';
        popup.value.setFunc(func.value);
    }

    function closeHandle(){
        document.getElementById('overlay').style.display='none';
    }

    function changeEditMode(modeName){
        editMode.value=modeName;
    }

    function changeCardDataFromChild(data){
        Card=data;
        CardArray.value=JSON.parse(JSON.stringify(Card));
    }

    //監聽targetCard在任一子物件中是否有被修改過?
    watch(targetCard, (newValue, oldValue) => {
        
        CardArray.value[newValue.id-1]=newValue;
        
    }, { deep: true }); 
    provide('close',closeHandle);//提供關閉彈出視窗方法


    onMounted(()=>{
        loadData();
    });
</script>
<template>
    <div class="main">
        <div class="w-4/5 mx-auto mb-2">
            <span class="text-white text-xl">系列</span>
            <div class="flex flex-row">
                <button class="addBtn mr-5 w-[100px]" @click="(event)=>changeSeries(1)" id="series1">晨曦塔</button>
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
            <div v-if=" editMode == 'edit_basic'" class="w-2/5 pl-3 right mt-5 h-[500px] relative ">
                <EditBasic  v-model:card="targetCard" />
            </div>
            <div class="w-2/5 pl-3 right mt-5 h-[500px] relative " v-if="editMode == 'edit_tag' ">
                <div class="flex-col">
                    <span class="standwardLabel">自身技能標籤</span>
                    <div class="mb-3">
                        <input type="text" v-bind:value="keyword" placeholder="技能關鍵字" @input=" event=>keywordChange(event)" class="colorSelect"/>
                    </div>
                    <div v-if="func?.length!==0">
                        <select class="colorSelect w-[150px]" id="tagSelect">
                            <option :value="0">{{'請選擇'}}</option>
                            <optgroup v-for="types in func" :label="types.typeName">
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
            </div>
            <div class="w-2/5 pl-3 right mt-5 h-[500px] relative " v-if="editMode == 'edit_keyword'">
                <EditKeyword v-model:card="targetCard"/>
            </div>
            <div class="w-2/5 pl-3 right mt-5 h-[500px] relative " v-if="editMode == 'edit_description'">
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
            <div class="w-2/5 pl-3 right mt-5 h-[500px] relative " v-if="editMode == 'delete'">
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
                        <span class="w-[100%] text-center bg-amber-900 text-white rounded-md" v-if="c.rarity===1">{{ c.id }}</span>
                        <span class="w-[100%] text-center bg-slate-500 text-white rounded-md" v-if="c.rarity===2">{{ c.id }}</span>
                        <span class="w-[100%] text-center bg-yellow-600 text-white rounded-md" v-if="c.rarity===3">{{ c.id }}</span>
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
<style scoped>
    @import '../assets/css/modify.css';
</style>