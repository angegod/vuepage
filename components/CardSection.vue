<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
    label: string;
    value: number;
    rarity: number;
}

const props = defineProps<Props>();

// 根據 rarity 設定背景色
const bgColor = computed(() => {
    switch (props.rarity) {
        case 1: return 'bg-amber-900';
        case 2: return 'bg-gray-600';
        case 3: return 'bg-yellow-600';
        default: return 'bg-gray-400';
    }
});
</script>

<template>
    <div class="flex flex-row mt-1 w-1/2 max-[500px]:justify-center">
        <div :class="['flex text-white rounded-md w-1/5 min-w-[70px] justify-center', bgColor]">
            <span>{{ label }}</span>
        </div>
        <div class="mx-1">
            <span>{{ value }}</span>
        </div>
    </div>
</template>
