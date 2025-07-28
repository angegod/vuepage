<script setup>
import { ref, watch, provide, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';
import Footers from '~/pages/Footer.vue';
import { useCardBtnStore } from './pages/data/store';

// 路由資訊
const route = useRoute();

//共用狀態
const store = useCardBtnStore();

// 圖片前綴 (避免 SSR 錯誤)
const isAddable = ref('')

if (location.href.includes('https://angegod.github.io/TestNuxtPage/')) {
    isAddable.value = '/TestNuxtPage'
}
provide('frontpath', isAddable.value);

// 選單狀態與卡片按鈕狀態
const show = ref(store.Cardbutton);
const showCardBtn = ref(false)

onMounted(() => {
    show.value = window.innerWidth < 500

    // 根據初始路由設置
    updateHeader(route.path)

    // 事件總線控制按鈕顯示
    /*eventBus.on('HideBtn', () => (showCardBtn.value = false))
    eventBus.on('ShowBtn', () => (showCardBtn.value = true))*/
})

// 監聽路由變化
watch(
  () => route.path,
  (newPath) => {
    updateHeader(newPath)
  }
)

function updateHeader(path) {
    show.value = window.innerWidth < 500
    const map = {
        '/': 1,
        '/about/': 2,
        '/battle/': 3,
        '/card/': 4
    }
    const index = map[path]
    if (index) addDash(index)
    showCardBtn.value = path === '/card/'
}

function showMenu() {
    const menu = document.getElementById('headerMenu')
    show.value = !show.value
    if (menu) menu.classList.toggle('expand', show.value)
}

function addDash(index) {
    const menuLink = document.querySelectorAll('.link')
    const menuLink2 = document.querySelectorAll('.sublink');

    //配合目前的路徑 將對應路由按鈕底色改掉
    menuLink.forEach((el, i) => {
        el.classList.toggle('redText', i === index - 1)
    });
    menuLink2.forEach((el, i) => {
        el.classList.toggle('redText', i === index - 1)
    });

    document.getElementById('headerMenu')?.classList.remove('expand')
}

const startMatch = () => {
    //eventBus.emit('callsetData');
    store.StartMatch();
}

</script>

<template>
   <header class="header">
         <div class="menu hidden flex-row  min-[600px]:flex [&>div]:my-2 [&>div]:pb-1" id="biggerHeader">
            <div class="[&>a]:text-[25px] options link redText" @click="addDash(1)">
                <NuxtLink to="/" >主頁</NuxtLink>
            </div>
            <div class="[&>a]:text-[25px] options link" @click="addDash(2)">
                <NuxtLink to="/about/">關於</NuxtLink>
            </div>
            <div class="[&>a]:text-[25px] options link" @click="addDash(3)">
                <NuxtLink to="/battle/">關卡資訊</NuxtLink>
            </div>
            <div class="[&>a]:text-[25px] options link" @click="addDash(4)">
                <NuxtLink to="/card/">時光牌</NuxtLink>
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
            <div class="subMenu flex flex-col ml-2" id="headerMenu" >
                <div class="my-2 sublink redText" @click="addDash(1)">
                    <NuxtLink  to="/" >主頁</NuxtLink>
                </div>
                <div class="my-1 sublink" @click="addDash(2)">
                    <NuxtLink  to="/about/" >關於</NuxtLink>
                </div>
                <div class="my-1 sublink" @click="addDash(3)">
                    <NuxtLink to="/battle/" >關卡資訊</NuxtLink>
                </div>
                <div class="my-1 sublink" @click="addDash(4)" >
                    <NuxtLink to="/card/" >時光牌</NuxtLink>
                </div>
            </div>
            <div class="!p-0 !mb-1 !flex mr-1" v-if="showCardBtn">
                <button class="searchBtn bg-amber-800 
                text-white border-amber-800 w-[100px] rounded-md text-[20px]" @click="startMatch">開始匹配</button>
            </div>
        </div>
      </header>
    
      <div class="app">
         <NuxtPage />
      </div>
      <Footers />
</template>

<style scoped>
@import 'assets/css/menu.css';


</style>
<style>
body {
   background-color: rgb(11, 11, 11);
   margin: 0px;
}
</style>

