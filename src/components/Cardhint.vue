<script setup>
import Popper from 'vue3-popper'

</script>
<template>
    <Popper arrow placement="bottom-start" hover>
        <div class="flex ml-1">
            <span class="text-white cursor-pointer bg-black w-[20px] h-[20px] text-center rounded-xl">?</span>
        </div>
        <template #content>
            <div class="mt-2 flex flex-col bg-[rgb(67,47,47)] rounded-md p-2" >
                <span class="text-amber-600 font-bold text-xl">簡單說明:</span>
                <ul class="[&>li]:text-white list-decimal pl-5">
                    <li>使用方式:輸入所想要篩選的關鍵字，按下enter鍵即可看到對應結果</li>
                    <li>"關鍵字"範圍包括:時光牌名稱、技能敘述關鍵字、玩家常見暱稱</li>
                    <li>例如:換取生命的代價=>可以透過夏馬西、十字等字眼搜尋出來</li>
                    <li>關鍵字會不定期更新</li>
                </ul>
            </div>
        </template>
    </Popper>
</template>