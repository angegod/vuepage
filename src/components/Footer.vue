<script setup>

</script>
<template>
    <div class="footer [&>span]:m-3">
        <span>&copy; 2025 <a href="https://home.gamer.com.tw/profile/index.php?&owner=ange0733" class="underline">Ange</a></span>
        <span> Website created by Ange. All rights reserved.</span>
        <span>Data latest Updated at 2025/03/24</span>
    </div>
</template>
<style scoped>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    .footer{
        background-image: linear-gradient(to right,rgb(67, 47, 47),black);
        min-height:100px;
        color: rgb(141, 131, 131);
        font-weight: bold;
        padding-left:100px;
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        font-family: Arial, Helvetica, sans-serif;
    }

    .footer a{
        color: rgb(141, 131, 131);
    }

    @media(max-width: 576px){
        .footer{
            width: 100%;
            padding-left: 10px;
            
        }
    }

</style>