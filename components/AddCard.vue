<script setup>
    import { inject,ref,provide } from 'vue';
    import axios from 'axios';
    let props = defineProps(['max','func']);

    let card=ref({});
    let func=ref([]);
    
    let step=ref(1);//處於哪個步驟 初始為1
    let iconInput=ref(null);//縮圖上傳
    let imageInput=ref(null);//預覽圖上傳
    let spreadInput=ref(null);//盤面圖 如果有必要的話

    let showSkill=ref([]);
    let roundEffect=ref(['']);
    let comboEffect=ref(['']);
    let instantEffect=ref(['']);//此區塊暫時默認只寫一個

    const emit = defineEmits(['close'])
    
    //初始化 包括還原
    function init(){
        step.value = 1;
        iconInput.value = null;
        imageInput.value = null;
        spreadInput.value = null;

        showSkill.value = [];
        roundEffect.value = [''];
        comboEffect.value = [''];
        instantEffect.value = [''];
    }

    function callClick(id){
        document.getElementById(id).value=null;
        document.getElementById(id).click();
    }

    async function imageUpload(id){
        let file=document.getElementById(id).files[0];
        
        const reader=new FileReader();

        reader.onload = (e) => {
            if(id==='iconInput')
                iconInput.value = {file:e.target.result,name:file.name,realFile:file}; // 设置图片的 base64 URL
            else if(id==='imageInput')
                imageInput.value={file:e.target.result,name:file.name,realFile:file};
            else if(id==='spreadInput')
                spreadInput.value={file:e.target.result,name:file.name,realFile:file};
        };
        await reader.readAsDataURL(file); // 讀取文件
    }
    //添加技能敘述
    function addEffect(type){
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
    function delEffect(type){
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

    //新增技能
    function addTag(){
        var tagIndex=parseInt(document.getElementById('tagSelect2').value);
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
        showSkill.value.push(targetTag);
        showSkill.value=showSkill.value.sort((a,b)=>{return a.id-b.id});
        
        if(card.value.tag===undefined){
            card.value.tag=[];
        }
        card.value.tag.push(tagIndex);
        card.value.tag=card.value.tag.sort((a,b)=>{return a-b});
    }

    //移除技能
    function removeTag(tagId){
        card.value.tag = card.value.tag.filter((t)=>t!==tagId);
        showSkill.value = showSkill.value.filter((t)=>t.id!==tagId);
        console.log(showSkill);
    }

    //新增關鍵字
    function addKeyword(event){
        if(event.key==='Enter'){
            if(card.value.keyword===undefined)
                card.value.keyword=[]

            card.value.keyword.push(event.target.value);
            event.target.value='';
            console.log(card.value.keyword)
        }
    }

    //設定盤面圖
    function setSpreadImg(){
        let spreadIndex = event.data.value;

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
                step.value +=1;
                return;
            }
        }
        
        
        //送出資料 由於有兩張照片 所以會先分批跟api溝通
        if(step.value===4){
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
                console.log(response.data);
                alert('新卡片已添加');
                emit('close','');
                emit('updateCard',response.data)              
               
                init();
            });
        }
    }

    //設置卡片預覽
    function setCardPreview(){
        //設定編號
        if(card.value.id===undefined)
            card.value.id=props.max;

        //設定卡片敘述
        card.value.roundEffect=roundEffect.value;
        card.value.instantEffect=instantEffect.value;
        card.value.comboEffect=comboEffect.value;

        //設定圖片路徑
        card.value.image=`/images/card/icon/1_${card.value.id}.png`;
        card.value.fullimage=`/images/card/image/1_${card.value.id}.png`;
        
        if(document.getElementById('spreadIndex').value === null){
            card.value.spread={
                id:parseInt(document.getElementById('spreadIndex').value),
                image:`/images/card/image/${card.value.id}.png`
            };
        }
       

        //將技能儲存縮短成只有編號
        let tag=[];

        showSkill.value.forEach((s)=>{
            tag.push(parseInt(s.id));
        })

        card.value.tag=tag;


        //調整物件屬性順序
        let tempCard={
            id:card.value.id,
            name:card.value.name,
            rarity:card.value.rarity,
            image:card.value.image,
            instantEffect:card.value.instantEffect,
            roundEffect:card.value.roundEffect,
            comboEffect:card.value.comboEffect,
            PointMax:parseInt(card.value.PointMax),
            PointEnter:parseInt(card.value.PointEnter),
            PointConsume:parseInt(card.value.PointConsume),
            PointGet:parseInt(card.value.PointGet),
            tag:card.value.tag,
            fullimage:card.value.fullimage,
            keyword:card.value.keyword,
            ...(card.value.spread ? { spread: card.value.spread } : {})
        };

        card.value=tempCard;

        console.log(card.value);
        
    }

    function setFunc(data){
        func.value=data;
    }

    defineExpose({
        setFunc
    });
    

</script>
<template>
    <div class="h-[450px] pl-5 ">
        <TransitionGroup  name="step" tag="div" class="flex flex-row">
            <div v-if="step===1" class="flex flex-row min-w-[500px]" :key="'step1'">
                <div class="pl-2 pr-2 w-1/2">
                    <div class="flex flex-col">
                        <span class="text-lg">卡片名稱:</span>
                        <input type="text" class="selfInput" placeholder="卡片名子" @change="event=>card.name=event.target.value"/>
                    </div>
                    <div class="mt-3 flex flex-row items-baseline">
                        <span class="text-lg mr-1">卡片編號:</span>
                        <span>{{ max }}</span>
                        
                    </div>
                    <div class="flex flex-col mt-5">
                        <span class="text-lg">稀有度:</span>
                        <div v-for="n in 3">
                            <input type="radio" name="rarity" :value="n" @change="event=>card.rarity=parseInt(event.target.value)"/>
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
                            <select class="colorSelect w-[150px]" id="tagSelect2">
                                <option :value="0">{{'請選擇'}}</option>
                                <optgroup v-for="types in func" :label="types.typeName">
                                    <option v-for="f in types.data" :value="f.id" class="bg-amber-900">{{ f.name }}</option>
                                </optgroup>
                            </select>
                            <button class="rounded-sm bg-gray-600 min-w-[50px] text-white" @click="addTag()">新增</button>
                        </div>
                        <div class="flex flex-col">
                            <div class="flex flex-row justify-between" v-for="skill in showSkill">
                                <span>{{skill.id +" "+skill.name }}</span>
                                <button class="removeBtn" @click="removeTag(skill.id)">移除</button>
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
                        <input type="number" id="pointGet" class="inputNum" :min="1" :max="8" required @change="event=>card.PointGet=event.target.value"/>
                    </div>
                    <div class="flex flex-row">
                        <div class="w-[120px]">
                            <span>總儲存能量:</span>
                        </div>
                        <input type="number" id="pointMax" class="inputNum" :min="1" :max="8" required @change="event=>card.PointMax=event.target.value"/>
                    </div>
                    <div class="flex flex-row">
                        <div class="w-[120px]">
                            <span>回合消耗能量:</span>
                        </div>
                        <input type="number" id="pointConsume" class="inputNum" :min="1" :max="8" required @change="event=>card.PointConsume=event.target.value"/>
                    </div>
                    <div class="flex flex-row">
                        <div class="w-[120px]">
                            <span>進場能量:</span>
                        </div>
                        <input type="number" id="pointEnter" class="inputNum" :min="1" :max="8" required @change="event=>card.PointEnter=event.target.value"/>
                    </div>
                </div>
                <div class="w-1/2">
                    <div class="flex flex-col">
                        <span>卡片關鍵字:</span>
                        <input type="text" class="selfInput" placeholder="輸入完成後按Enter"
                            @keydown="addKeyword"/>
                        <span v-for="t in card.keyword">{{ t }}</span>
                    </div>
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
                        <input type="number" class="selfInput"  id="spreadIndex" :min="1" @click="setSpreadImg" />
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
                        <div class="imgbox1 max-w-[150px] mx-auto" v-if="card.rarity===1">
                            <img :src="imageInput.file" :alt="card.name" class="h-[40vh] min-w-[150px]"/>
                        </div>
                        <div class="imgbox2 max-w-[150px] mx-auto" v-if="card.rarity===2">
                            <img :src="imageInput.file" :alt="card.name" class="h-[40vh] min-w-[150px]"/>
                        </div>
                        <div class="imgbox3 max-w-[150px] mx-auto" v-if="card.rarity===3">
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
<style scoped>
@import '../assets/css/addcard.css';
</style>