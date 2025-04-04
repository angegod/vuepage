<script setup>
    import { inject,ref } from 'vue';
    import { useHead } from '@vueuse/head';
    import Data from './King_details.json';
    import Intro from './Intro.vue';
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const targetId = urlParams.get('id');
    const isAddable=inject('frontpath');
    const details=Data.find((d)=>d.id.toString()===targetId);
    if(details===undefined){
        alert('該頁面正在施工中，敬請見諒');
        var currentpath=window.location.href;

        /*確定來源 根據來源將相對應照片添加相對路徑 */
        if(currentpath.includes("https://angegod.github.io/vuepage"))
            window.location.href = "https://angegod.github.io/vuepage/";
        else
            window.location.href = "http://localhost:5173/vuepage/";
    }

    //meta標籤
    useHead({
        title: `侵蝕封王--${details.monsterTitle}`,
        meta: [
            { name: 'description', content: '異變封王介紹介紹' },
            { property: 'og:title', content: `侵蝕封王--${details.monsterTitle}` },
            { property: 'og:description', content: '異變封王簡單介紹' }
        ]
    });
    
</script>
<template>
    <div class="section">
        <div class="content pb-5 [&>div]:w-4/5 [&>div]:mx-auto max-[600px]:[&>div]:w-[100%]">
            <div class="flex flex-col justify-center">
                <div class="mb-5 flex flex-row max-[1000px]:flex-col justify-evenly max-[850px]:mx-0">
                    <div class="monster_main_images mb-5 max-w-[600px] flex">
                        <img :src="isAddable+details.mainImage" alt="5555" class="max"/>
                        <img :src="isAddable+details.hideImage" alt="5555" class="min"/>
                    </div>
                    <div class="flex flex-col [&>*]:mt-1 [&>*]:mb-1 max-w-[400px] ml-5 w-2/5  max-[1000px]:w-[100%] max-[1000px]:ml-0">
                        <div class="font-bold">
                            <span :style="{color:details.color,fontSize:'25px'}">{{ details.monsterTitle }}</span>
                        </div>
                        <span class="text-white text-[18px] font-bold">歸類於:{{ details.monsterOthers.belong }}</span>
                        <span class="text-white text-[18px] font-bold">稀有度:{{ details.monsterOthers.rarity }}</span>
                        <span class="text-white text-[18px] font-bold">取得於:{{ details.monsterOthers.howtoget }}</span>
                        <div class="flex flex-row flex-wrap [&>img]:w-12 [&>img]:h-12 items-center">
                            <span class="text-white text-[18px] font-bold">素材量:</span>
                            <img :src="isAddable+details.monsterOthers.material.m1" alt=""/>
                            <img :src="isAddable+details.monsterOthers.material.m1" alt=""/>
                            <img :src="isAddable+details.monsterOthers.material.m1" alt=""/>
                            <img :src="isAddable+details.monsterOthers.material.m2" alt=""/>
                            <img :src="isAddable+details.monsterOthers.material.m2" alt=""/>
                        </div>
                        <div class="flex flex-row items-center">
                            <span class="text-white text-[18px] font-bold">對應腐化:</span>
                            <img :src="isAddable+details.monsterOthers.relic" width="50"/>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <div class="title">
                    <span>本體技能</span>
                </div>
                <Intro :dataText="details.skill"/>
                <div class="text-white font-bold mt-5 max-[450px]:text-[18px]">
                    <p class="whitespace-pre-wrap">{{ details.mainDescription }}</p>
                </div>
                <div class="score mt-2">
                    <label for="">評分:{{details.rate}}/10</label>
                </div>
            </div>
            <div style="margin-top: 50px;margin-bottom:50px;">
                <div class="title">
                    <span>專屬隊伍技能介紹</span>
                </div>
                <div class="flex flex-col mt-3" v-for="s in details.specialEffect">
                    <div class="text-gray-500 font-bold text-[20px] max-[450px]:text-[16px]">
                        <p class="whitespace-pre-wrap text-[20px] ">{{ s.mainDetails }}</p>
                    </div>
                    <div class="description mt-1">
                        <p class="text-[18px] max-[450px]:text-[16px]">{{ s.mainDescription }}</p>
                    </div>
                </div>
            </div>
            <div class="mb-5" style="padding-top: 10px;padding-bottom:10px;">
                <div class="flex flex-row flex-wrap justify-between [&>div]:ml-auto [&>div]:mr-auto max-md:flex-col max-xl:[&>div]:ml-[0px] max-xl:[&>div]:mr-[0px]">
                    <div class="w-1/2 flex flex-col  max-[1200px]:w-[100%]" >
                        <div class="title">
                            <span>腐化龍刻技能介紹</span>
                        </div>
                        <div class="flex flex-row mt-5 max-w-[800px] max-[500px]:flex-col"  >
                            <div class="w-[calc(20%_+_5rem)] ">
                                <img :src="isAddable+details.relic.image" alt="" />
                            </div>
                            <div class="[&>span]:text-base w-1/2 max-[500px]:w-[100%] flex flex-col">
                                <span class="text-yellow-400 font-bold">名&emsp;&emsp;子:<span class="text-white">{{ details.relic.name }}</span></span>
                                <span class="text-yellow-400 font-bold">限&emsp;&emsp;制:<span class="text-white">{{ details.relic.limit }}</span></span>
                                <span class="text-yellow-400 font-bold">充能條件:<span class="text-white">{{ details.relic.charge }}</span></span>
                                <span class="text-yellow-400 font-bold">屬性加成:<span class="text-white" title="血攻回">{{ details.relic.subaffix }}</span></span>
                                <span class="text-yellow-400 font-bold">
                                    獲取方式:
                                    <span class="text-white">
                                        以<span :style={color:details.color} class="font-bold">{{ details.monsterTitle }}</span>作武裝龍刻素材後壓制而成
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="w-1/2 mt-5 max-xl:w-[100%]" style="height: max-content;">
                        <table class="rounded-md [&>tr]:pt-3" style="height: 200px;">
                            <tr class="bg-[rgb(59,38,38)] [&>th]:text-white text-xl max-[500px]:[&>th]:text-[16px]">
                                <th class="w-1/2">隊長龍刻能力</th>
                                <th class="w-1/2">武裝龍刻被動</th>
                            </tr> 
                            <tr class="[&>td]:text-white [&>td]:text-base bg-[rgb(100,78,78)] 
                                max-[500px]:[&>td]:text-[14px] max-[500px]:[&>td]:p-1">
                                <td>{{ details.relic.leaderEffect.e1 }}</td>
                                <td>{{ details.relic.equipEffect.e1 }}</td>
                            </tr>
                            <tr class="[&>td]:text-white [&>td]:text-base bg-[rgb(199,149,149)] 
                                max-[500px]:[&>td]:text-[14px] max-[500px]:[&>td]:p-1">
                                <td>{{ details.relic.leaderEffect.e2 }}</td>
                                <td>{{ details.relic.equipEffect.e2 }}</td>
                            </tr>
                            <tr class="[&>td]:text-white [&>td]:text-base bg-[rgb(100,78,78)] 
                                max-[500px]:[&>td]:text-[14px] max-[500px]:[&>td]:p-1">
                                <td>{{ details.relic.leaderEffect.e3 }}</td>
                                <td>{{ details.relic.equipEffect.e3 }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    @import '@/css/submain.css';
</style>