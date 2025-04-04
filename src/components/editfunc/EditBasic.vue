<script setup>
    import { inject,ref,provide } from 'vue';
    import { computed } from 'vue';
    let props = defineProps(['card']);
    const emit = defineEmits(["update:card"]);

    const isAddable=inject('frontpath');//圖片默認路徑，要配合之後有可能上線
    if(isAddable!==''){
        var currentpath=window.location.href;
        if(currentpath.includes("https://angegod.github.io/vuepage"))
            window.location.href = "https://angegod.github.io/vuepage";
        else
            window.location.href = "http://localhost:5173/vuepage";
    }

    let FP = computed(() => [
        { name: "進場FP", mode: "PointEnter", value: props.card.PointEnter },
        { name: "補充FP", mode: "PointGet", value: props.card.PointGet },
        { name: "消耗FP", mode: "PointConsume", value: props.card.PointConsume },
        { name: "最大FP", mode: "PointMax", value: props.card.PointMax }
    ]);


    function changeRarity(rarity){
        emit("update:card", {
            ...props.card, // 保留其他屬性
            "rarity": rarity // 只修改對應的 mode 值
        });
    }

    //更改編輯名稱模式
    function changeEditNameMode(){
        
        document.getElementById('nameSpan').style.display='none';
        document.getElementById('nameInput').style.display='block';
    }

    //編輯卡片名稱
    function editCardName(event){
        console.log(event.key);
        if(event.key==='Enter'){
            console.log('55555');  
            props.card.name=event.target.value;
            document.getElementById('nameSpan').style.display='block';
            document.getElementById('nameInput').style.display='none';
        }
    }

    //改變點數
    const changePoint = (event, mode) => {
        const newValue = parseInt(event.target.value);
        FP.value.find((f)=>f.mode===mode).value=newValue;
        console.log(FP.value);
        // 透過 emit 來更新父元件的 targetCard
        emit("update:card", {
            ...props.card, // 保留其他屬性
            [mode]: newValue // 只修改對應的 mode 值
        });
    };
</script>
<template>
    
    <div class="flex-col">
        <span class="text-amber-800 text-[18px]">基本訊息</span>
    </div>
    <div class="mt-2">
        <div class="my-2 flex flex-col">
            <span class="text-amber-600 text-[16px]">名稱</span>
            <span class="text-white" @dblclick="changeEditNameMode()" id="nameSpan">{{ props.card.name }}</span>
            <input type="text" class="w-[150px] bg-gray-500 text-white" 
                id="nameInput" style="display: none;" :value="props.card.name"
                @keydown="event=>editCardName(event)"/>
        </div>
        <div class="my-2">
            <span class="text-amber-600 text-[16px]">稀有度</span>
            <div>
                <button class="max-w-[70px] mr-2 relative inline-block rarity" v-for="i in 3" @click="changeRarity(i)">
                    <div v-if="props.card.rarity === i">
                        <img :src="isAddable+`/images/rarity${i}.png`" :alt="`rarity${i}`" />
                        <img :src="isAddable+'/images/checked.svg'" class="text-white top-[0px] right-0 absolute" />
                    </div>
                    <div v-else class="opacity-60">
                        <img :src="isAddable+`/images/rarity${i}.png`" :alt="`rarity${i}`" />
                    </div>
                </button>
            </div>
        </div>
        <div class="my-2" >
            <span class="text-amber-600 text-[16px]">FP能量</span>
            <div class="flex flex-row" v-for="item in FP">
                <span class="text-white w-[100px]">{{ item.name }}</span>
                <div class="w-[100px]">
                    <input type="number" class="outline-none w-[40px] bg-inherit text-white border-b-2 text-center" 
                            :value="item.value" @change="(event)=>changePoint(event,item.mode)"/>
                </div>
            </div>
        </div>
    </div>
    
</template>
<style scoped>
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .rarity:hover,.rarity.clicked{
        opacity: 1;
    }
</style>