<script lang="ts" setup>
import { onMounted, ref, inject } from 'vue';
import { useModifyStore } from '../store/modifyData';
import type { tempImageList } from '@/interface/modify';
import axios from 'axios';

const store = useModifyStore();
const { selectCardId,seriesId,targetCard } = storeToRefs(store);


const isAddable = ref('');

// 暫存的圖片（File）
const tempImageRef = ref<tempImageList>({
  iconImage: null,
  fullImage: null,
  spreadImage: null
});

// ----------- 圖片上傳處理器 -----------
function ImageUploadHandle(type: keyof tempImageList) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';

  input.onchange = () => {
    const file = input.files?.[0];
    if (!file) return;

    tempImageRef.value[type] = file;
  };

  input.click();
}

// ----------- 圖片預覽：有暫存→用暫存，沒有→用原圖 URL -----------
function imagePreview(type: keyof tempImageList) {
    const file = tempImageRef.value[type];
    if (file) return URL.createObjectURL(file);

    if (type === 'iconImage') return isAddable.value + targetCard.value.image;
    if (type === 'spreadImage') return isAddable.value + (targetCard.value.spread?.image ?? '');
    if (type === 'fullImage') return isAddable.value + targetCard.value.fullimage;

    return '';
}

//從外部呼叫的方法
function initImage(){
    console.log('init image');
    tempImageRef.value = {
        iconImage:null,
        fullImage:null,
        spreadImage:null
    };
}

//上傳圖片
async function saveImageEdit(){
    if(seriesId.value < 0) return;

    //先上傳縮圖
    if(tempImageRef.value.iconImage){
        
        let formData=new FormData();
        formData.append('image', tempImageRef.value.iconImage);
        formData.append('oldName',tempImageRef.value.iconImage.name.split('.')[0]);
        formData.append('newName',`${seriesId.value}_${selectCardId.value}`);
        
        console.log(formData.getAll('image'));
        //上傳照片
        await axios.post('http://localhost:5000/card/icon', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    if(tempImageRef.value.fullImage){
        //再來上傳全身圖
        let formData1=new FormData();
        formData1.append('image', tempImageRef.value.fullImage);
        formData1.append('oldName',tempImageRef.value.fullImage.name.split('.')[0]);
        formData1.append('newName',`${seriesId.value}_${selectCardId.value}`);
        
        //上傳照片
        await axios.post('http://localhost:5000/card/image', formData1, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    if(tempImageRef.value.spreadImage){
        console.log('開始上傳盤面');
        let formData2=new FormData();
        formData2.append('image', tempImageRef.value.spreadImage);
        formData2.append('oldName',tempImageRef.value.spreadImage.name.split('.')[0]);
        formData2.append('newName',`${seriesId.value}_${selectCardId.value}`);
        
        //上傳照片
        await axios.post('http://localhost:5000/card/spread', formData2, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }  
}


onMounted(() => {
    isAddable.value = inject('frontpath') as string;
    initImage();
});

defineExpose({
    initImage,
    saveImageEdit
});
</script>
<template>
    <div class="flex flex-col">
        <span class="standwardLabel">編輯圖片</span>
        <div class="flex flex-row flex-wrap mt-2 w-full justify-between">
            <!-- Icon -->
            <div class="w-1/2" @click="ImageUploadHandle('iconImage')">
                <span class="text-white font-bold">時光牌頭像</span>
                <img :src="imagePreview('iconImage')" class="w-[100px]" alt="icon" />
            </div>

            <!-- Spread -->
            <div class="w-1/2" v-if="targetCard.spread" @click="ImageUploadHandle('spreadImage')">
                <span class="text-white font-bold">布局</span>
                <img :src="imagePreview('spreadImage')" class="w-[120px]" alt="spread" />
            </div>

            <!-- Full Image -->
            <div class="w-full mt-3" @click="ImageUploadHandle('fullImage')">
                <span class="text-white font-bold">全身圖</span>
                <img :src="imagePreview('fullImage')" class="w-[120px]" alt="full" />
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @use '../../assets/css/modify.scss';
</style>
