<script setup>
import { provide,inject ,ref, watch} from 'vue';
import router from './route';
import Footers from './components/Footer.vue';
import { useRoute } from 'vue-router';
import {eventBus} from './components/data/eventBus';
import { onMounted } from 'vue';

var currentpath=window.location.href;

/*確定來源 根據來源將相對應照片添加相對路徑 */
var isAddable="";
if(currentpath.includes("https://angegod.github.io/vuepage/"))
    isAddable="/vuepage";
else
    isAddable="";

provide('frontpath',isAddable);

let show=ref(false);
//時光牌圖鑑匹配按鈕是否顯示?
let showCardBtn=ref(false);

const route=useRoute();

watch(
  () => route.path,
  (newPath,oldPath) => {
    (window.innerWidth>=500)?show.value=false:show.value=true;
    //console.log(oldPath+' => '+newPath);
    switch(newPath){
        case '/card/':
            addDash(4);
            showCardBtn.value=true;
            break;
        case '/battle/':
            addDash(3);
            showCardBtn.value=false;
            break;
        case '/about/':
            addDash(2);
            showCardBtn.value=false;
            break;
        case '/':
            addDash(1);
            showCardBtn.value=false;
            break;
        default:
            break;
    }
  }
);

function showMenu(){
    show.value=!show.value;
    (show.value)?(document.getElementById('headerMenu').classList.add('expand')):  (document.getElementById('headerMenu').classList.remove('expand'));
}

function addDash(index){
    var menuLink=document.querySelectorAll('.link');
    var menuLink2=document.querySelectorAll('.sublink');


    for(var i=0;i<menuLink.length;i++){
        menuLink[i].classList.remove('redText');
        menuLink2[i].classList.remove('redText');

        if(!menuLink[i].classList.contains('redText')&&((i+1)===index)){
            menuLink[i].classList.add('redText');
        }

        if(!menuLink2[i].classList.contains('redText')&&((i+1)===index)){
            menuLink2[i].classList.add('redText');
        }
    }
    if(document.getElementById('headerMenu').classList.contains('expand'))
        document.getElementById('headerMenu').classList.remove('expand');  
}


const startMatch=()=>{
    eventBus.emit('callsetData');
}


onMounted(() => {
    eventBus.on('HideBtn', ()=>{
        showCardBtn.value=false;
        console.log('hideBtn');
    });
    eventBus.on('ShowBtn', ()=>{
        showCardBtn.value=true;
        console.log('showBtn');
    });
});
</script>
<script>
export default {
  mounted() {
    // 當應用掛載後，觸發 'render-event' 事件
    document.dispatchEvent(new Event('render-event'));
  }
};

</script>
<template id="tmp1">
    <header class="header">
        <div class="menu hidden flex-row  min-[600px]:flex [&>div]:my-2 [&>div]:pb-1" id="biggerHeader">
            <div class="[&>a]:text-[25px] options link redText" @click="addDash(1)">
                <router-link to="/" >主頁</router-link>
            </div>
            <div class="[&>a]:text-[25px] options link" @click="addDash(2)">
                <router-link to="/about/">關於</router-link>
            </div>
            <div class="[&>a]:text-[25px] options link" @click="addDash(3)">
                <router-link to="/battle/">關卡資訊</router-link>
            </div>
            <div class="[&>a]:text-[25px] options link" @click="addDash(4)">
                <router-link to="/card/">時光牌</router-link>
            </div>
            <div class="!p-0 !mb-1 !flex" v-if="showCardBtn">
                <button class="searchBtn bg-amber-800 
                text-white border-amber-800 w-[100px] rounded-md text-[20px]" @click="startMatch">開始匹配</button>
            </div>
        </div>
        <div class="flex flex-row min-[600px]:hidden w-[100%] justify-between" id="smallHeader">
            <div class="mt-2 ml-2">
                <button @click="showMenu"><img :src="isAddable+'/images/menu.svg'" alt="menu" style="width: 25px;"/></button>
            </div>
            <div class="flex flex-col ml-2 subMenu w-[100%] max-w-[-webkit-fill-available]" id="headerMenu" >
                <div class="mt-2 sublink redText" @click="addDash(1)">
                  <router-link  to="/" >主頁</router-link>
                </div>
                <div class="mt-2 sublink" @click="addDash(2)">
                  <router-link  to="/about/" >關於</router-link>
                </div>
                <div class="mt-2 sublink" @click="addDash(3)">
                  <router-link to="/battle/" >關卡資訊</router-link>
                </div>
                <div class="mt-2 sublink" @click="addDash(4)">
                  <router-link to="/card/" >時光牌</router-link>
                </div>
            </div>
            <div class="!p-0 !mb-1 !flex mr-1" v-if="showCardBtn">
                <button class="searchBtn bg-amber-800 
                text-white border-amber-800 w-[100px] rounded-md text-[20px]" @click="startMatch">開始匹配</button>
            </div>
        </div>
    </header>
    
    <div class="app">
      <router-view/>
    </div>
    <Footers />
</template>
<script>


</script>

<style lang="css" scoped>
   @import '@/css/menu.css';

</style>
