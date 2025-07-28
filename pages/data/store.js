// stores/counter.ts
import { defineStore } from 'pinia'

export const useCardBtnStore = defineStore('CardButton', {
    state: () => ({
        Cardbutton:false,
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