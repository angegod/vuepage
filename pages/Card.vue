<script lang="ts" setup>
    import { inject,ref,provide,nextTick } from 'vue';
    import { onMounted, onUnmounted } from 'vue';
    
    import funcData from '../components/data/funcData.ts';
    import Card from '../components/data/Card.ts';
    import Switch from '@/components/Switch.vue';
    import LazyImage from '@/components/LazyImage.vue';
    import Calculator from '../components/Calculator.vue';
    import CardHint from '@/components/hint/Cardhint.vue';
    import EffectHint from '@/components/hint/EffectHint.vue';
    import CardSection from '@/components/CardSection.vue';
    import CardEffectBlock from '@/components/CardEffectBlock.vue';
    import CardKeyWord from '@/components/hint/CardKeyWord.vue';
    
    import { useCardBtnStore } from '../components/data/store.js';
    import type { CardByTextResultItem, CardItem, CardSeriesItem, SortConditionItem } from '@/interface/card.ts';
    import type { skillItem } from '@/interface/funcData.ts';

    const store = useCardBtnStore();

    //圖片前綴字串
    const isAddable=ref<string>('');

    let seriesIndex=ref<number[]>([]);//時光牌系列代號
    let selectFunc=ref<skillItem[]>([]);//將被點選的解盾選項加入在此 默認使用And
    let selectRarity=ref<number[]>([]);//被選擇的稀有度
    let targetCard=ref<CardItem[]>([]);//被選擇的卡片清單
    let showCard=ref<CardItem|null>(null);//顯示該卡詳細資訊
    type EffectKey = "tag" | "roundTag" | "comboTag";

    let selectEffectType = ref<EffectKey[]>([]);

    let b1=ref<InstanceType<typeof Switch>>();
    let b2=ref<InstanceType<typeof Switch>>();
    let isInput=ref<boolean>(false); //是否為輸入模式
    let gifShow=ref<boolean>(false);//是否顯示載入動畫
    let isSearch=ref<boolean>(false);//是否有搜尋過 避免不必要的顯示
    let mode=ref<string|null>(null);//彈出視窗顯示的內容種類

    //排序方式
    let sortCond=ref<SortConditionItem[]>([{type:'Rarity',sort:false},{type:'Id',sort:false}]);//新增sort條件順序

    //收合狀況
    let expand = ref<boolean[]>([]);

    //彈出視窗
    const modalRef = ref<HTMLElement | null>(null)


    function checkData(){//避免資料更新時需要改動，預設檢查機制
        let count=0;
        let array=[] as number[][];//改動的array

        //將功能作序位
        funcData.forEach((typeData)=>{
            typeData.data.forEach((d)=>{
                count++;
                if(d.id!==count){
                    array.push([d.id,count]);
                    d.id=count;
                }
            });

            //預設該分類為展開
            expand.value.push(true);
        });


        Card.forEach(series => {
            series.card.forEach((c)=>{
                let modfiedNum=[] as number[];//避免二度修改
                array.forEach((m)=>{
                    //如果卡片標籤有自更動過編號 且先前沒有更動紀錄
                    if(c.tag.includes(m[0])&&!modfiedNum.includes(m[0])){
                        
                        c.tag[c.tag.findIndex((t)=>t===m[0])]=m[1];
                        modfiedNum.push(m[1]);//告訴系統說這個數字已經更改過了
                    }
                })
            });
        });

    }

    function isExpand(index:number){
        expand.value[index] = !expand.value[index];
    }


    //篩選器點選
    function clicked(text:string){
        let targetClass=text.split('_')[0];
        let targetBtnIndex = Number(text.split('_')[1]);
        
        if(targetClass!=='func'&&!(targetClass=='')){
            let targetBtn=document.querySelectorAll(`.${targetClass}`)[targetBtnIndex-1];
            (!targetBtn.classList.contains('clicked'))?targetBtn.classList.add('clicked'):targetBtn.classList.remove('clicked');
        }
        if(targetClass==='func'){
            let targetBtn=document.getElementById('btn'+targetBtnIndex) as HTMLDivElement;
            (!targetBtn.classList.contains('clicked'))?targetBtn.classList.add('clicked'):targetBtn.classList.remove('clicked');
            
            if(selectFunc.value.find((item)=>item.id===targetBtnIndex)===undefined){//新增
                funcData.forEach((t)=>{
                    var target=t.data.find((d)=>d.id===targetBtnIndex);
                    if(target!==undefined)
                        selectFunc.value.push(target);
                })
            }
            else//刪除
                selectFunc.value=selectFunc.value.filter((item)=>item.id!==targetBtnIndex);
        }

        //時光牌系列篩選
        if(targetClass==='series'&&!seriesIndex.value.includes(targetBtnIndex)){
            seriesIndex.value.push(targetBtnIndex);
        }else if(targetClass==='series')
            seriesIndex.value=seriesIndex.value.filter((num)=>num!==targetBtnIndex);//刪除

        //稀有度用篩選 篩選方式使用or
        if(targetClass==='rarity'&&!selectRarity.value.includes(targetBtnIndex))//新增
            selectRarity.value.push(targetBtnIndex);
        else if(targetClass==='rarity')
            selectRarity.value=selectRarity.value.filter((num)=>num!==targetBtnIndex);//刪除


        //排序方式
        if(targetClass==='sort'){
            let targetType = targetBtnIndex == 1 ? 'Id' : targetBtnIndex == 2 ? 'Rarity' : '';

            let t=sortCond.value.find((c)=>c.type==targetType) as SortConditionItem;
            
            sortCond.value=sortCond.value.filter((c)=>c!==t) as SortConditionItem[];
            sortCond.value.push({type:targetType,sort:!t.sort});
            
            sortData();
            return;
        }

        if(targetClass==="effect"){
            let effectType:EffectKey|"" = "";

            switch(targetBtnIndex){
                case 1:
                    effectType = "tag";
                    break;
                case 2:
                    effectType = "roundTag";
                    break;
                case 3:
                    effectType = "comboTag";
                    break;
                default:
                    break;
            }

            if(effectType!==""){
                if(selectEffectType.value.includes(effectType))
                    selectEffectType.value = selectEffectType.value.filter((s)=>s !== effectType);
                else
                    selectEffectType.value.push(effectType);
            }
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

        if(selectEffectType.value.length===0){
            alert('請至少選擇一個技能位置條件！');
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
                if(b2.value&&b2.value.getBool()){
                
                    if(selectFunc.value.length!==0 && selectEffectType.value.length!==0){//如果有選入功能再做篩選，反之則不用篩選
                        selectable = selectEffectType.value.some(key => {
                            const effectList = item[key] ?? [];
                            return selectFunc.value.every(f => effectList.includes(f.id));
                        });

                        if(!selectable)
                            return;
                    }
                    //如果篩選符合結果則會
                    if(selectable)
                        targetCard.value.push(item);

                }else if(b2.value&&!b2.value.getBool()){
                    if(selectFunc.value.length!==0 && selectEffectType.value.length!==0){
                        selectable=false;

                        selectFunc.value.forEach((f)=>{
                            //如果不符合條件，則不選入最終顯示結果
                            selectable = selectEffectType.value.some((key) => (item[key] ?? []).includes(f.id)) || selectable;
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

    function sortData(): void {
        // 如果不指定其他排序方式 則不改變顯示直接跳出
        if (sortCond.value.length === 0) return;

        // 根據使用者定義排序條件 做重新排序
        sortCond.value.forEach((c) => {
            targetCard.value = [...targetCard.value].sort((a: CardItem, b: CardItem) => {
            const order = c.sort ? -1 : 1;

            if (c.type === 'Id') {
                // 用 id 排序
                return (a.id - b.id) * order;
            } else if (c.type === 'Rarity') {
                // 用稀有度排序
                return (a.rarity - b.rarity) * order;
            }

            return 0; // 🔑 保險 return，避免 TS 報錯
            });
        });
    }

    //點擊時光牌資訊時，跳出視窗
    function clickHandle(cardId:number){
        Card.forEach((s)=>{
            if(s.card.find((c)=>c.id===cardId))
                showCard.value=s.card.find((c)=>c.id===cardId) as CardItem;
        });
        mode.value='card';
        let overlay = document.getElementById('overlay') as HTMLDivElement;
        overlay.style.display="block";
        
    }

    //關閉彈出視窗
    function closeHandle(){
        let overlay = document.getElementById('overlay') as HTMLDivElement;
        overlay.style.display="none";
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
        showCard.value=null;//顯示該卡詳細資訊
        selectEffectType.value=[];//時光牌篩選效果種類
    
        isSearch.value=false;
    }

    function CardByText(event:KeyboardEvent){
        if(event.key==="Enter"){
            const input = event.target as HTMLInputElement; // 斷言成輸入框
            const keyword = input.value.trim();
            gifShow.value=true;

            const start=performance.now();

            let p1= new Promise((resolve)=>{
                
                let tempArr=[];
                Card.forEach((series:CardSeriesItem,sIndex:number)=>{
                    series.card.forEach((c,cIndex)=>{
                        let added=false;

                        //依名稱查詢
                        if(c.name.includes(keyword)){
                            //targetCard.value.push(c);
                            added=true;
                        }

                        //依關鍵字查詢
                        if(c.keyword!==undefined){
                            if(c.keyword.find((k)=>k.includes(keyword))!==undefined){
                                added=true;
                            }
                        }
                       
                        //依技能敘述查詢 三個都檢查
                        (["tag", "roundTag", "comboTag"] as const).forEach(tagType => {
                            c[tagType].forEach(t => {
                                funcData.forEach(typeData => {
                                    typeData.data.forEach(d => {
                                        if (d.id === t && d.name.includes(keyword)) {
                                            added = true;
                                        }
                                    });
                                });
                            });
                        });

                        if(added)
                            tempArr.push(c);

                        //如果該卡片是最後一張的時候
                        if(cIndex===series.card.length-1||sIndex===Card.length-1){
                            const end=performance.now();
                            resolve({time:end-start,arr:tempArr});
                        }
                        
                    });
                })
            });

            
            p1.then((data)=>{
                let processData = data as CardByTextResultItem;
                let processTime=2000;
                if(processData.time<2000){
                    setTimeout(()=>{
                        targetCard.value=processData.arr;
                        
                        //關閉loading動畫
                        gifShow.value=false;
                        

                        isSearch.value=true;

                        //避免初次掛載元件無法正常顯示
                        //最後滾至結果div
                        nextTick(()=>{
                            const targetElement = document.getElementById("searchCard") as HTMLDivElement;
                            targetElement.scrollIntoView({ behavior: "smooth" });
                        });
                        
                        
                    },processTime-processData.time)
                }
                    
            })
        }
        
    }
    //刪除卡片
    function deleteCard(id:number){
        targetCard.value=targetCard.value.filter((t)=>t.id!==id);
    }

    //顯示符石盤面分布
    function spreadShow(){
        const hoverImage=document.getElementById('spread') as HTMLDivElement;
        hoverImage.style.display = 'block';
    }

    function spreadHide(){
        const hoverImage=document.getElementById('spread') as HTMLDivElement;
        hoverImage.style.display = 'none';
    }

    function spreadMove(event:MouseEvent){
        const hoverImage=document.getElementById('spread') as HTMLDivElement;
        hoverImage.style.left = `${event.clientX + 10}px`; 
        hoverImage.style.top = `${event.clientY - 170}px`;
    }

    //呼叫琉璃計算器頁面
    function callcalculator(){
        let overlay = document.getElementById('overlay') as HTMLDivElement;

        if(mode.value===null){
            mode.value='calculator';
            overlay.style.display="block";
            return;
        }else{
            mode.value=null;
            overlay.style.display="none";
            return;
        }
    }


    function handleClickOutside(e: MouseEvent) {
        // 沒有展開就不處理
        if (!mode.value) return

        // 點擊目標不在卡片 / modal 裡 → 關閉
        if (
            modalRef.value &&
            !modalRef.value.contains(e.target as Node)
        ) {
            closeHandle()
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
        if(!isInput.value)
            setData();
    };

    let stopWatcher: (() => void) | null = null;

    onMounted(() => {
        isAddable.value = inject('frontpath') as string;

        checkData();

        document.addEventListener('click', handleClickOutside);

        stopWatcher = watch(
            () => store.isMatch,
            () => {
                //當目前需要匹配 才執行這個方法 避免陷入閉鎖
                if(store.isMatch){
                    callsetData();

                    //將匹配狀態取消
                    store.StopMatch();
                }
            }
        );
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
        if (stopWatcher) {
            stopWatcher(); 
            stopWatcher = null;
        }
    });
</script>
<template>
    <client-only>
        <div class="Card [&>div]:w-4/5 [&>div]:mx-auto max-[500px]:[&>div]:w-5/6 pt-3" >
            <div class="flex flex-row flex-wrap justify-between max-[400px]:flex-col">
                <div class="flex flex-row max-[350px]:flex-col">
                    <h1 class="text-[28px] font-bold text-red-600 mr-3">時光牌圖鑑</h1>
                    <Switch ref="b1" @refresh="TextOrCondition" :text1="'條件搜尋'" :text2="'文字搜尋'"/>
                </div>
                <div class="max-[500px]:w-full">
                    <button type="button" class="text-white border-b-white border-b-[1px]" @click="callcalculator">琉璃計算器</button>
                </div>
            </div>
            <div v-if="!isInput">
                <div class="flex flex-col flex-wrap w-full mt-5">
                    <div><span class="text-white font-bold text-xl">系列</span></div>
                    <div class="[&>button]:mr-2 [&>button]:w-[10%] max-sm:[&>button]:w-[20%] [&>button]:min-w-[100px]
                            max-[500px]:[&>button]:small max-[500px]:[&>button]:min-w-[100px]">
                        <button type="button" class="btn series break-keep" v-on:click="clicked('series_1')">晨曦塔</button>
                    </div>
                </div>
                <div class="flex flex-col flex-wrap w-full mt-5">
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
                <div class="flex flex-col flex-wrap w-full mt-5">
                    <div class="flex flex-row items-center">
                        <span class="text-white font-bold text-xl mr-3">功能位置</span>
                        <EffectHint />           
                    </div>
                    <div class="flex flex-row [&>button]:mx-1">
                        <button type="button" class="btn effect break-keep min-w-[100px] w-[15%]" v-on:click="clicked('effect_1')">即時效果</button>
                        <button type="button" class="btn effect break-keep min-w-[100px] w-[15%]" v-on:click="clicked('effect_2')">回合效果</button>
                        <button type="button" class="btn effect break-keep min-w-[100px] w-[15%]" v-on:click="clicked('effect_3')">連動效果</button>
                    </div>
                </div>
                <div class="flex flex-col flex-wrap w-full mt-5 relative">
                    <div class="flex flex-row align-middle">
                        <span class="text-white font-bold text-xl mr-3 pt-1.5">功能</span>
                        <Switch ref="b2" @refresh="" :text1="'使用Or搜尋'" :text2="'使用And搜尋'"/>
                    </div>
                    <div v-for="(t,i) in funcData" class="mt-5">
                        <div class="flex flex-row items-center">
                            <span class="text-amber-600 font-bold text-xl">{{ t.typeName }}</span>
                            <button class="text-white ml-2 flex flex-row items-center" @click="isExpand(i)">
                                <img :src="(!expand[i])?`${isAddable}/images/arrow_drop_down.svg`:`${isAddable}/images/arrow_drop_up.svg`" 
                                    width="30" height="30"
                                    alt="expand" />
                            </button>
                        </div>
                        <Transition name="fade">
                            <div class="[&>button]:mr-2 [&>button]:w-[20%] max-[500px]:[&>button]:w-[40%] [&>button]:min-w-[200px]
                                max-[500px]:[&>button]:small max-[500px]:[&>button]:min-w-[140px]" v-show="expand[i]">
                                <button type="button"  v-for="func in t.data" class="btn func mb-2 min-w-[160px] min-h-[30px]" v-on:click="clicked(`func_${func.id}`)" :id="'btn'+func.id">{{func.name }}</button>
                            </div>
                        </Transition> 
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
                <div>
                    <span class="text-stone-400 text-sm">輸入完關鍵字字眼後按下Enter鍵即可獲得結果!</span>
                </div>
                <div>
                    <CardKeyWord :card="Card"/>
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
                        {{ (!sortCond.find((c)=>c.type==='Id')!.sort)?'編號:小':'編號:大' }}
                        <img :src="isAddable+'/images/arrow_right.png'" class="w-[30px]" alt="left"/>
                        {{ (!sortCond.find((c)=>c.type==='Id')!.sort)?`大`:'小' }}
                    </button>
                    <button type="button" class="mr-2 sort px-2 my-2 flex flex-row justify-center items-center btn" @click="clicked('sort_2')">
                        {{ (!sortCond.find((c)=>c.type==='Rarity')!.sort)?'稀有度:低':'稀有度:高' }}
                        <img :src="isAddable+'/images/arrow_right.png'" class="w-[30px]" alt="left"/>
                        {{ (!sortCond.find((c)=>c.type==='Rarity')!.sort)?'高':'低' }}
                    </button>
                </div>
                <div class="flex flex-row flex-wrap max-[400px]:justify-evenly" v-if="targetCard.length!==0">
                    <div v-for="card in targetCard" class="w-1/8 mr-3" :key="card.id">
                        <div class="flex flex-col mb-3" >
                            <div @click.stop="clickHandle(card.id)">
                                <LazyImage :imageLink="card.image" :id="card.id" @deleteCard="deleteCard"/>
                            </div>
                            <span 
                                class="w-full text-center text-white"
                                :class="{
                                    'bg-amber-900': card.rarity === 1,
                                    'bg-slate-500': card.rarity === 2,
                                    'bg-yellow-600': card.rarity === 3
                                }">
                                {{ card.id }}
                            </span>                        
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
                <div class='overlay' id="overlay">
                    <div class='popup max-[500px]:w-[80%] max-[500px]:min-w-[200px]' v-if="mode==='card'&&showCard" ref="modalRef">
                        <div class='close' v-on:click="closeHandle">&#10006;</div>
                        <div class="w-5/6 mx-auto mt-5 flex flex-row flex-wrap justify-between mb-5 max-[450px]:justify-center">
                            <div class="w-2/5 min-w-[150px] max-[700px]:w-full">
                                <div class="[&>span]:text-[20px] mb-3 text-center">
                                    <span
                                        class="w-full text-center font-bold"
                                        :class="{
                                            'text-amber-900': showCard.rarity === 1,
                                            'text-slate-500': showCard.rarity === 2,
                                            'text-yellow-600': showCard.rarity === 3
                                        }">{{ showCard.name }}
                                    </span>
                                </div>
                                <div
                                    class="max-w-[150px] mx-auto"
                                    :class="{
                                        'imgbox1': showCard.rarity === 1,
                                        'imgbox2': showCard.rarity === 2,
                                        'imgbox3': showCard.rarity === 3
                                    }"
                                    v-if="showCard.rarity">
                                    <img
                                        :src="isAddable + showCard.fullimage"
                                        :alt="showCard.name"
                                        class="h-[40vh] min-w-[150px] max-[400px]:h-[45vh]"
                                    />
                                </div>
                            </div>
                            <div class="w-1/2 flex flex-col min-w-[150px] ml-2 max-[450px]:ml-0 max-[700px]:w-full mt-1">
                                <div class="flex flex-row flex-wrap max-[700px]:mt-2 max-[700px]:justify-center">
                                    <CardSection label="進場FP" :value="showCard.PointEnter" :rarity="showCard.rarity" />
                                    <CardSection label="消耗FP" :value="showCard.PointConsume" :rarity="showCard.rarity" />
                                    <CardSection label="補充FP" :value="showCard.PointGet" :rarity="showCard.rarity" />
                                    <CardSection label="最大FP" :value="showCard.PointMax" :rarity="showCard.rarity" />
                                </div>
                                <CardEffectBlock title="即時效果" :effects="showCard.instantEffect" :rarity="showCard.rarity" />

                                <CardEffectBlock title="回合效果" :effects="showCard.roundEffect" :rarity="showCard.rarity" />

                                <CardEffectBlock title="連動效果" :effects="showCard.comboEffect" :rarity="showCard.rarity" :spread="showCard.spread" :isAddable="isAddable"
                                    @spreadMove="spreadMove"
                                    @spreadShow="spreadShow"
                                    @spreadHide="spreadHide"/>
                            </div>
                        </div>
                    </div>
                    <div class='popup calculator max-[500px]:w-[80%] max-[500px]:min-w-[200px]' v-else-if="mode==='calculator'">
                        <div class='close text-black' v-on:click="closeHandle">&#10006;</div>
                        <Calculator />
                    </div>
                </div>
            </div>
        </div>
    </client-only>
</template>
<style lang="scss" scoped>
    @use '../assets/css/card.scss';
</style>