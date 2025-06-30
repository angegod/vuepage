<script setup>
    import { inject,ref,provide,nextTick } from 'vue';
    import { onMounted, onUnmounted } from 'vue';
    
    import funcData from './data/funcData';
    import Card from './data/Card';
    import Switch from '../components/Switch.vue';
    import LazyImage from '../components/LazyImage.vue';
    import Calculator from './Calculator.vue';
    import CardHint from './hint/Cardhint.vue';
    
    import { eventBus } from './data/eventBus';

    

    const isAddable=inject('frontpath');//圖片默認路徑，要配合之後有可能上線
    console.log(isAddable);

    let seriesIndex=ref([]);//時光牌系列代號
    let selectFunc=ref([]);//將被點選的解盾選項加入在此 默認使用And
    let selectRarity=ref([]);//被選擇的稀有度
    let targetCard=ref([]);//被選擇的卡片清單
    let showCard=ref({});//顯示該卡詳細資訊

    let b1=ref(null);
    let b2=ref(false);
    let isInput=ref(false);
    let gifShow=ref(false);//是否顯示載入動畫
    let isSearch=ref(false);//是否有搜尋過 避免不必要的顯示
    let mode=ref(null);//彈出視窗顯示的內容種類

    //排序方式
    let sortCond=ref([{type:'Rarity',sort:false},{type:'Id',sort:false}]);//新增sort條件順序


    function checkData(){//避免資料更新時需要改動，預設檢查機制
        let count=0;
        let array=[];//改動的array

        //將功能作序位
        funcData.forEach((typeData)=>{
            typeData.data.forEach((d)=>{
                count++;
                if(d.id!==count){
                    array.push([d.id,count]);
                    d.id=count;
                }
            })
        });

        Card.forEach(series => {
            series.card.forEach((c)=>{
                let modfiedNum=[];//避免二度修改
                array.forEach((m)=>{
                    //如果卡片標籤有自更動過編號 且先前沒有更動紀錄
                    if(c.tag.includes(m[0])&&!modfiedNum.includes(m[0])){
                        
                        c.tag[c.tag.findIndex((t)=>t===m[0])]=m[1];
                        modfiedNum.push(m[1]);//告訴系統說這個數字已經更改過了
                    }
                })
            })
        });

    }



    //篩選器點選
    function clicked(text){

        var targetClass=text.split('_')[0];
        var targetBtnIndex=text.split('_')[1];
        
        if(targetClass!=='func'&&!targetClass==''){
            var targetBtn=document.querySelectorAll(`.${targetClass}`)[targetBtnIndex-1];
            (!targetBtn.classList.contains('clicked'))?targetBtn.classList.add('clicked'):targetBtn.classList.remove('clicked');
        }
        if(targetClass==='func'){
            var targetBtn=document.getElementById('btn'+targetBtnIndex);
            (!targetBtn.classList.contains('clicked'))?targetBtn.classList.add('clicked'):targetBtn.classList.remove('clicked');
            if(selectFunc.value.find((item)=>item.id.toString()===targetBtnIndex)===undefined){//新增
                funcData.forEach((t)=>{
                    var target=t.data.find((d)=>d.id.toString()===targetBtnIndex);
                    if(target!==undefined)
                        selectFunc.value.push(target);
                })
            }
            else//刪除
                selectFunc.value=selectFunc.value.filter((item)=>item.id.toString()!==targetBtnIndex);
        }

        //時光牌系列篩選
        if(targetClass==='series'&&!seriesIndex.value.includes(parseInt(targetBtnIndex))){
            seriesIndex.value.push(parseInt(targetBtnIndex));
        }else if(targetClass==='series')
            seriesIndex.value=seriesIndex.value.filter((num)=>num!==parseInt(targetBtnIndex));//刪除

        //稀有度用篩選 篩選方式使用or
        if(targetClass==='rarity'&&!selectRarity.value.includes(parseInt(targetBtnIndex)))//新增
            selectRarity.value.push(parseInt(targetBtnIndex));
        else if(targetClass==='rarity')
            selectRarity.value=selectRarity.value.filter((num)=>num!==parseInt(targetBtnIndex));//刪除


        //排序方式
        if(targetClass==='sort'){
            let targetType = targetBtnIndex == 1 ? 'Id' : targetBtnIndex == 2 ? 'Rarity' : '';

            var t=sortCond.value.find((c)=>c.type==targetType);
            
            sortCond.value=sortCond.value.filter((c)=>c!==t);
            sortCond.value.push({type:targetType,sort:!t.sort});
            console.log(sortCond.value);
            
            sortData();
            return;
        }

        
    }

    function setData(){
        //清空陣列
        targetCard.value=[];

        //搜尋條件 這邊就會篩選掉不符合的系列
        if(seriesIndex.value.length===0) {
            alert('請選擇任一時光牌系列!');
            return;
        }
        seriesIndex.value.forEach((s)=>{
            if(Card[s-1].card===undefined) return;
            Card[s-1].card.forEach((item)=>{

                //稀有度篩選 or搜尋
                if(selectRarity.value.length!==0&&!selectRarity.value.includes(item.rarity))
                    return;

                //解盾篩選 必須符合全部
                let selectable=true;
                if(b2.value.getBool()){
                
                    if(!selectFunc.value.length==0){//如果有選入功能再做篩選，反之則不用篩選
                        selectFunc.value.forEach((f)=>{
                            //如果不符合條件，則不選入最終顯示結果
                            //(!item.tag.includes(f.id))?selectable=false:selectable=selectable;
                            if(!item.tag.includes(f.id)){
                                selectable=false;
                                return;
                            }
                        });
                    }
                    //如果篩選符合結果則會
                    if(selectable)
                        targetCard.value.push(item);
                }else if(!b2.value.getBool()){
                    if(!selectFunc.value.length==0){
                        selectable=false;
                        selectFunc.value.forEach((f)=>{
                            //如果不符合條件，則不選入最終顯示結果
                            (item.tag.includes(f.id))?selectable=true:selectable=selectable;
                        });
                    }

                    if(selectable)
                        targetCard.value.push(item);
                }
            });
        });
        sortData();

        //最後滾至結果div
        isSearch.value=true;

        //避免初次掛載元件無法正常顯示
        nextTick(()=>{
            const targetElement = document.getElementById("searchCard");
            if(targetElement){
                targetElement.scrollIntoView({ behavior: "smooth" });
            } 
        });
    }

    function sortData(){
        //如果不指定其他排序方式 則不改變顯示直接跳出
        //根據使用者定義排序條件 做重新排序
        
        sortCond.value.forEach((c)=>{
            targetCard.value=targetCard.value.sort((a,b)=>{
                let order=(c.sort)?-1:1;

                if(c.type==='Id')//稀有度優先排序 再來才是編號
                    return (a.id-b.id) * order;
                else if(c.type==='Rarity')
                    return (a.rarity-b.rarity) * order;
                
            });
        });
    }

    //點擊時光牌資訊時，跳出視窗
    function clickHandle(cardId){
        
        Card.forEach((s)=>{
            if(s.card.find((c)=>c.id===cardId))
                showCard.value=s.card.find((c)=>c.id===cardId);
        })

        document.getElementById('overlay').style.display="block";
        mode.value='card';
    }

    //關閉彈出視窗
    function closeHandle(){
        document.getElementById('overlay').style.display="none";
        mode.value=null;
    }

    //切換成文字搜尋還是條件搜尋
    function TextOrCondition(){
        isInput.value=!isInput.value;
        //清空系列跟標籤選擇
        seriesIndex.value=[];//時光牌系列代號
        selectFunc.value=[];//將被點選的解盾選項加入在此 默認使用And
        selectRarity.value=[];//被選擇的稀有度
        targetCard.value=[];//被選擇的卡片清單
        showCard.value=[];//顯示該卡詳細資訊

        //console.log(b1.value.getBool());
        if(isInput.value)
            eventBus.emit('HideBtn');
        else
            eventBus.emit('ShowBtn');
        
        //回歸到初次搜尋階段
        isSearch.value=false;
    }

    function CardByText(event){
        if(event.key==="Enter"){
            gifShow.value=true;
            const start=performance.now();

            let p1= new Promise((resolve)=>{
                
                let tempArr=[];
                Card.forEach((series,sIndex)=>{
                    series.card.forEach((c,cIndex)=>{
                        let added=false;

                        //依名稱查詢
                        if(c.name.includes(event.target.value)){
                            //targetCard.value.push(c);
                            added=true;
                        }
                        //依關鍵字查詢

                        if(c.keyword!==undefined){
                            if(c.keyword.find((k)=>k.includes(event.target.value))!==undefined){
                                added=true;
                            }
                        }
                       
                        //依技能敘述查詢
                        c.tag.forEach((t)=>{
                            funcData.forEach((typeData)=>{
                                typeData.data.forEach((d)=>{
                                   if(d.id===t&&d.name.includes(event.target.value))
                                        added=true; 
                                   
                                })
                            });
                        });

                        if(added)
                            tempArr.push(c);

                        //如果該卡片是最後一張的時候
                        if(cIndex===series.card.length-1||sIndex===series.length-1){
                            const end=performance.now();
                            resolve({time:end-start,arr:tempArr});
                        }
                        
                    });
                })
            });

            
            p1.then((data)=>{
                let processTime=2000;
                console.log(data);
                if(data.time<2000){
                    setTimeout(()=>{
                        targetCard.value=data.arr;
                        
                        //關閉loading動畫
                        gifShow.value=false;
                        

                        isSearch.value=true;

                        //避免初次掛載元件無法正常顯示
                        //最後滾至結果div
                        nextTick(()=>{
                            const targetElement = document.getElementById("searchCard");
                            targetElement.scrollIntoView({ behavior: "smooth" });
                        })
                        
                        
                    },processTime-data.time)
                }
                    
            })
        }
        
    }
    //刪除卡片
    function deleteCard(id){
        targetCard.value=targetCard.value.filter((t)=>t.id!==id);
    }

    //顯示符石盤面分布
    function spreadShow(id){
        const hoverImage=document.getElementById('spread');
        hoverImage.style.display = 'block';
    }

    function spreadHide(id){
        const hoverImage=document.getElementById('spread');
        hoverImage.style.display = 'none';
    }

    function spreadMove(event,id){
        const hoverImage=document.getElementById('spread');
        hoverImage.style.left = `${event.clientX + 10}px`; 
        hoverImage.style.top = `${event.clientY - 170}px`;
    }

    //呼叫琉璃計算器頁面
    function callcalculator(){
        if(mode.value===null){
            mode.value='calculator';
            document.getElementById('overlay').style.display="block";
            return;
        }else{
            mode.value=null;
            document.getElementById('overlay').style.display="none";
            return;
        }
    }

    provide('setData',setData);
    
    //meta Tag
    useHead({
        title: '時光牌圖鑑',
        meta: [
            { name: 'description', content: '時光牌技能搜尋工具，玩家可以依照需求找到想要的時光牌' },
            { property: 'og:title', content: '時光牌圖鑑' },
            { property: 'og:description', 
            content: '時光牌技能搜尋工具:玩家可以依照需求找到想要的時光牌.\n目前有推出技能跟文字搜尋兩種方式，可以根據個人習慣使用該工具。' }
        ]
    });

    //監聽是否有按下按鈕
    const callsetData = () => {
        setData();
    };

    onMounted(() => {
        checkData();
        eventBus.on('callsetData', callsetData);
    });

    onUnmounted(() => {
        eventBus.off('callsetData', callsetData);
    });
</script>
<template>
    <div class="Card [&>div]:w-4/5 [&>div]:mx-auto max-[500px]:[&>div]:w-5/6 pt-3" >
        <div class="flex flex-row flex-wrap justify-between max-[400px]:flex-col">
            <div class="flex flex-row max-[450px]:flex-col">
                <h1 class="text-[28px] font-bold text-red-600 mr-3">時光牌圖鑑</h1>
                <Switch ref="b1" @refresh="TextOrCondition" :text1="'條件搜尋'" :text2="'文字搜尋'"/>
            </div>
            <div class="max-[500px]:w-[100%]">
                <button type="button" class="text-white border-b-white border-b-[1px]" @click="callcalculator">琉璃計算器</button>
            </div>
        </div>
        <div v-if="!isInput">
            <div class="flex flex-col flex-wrap w-[100%] mt-5">
                <div><span class="text-white font-bold text-xl">系列</span></div>
                <div class="[&>button]:mr-2 [&>button]:w-[10%] max-sm:[&>button]:w-[20%] [&>button]:min-w-[100px]
                        max-[500px]:[&>button]:small max-[500px]:[&>button]:min-w-[100px]">
                    <button type="button" class="btn series break-keep" v-on:click="clicked('series_1')">晨曦塔</button>
                </div>
            </div>
            <div class="flex flex-col flex-wrap w-[100%] mt-5">
                <div class="flex flex-row align-middle">
                    <span class="text-white font-bold text-xl mr-3">稀有度</span>           
                </div>
                <div class="flex flex-row">
                    <button type="button" class="max-w-[70px] mr-2 relative inline-block rarity" v-for="i in 3" v-on:click="clicked(`rarity_${i}`)" :key="`rarity${i}`">
                        <img :src="isAddable+`/images/rarity${i}.png`" :alt="`rarity${i}`" />
                        <img :src="isAddable+'/images/checked.svg'" class="text-white top-[0px] right-0 absolute" />
                    </button>
                </div>
            </div>
            <div class="flex flex-col flex-wrap w-[100%] mt-5 relative">
                <div class="flex flex-row align-middle">
                    <span class="text-white font-bold text-xl mr-3 pt-1.5">功能</span>
                    <Switch ref="b2" @refresh="" :text1="'使用Or搜尋'" :text2="'使用And搜尋'"/>
                </div>
                <div v-for="t in funcData" class="mt-5">
                    <div>
                        <span class="text-amber-600 font-bold text-xl">{{ t.typeName }}</span>
                    </div>
                    <div class="[&>button]:mr-2 [&>button]:w-[20%] max-[500px]:[&>button]:w-[40%] [&>button]:min-w-[200px]
                            max-[500px]:[&>button]:small max-[500px]:[&>button]:min-w-[140px]">
                        <button type="button"  v-for="func in t.data" class="btn func mb-2 min-w-[160px] min-h-[30px]" v-on:click="clicked(`func_${func.id}`)" :id="'btn'+func.id">{{func.name }}</button>
                    </div> 
                </div>
            </div>
        </div>
        <div v-else class="flex flex-col mt-3">
            <span class="text-white">請輸入時光牌名稱關鍵字:</span>
            <div class="flex flex-row items-center">
                <input type="text" placeholder="Keyword" class="rounded-md max-w-[200px] pl-3 max-h-[25px]" @keyup="event=>CardByText(event)" :disabled="gifShow"/>
                <CardHint />
                <img :src="isAddable+'/images/loading.gif'" alt="555" class="w-[50px] h-[30px]" v-if="gifShow"/>
            </div>

        </div>
        
        <div class="flex flex-col flex-wrap mt-5" id="searchCard" v-show="isSearch">
            <div class="flex flex-row">
                <span class="text-white font-bold text-xl">搜尋結果</span>
                <span class="text-amber-500 text-xl font-bold">{{`(共${targetCard.length}筆)`}}</span>
            </div>
            <div class="flex flex-row max-[500px]:flex-col 
                    [&>button]:min-w-[200px]  max-[500px]:[&>button]:small max-[500px]:[&>button]:w-[150px] max-[500px]:[&>button]:min-w-[150px]">
                <button type="button" class="mr-2 sort px-2 my-2 flex flex-row justify-center items-center btn" @click="clicked('sort_1')">
                    {{ (!sortCond.find((c)=>c.type==='Id').sort)?'編號:小':'編號:大' }}
                    <img :src="isAddable+'/images/arrow_right.png'" class="w-[30px]" alt="left"/>
                    {{ (!sortCond.find((c)=>c.type==='Id').sort)?`大`:'小' }}
                </button>
                <button type="button" class="mr-2 sort px-2 my-2 flex flex-row justify-center items-center btn" @click="clicked('sort_2')">
                    {{ (!sortCond.find((c)=>c.type==='Rarity').sort)?'稀有度:低':'稀有度:高' }}
                    <img :src="isAddable+'/images/arrow_right.png'" class="w-[30px]" alt="left"/>
                    {{ (!sortCond.find((c)=>c.type==='Rarity').sort)?'高':'低' }}
                </button>
            </div>
            <div class="flex flex-row flex-wrap max-[400px]:justify-evenly" v-if="targetCard.length!==0">
                <div v-for="card in targetCard" class="w-1/8 mr-3" :key="card.id">
                    <div class="flex flex-col mb-3" >
                        <div @click="clickHandle(card.id)">
                            <LazyImage :imageLink="card.image" :id="card.id" @deleteCard="deleteCard"/>
                        </div>
                        <span class="w-[100%] text-center bg-amber-900 text-white" v-if="card.rarity===1">{{ card.id }}</span>
                        <span class="w-[100%] text-center bg-slate-500 text-white" v-if="card.rarity===2">{{ card.id }}</span>
                        <span class="w-[100%] text-center bg-yellow-600 text-white" v-if="card.rarity===3">{{ card.id }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col" v-else-if="targetCard.length===0&&isSearch">
                <span class="text-red-500 text-xl mt-5 font-bold">查無搜尋結果!!</span>
                <span class="text-red-500 text-xl  font-bold">No Search Found!!</span>
                <img :src="isAddable+'/images/NotFound.webp'" width="150" height="150" alt="目前沒有匹配結果.No reults found." />
            </div>
        </div>
        <div>
            <div className='overlay' id="overlay">
                <div class='popup max-[500px]:w-[80%] max-[500px]:min-w-[200px]' v-if="mode==='card'">
                    <div className='close' v-on:click="closeHandle">&#10006;</div>
                    <div class="w-5/6 mx-auto mt-5 flex flex-row flex-wrap justify-between mb-5 max-[450px]:justify-center">
                        <div class="w-2/5 min-w-[150px] max-[500px]:w-[100%]">
                            <div class="[&>span]:text-[20px] mb-3 text-center">
                                <span class="w-[100%] text-center text-amber-900 font-bold" v-if="showCard.rarity===1">{{ showCard.name }}</span>
                                <span class="w-[100%] text-center text-slate-500 font-bold" v-if="showCard.rarity===2">{{ showCard.name }}</span>
                                <span class="w-[100%] text-center text-yellow-600 font-bold" v-if="showCard.rarity===3">{{ showCard.name }}</span>
                            </div>
                            <div class="imgbox1 max-w-[150px] mx-auto" v-if="showCard.rarity===1">
                                <img :src="isAddable+showCard.fullimage" :alt="showCard.name" class="h-[40vh] min-w-[150px] max-[400px]:h-[45vh]"/>
                            </div>
                            <div class="imgbox2 max-w-[150px] mx-auto" v-if="showCard.rarity===2">
                                <img :src="isAddable+showCard.fullimage" :alt="showCard.name" class="h-[40vh] min-w-[150px] max-[400px]:h-[45vh]"/>
                            </div>
                            <div class="imgbox3 max-w-[150px] mx-auto" v-if="showCard.rarity===3">
                                <img :src="isAddable+showCard.fullimage" :alt="showCard.name" class="h-[40vh] min-w-[150px] max-[400px]:h-[45vh]"/>
                            </div>
                            
                        </div>
                        <div class="w-1/2 flex flex-col min-w-[150px] ml-2 max-[450px]:ml-0 max-[500px]:w-[100%] mt-1">
                            <div class="flex flex-row flex-wrap max-[500px]:mt-2 max-[500px]:justify-center">
                                <div class="flex flex-row mt-1 w-1/2 max-[500px]:justify-center">
                                    <div class="flex bg-amber-900 text-white rounded-md w-1/5 min-w-[70px] justify-center" v-if="showCard.rarity===1">
                                        <span>進場FP</span>
                                    </div>
                                    <div class="flex bg-gray-600 text-white rounded-md w-1/5 min-w-[70px] justify-center" v-if="showCard.rarity===2">
                                        <span>進場FP</span>
                                    </div>
                                    <div class="flex bg-yellow-600 text-white rounded-md w-1/5 min-w-[70px] justify-center" v-if="showCard.rarity===3">
                                        <span>進場FP</span>
                                    </div>
                                    <div class="mx-1">
                                        <span>{{ showCard.PointEnter }}</span>
                                    </div>
                                </div>
                                <div class="flex flex-row mt-1 w-1/2 max-[500px]:justify-center">
                                    <div class="flex bg-amber-900 text-white rounded-md w-1/5 min-w-[70px] justify-center" v-if="showCard.rarity===1">
                                        <span>消耗FP</span>
                                    </div>
                                    <div class="flex bg-gray-600 text-white rounded-md w-1/5 min-w-[70px] justify-center" v-if="showCard.rarity===2">
                                        <span>消耗FP</span>
                                    </div>
                                    <div class="flex bg-yellow-600 text-white rounded-md w-1/5 min-w-[70px] justify-center" v-if="showCard.rarity===3">
                                        <span>消耗FP</span>
                                    </div>
                                    <div class="mx-1">
                                        <span>{{ showCard.PointConsume }}</span>
                                    </div>
                                </div>
                                <div class="flex flex-row mt-1 w-1/2 max-[500px]:justify-center">
                                    <div class="flex bg-amber-900 text-white rounded-md w-1/5 min-w-[70px] justify-center" v-if="showCard.rarity===1">
                                        <span>補充FP</span>
                                    </div>
                                    <div class="flex bg-gray-600 text-white rounded-md w-1/5 min-w-[70px] justify-center" v-if="showCard.rarity===2">
                                        <span>補充FP</span>
                                    </div>
                                    <div class="flex bg-yellow-600 text-white rounded-md w-1/5 min-w-[70px] justify-center" v-if="showCard.rarity===3">
                                        <span>補充FP</span>
                                    </div>
                                    <div class="mx-1">
                                        <span>{{ showCard.PointGet }}</span>
                                    </div>
                                </div>
                                <div class="flex flex-row mt-1 w-1/2 max-[500px]:justify-center">
                                    <div class="flex bg-amber-900 text-white rounded-md w-1/5 min-w-[70px] justify-center" v-if="showCard.rarity===1">
                                        <span>最大FP</span>
                                    </div>
                                    <div class="flex bg-gray-600 text-white rounded-md w-1/5 min-w-[70px] justify-center" v-if="showCard.rarity===2">
                                        <span>最大FP</span>
                                    </div>
                                    <div class="flex bg-yellow-600 text-white rounded-md w-1/5 min-w-[70px] justify-center" v-if="showCard.rarity===3">
                                        <span>最大FP</span>
                                    </div>
                                    <div class="mx-1">
                                        <span>{{ showCard.PointMax }}</span>
                                    </div>
                                </div>

                            </div>
                            <div class="flex flex-col mt-5 min-h-[10vh] max-[500px]:justify-center">
                                <div class="flex flex-row line">
                                    <div class="flex bg-amber-900 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="showCard.rarity===1">
                                        <span>即時效果</span>
                                    </div>
                                    <div class="flex bg-gray-600 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="showCard.rarity===2">
                                        <span>即時效果</span>
                                    </div>
                                    <div class="flex bg-yellow-600 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="showCard.rarity===3">
                                        <span>即時效果</span>
                                    </div>
                                </div>
                                <div class="flex flex-col">
                                    <span v-for="effect in showCard.instantEffect" class="text-black">&#8226;{{ effect }}</span>
                                </div>
                            </div>
                            <div class="flex flex-col mt-5 min-h-[15vh] max-[500px]:justify-center">
                                <div class="flex flex-row line">
                                    <div class="flex bg-amber-900 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="showCard.rarity===1">
                                        <span>回合效果</span>
                                    </div>
                                    <div class="flex bg-gray-600 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="showCard.rarity===2">
                                        <span>回合效果</span>
                                    </div>
                                    <div class="flex bg-yellow-600 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="showCard.rarity===3">
                                        <span>回合效果</span>
                                    </div>
                                </div>
                                <div class="flex flex-col">
                                    <span v-for="effect in showCard.roundEffect" class="text-black">&#8226;{{ effect }}</span>
                                </div>
                            </div>
                            <div class="flex flex-col mt-5 min-h-[10vh]">
                                <div class="flex flex-row line">
                                    <div class="flex bg-amber-900 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="showCard.rarity===1">
                                        <span>連動效果</span>
                                    </div>
                                    <div class="flex bg-gray-600 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="showCard.rarity===2">
                                        <span>連動效果</span>
                                    </div>
                                    <div class="flex bg-yellow-600 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="showCard.rarity===3">
                                        <span>連動效果</span>
                                    </div>
                                </div>
                                <div class="flex flex-col">
                                    <div v-for="(effect,i) in showCard.comboEffect">
                                        <span  class="text-black" v-if="showCard.spread===undefined">&#8226;{{ effect }}</span>
                                        <span  class="text-black cursor-help underline" v-else-if="showCard.spread.index===i+1"
                                            @mousemove="event=>spreadMove(event,showCard.id)" 
                                            @mouseenter="spreadShow(showCard.id)" 
                                            @mouseleave="spreadHide(showCard.id)"
                                        >&#8226;{{ effect }}</span>
                                        <span  class="text-black" v-else>&#8226;{{ effect }}</span>
                                    </div>
                                    <div  id="spread" style="display: none;" class="spread fixed z-[1000]">
                                        <img :src="isAddable+showCard.spread.image" class="w-[240px]"   v-if="showCard.spread!==undefined" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='popup max-[500px]:w-[80%] max-[500px]:min-w-[200px]' v-else-if="mode==='calculator'">
                    <div class='close text-black' v-on:click="closeHandle">&#10006;</div>
                    <Calculator />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    @import '../assets/css/card.css';
</style>