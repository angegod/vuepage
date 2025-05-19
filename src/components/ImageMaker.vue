<script setup>
import { inject,ref,provide} from 'vue';
import stage from '../assets/UltimateTest.json';
import { toPng } from 'html-to-image';

//只在測試版本進入
const isAddable=inject('frontpath');
if(isAddable!==''){
    var currentpath=window.location.href;
    if(currentpath.includes("https://angegod.github.io/vuepage"))
        window.location.href = "https://angegod.github.io/vuepage";
    else
        window.location.href = "http://localhost:5173/vuepage";
}

function savePng() {
    console.log('saving image');
    
    // 使用 id 來選取目標元素
    const target = document.getElementById('SavePng');

    if (!target) return;

    toPng(target, {
        cacheBust: true,
        backgroundColor: 'white',  // 避免透明背景產生邊界
    })
    .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'screenshot.png';
        link.href = dataUrl;
        link.click();
    })
    .catch((err) => {
        console.error('Failed to export:', err);
    });
}
</script>
<template>
    <div class="main">
        <div class="w-[600px] relative pt-5 mx-auto ">
            <div class="flex flex-col" id="SavePng">
                <div class="w-[100%] h-[100px] flex flex-row justify-between relative overflow-hidden">
                    <div class="imgBlend">
                        <img :src="isAddable+'/images/card/test.png'" class="h-[100%] object-cover" alt="test" title="test" />
                    </div>
                    <div class="w-1/2 h-[100px] blackBlend flex items-center">
                        <span class="text-amber-700 font-bold text-xl mx-auto">{{ stage.stageName }}</span>
                    </div>
                </div>
                <div class="[&>div]:text-center">
                    <div class="bg-orange-900">
                        <span class="text-white font-bold text-lg">進場限制</span>
                    </div>
                    <div class="bg-white">
                        <span class="text-black text-base">{{ stage.stageLimit }}</span>
                    </div>
                </div>
                <div class="[&>div]:text-center">
                    <div class="bg-orange-900">
                        <span class="text-white font-bold text-lg">場景敵技</span>
                    </div>
                    <div class="bg-white">
                        <span class="text-black text-base">{{ stage.backgroundSkill }}</span>
                    </div>
                </div>
                <div v-for="wave in stage.wave">
                    <div class="bg-orange-900 text-center">
                        <span class="text-white font-bold text-lg">WAVE {{ wave.waveId }}</span>
                    </div>
                    <div>
                        <div class="bg-white">
                            <div class="flex flex-row pb-2 border-b-black last:pb-0 border-[1px] last:border-[0px]" v-for="m in wave.monsterDetails">
                                <div class="w-1/3 text-center my-1 last:mb-0">
                                    
                                </div>
                                <div class="w-2/3 flex flex-col">
                                    <div class="[&>span]:text-black flex flex-row justify-center py-1 last:pb-0 border-b-[1px] last:border-[0px] border-black" 
                                        v-for="details in m.Details">
                                        <div class="[&>span]:text-black flex flex-col w-1/2">
                                            <span>HP:{{ details.HP }}</span>
                                            <span>ATK:{{ details.monsterATK }}</span>
                                            <span>DEF:{{ details.DEF }}</span>
                                            <span>CD:{{ details.CD }}({{ details.StartCD }})</span>
                                        </div>
                                        <div class="[&>span]:text-black w-1/2 flex-wrap flex flex-row ">
                                            <span class="mx-1" v-for="skill in details.Skill">{{skill}}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-1">
                <button class="text-white border-white border-[1px] p-1" @click="savePng">save as png</button>
            </div>
        </div>        
    </div>

</template>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.main{
    position: relative;
    width:100%;
    min-height: 800px;
    height: calc(100% + 50px);
    padding-bottom: 40px;
    background-image: linear-gradient(to bottom,rgb(27, 25, 25) 0%,rgb(65, 28, 28) 70%,rgb(102, 12, 12) 90%);
}

.blackBlend{
    background-image: linear-gradient(to right,black,rgb(30, 29, 29));
}

span{
    font-weight: theme('fontWeight.bold');
}

#SavePng {
  box-shadow: none !important;
  border: none !important;
}

</style>