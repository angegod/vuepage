<script setup>
import "../assets/css/404.css";
import { onMounted } from 'vue'

onMounted(() => {
  /*setTimeout(() => {
    window.location.href = "http://localhost:3000"
  }, 3000)*/
})

</script>
<template>
    <div class="w-full main404 h-[80vh]">
        <div class="w-4/5 mx-auto flex flex-col">
            <div class="mx-auto mt-10">
                <img src="/public/images/404.png" alt="404" class="w-[250px]"/>
            </div>
            <div class="w-fit mx-auto mt-10">
                <span class="text-stone-500 font-bold text-2xl ">
                    404 頁面，3秒之後會導回至首頁。
                </span>
            </div>
            <div class="w-fit mx-auto mt-5">
                <router-link to="../" class="text-red-500 underline mx-auto text-lg" style="width: fit-content;">回首頁</router-link>
            </div>
            
        </div>
    </div>
</template>

