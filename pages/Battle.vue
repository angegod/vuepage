<script setup>
    import { inject,ref,provide} from 'vue';
    import myFile from '../pages/data/text.json';
    import ultimate from '../pages/data/Ultimate.json';
    import Switch from '../components/Switch.vue';

    const isAddable= '';

    const target=ref(myFile[0]);
    console.log(target.value.name);

    const b1=ref(null);
    const switchs=ref(false);

    /*顯示狀態*/
    const showable=ref(true);

    function showDefaultImg(event){/*當照片出現錯誤時，則顯示預設照片 */
        event.preventDefault();
        event.target.src=isAddable+'/images/images_404.png';
        
        showable.value=false;
    }


    function imgClick(number){/* 賦予特殊紅框 並且將其他人的紅框給移除*/
        showable.value=true;
        var imagesALL=document.querySelectorAll(".monster_images")

        
        imagesALL.forEach((img)=>img.classList.remove('isChoose'));//先清掉所有照片的紅框

        imagesALL[number-1].classList.add('isChoose');//再來將所有照片的紅框

        var detailImages=document.getElementById('battle_details_image');
        if(!switchs.value){
            
            var newpath=isAddable+'/images/number'+number+'/battle_details.jpg';
            detailImages.src=newpath;

            target.value=myFile[number-1];
        }else{
            var newpath=isAddable+'/images/ultimate/u'+number+'/battle_details.jpg';

            detailImages.src=newpath;

            target.value=ultimate[number-1];
        }

        //為了預防照片載入過久，這邊會先預設照片隱藏，並且使用loading.gif，直到照片完成loading
        var loadingGif=document.getElementById('hidden_image');
        detailImages.classList.add('hidden');
        loadingGif.classList.remove('hidden');

    }

    function imgloadStatus(){
        var node=document.getElementById('battle_details_image');
        var hiddenImage=document.getElementById('hidden_image');


        if(node.complete&&!node.error){
            console.log(node.src +" is loaded");

            //顯示關卡資訊
            hiddenImage.classList.add('hidden');
            node.classList.remove('hidden');
        }
        else{
            console.log('fail to loaded')
        }
    }
   

    //子物件回傳方法
    function clicked(){
        switchs.value=!switchs.value;
        
        //更改讀取檔案的類別
        if(switchs.value)
            target.value=ultimate[0];
        else
            target.value=myFile[0];
        imgClick(1);
    }
    //預設載入第一張照片
   

    provide('clicked',clicked);


    //meta Tag
    useHead({
        title: '災厄級--關卡資訊',
        meta: [
            { name: 'description', content: '彙整封王災厄級跟流光災厄級關卡資訊' },
            { property: 'og:title', content: '災厄級--關卡資訊' },
            { property: 'og:description', content: '彙整封王災厄級跟流光災厄級關卡資訊' }
        ]
    });

    onMounted(()=>{
        //初始化載入 第一個
        imgClick(1);
    })
</script>

<template>
    <div class="battle">
        <div class="main relative pt-3">
            <div class="flex flex-row align-middle">
                <h1 class="text-red-500 font-bold text-[28px]" v-if="!switchs">封王災厄級</h1>
                <h1 class="text-red-500 font-bold text-[28px]" v-else="switchs">流光災厄級</h1>
                <div class="ml-2">
                    <Switch ref="b1" :hideable="true" @refresh="clicked" />
                </div>
            </div>
            <div class="monster_images_total overflow-x-scroll flex flex-row mb-5">
                <div class="monster_images" v-for="(battle,number) in myFile" v-if="!switchs">
                    <img :src="isAddable + `/images/number${number+1}/hideImage.jpg`" alt="5555" v-on:click="imgClick(number+1)" @error="showDefaultImg"/>
                </div>
                <div class="monster_images" v-for="(battle,number) in ultimate" v-else>
                    <img :src="isAddable + `/images/ultimate/u${number+1}/Icon.png`" alt="5555" v-on:click="imgClick(number+1)" @error="showDefaultImg"/>
                </div>
            </div>
            <div class="battle_description" v-if="showable">
                <div>
                    <span class="font-bold text-red-800 text-3xl newfont">{{(target!=null)?target.name:''}}</span>
                </div>
                <div>
                    <span class="font-bold text-amber-900 text-xl newfont">進關限制:{{ (target!=null)?target.limit:'' }}</span>
                </div>
                <div class="mt-5">
                    <span class="font-bold text-white text-xl newfont">場景技能:{{ (target!=null)?target.background:'' }}</span>
                </div>
                <div class="achievement" v-if="!switchs">
                    <p>
                        <span class="newfont">{{ (target!=null)?target.achievement.first:'' }}</span><br/>
                        <span class="newfont">{{ (target!=null)?target.achievement.second:'' }}</span><br/>
                        <span class="newfont">{{ (target!=null)?target.achievement.third:'' }}</span><br/>
                    </p>
                </div>
            </div>
            <div class="battle_description" v-else>
                <span class="errors_text">尚未有相關資訊，敬請期待</span>
            </div>
            <div class="battle_totals max-w-[800px]"  v-lazy-container="{ selector: 'img' }">
                <img id="battle_details_image"  :data-src="isAddable+'/images/number1/battle_details.jpg'" class="hidden"
                    alt="not found" @error="showDefaultImg"  @load="imgloadStatus" />
                <img id="hidden_image" :data-src="isAddable+'/images/question.gif'" class="max-w-[300px] " />
            </div>          
        </div>

    </div> 
</template>
<style scoped>
    @import '../assets/css/battle.css';
    @font-face {
        font-family: 'cwTeXYen';
        font-style: normal;
        font-weight: 500;
        src: url(//fonts.gstatic.com/ea/cwtexyen/v3/cwTeXYen-zhonly.eot);
        src: url(//fonts.gstatic.com/ea/cwtexyen/v3/cwTeXYen-zhonly.eot?#iefix) format('embedded-opentype'),
            url(//fonts.gstatic.com/ea/cwtexyen/v3/cwTeXYen-zhonly.woff2) format('woff2'),
            url(//fonts.gstatic.com/ea/cwtexyen/v3/cwTeXYen-zhonly.woff) format('woff'),
            url(//fonts.gstatic.com/ea/cwtexyen/v3/cwTeXYen-zhonly.ttf) format('truetype');
    }

    .newfont{
        font-family: 'cwTeXYen';
      
    }
    
</style>