<script setup lang="ts">
import { defineProps } from 'vue';

interface Spread {
  index: number;
  image: string;
}

interface Props {
  title: string;
  effects: string[];
  rarity: number;
  spread?: Spread;
  isAddable?: string; // 給父元件圖片前綴
}

const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col mt-5 min-h-[10vh] max-[500px]:justify-center">
    <!-- 標題 -->
    <div class="flex flex-row line">
      <div
        :class="[
            'flex text-white rounded-md w-1/5 min-w-[100px] justify-center',
            props.rarity === 1 ? 'bg-amber-900' :
            props.rarity === 2 ? 'bg-gray-600' :
            props.rarity === 3 ? 'bg-yellow-600' : 'bg-gray-400']">
        <span>{{ title }}</span>
      </div>
    </div>

    <!-- 效果列表 -->
    <div class="flex flex-col">
        <template v-for="(effect, i) in effects">
            <span v-if="!props.spread" class="text-black" >&#8226;{{ effect }}</span>

            <span
                v-else-if="props.spread.index === i + 1"
                class="text-black cursor-help underline"
                @mousemove="$emit('spreadMove', $event)"
                @mouseenter="$emit('spreadShow')"
                @mouseleave="$emit('spreadHide')">&#8226;{{ effect }}</span>

            <span v-else class="text-black">&#8226;{{ effect }}</span>
        </template>

        <!-- spread圖片 -->
        <div id="spread" style="display: none;" class="spread fixed z-[1000]" v-if="props.spread">
            <img :src="(props.isAddable ?? '') + props.spread.image" class="w-[240px]" />
        </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @use '../assets/css/card.scss';
</style>
