<script>
    import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
    import { ref,provide,inject } from 'vue';
    import { useHead } from '@vueuse/head';
    import 'vue3-carousel/dist/carousel.css'
    
    /*宣告選單節點以及初始選單顯示狀態*/
    
    useHead({
        title: '侵蝕封王--主頁',
        meta: [
            { name: 'description', content: '主要是統合神魔災厄級相關資訊跟時光牌。供玩家找尋相關資訊比較方便且快速。' },
            { property: 'og:title', content: '侵蝕封王--主頁' },
            { property: 'og:description', content: '主要是統合神魔災厄級相關資訊跟時光牌。供玩家找尋相關資訊比較方便且快速。' }
        ]
    });

    export default {
        name: 'App',
        components: {
            Carousel,
            Slide,
            Pagination,
            Navigation,
        },methods:{
            menuclick:function(){
                let menu = document.getElementById('kingmenu');
                console.log(menu);
                //let showable=false;
                let showable=menu.classList.contains('hidden');
                if(!showable){
                    /*如果顯示狀態為真 */
                    menu.classList.add('hidden');
                    menu.classList.remove('lists');
                }
                else{
                    menu.classList.remove('hidden');
                    menu.classList.add('lists');
                }
                    
                console.log(showable);
        }/*宣告改變顯示狀態方法 */
        }
        ,data(){
            return{
                
            }
        }
    }   

</script>
<script setup>

    //判斷當前圖片是否加上前綴
    var currentpath=window.location.href;
    var isAddable="";
    if(currentpath.includes("https://angegod.github.io/vuepage/"))
        isAddable="/vuepage";
    else
        isAddable="";
</script>
<template>
    <div class="flex flex-row"> 
        <div class="w-1/5 lists relative overflow-y-hidden max-sm:hidden mt-4" > 
            <ul class="text-2xl noneDecoration " id="kingmenu">
                <li><router-link :to="'/King?id=1'" class="subpagesLink">一封王</router-link></li>
                <li><router-link :to="'/King?id=2'" class="subpagesLink">二封王</router-link></li>
                <li><router-link :to="'/King?id=3'" class="subpagesLink">三封王</router-link></li>
                <li><router-link :to="'/King?id=4'" class="subpagesLink">四封王</router-link></li>
                <li><router-link :to="'/King?id=5'" class="subpagesLink">五封王</router-link></li>
                <li><router-link :to="'/King?id=6'" class="subpagesLink">六封王</router-link></li>
                <li><router-link :to="'/King?id=7'" class="subpagesLink">七封王</router-link></li>
                <li><router-link :to="'/King?id=8'" class="subpagesLink">八封王</router-link></li>
                <li><router-link :to="'/King?id=9'" class="subpagesLink">九封王</router-link></li>
                <li><router-link :to="'/King?id=10'" class="subpagesLink">十封王</router-link></li>
                <li><router-link :to="'/King?id=11'" class="subpagesLink">姆姆</router-link></li>
            </ul>
        </div>
        <div class="w-4/5 relative my-4 max-sm:mx-auto max-sm:w-[100%]">
            <carousel :autoplay="5000" :wrap-around="true" >
                <slide v-for="index in 10" :key="index">
                    <router-link :to="`/King?id=${index}`">
                        <img :src="isAddable+`/images/number${index}/battle_stage.jpg`" class="carImg" alt="not found"/>
                    </router-link>
                </slide>
                <Pagination />
            </carousel>

        </div>
    </div>
    <div class="flex flex-col flex-wrap sm:flex-row [&>div]:max-md:w-[100%] [&>div]:max-sm:mx-auto" style="background-color: rgb(23,23,23);">
        <div class="w-2/5">
            <div class=" w-4/5 mx-auto images flex justify-center">
                <img src="https://i.pinimg.com/736x/c8/b3/72/c8b372c8af95089ad22b12ba4f9839fd.jpg" 
                    style="min-height: 300px; min-width: 200px; height: 70vh;aspect-ratio: 2/3;"/>
            </div>
        </div>
        <div class="w-3/5 mt-[20vh]">
           <div class="w-3/5 mx-auto mt-30 [&>p]:mb-3 max-md:mt-15 " >
                <p class="text-white font-bold text-2xl  max-md:text-xl">受到始祖破壞之力的侵蝕的十隻封王，不僅外表發生顯著的變化，破壞之力更是無可匹敵的強度。</p>
                <p class="text-red-600 text-2xl max-md:text-xl font-bold">你有勇氣挑戰他們嗎?(超中二XD)</p>
           </div>
            <div class="button">
                <button><router-link to="/battle/" class="px-3 text-lg py-1">更多</router-link></button>
            </div>
        </div>
    </div>
    <div class="flex flex-col flex-wrap sm:flex-row [&>div]:max-md:w-[100%] [&>div]:max-sm:mx-auto mt-5" style="background-color: rgb(23,23,23);">
        <div class="w-2/5">
            <div class=" w-4/5 mx-auto max-sm:h-[80vw]" >
                <img :src='isAddable+"/images/bg1.png"' class="max-sm:h-[100vw]"
                    style="  max-width: calc(100%);"/>
            </div>
        </div>
        <div class="w-3/5 mt-[20vh]">
           <div class="w-3/5 mx-auto mt-30 [&>p]:mb-3 max-md:mt-15 " >
                <p class="text-white font-bold text-2xl max-md:text-xl">近期隆重推出時光牌圖鑑篩選器功能</p>
                <p class="text-white text-2xl max-md:text-xl font-bold ">歡迎有需要的 點選下方連結使用!</p>
           </div>
            <div class="button">
                <button><router-link to="/card/" class="px-3 text-lg py-1"><span>更多</span></router-link></button>
            </div>
        </div>
    </div> 
</template>
<style scoped>
    @import '@/css/home.css';

    
</style>

