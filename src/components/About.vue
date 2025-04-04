<script setup>
    import { inject,ref } from 'vue';
    import { useHead } from '@vueuse/head';
    
    const isAddable=inject('frontpath');

    //
    useHead({
        title: '侵蝕封王--關於',
        meta: [
            { name: 'description', content: 'The about page of website.' },
            { property: 'og:title', content: '侵蝕封王--關於' },
            { property: 'og:description', content: 'The about page of the Website' }
        ]
    });
</script>
<template>
    
    <div class="about">
        <div class="main">
            <div class="subtitle">
                <div class="images">
                    <img :src="isAddable+'/images/intro1.jpg'" alt="55555" width="500" height="300"/>
                </div>
                <div class="text">
                    <p class="title">初次登場</p>
                    <p>在神魔之塔遊戲劇情中，初次登場於第十一封印中的主線關卡，玩家可以依據喜好選擇不一樣的封王來應戰。</p>
                </div>
            </div>
            <div class="subtitle">
                <div class="images">
                    <img :src="isAddable+'/images/intro2.jpg'" alt="55555" width="500" height="300"/>
                </div>
                <div class="text">
                    <p class="title">如何獲得?</p>
                    <p>要獲得對應的異變封王，必須要有未潛解過的本體、兩張對應封王的專屬潛解素材以及三顆滅絕晶玉。</p>
                    <p>以薩魯曼做舉例，需要素材如下圖所示:</p>
                    <div class="flex flex-row">
                        <img :src="isAddable+'/images/number1/m1.jpg'" alt=""/>
                        <img :src="isAddable+'/images/number1/m1.jpg'" alt=""/>
                        <img :src="isAddable+'/images/3011i.jpg'" alt=""/>
                        <img :src="isAddable+'/images/3011i.jpg'" alt=""/>
                        <img :src="isAddable+'/images/3011i.jpg'" alt=""/>
                    </div>
                </div>
            </div>
            <div class="subtitle">
                <div class="text mainarticle">
                    <p class="title">共同特點</p>
                    <div class="contents_details" style="padding-top: 0px;">
                        <ul style="padding-left: 0px;">
                            <li><span>1.8星召喚獸:</span>每個異變封王都是8星召喚獸，配合九封王可以進一步拉高隊伍整體的實血</li>
                            <li><span>2.核心隊伍技:</span>在受到敵人攻擊五次之後，將會自動生成"幽閉空間"，發動任意封王主動技能可以關閉核心</li>
                            <li><span>3.黑白隊伍技:</span>配合核心隊伍技，可以有相當多的戰術空間。比方說:黑八封對應到減傷80%!</li>
                            <li><span>4.傲人高三圍:</span>其三圍數值可以說是遊戲中前段班的存在，黑毒龍的血線更是來到單張破萬</li>
                            <li><span>5.單卡大屁股!:</span>1張異變封王需要70空間，等級較低玩家不建議以異變封王做為成員的優先考量!</li>
                            <li><span>6.腐化龍刻:</span>每個異變封王本體可以做成對應種族的腐化武裝，對於某些關卡通關有很大的幫助!</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="subtitle">
                <div class="images">
                    <img :src="isAddable+'/images/intro3.jpg'" alt="55555" width="500" height="300"/>
                </div>
                <div class="text" >
                    <p class="title">腐化龍刻</p>
                    <p>每個異變封王都可以做成對應的種族腐化龍刻，其帶來的好處大致有兩點:</p>
                    <p>1.裝備腐化武裝的成員自身可以無視"腐化"敵技。</p>
                    <p>2.在災厄級關卡中可以減少混沌值，每顆可以減少5%的混沌值。</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
     @import '@/css/intro.css';
</style>