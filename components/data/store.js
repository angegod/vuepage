import { defineStore } from 'pinia'

export const useCardBtnStore = defineStore('CardButton', {
    state: () => ({
        //控制頂端按鈕顯示與否
        Cardbutton:true,
        isMatch:false
    }),
    actions: {
        showCardBtn(){
            this.Cardbutton = true;
        },
        HideCardBtn(){
            this.Cardbutton = false;
        },
        StartMatch(){
            this.isMatch = true;
        },
        StopMatch(){
            this.isMatch = false;
        }
    }
});