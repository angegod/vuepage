<script lang="ts" setup>
    import { inject,ref,provide } from 'vue';
    import axios from 'axios';
    import type { CardItem } from '@/interface/card';
    import type { funcDataItem, skillItem ,showSkillItem, TagType } from '@/interface/funcData';
    import type { fileDataItem } from '@/interface/modify';
    import { useModifyStore } from './store/modifyData';
    
    let card=ref<CardItem>({
        id: 0,
        name: '',
        rarity: 1,
        image: '',
        tag: [],
        comboTag:[],
        roundTag:[],
        instantEffect: [],
        comboEffect: [],
        roundEffect:[],
        PointMax: 2,
        PointConsume: 2,
        PointGet: 2,
        fullimage: '',
        keyword: [],
        PointEnter: 2,
    });
    
    
    let step=ref<number>(1);//處於哪個步驟 初始為1
    let iconInput=ref<fileDataItem|null>(null);//縮圖上傳
    let imageInput=ref<fileDataItem|null>(null);//預覽圖上傳
    let spreadInput=ref<fileDataItem|null>(null);//盤面圖 如果有必要的話
    let selectTagType=ref<TagType>('tag');
    let isAddable = ref<string>("");

    let showSkill=ref<showSkillItem>({
        tag:[],
        roundTag:[],
        comboTag:[]
    });
    let roundEffect=ref<string[]>(['']);
    let comboEffect=ref<string[]>(['']);
    let instantEffect=ref<string[]>(['']);//此區塊暫時默認只寫一個

    const emit = defineEmits(['close','updateCard']);
    const modifyStore = useModifyStore();

    //獲得CardArray最新資訊
    const {CardArray,func} = storeToRefs(modifyStore);
    
    //初始化 包括還原
    function init(){
        isAddable.value = inject('frontpath') as string;
        step.value = 1;
        iconInput.value = null;
        imageInput.value = null;
        spreadInput.value = null;
        selectTagType.value = 'tag';

        showSkill.value = {
            tag:[],
            roundTag:[],
            comboTag:[]
        };
        roundEffect.value = [''];
        comboEffect.value = [''];
        instantEffect.value = [''];

        console.log(CardArray.value);
        card.value={
            id: CardArray.value.length+1,
            name: '',
            rarity: 1,
            image: '',
            tag: [],
            comboTag:[],
            roundTag:[],
            instantEffect: [],
            comboEffect: [],
            roundEffect:[],
            PointMax: 2,
            PointConsume: 2,
            PointGet: 2,
            fullimage: '',
            keyword: [],
            PointEnter: 2,
        };
    }

    function callClick(id:string){
        let imageInput = document.getElementById(id) as HTMLInputElement;

        imageInput.value= '';
        imageInput.click();
    }

    async function imageUpload(id: string): Promise<void> {
        const input = document.getElementById(id) as HTMLInputElement | null;
        if (!input || !input.files || input.files.length === 0) {
            console.error("No file selected.");
            return;
        }

        const file: File = input.files[0];
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const result = e.target?.result as string | null;
            if (!result) return;

            const fileData = {
                file: result, // base64 URL
                name: file.name,
                realFile: file
            };

            if (id === "iconInput") {
                iconInput.value = fileData;
            } else if (id === "imageInput") {
                imageInput.value = fileData;
            } else if (id === "spreadInput") {
                spreadInput.value = fileData;
            }
        };

        reader.readAsDataURL(file);
    }
    //添加技能敘述
    function addEffect(type:string){
        switch(type){
            case 'combo':
                comboEffect.value.push('');              
                break;
            case 'round':
                roundEffect.value.push('');
                break;
            case 'instant':
                instantEffect.value.push('');
                break;
            default:
                break;
            
        }
    }

    //刪除技能敘述 但每項敘述須至少保留一個
    function delEffect(type:string){
        switch(type){
            case 'combo':
                if(comboEffect.value.length>1)
                    comboEffect.value=comboEffect.value.filter((e,i)=>i!==comboEffect.value.length-1);          
                break;
            case 'round':
                if(roundEffect.value.length>1)
                    roundEffect.value=roundEffect.value.filter((e,i)=>i!==roundEffect.value.length-1);
                break;
            case 'instant':
                if(instantEffect.value.length>1)
                    instantEffect.value=instantEffect.value.filter((e,i)=>i!==instantEffect.value.length-1);
                break;
            default:
                break;
        }
    }

    function changeTagType(event: Event) {
        const value = (event.target as HTMLSelectElement).value as TagType;
        selectTagType.value = value;
    }
    //新增技能
    function addTag() {
        if(!showSkill.value) return;

        let tagSelect = document.getElementById('tagSelect2') as HTMLSelectElement;
        let tagIndex = parseInt(tagSelect.value);

        if (!tagIndex) return;

        let targetTag: skillItem | undefined;

        // 找到對應 skillItem
        func.value.forEach((type) => {
            const t = type.data.find((f) => f.id === tagIndex);
            if (t) targetTag = t;
        });

        if (!targetTag) return;

        const typeKey = selectTagType.value as 'tag' | 'roundTag' | 'comboTag';
        if (!typeKey) {
            console.warn("請先選擇技能標籤類型");
            return;
        }

        // 初始化陣列
        if (!card.value[typeKey]) {
            card.value[typeKey] = [];
        }

        // card 已存在就不加入
        if (card.value[typeKey].includes(tagIndex)) return;

        // showSkill 是否已存在
        if (!showSkill.value[typeKey].some(s => s.id === targetTag!.id)) {
            showSkill.value[typeKey].push(targetTag!);
            showSkill.value[typeKey].sort((a, b) => a.id - b.id);
        }

        // card 寫入
        card.value[typeKey].push(tagIndex);
        card.value[typeKey].sort((a, b) => a - b);
    }



    //移除技能
    function removeTag(tagId: number) {
        if(!showSkill.value) return;

        const typeKey = selectTagType.value as 'tag' | 'roundTag' | 'comboTag';

        // 如果沒有選類型，不操作
        if (!typeKey) {
            console.warn("請先選擇技能標籤類型");
            return;
        }

        // 該類型尚未初始化
        if (!card.value[typeKey]) {
            return;
        }

        // 從該類別中移除
        card.value[typeKey] = card.value[typeKey].filter((t) => t !== tagId);

        // 移除 showSkill 顯示內容
        showSkill.value[typeKey] = showSkill.value[typeKey].filter((t) => t.id !== tagId);

        console.log(card.value[typeKey]);    
    }


    //新增關鍵字
    function addKeyword(event:KeyboardEvent){
        if(event.key==='Enter'){
            let keywordInput = event.target as HTMLInputElement;
            if(card.value.keyword===undefined)
                card.value.keyword=[];

            card.value.keyword.push(keywordInput.value);
            keywordInput.value='';
        }
    }

    //設定盤面圖
    function setSpreadImg(event:Event){
        let spreadIndexInput = event.target as HTMLInputElement;
        let spreadIndex = parseInt(spreadIndexInput.value);

        if(Number(spreadIndex)>0){
            let spreadData = {
                image:`/images/card/image/1_${card.value.id}.png`,
                index:spreadIndex
            }

            card.value.spread=spreadData;
        }
    }

    //步驟進行
    async function nextStep(){
        console.log(step.value);
        if(step.value <3){
            step.value +=1;
            return;
        }
            
        //如果漏掉輸入資訊 則不予進入下一步
        if(step.value===3){
            if(card.value.PointMax===undefined||
                card.value.PointConsume===undefined||
                card.value.PointGet===undefined||
                card.value.PointEnter===undefined){
                
                alert('請輸入對應資料!!');
                return;       
            }else{
                setCardPreview();
                console.log(card.value);
                step.value +=1;
                return;
            }
        }
        
        
        //送出資料 由於有兩張照片 所以會先分批跟api溝通
        if(step.value === 4 && iconInput.value && imageInput.value){
            console.log('step4');

            step.value+=1;

            //先上傳縮圖
            let formData=new FormData();
            formData.append('image', iconInput.value.realFile);
            formData.append('oldName',iconInput.value.name.split('.')[0]);
            formData.append('newName',`1_${card.value.id}`);
            
            console.log(formData.getAll('image'));
            //上傳照片
            const response = await axios.post('http://localhost:5000/card/icon', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);

            //再來上傳全身圖
            let formData1=new FormData();
            formData1.append('image', imageInput.value.realFile);
            formData1.append('oldName',imageInput.value.name.split('.')[0]);
            formData1.append('newName',`1_${card.value.id}`);
            
            console.log(imageInput.value);
            //上傳照片
            const response1 = await axios.post('http://localhost:5000/card/image', formData1, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            //如果有必要需要丟盤面分布
            console.log(spreadInput);
            if(spreadInput.value!==null&&spreadInput.value!==undefined){
                console.log('開始上傳盤面');
                let formData2=new FormData();
                formData2.append('image', spreadInput.value.realFile);
                formData2.append('oldName',spreadInput.value.name.split('.')[0]);
                formData2.append('newName',`1_${card.value.id}`);
                
                //上傳照片
                const response2 = await axios.post('http://localhost:5000/card/spread', formData2, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            
            //最後才是資料丟過去 必須要包含系列名稱 這裡先默認系列只有一個

            let json={
                series:1,
                card:card.value
            };
            await axios.post('http://localhost:5000/card/add',json).then((response)=>{
                alert('新卡片已添加');
                emit('close','');
                //emit('updateCard',response.data)
                
                CardArray.value.push(card.value);
                console.log(CardArray.value);
               
                init();
            });
        }
    }

    //設置卡片預覽
    function setCardPreview(){
        if(!showSkill.value) return;

        //設定編號
        if(card.value.id===undefined)
            card.value.id = CardArray.value.length+1;

        //設定卡片敘述
        card.value.roundEffect=roundEffect.value;
        card.value.instantEffect=instantEffect.value;
        card.value.comboEffect=comboEffect.value;

        //設定圖片路徑
        card.value.image=`/images/card/icon/1_${card.value.id}.png`;
        card.value.fullimage=`/images/card/image/1_${card.value.id}.png`;
        
        let spreadIndexInput = document.getElementById('spreadIndex') as HTMLInputElement;

        if(spreadIndexInput.value === null){
            card.value.spread={
                index:parseInt(spreadIndexInput.value),
                image:`/images/card/spread/${card.value.id}.png`
            };
        }
       

        //將技能儲存縮短成只有編號
        /*let tag = [] as number[];
        let roundTag = [] as number[];
        let comboTag = [] as number[];*/

        (["tag", "roundTag", "comboTag"] as const).forEach((type)=>{
            let targetTagList = [] as number[];
            
            showSkill.value[type].forEach((s:skillItem)=>{
                targetTagList.push(s.id);
            });

            card.value[type] = targetTagList;
            console.log(card.value);            
        });


        //調整物件屬性順序
        let tempCard={
            id:card.value.id,
            name:card.value.name,
            rarity:card.value.rarity,
            image:card.value.image,
            instantEffect:card.value.instantEffect,
            roundEffect:card.value.roundEffect,
            comboEffect:card.value.comboEffect,
            PointMax:card.value.PointMax,
            PointEnter:card.value.PointEnter,
            PointConsume:card.value.PointConsume,
            PointGet:card.value.PointGet,
            tag:card.value.tag,
            comboTag:card.value.comboTag,
            roundTag:card.value.roundTag,
            fullimage:card.value.fullimage,
            keyword:card.value.keyword,
            ...(card.value.spread ? { spread: card.value.spread } : {})
        };

        card.value=tempCard;

        console.log(card.value);
        
    }

    function setFunc(data:funcDataItem[]){
        func.value=data;
    }

    defineExpose({
        setFunc
    });
    

    onMounted(()=>{
        //初始化
        init();
    })

</script>
<template>
    <div class="h-[450px] pl-5 ">
        <TransitionGroup  name="step" tag="div" class="flex flex-row">
            <div v-if="step===1" class="flex flex-row min-w-[500px]" :key="'step1'">
                <div class="pl-2 pr-2 w-1/2">
                    <div class="flex flex-col">
                        <span class="text-lg">卡片名稱:</span>
                        <input type="text" class="selfInput" placeholder="卡片名子" @change="event=>card.name=(event.target as HTMLInputElement).value"/>
                    </div>
                    <div class="mt-3 flex flex-row items-baseline">
                        <span class="text-lg mr-1">卡片編號:</span>
                        <span>{{ CardArray.length+1 }}</span>
                        
                    </div>
                    <div class="flex flex-col mt-5">
                        <span class="text-lg">稀有度:</span>
                        <div v-for="n in 3">
                            <input type="radio" name="rarity" :value="n" @change="event=>card.rarity = parseInt((event.target as HTMLInputElement).value)"/>
                            <span>{{ n+"星" }}</span> 
                        </div>
                    </div>
                    <div class="flex flex-col mt-5">
                        <span class="text-lg">縮圖:</span>
                        <button @click="callClick('iconInput')" class="max-w-[100px] addBtn">上傳</button>
                        <input type="file" :id="'iconInput'" class="hidden" accept="image/jpeg, image/png, image/jpg" @change="()=>imageUpload('iconInput')"/>
                        <img v-if="iconInput!==null" :src="iconInput.file" alt="縮圖" class="max-w-[100px] max-h-[100px]"/>
                    </div>
                </div>
                <div class="pl-2 pr-2 w-1/2 flex flex-col justify-between">
                    <div class="flex flex-col ">
                        <span class="text-lg">全身圖:</span>
                        <button @click="callClick('imageInput')" class="max-w-[100px] addBtn">上傳</button>
                        <input type="file" :id="'imageInput'" class="hidden" accept="image/jpeg, image/png, image/jpg" @change="()=>imageUpload('imageInput')"/>
                        <img v-if="imageInput!==null" :src="imageInput.file" alt="縮圖" class="max-w-[200px] max-h-[300px]"/>
                    </div>
                    <div>
                        <button class="addBtn pl-2 pr-2" @click="nextStep">下一步</button>
                    </div>
                </div>
                
            </div>
            <div v-if="step===2" :key="'step2'" class="flex flex-row min-w-[500px]">
                <div class="w-1/2 pl-2 pr-2 flex flex-col" >
                    <div class="flex flex-col">
                        <div class="flex flex-row mb-1">
                            <span class="text-lg">即時效果:</span>
                            <button class="addBtn ml-3 px-3" @click="addEffect('instant')">添加</button>
                            <button class="addBtn ml-3 px-3" @click="delEffect('instant')" v-if="instantEffect.length>1">刪除</button>
                        </div>
                        <input type="text" v-for="(effect,i) in instantEffect" class="selfInput mt-1 mb-1" placeholder="即使效果" v-model="instantEffect[i]"/>
                    </div>
                    <div class="flex flex-col mt-5">
                        <div class="flex flex-row mb-1">
                            <span class="text-lg">回合效果:</span>
                            <button class="addBtn ml-3 px-3" @click="addEffect('round')">添加</button>
                            <button class="addBtn ml-3 px-3" @click="delEffect('round')" v-if="roundEffect.length>1">刪除</button>
                        </div>
                        <input type="text" v-for="(effect,i) in roundEffect" class="selfInput mt-1 mb-1 whitespace-pre-wrap" :placeholder="`回合效果${i+1}`" v-model="roundEffect[i]" />
                    </div>
                    <div class="flex flex-col mt-5">
                        <div class="flex flex-row mb-1">
                            <span class="text-lg">連動效果:</span>
                            <button class="addBtn ml-3 px-3" @click="addEffect('combo')">添加</button>
                            <button class="addBtn ml-3 px-3" @click="delEffect('combo')" v-if="comboEffect.length>1">刪除</button>
                        </div>
                        <textarea v-for="(effect,i) in comboEffect" 
                            class="selfInput mt-1 mb-1 min-h-[25px] max-h-[50px]" 
                            :placeholder="`連動效果${i+1}`" 
                            v-model="comboEffect[i]" ></textarea>
                    </div>
                </div>
                <div class="w-1/2 pl-2 pr-2 flex flex-col justify-between min-h-[400px]">
                    <div class="flex flex-col">
                        <div>
                            <span>技能標籤</span>
                        </div>
                        <div>
                            <select class="colorSelect w-[150px]" @change="changeTagType">
                                <option :value="'tag'">即時標籤</option>
                                <option :value="'roundTag'">回合標籤</option>
                                <option :value="'comboTag'">連動標籤</option>
                            </select>
                        </div>
                        <div>
                            <select class="colorSelect w-[150px]" id="tagSelect2">
                                <option :value="0">{{'請選擇'}}</option>
                                <optgroup v-for="types in func" :label="types.typeName">
                                    <option v-for="f in types.data" :value="f.id" class="bg-amber-900">{{ f.name }}</option>
                                </optgroup>
                            </select>
                            <button class="rounded-sm bg-gray-600 min-w-[50px] text-white" @click="addTag()">新增</button>
                        </div>
                        <div class="flex flex-col">
                            <div class="flex flex-row justify-between" v-for="skill in showSkill[selectTagType]">
                                <div class="flex flex-row gap-2">
                                    <span class="w-5">{{skill.id}}</span>
                                    <span>{{skill.name }}</span>
                                </div>
                                <button @click="removeTag(skill.id)">
                                    <img :src="isAddable+'/images/delete.svg'" width="20" height="20" alt="delete" />
                                </button>
                            </div> 
                        </div>
                    </div>
                    <div>
                        <button class="addBtn pl-2 pr-2" @click="nextStep">下一步</button>
                    </div>
                </div>
            </div>
            <div v-if="step===3" class="flex flex-row min-w-[500px]" :key="'step3'">
                <div class="px-2 w-1/2 [&>div]:my-2">
                    <div class="flex flex-row">
                        <div class="w-[120px]">
                            <span>回合累積能量:</span>
                        </div>
                        <input type="number" id="pointGet" class="inputNum" :min="1" :max="8" required @change="event=>card.PointGet = parseInt((event.target as HTMLInputElement).value)"/>
                    </div>
                    <div class="flex flex-row">
                        <div class="w-[120px]">
                            <span>總儲存能量:</span>
                        </div>
                        <input type="number" id="pointMax" class="inputNum" :min="1" :max="8" required @change="event=>card.PointMax = parseInt((event.target as HTMLInputElement).value)"/>
                    </div>
                    <div class="flex flex-row">
                        <div class="w-[120px]">
                            <span>回合消耗能量:</span>
                        </div>
                        <input type="number" id="pointConsume" class="inputNum" :min="1" :max="8" required @change="event=>card.PointConsume = parseInt((event.target as HTMLInputElement).value)"/>
                    </div>
                    <div class="flex flex-row">
                        <div class="w-[120px]">
                            <span>進場能量:</span>
                        </div>
                        <input type="number" id="pointEnter" class="inputNum" :min="1" :max="8" required @change="event=>card.PointEnter = parseInt((event.target as HTMLInputElement).value)"/>
                    </div>
                    <div class="flex flex-col mt-3">
                        <span>卡片關鍵字:</span>
                        <input type="text" class="selfInput w-[200px]" placeholder="輸入完成後按Enter"
                            @keydown="addKeyword"/>
                        <span class="text-xs text-gray-500">輸入完成後請按下Enter</span>
                        <span v-for="t in card.keyword">{{ t }}</span>
                    </div>
                </div>
                <div class="w-1/2">
                    <div class="my-2">
                        <span>盤面圖:</span>
                        <button @click="callClick('spreadInput')" class="max-w-[100px] addBtn px-2">上傳</button>
                        <input type="file" :id="'spreadInput'" class="hidden" accept="image/jpeg, image/png, image/jpg" @change="()=>imageUpload('spreadInput')"/>
                        <div class="spread">
                            <img v-if="spreadInput!==null" :src="spreadInput.file" alt="盤面圖" class="w-[240px]"/>
                        </div>
                    </div>
                    <div class="my-2">
                        <span>圖片標示位置:</span>
                        <input type="number" class="selfInput"  id="spreadIndex" :min="1" @change="(event)=>setSpreadImg(event)" />
                    </div>
                    <div class="mt-2">
                        <button class="addBtn pl-2 pr-2" @click="nextStep">下一步</button>
                    </div>
                </div>
                
            </div>
            <div v-if="step===4 || step ===5" class="min-w-[500px]" :key="'step4'">
                <div class="w-5/6 mx-auto mt-5 flex flex-row flex-wrap justify-between mb-5 max-[450px]:justify-center">
                    <div class="w-2/5 min-w-[150px] max-[450px]:w-[100%]">
                        <div class="[&>span]:text-[20px] mb-3 text-center">
                            <span class="w-[100%] text-center text-amber-900 font-bold" v-if="card.rarity===1">{{ card.name }}</span>
                            <span class="w-[100%] text-center text-slate-500 font-bold" v-if="card.rarity===2">{{ card.name }}</span>
                            <span class="w-[100%] text-center text-yellow-600 font-bold" v-if="card.rarity===3">{{ card.name }}</span>
                        </div>
                        <div class="imgbox1 max-w-[150px] mx-auto" v-if="card.rarity===1 && imageInput">
                            <img :src="imageInput.file" :alt="card.name" class="h-[40vh] min-w-[150px]"/>
                        </div>
                        <div class="imgbox2 max-w-[150px] mx-auto" v-if="card.rarity===2 && imageInput">
                            <img :src="imageInput.file" :alt="card.name" class="h-[40vh] min-w-[150px]"/>
                        </div>
                        <div class="imgbox3 max-w-[150px] mx-auto" v-if="card.rarity===3 && imageInput">
                            <img :src="imageInput.file" :alt="card.name" class="h-[40vh] min-w-[150px]"/>
                        </div>
                        
                    </div>
                    <div class="w-1/2 flex flex-col min-w-[150px] ml-2 max-[450px]:ml-0 max-[450px]:w-[100%]">
                        <div class="flex flex-col mt-5 min-h-[10vh]">
                            <div class="flex flex-row line">
                                <div class="flex bg-amber-900 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="card.rarity===1">
                                    <span>即時效果</span>
                                </div>
                                <div class="flex bg-slate-500 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="card.rarity===2">
                                    <span>即時效果</span>
                                </div>
                                <div class="flex bg-yellow-600 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="card.rarity===3">
                                    <span>即時效果</span>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <span v-for="effect in card.instantEffect" class="text-black">&#8226;{{ effect }}</span>
                            </div>
                    
                        </div>
                        <div class="flex flex-col mt-5 min-h-[20vh]">
                            <div class="flex bg-amber-900 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="card.rarity===1">
                                <span>回合效果</span>
                            </div>
                            <div class="flex bg-slate-500 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="card.rarity===2">
                                <span>回合效果</span>
                            </div>
                            <div class="flex bg-yellow-600 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="card.rarity===3">
                                <span>回合效果</span>
                            </div>
                            <div class="flex flex-col">
                                <span v-for="effect in card.roundEffect" class="text-black">&#8226;{{ effect }}</span>
                            </div>
                        </div>
                        <div class="flex flex-col mt-5 min-h-[10vh]">
                            <div class="flex bg-amber-900 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="card.rarity===1">
                                <span>連動效果</span>
                            </div>
                            <div class="flex bg-slate-500 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="card.rarity===2">
                                <span>連動效果</span>
                            </div>
                            <div class="flex bg-yellow-600 text-white rounded-md w-1/5 min-w-[100px] justify-center" v-if="card.rarity===3">
                                <span>連動效果</span>
                            </div>
                            <div class="flex flex-col">
                                <span v-for="effect in card.comboEffect" class="text-black">&#8226;{{ effect }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-5/6 mt-5 mx-auto">
                    <button class="addBtn min-w-[100px] ml-2" @click="nextStep" >儲存</button>
                </div>
            </div>
        </TransitionGroup>
        
        
    </div>
</template>
<style lang="scss" scoped>
@use  '../assets/css/addcard.scss';
</style>