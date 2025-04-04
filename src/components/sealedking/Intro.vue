<script setup>
    let props = defineProps(['dataText']);
    let skill=props.dataText;
    console.log(props.dataText.mainSkill1);
</script>
<template>
    <div class="flex flex-row  flex-wrap mt-2">
        <div class="w-1/2 min-w-[400px] max-[500px]:w-[100%] max-[500px]:min-w-0" v-for="s in skill">
            <div class="w-[400px] flex flex-col mt-2 max-[500px]:w-[100%] ">
                <div class="bg-[rgb(59,38,38)]">
                    <span class="text-white text-xl font-bold pl-2">{{s.title }}</span>
                </div>
                <div class="bg-[rgb(199,149,149)]">
                    <span class="text-white text-lg pl-2">CD&nbsp;{{ s.CD }}</span>
                </div>
                <div class="whitespace-pre-wrap bg-[rgb(100,78,78)] p-2">
                    <p class="text-white">{{ s.description  }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

</style>
