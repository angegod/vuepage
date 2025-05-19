<script setup>
import { inject,ref,provide,defineModel } from 'vue';
import '../css/modifyFunc.css';
import axios from 'axios';

let func=ref([]);//從api抓到的資料
let mode=ref('');//模式 add代表新增 edit代表編輯

let funcData=[];//從func複製過來的 有用深拷貝
let selectTId=ref(0);//技能系列編號
let selectSId=ref(0);//技能編號
let SIndex=ref(null);//技能在陣列中的索引(位置)
let SMaxIndex=ref(null);
let showSkill=ref(null);
let nowSkillId=ref(1);//如果有新增技能標籤 要賦予甚麼ID
let nowTypeId=ref(1);

//紀錄每個標籤的相關紀錄
let funcMove=ref([]);


//初始化資料
axios.post('http://localhost:5000/func/get').then((response)=>{

    funcData=response.data.func;
    func.value=JSON.parse(JSON.stringify(funcData));//深拷貝處理

    calSkillId();
});

//計算新技能或系列ID需要賦予怎樣的值?
function calSkillId(){
    funcData.forEach((t)=>{
        nowTypeId.value+=1;
        t.data.forEach((s)=>{
            nowSkillId.value+=1;
        })
    });
    console.log(nowSkillId.value);

}


function addSeries(event){
    if(event.key=='Enter'){
        let newSeries={
            typeId:nowTypeId.value,
            typeName:event.target.value,
            data:[]
        };

        func.value.push(newSeries);
        console.log(func.value);

        //紀錄
        let movement={
            method:"addSeries",
            data:{
                typeId:nowTypeId.value,
                typeName:event.target.value
            }
        }

        funcMove.value.push(movement);
        
        //清空
        init();

        //遞增系列id增加
        nowTypeId.value+=1;

        let skill=document.getElementById('skill');
        skill.scrollTo(0,skill.scrollHeight);

        
    }
}

//還原技能設定
function RecoverClick(){
    func.value=JSON.parse(JSON.stringify(funcData));
    //清空先前所有修改動作紀錄
    funcMove.value=[];
    calSkillId();
}

//呼叫新增視窗
function callAdd(seriesId){
    selectTId.value=seriesId;
    
    //將變動位置限制在一定範圍內
    
    mode.value='add';
    SMaxIndex.value=func.value.find((t)=>t.typeId==selectTId.value).data.length+1;
}

//添加指定系列技能標籤
function addTag(){
    let inputText=document.getElementById('input1').value;
    let insertPos=document.getElementById('addPos').value;

    let newSkill={
        id:nowSkillId.value,//之後要送出才會替換成可用的值
        name:inputText
    }
    console.log(func.value.find((s)=>s.typeId===selectTId.value));


    //func.value.find((s)=>s.typeId===selectTId.value).data.push(newSkill);  
    func.value.find((s)=>s.typeId===selectTId.value).data.splice(insertPos-1,0,newSkill);  
    alert('技能標籤已加入');


    //還原
    init();

    //將ID遞增避免重複
    nowSkillId.value+=1;
}

function editTag(tId,sId){
    //將右邊視窗切換成編輯模式
    mode.value='edit';


    //將技能指定
    selectTId.value=tId;
    selectSId.value=sId;

    let targetSkill=func.value.find((t)=>t.typeId===tId).data.find((s)=>s.id===sId);
    let targetIndex=func.value.find((t)=>t.typeId===tId).data.findIndex((s)=>s.id===sId);
    SMaxIndex.value=func.value.find((t)=>t.typeId===tId).data.length+1;
    showSkill.value=targetSkill;
    SIndex.value=targetIndex;
    
}

//刪除技能
function removeTag(tId,sId){
    let targetType=func.value.find((type)=>type.typeId===tId);
    targetType.data=targetType.data.filter((c)=>c.id!==sId);

    //動作資料:刪除 後台會去認這個資料將card裡有這個標籤的先拿掉
    let movement={
        method:"deleteTag",
        data:{
            type:tId,
            id:sId
        }
    }

    //添加這個動作
    funcMove.value.push(movement);
    console.log(funcMove);
}

//儲存修改
function saveTag(){
    let newSkill={
        id:selectSId.value,
        name:document.getElementById('editname').value
    }

    //一律先拿掉原本的 再加入指定位置

    function moveElement(oldPos, fromIndex,newPos, toIndex,skill) {//傳入舊位置 舊索引 新位置跟新索引

        //先原本的技能加入並改成新版本的之後，再移除掉舊的
        let oldSkill= func.value.find((type)=>type.typeId===oldPos).data.find((s,pos)=>pos===fromIndex);
        let newData = func.value.find((type)=>type.typeId==newPos).data;

        //標記舊的地方需要刪除
        oldSkill.delete=true;

        //加入並當場改寫 標記舊的刪除
        newData.splice(toIndex, 0, skill);
        func.value.find((type)=>type.typeId==newPos).data=newData;
        console.log(func.value);

        //最後再把舊的移除掉
        let oldData = func.value.find((type)=>type.typeId===oldPos).data;
        oldData = oldData.filter((s,pos)=>s.delete!==true);
        
        console.log(oldData);
        func.value.find((type)=>type.typeId===oldPos).data=oldData;
    }
    

    let oldPos=selectTId.value;
    let newPos=document.getElementById('beyond').value;
    
    moveElement(oldPos,SIndex.value ,newPos, document.getElementById('editPos').value-1,newSkill);

    console.log(func.value);

    //最後還原
    alert('修改位置完畢!!')
    init();

}

//取消現有操作 包括編輯跟新增
function cancelModify(){
    alert('取消操作');
    init();
}

//刪除整個技能系列 包刮內部技能標籤
function deleteType(tId){
    let msg='確定刪除這個系列嗎?如果誤刪可以透過還原恢復\n但如果送出儲存成功則無法恢復\n確定刪除嗎?';
    if(confirm(msg)){
        func.value=func.value.filter((t)=>t.typeId!==tId);
        alert('刪除成功!!');

        nowTypeId.value-=1;

        //動作資料:刪除一整個系列
        let movement={
            method:"deleteSeries",
            data:{
                typeId:tId
            }
        }

        funcMove.value.push(movement);
    }

    console.log(func.value);
}

//更改選擇位置最大值 透過select change監聽事件觸發
function changeMax(){
    let tId=parseInt(document.getElementById('beyond').value);
    document.getElementById('editPos').max=func.value.find((t)=>t.typeId===tId).data.length+1;
    document.getElementById('editPos').value=1;

}
//指定技能存放位置為最前面
function setPosMin(){
    if(mode.value==='edit')
        document.getElementById('editPos').value=parseInt(document.getElementById('editPos').min);
    else if(mode.value==='add')
        document.getElementById('addPos').value=parseInt(document.getElementById('addPos').min);
    else 
        return
}

//指定技能存放位置為最後面
function setPosMax(){
    if(mode.value==='edit')
        document.getElementById('editPos').value=parseInt(document.getElementById('editPos').max);
    else if(mode.value === 'add')
        document.getElementById('addPos').value=parseInt(document.getElementById('addPos').max);
    else
        return
}

function showBtn(event){
    event.target.classList.remove('hideBtn');
}

function hideBtn(event){
    event.target.classList.add('hideBtn');
}

function init(){
    selectTId.value=0;//技能系列編號
    selectSId.value=0;//技能編號
    SIndex.value=null;//技能在陣列中的索引(位置)
    SMaxIndex.value=null;
    showSkill.value=null;
    mode.value='';
    
}

//送出最終修改設定並且更新備份
function saveFunc(){


    let data={
        func:func.value,//修改後的技能
        moves:funcMove.value
    }
    console.log(data);

    axios.post('http://localhost:5000/func/save',data).then(async(response)=>{
        alert(response.data.msg);
        //覆蓋備份
        funcData=JSON.parse(JSON.stringify(func.value));//深拷貝處理
        console.log(response.data);

        //將動作紀錄清空
        funcMove.value=[];
    }).catch((error)=>{
        alert('伺服器尚未開啟請稍後再試!!');
        window.location=window.location.origin+'/vuepage/';
    });
}    

</script>
<template>
    <div class="main">
        <div class="mx-auto w-4/5">
            <div>
                <span class="text-red-500 text-2xl font-bold">技能管理</span>
            </div>
            <div>
                <input type="text" class="rounded bg-gray-600 text-white" placeholder="技能系列名稱" @keydown="addSeries"/>
                <button class="addBtn" @click="RecoverClick">還原</button>
                <button class="addBtn" @click="saveFunc">送出</button>
            </div>
            <div class="flex flex-row">
                <div class="max-h-[450px] overflow-y-scroll w-1/3" id="skill">
                    <TransitionGroup tag="div" name="type">
                        <div class="mt-5 mb-5" v-for="t in func" :key="'type'+t.id">
                            <div class="flex flex-row sticky top-2 bg-black">
                                <span class="text-amber-800 text-lg font-bold pl-3">{{t.typeName}}</span>
                                <button class="addBtn" @click="callAdd(t.typeId)">添加技能</button>
                                <button class="addBtn" @click="deleteType(t.typeId)">刪除</button>
                            </div>
                            <div class="flex flex-col">
                                <TransitionGroup tag="div" name="list" :key="t">
                                    <div class="flex flex-row hideBtn mt-1 mb-1 "  v-for="skill in t.data" :key="skill"  @mouseenter="showBtn" @mouseleave="hideBtn">
                                        <span class="text-white h-[30px] flex items-center" >{{ skill.id+" "+skill.name }}</span>
                                        <button class="addBtn" @click="editTag(t.typeId,skill.id)">修改</button>
                                        <button class="removeBtn" @click="removeTag(t.typeId,skill.id)">刪除</button>
                                    </div>
                                </TransitionGroup>
                            </div>
                        </div>
                    </TransitionGroup>
                </div>
                <div class="w-2/3 pl-5">
                    <div v-if="mode==='add'">
                        <div>
                            <div>
                                <span class="text-red-500 font-bold text-lg">新增技能</span>
                            </div>
                            <div class="flex flex-col">
                               <div class="flex flex-row mt-2 mb-2">
                                    <span class="text-white">技能簡短敘述:</span>
                                    <input type="text" placeholder="技能敘述" class="rounded bg-gray-600 text-white" id="input1"/>
                                    
                                </div>
                                <div class="flex flex-row mb-2 mt-2">
                                    <span class="text-white">技能插入位置:</span>
                                    <input type="number" placeholder="變動位置" class="rounded bg-gray-600 text-white" id="addPos" :min="1" :max="SMaxIndex"/>
                                    <button class="addBtn index" @click="setPosMin">最前面</button>
                                    <button class="addBtn index" @click="setPosMax">最後面</button> 
                                </div>
                                <div>
                                    <button class="addBtn" @click="addTag">新增</button>
                                    <button class="addBtn" @click="cancelModify">取消</button>
                                </div>
                            </div>
                            <div>
                                <span class="text-red-300">{{'*技能將會添加至指定系列位置'}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="mode==='edit'">
                        <div>
                            <span class="text-red-500 font-bold text-lg">修改技能標籤設定</span>
                        </div>
                        <div class="mt-5 mb-5">
                            <span class="text-white font-bold">修改技能名稱</span><br/>
                            <input type="text" :value="showSkill.name" placeholder="技能描述" class="rounded bg-gray-600 text-white" id="editname"/>
                        </div>
                        <div class="mt-5 mb-5">
                            <span class="text-white font-bold">歸屬於</span>
                            <div>
                                <select class="colorSelect" id="beyond" @change="changeMax">
                                    <option v-for="t in func" :value="t.typeId" :selected="t.typeId===selectTId">{{ t.typeName }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-5 mb-5">
                            <span class="text-white font-bold">擺放位置</span>
                            <div class="flex flex-row">
                                <input type="number" :value="SIndex+1" :min="1" :max="SMaxIndex" id="editPos" />
                                <button class="addBtn index" @click="setPosMin">最前面</button>
                                <button class="addBtn index" @click="setPosMax">最後面</button> 
                            </div>
                        </div>
                        <div class="flex flex-row mt-10">
                            <button class="addBtn" @click="saveTag">儲存變更</button>
                            <button class="addBtn" @click="cancelModify">取消操作</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
.main{
    position: relative;
    width:100%;
    min-height: 500px;
    height: calc(100% + 50px);
    padding-bottom: 40px;
    background-image: linear-gradient(to bottom,rgb(27, 25, 25) 0%,rgb(65, 28, 28) 70%,rgb(102, 12, 12) 90%);
    padding-top: 70px;
}

.hiddenScrollBar::-webkit-scrollbar{
    width: 0 !important;
}

.removeBtn,.addBtn{
    color:theme('colors.amber.600');
    border-color: theme('borderColor.amber.600');
    border-radius: theme('borderRadius.md');
    border-width: theme('borderWidth.2');
    border-style: solid;
    padding-left: theme('padding.2');
    padding-right: theme('padding.2');
    margin-left: theme('margin.2');
    margin-left: theme('margin.2');
}

.addBtn.index{
    color:theme('colors.yellow.400');
    border-color: theme('borderColor.yellow.400');
}

.removeBtn:hover,.addBtn:hover{
    color: theme('colors.white');
    border-color: theme('borderColor.white');
}

.hideBtn .addBtn,.hideBtn .removeBtn{
    display: none;
}

.colorSelect{
    background-color: rgb(105, 13, 13);
    color: white;
    border:theme('borderRadius.lg');
    width: theme('width.1/10');
    min-width: 150px;
}
</style>