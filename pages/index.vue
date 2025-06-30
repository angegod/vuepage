<template>
  <div class="flex flex-row">
    <!-- 側邊選單 -->
    <div class="w-1/5 lists relative overflow-y-hidden max-sm:hidden mt-4">
      <ul class="text-2xl noneDecoration " id="kingmenu">
          <li><NuxtLink :to="'/King?id=1'" class="subpagesLink">一封王</NuxtLink></li>
          <li><NuxtLink :to="'/King?id=2'" class="subpagesLink">二封王</NuxtLink></li>
          <li><NuxtLink :to="'/King?id=3'" class="subpagesLink">三封王</NuxtLink></li>
          <li><NuxtLink :to="'/King?id=4'" class="subpagesLink">四封王</NuxtLink></li>
          <li><NuxtLink :to="'/King?id=5'" class="subpagesLink">五封王</NuxtLink></li>
          <li><NuxtLink :to="'/King?id=6'" class="subpagesLink">六封王</NuxtLink></li>
          <li><NuxtLink :to="'/King?id=7'" class="subpagesLink">七封王</NuxtLink></li>
          <li><NuxtLink :to="'/King?id=8'" class="subpagesLink">八封王</NuxtLink></li>
          <li><NuxtLink :to="'/King?id=9'" class="subpagesLink">九封王</NuxtLink></li>
          <li><NuxtLink :to="'/King?id=10'" class="subpagesLink">十封王</NuxtLink></li>
          <li><NuxtLink :to="'/test'" class="subpagesLink">姆姆</NuxtLink></li>
      </ul>
    </div>

    <!-- 輪播區域 -->
    <div class="w-4/5 relative my-4 max-sm:mx-auto max-sm:w-[100%]">
      <carousel :autoplay="5000" :wrap-around="true">
        <slide v-for="index in 10" :key="index">
          <NuxtLink :to="`/King?id=${index}`">
            <img :src="isAddable + `/images/number${index}/battle_stage.jpg`" class="carImg" alt="not found" />
          </NuxtLink>
        </slide>
        <Pagination />
        <Navigation />
      </carousel>
    </div>
  </div>

  <!-- 封王介紹 -->
  <div class="flex flex-row flex-wrap [&>div]:max-md:w-[100%] [&>div]:max-sm:mx-auto" style="background-color: rgb(23,23,23);">
    <div class="w-2/5">
      <div class=" w-4/5 mx-auto images flex justify-center">
        <img
          src="https://i.pinimg.com/736x/c8/b3/72/c8b372c8af95089ad22b12ba4f9839fd.jpg"
          style="min-height: 300px; min-width: 200px; height: 70vh;aspect-ratio: 2/3;"
        />
      </div>
    </div>
    <div class="w-3/5 h-max">
      <div class="w-3/5 mx-auto flex flex-col h-[450px] items-center [&>p]:mb-3 ">
          <div class="h-[40%] items-center flex justify-center">
              <span class="text-white text-2xl max-md:text-xl font-bold">受到始祖破壞之力的侵蝕的十隻封王，不僅外表發生顯著的變化，破壞之力更是無可匹敵的強度。</span>
          </div>
          <div>
              <p class="text-red-600 text-2xl max-md:text-xl font-bold">你有勇氣挑戰他們嗎?</p>
          </div>
          <div class="button">
              <button>
                <NuxtLink to="/battle/" class="px-3 text-lg py-1">更多</NuxtLink>
              </button>
          </div>
      </div>
      
    </div>
  </div>

  <!-- 時光牌介紹 -->
  <div class="flex flex-row flex-wrap sm:flex-row [&>div]:max-md:w-[100%] [&>div]:max-sm:mx-auto mt-5" style="background-color: rgb(23,23,23);">
    <div class="w-2/5">
      <div class=" w-4/5 mx-auto max-sm:h-[80vw]">
        <img :src="isAddable + '/images/bg1.png'" class="max-sm:h-[100vw]" style="max-width: 100%;" />
      </div>
    </div>
    <div class="w-3/5 h-max">
      <div class="w-3/5 mx-auto flex flex-col h-[450px] [&>p]:mb-3 max-md:mt-15">
          <div class="h-[50%] items-center flex flex-col justify-center">
              <p class="text-white font-bold text-2xl max-md:text-xl">近期隆重推出時光牌圖鑑篩選器功能</p>
              <p class="text-white text-2xl max-md:text-xl font-bold">歡迎點選下方連結使用!</p>
          </div>
          <div class="button">
              <button>
                <NuxtLink to="/card/" class="px-3 text-lg py-1"><span>更多</span></NuxtLink>
              </button>
          </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const isAddable = ref('');

// 設定 meta
useHead({
  title: '侵蝕封王--主頁',
  meta: [
    { name: 'description', content: '統合神魔災厄級相關資訊與時光牌' },
    { property: 'og:title', content: '侵蝕封王--主頁' },
    { property: 'og:description', content: '統合神魔災厄級相關資訊與時光牌搜尋圖鑑' }
  ]
});

// 動態設定圖片前綴
onMounted(() => {
    const currentPath = window.location.href;
    if (currentPath.includes('https://angegod.github.io/TestNuxtPage/')) {
      isAddable.value = '/TestNuxtPage';
    } else {
      isAddable.value = '';
    }
});

// 側邊選單點擊切換
const menuclick = () => {
  const menu = document.getElementById('kingmenu');
  if (!menu) return;
  menu.classList.toggle('hidden');
  menu.classList.toggle('lists');
};
</script>
<style scoped>
@import '../assets/css/home.css';
</style>
