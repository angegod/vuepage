//這裡放 後台共用資料區
import type { CardItem, CardSeriesItem } from '@/interface/card';
import type { funcDataItem, skillItem } from '@/interface/funcData';
import { defineStore } from 'pinia'

export const useModifyStore = defineStore('ModifyStore', {
    state: () => ({
        //原始資料
        Card:[] as  CardItem[],
        funcData:[] as funcDataItem[],

        //可能更動過的資料
        CardArray:[] as CardItem[],
        func: [] as funcDataItem[],
        seriesId: 1 as number,
        selectCardId:0 as number,
        showSkill:[] as skillItem[],
        //目標卡片
        targetCard:{} as CardItem

    }),
    actions: {
        //初始化
        init(data:any){

            /*let getCard = data.Card as CardSeriesItem[];
            //檢查tag是否帶有null元素
            getCard.forEach((series) => {
                series.card.forEach((c)=>{
                    c.tag = c.tag.filter((t)=>t!==null);
                    c.comboTag = c.comboTag.filter((t)=>t!==null);
                    c.roundTag = c.roundTag.filter((t)=>t!==null);
                });
            });*/


            this.Card = data.Card;
            this.funcData = data.funcData;
            console.log(data.Card);

            this.CardArray = JSON.parse(JSON.stringify(this.Card));
            this.func = JSON.parse(JSON.stringify(this.funcData));
        }
    }
});

//pinia可以直接對著store的值 進行更改 所以大多數的流程無須搬入