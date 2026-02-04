import type { CardSeriesItem } from "@/interface/card";

let Card:CardSeriesItem[] = [
  {
    "seriesId": 1,
    "seriesName": "晨曦塔",
    "card": [
      {
        "id": 1,
        "name": "力量的呼喚",
        "rarity": 1,
        "image": "/images/card/icon/1_1.png",
        "instantEffect": [
          "自身技能 CD -2"
        ],
        "comboEffect": [
          "自身無視「固定連擊盾」"
        ],
        "roundEffect": [
          "自身攻擊力提升 100%"
        ],
        "PointMax": 4,
        "PointConsume": 4,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_1.png",
        "keyword": [
          ""
        ],
        "tag": [
          36
        ],
        "roundTag": [
          23
        ],
        "comboTag": [
          2
        ],
        "PointEnter": 4
      },
      {
        "id": 2,
        "name": "五色璀璨",
        "rarity": 1,
        "image": "/images/card/icon/1_2.png",
        "instantEffect": [
          "自身技能 CD -2"
        ],
        "comboEffect": [
          "自身無視「五屬盾」"
        ],
        "roundEffect": [
          "自身攻擊力提升 100%"
        ],
        "PointMax": 4,
        "PointConsume": 4,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_2.png",
        "keyword": [
          ""
        ],
        "tag": [
          36
        ],
        "roundTag": [
          23
        ],
        "comboTag": [
          7
        ],
        "PointEnter": 4
      },
      {
        "id": 3,
        "name": "對未知的探索",
        "rarity": 1,
        "image": "/images/card/icon/1_3.png",
        "instantEffect": [
          "自身技能 CD -2"
        ],
        "comboEffect": [
          "自身無視「指定形狀盾」"
        ],
        "roundEffect": [
          "自身攻擊力提升 100%"
        ],
        "PointMax": 4,
        "PointConsume": 4,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_3.png",
        "keyword": [
          ""
        ],
        "tag": [
          36
        ],
        "roundTag": [
          23
        ],
        "comboTag": [
          1
        ],
        "PointEnter": 4
      },
      {
        "id": 4,
        "name": "樹下的緣份",
        "rarity": 1,
        "image": "/images/card/icon/1_4.png",
        "instantEffect": [
          "回復 250000 點生命力"
        ],
        "comboEffect": [
          "完全回復生命力"
        ],
        "roundEffect": [
          "全隊回復力提升 300%"
        ],
        "PointMax": 4,
        "PointConsume": 4,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_4.png",
        "keyword": [
          "全補"
        ],
        "tag": [
          25
        ],
        "roundTag": [
          24
        ],
        "comboTag": [
          25
        ],
        "PointEnter": 4
      },
      {
        "id": 5,
        "name": "擷取瑪那的術式",
        "rarity": 2,
        "image": "/images/card/icon/1_5.png",
        "instantEffect": [
          "該回合增加 2 連擊 (Combo)"
        ],
        "comboEffect": [
          "自身無視「固定連擊盾」"
        ],
        "roundEffect": [
          "自身以 50% 攻擊力追打無屬性攻擊 3 次",
          "無視「燃燒」"
        ],
        "PointMax": 6,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_5.png",
        "keyword": [
          ""
        ],
        "tag": [
          20
        ],
        "roundTag": [
          56,
          65
        ],
        "comboTag": [
          2
        ],
        "PointEnter": 6
      },
      {
        "id": 6,
        "name": "徬徨呢喃",
        "rarity": 2,
        "image": "/images/card/icon/1_6.png",
        "instantEffect": [
          "該回合增加 2 連擊 (Combo)"
        ],
        "comboEffect": [
          "自身攻擊力提升 100%"
        ],
        "roundEffect": [
          "自身以 50% 攻擊力追打火屬性攻擊 3 次",
          "自身無視「五屬盾」"
        ],
        "PointMax": 6,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_6.png",
        "keyword": [
          ""
        ],
        "tag": [
          20
        ],
        "roundTag": [
          7,
          52
        ],
        "comboTag": [
          23
        ],
        "PointEnter": 6
      },
      {
        "id": 7,
        "name": "微光下的洞悉",
        "rarity": 2,
        "image": "/images/card/icon/1_7.png",
        "instantEffect": [
          "該回合增加 2 連擊 (Combo)"
        ],
        "comboEffect": [
          "自身無視「五屬盾」"
        ],
        "roundEffect": [
          "自身以 50% 攻擊力追打暗屬性攻擊 3 次",
          "無視「燃燒」"
        ],
        "PointMax": 6,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_7.png",
        "keyword": [
          ""
        ],
        "tag": [
          20
        ],
        "roundTag": [
          55,
          65
        ],
        "comboTag": [
          7
        ],
        "PointEnter": 6
      },
      {
        "id": 8,
        "name": "命中的子彈",
        "rarity": 2,
        "image": "/images/card/icon/1_8.png",
        "instantEffect": [
          "該回合增加 2 連擊 (Combo)"
        ],
        "comboEffect": [
          "自身無視「指定形狀盾」"
        ],
        "roundEffect": [
          "自身以 50% 攻擊力追打水屬性攻擊 3 次",
          "無視「黏腐」"
        ],
        "PointMax": 6,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_8.png",
        "keyword": [
          ""
        ],
        "tag": [
          20
        ],
        "roundTag": [
          51,
          66
        ],
        "comboTag": [
          1
        ],
        "PointEnter": 6
      },
      {
        "id": 9,
        "name": "降臨的龍翼",
        "rarity": 2,
        "image": "/images/card/icon/1_9.png",
        "instantEffect": [
          "該回合增加 2 連擊 (Combo)"
        ],
        "comboEffect": [
          "自身技能 CD -2"
        ],
        "roundEffect": [
          "減少 90% 所受傷害",
          "無視「黏腐」"
        ],
        "PointMax": 6,
        "PointConsume": 3,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_9.png",
        "keyword": [
          "蒼壁"
        ],
        "tag": [
          20
        ],
        "roundTag": [
          26,
          66
        ],
        "comboTag": [
          36
        ],
        "PointEnter": 6
      },
      {
        "id": 10,
        "name": "換取生命的代價",
        "rarity": 3,
        "image": "/images/card/icon/1_10.png",
        "instantEffect": [
          "自身進入 2 回合亢奮狀態"
        ],
        "comboEffect": [
          "自身攻擊力提升 200%"
        ],
        "roundEffect": [
          "所有成員以 100% 攻擊力追打水屬性攻擊 1 次",
          "將自身直行的符石轉化為水符石",
          "自身無視「十字限盾」"
        ],
        "PointMax": 8,
        "PointConsume": 4,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_10.png",
        "keyword": [
          "夏馬西牌"
        ],
        "tag": [
          29
        ],
        "roundTag": [
          8,
          51,
          72
        ],
        "comboTag": [
          23
        ],
        "PointEnter": 8
      },
      {
        "id": 11,
        "name": "書頁上的記事",
        "rarity": 1,
        "image": "/images/card/icon/1_11.png",
        "instantEffect": [
          "自身技能 CD -2"
        ],
        "comboEffect": [
          "自身以 50% 攻擊力追打五屬性攻擊各 1 次"
        ],
        "roundEffect": [
          "將自身直行的符石轉化為火符石"
        ],
        "PointMax": 4,
        "PointConsume": 4,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_11.png",
        "keyword": [
          ""
        ],
        "tag": [
          36
        ],
        "roundTag": [
          73
        ],
        "comboTag": [
          57
        ],
        "PointEnter": 4
      },
      {
        "id": 12,
        "name": "大魔女與她的使魔",
        "rarity": 1,
        "image": "/images/card/icon/1_12.png",
        "instantEffect": [
          "自身技能 CD -2"
        ],
        "comboEffect": [
          "自身無視「連擊相等盾」"
        ],
        "roundEffect": [
          "將自身直行的符石轉化為光符石"
        ],
        "PointMax": 4,
        "PointConsume": 4,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_12.png",
        "keyword": [
          ""
        ],
        "tag": [
          36
        ],
        "roundTag": [
          75
        ],
        "comboTag": [
          3
        ],
        "PointEnter": 4
      },
      {
        "id": 13,
        "name": "剔透的凝視",
        "rarity": 1,
        "image": "/images/card/icon/1_13.png",
        "instantEffect": [
          "自身技能 CD -2"
        ],
        "comboEffect": [
          "自身以 100% 攻擊力追打暗屬性攻擊 2 次"
        ],
        "roundEffect": [
          "將自身直行的符石轉化為暗符石"
        ],
        "PointMax": 4,
        "PointConsume": 4,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_13.png",
        "keyword": [
          ""
        ],
        "tag": [
          36
        ],
        "roundTag": [
          76
        ],
        "comboTag": [
          55
        ],
        "PointEnter": 4
      },
      {
        "id": 14,
        "name": "悠揚簫頌",
        "rarity": 2,
        "image": "/images/card/icon/1_14.png",
        "instantEffect": [
          "自身為龍類成員，自身技能 CD -3"
        ],
        "comboEffect": [
          "自身以 200% 攻擊力追打木屬性攻擊 2 次"
        ],
        "roundEffect": [
          "自身無視「符石連擊零化」",
          "自身無視「連擊相等盾」"
        ],
        "PointMax": 6,
        "PointConsume": 3,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_14.png",
        "keyword": [
          "華曦牌"
        ],
        "tag": [
          41
        ],
        "roundTag": [
          3,
          9
        ],
        "comboTag": [
          53
        ],
        "PointEnter": 6
      },
      {
        "id": 15,
        "name": "婉轉琴音",
        "rarity": 2,
        "image": "/images/card/icon/1_15.png",
        "instantEffect": [
          "自身為獸類成員，自身技能 CD -3"
        ],
        "comboEffect": [
          "自身無視「指定形狀盾」"
        ],
        "roundEffect": [
          "所有成員以 100% 攻擊力追打無屬性攻擊 1 次",
          "觸碰「爆破炸彈」不會受到傷害"
        ],
        "PointMax": 6,
        "PointConsume": 3,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_15.png",
        "keyword": [
          "緋音牌"
        ],
        "tag": [
          40
        ],
        "roundTag": [
          63,
          69
        ],
        "comboTag": [
          1
        ],
        "PointEnter": 6
      },
      {
        "id": 16,
        "name": "焰火下的護佑",
        "rarity": 3,
        "image": "/images/card/icon/1_16.png",
        "instantEffect": [
          "自身進入 2 回合亢奮狀態"
        ],
        "comboEffect": [
          "自身攻擊力提升 200%"
        ],
        "roundEffect": [
          "自身以 10% 攻擊力追打火屬性攻擊 20 次",
          "自身無視「指定形狀盾」",
          "自身無視「攻前盾」"
        ],
        "PointMax": 8,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_16.png",
        "keyword": [
          "龐貝"
        ],
        "tag": [
          29
        ],
        "roundTag": [
          1,
          10,
          52
        ],
        "comboTag": [
          23
        ],
        "PointEnter": 8
      },
      {
        "id": 17,
        "name": "血脈帶來的悸動",
        "rarity": 2,
        "image": "/images/card/icon/1_17.png",
        "instantEffect": [
          "該回合增加 2 連擊 (Combo)"
        ],
        "comboEffect": [
          "自身無視「指定形狀盾」"
        ],
        "roundEffect": [
          "自身無視「反首消符石盾」",
          "所有成員以 100% 攻擊力追打木屬性攻擊 1 次"
        ],
        "PointMax": 6,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_17.png",
        "keyword": [
          ""
        ],
        "tag": [
          20
        ],
        "roundTag": [
          11,
          60
        ],
        "comboTag": [
          1
        ],
        "PointEnter": 6
      },
      {
        "id": 18,
        "name": "真實與夢境的混淆",
        "rarity": 2,
        "image": "/images/card/icon/1_18.png",
        "instantEffect": [
          "提升 100% 龍脈儀能量"
        ],
        "comboEffect": [
          "自身無視「五屬盾」"
        ],
        "roundEffect": [
          "「灼熱地型」傷害減少 100%",
          "所有成員以 100% 攻擊力追打無屬性攻擊 1 次"
        ],
        "PointMax": 6,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_18.png",
        "keyword": [
          "恩莉兒牌"
        ],
        "tag": [
          21
        ],
        "roundTag": [
          56,
          63,
          70
        ],
        "comboTag": [
          7
        ],
        "PointEnter": 6
      },
      {
        "id": 19,
        "name": "不息的循環",
        "rarity": 1,
        "image": "/images/card/icon/1_19.png",
        "instantEffect": [
          "發動攻擊前自身對敵方全體造成 500000000 點無屬性傷害 1 次"
        ],
        "comboEffect": [
          "自身技能 CD -2"
        ],
        "roundEffect": [
          "自身無視「五屬盾」"
        ],
        "PointMax": 4,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_19.png",
        "keyword": [
          "直傷"
        ],
        "tag": [
          22
        ],
        "roundTag": [
          7
        ],
        "comboTag": [
          36
        ],
        "PointEnter": 4
      },
      {
        "id": 20,
        "name": "孤身獨戰的無畏",
        "rarity": 3,
        "image": "/images/card/icon/1_20.png",
        "instantEffect": [
          "自身進入 2 回合亢奮狀態"
        ],
        "comboEffect": [
          "自身攻擊力提升 100%",
          "回合結束時，將單數直行的符石轉化為暗強化符石，將雙數直行的符石轉化為火強化符石"
        ],
        "roundEffect": [
          "隊伍不會被封鎖主動技能",
          "自身無視「固定連擊盾」",
          "自身無視指定減傷抗性敵技"
        ],
        "PointMax": 8,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_20.png",
        "spread": {
          "image": "/images/card/spread/1_20.png",
          "index": 2
        },
        "keyword": [
          "蚩尤"
        ],
        "tag": [
          29
        ],
        "roundTag": [
          2,
          12,
          68
        ],
        "comboTag": [
          23,
          79,
          82,
          84
        ],
        "PointEnter": 8
      },
      {
        "id": 21,
        "name": "安逸的日常",
        "rarity": 1,
        "image": "/images/card/icon/1_21.png",
        "instantEffect": [
          "解除自身休眠狀態"
        ],
        "comboEffect": [
          "自身攻擊力提升 100%"
        ],
        "roundEffect": [
          "自身無視「攻前盾」"
        ],
        "PointMax": 4,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_21.png",
        "keyword": [
          ""
        ],
        "tag": [
          33
        ],
        "roundTag": [
          10
        ],
        "comboTag": [
          23
        ],
        "PointEnter": 4
      },
      {
        "id": 22,
        "name": "變革的世界",
        "rarity": 1,
        "image": "/images/card/icon/1_22.png",
        "instantEffect": [
          "解除自身風壓狀態"
        ],
        "comboEffect": [
          "自身攻擊力提升 100%"
        ],
        "roundEffect": [
          "自身無視「連擊相等盾」"
        ],
        "PointMax": 4,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_22.png",
        "keyword": [
          ""
        ],
        "tag": [
          34
        ],
        "roundTag": [
          3
        ],
        "comboTag": [
          23
        ],
        "PointEnter": 4
      },
      {
        "id": 23,
        "name": "星光灑落之夜",
        "rarity": 1,
        "image": "/images/card/icon/1_23.png",
        "instantEffect": [
          "解除自身疲憊狀態"
        ],
        "comboEffect": [
          "自身無視「符石連擊零化」",
          "自身無視「指定連擊法印」"
        ],
        "roundEffect": [
          "自身不會被封鎖主動技能"
        ],
        "PointMax": 4,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_23.png",
        "keyword": [
          ""
        ],
        "tag": [
          31
        ],
        "roundTag": [
          68
        ],
        "comboTag": [
          9,
          15
        ],
        "PointEnter": 4
      },
      {
        "id": 24,
        "name": "悲劇的迴圈",
        "rarity": 2,
        "image": "/images/card/icon/1_24.png",
        "instantEffect": [
          "自身為人類成員，自身技能 CD -4"
        ],
        "comboEffect": [
          "自身攻擊力提升 150%",
          "自身無視「連擊相等盾」"
        ],
        "roundEffect": [
          "自身無視「指定形狀盾」",
          "所受自身種族傷害減少 100%",
          "所受自身屬性傷害減少 100%"
        ],
        "PointMax": 6,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_24.png",
        "keyword": [
          "卑彌呼"
        ],
        "tag": [
          37
        ],
        "roundTag": [
          1,
          26
        ],
        "comboTag": [
          3,
          23
        ],
        "PointEnter": 6
      },
      {
        "id": 25,
        "name": "高舉的聖槍",
        "rarity": 2,
        "image": "/images/card/icon/1_25.png",
        "instantEffect": [
          "自身為神族成員，自身技能 CD -4"
        ],
        "comboEffect": [
          "自身攻擊力提升 150%",
          "自身無視「攻前盾」"
        ],
        "roundEffect": [
          "自身無視「固定連擊盾」",
          "自身技能 CD -1",
          "自身增加 1 EP"
        ],
        "PointMax": 6,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_25.png",
        "keyword": [
          "涅索伊"
        ],
        "tag": [
          38
        ],
        "roundTag": [
          2,
          36,
          44
        ],
        "comboTag": [
          10,
          23
        ],
        "PointEnter": 6
      },
      {
        "id": 26,
        "name": "名叫征服的遊戲",
        "rarity": 3,
        "image": "/images/card/icon/1_26.png",
        "instantEffect": [
          "自身增加 2 回合亢奮狀態"
        ],
        "comboEffect": [
          "自身攻擊力提升 100%",
          "自身無視「十字限盾」"
        ],
        "roundEffect": [
          "自身以 10% 攻擊力追打光屬性攻擊 20 次",
          "自身無視「二屬盾」、「三屬盾」、「四屬盾」及「五屬盾」",
          "自身無視「全消盾」"
        ],
        "PointMax": 8,
        "PointConsume": 4,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_26.png",
        "keyword": [
          "拉普牌"
        ],
        "tag": [
          29
        ],
        "roundTag": [
          4,
          5,
          6,
          7,
          13,
          54
        ],
        "comboTag": [
          8,
          23
        ],
        "PointEnter": 8
      },
      {
        "id": 27,
        "name": "冷冽談判",
        "rarity": 2,
        "image": "/images/card/icon/1_27.png",
        "instantEffect": [
          "發動攻擊前自身對敵方全體造成 50000000 點無屬性傷害 10 次"
        ],
        "comboEffect": [
          "自身無視「指定形狀盾」",
          "自身攻擊力提升 100%"
        ],
        "roundEffect": [
          "無視「燃燒」",
          "迴避每個敵人的首次攻擊"
        ],
        "PointMax": 6,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_27.png",
        "keyword": [
          "刻琿"
        ],
        "tag": [
          22
        ],
        "roundTag": [
          27,
          65
        ],
        "comboTag": [
          1,
          23
        ],
        "PointEnter": 6
      },
      {
        "id": 28,
        "name": "難以割離的念想",
        "rarity": 1,
        "image": "/images/card/icon/1_28.png",
        "instantEffect": [
          "完全回復生命力"
        ],
        "comboEffect": [
          "回合結束時， 將單數直行的符石轉化為木強化符石， 將雙數直行的符石轉化為光強化符石"
        ],
        "roundEffect": [
          "將自身直行的符石轉化為光符石"
        ],
        "PointMax": 4,
        "PointConsume": 1,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_28.png",
        "spread": {
          "image": "/images/card/spread/1_28.png",
          "index": 1
        },
        "keyword": [
          "全補",
          "方荼"
        ],
        "tag": [
          25
        ],
        "roundTag": [
          75
        ],
        "comboTag": [
          80,
          81,
          84
        ],
        "PointEnter": 4
      },
      {
        "id": 29,
        "name": "同盟破敵的決意",
        "rarity": 2,
        "image": "/images/card/icon/1_29.png",
        "instantEffect": [
          "提升 100% 龍脈儀能量"
        ],
        "comboEffect": [
          "自身無視「連擊相等盾」"
        ],
        "roundEffect": [
          "所有成員以 50% 攻擊力追打光屬性攻擊 2 次",
          "所有成員以 50% 攻擊力追打火屬性攻擊 2 次"
        ],
        "PointMax": 6,
        "PointConsume": 3,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_29.png",
        "keyword": [
          ""
        ],
        "tag": [
          21
        ],
        "roundTag": [
          59,
          61
        ],
        "comboTag": [
          3
        ],
        "PointEnter": 6
      },
      {
        "id": 30,
        "name": "星塵爆破",
        "rarity": 1,
        "image": "/images/card/icon/1_30.png",
        "instantEffect": [
          "解除自身疲憊狀態",
          "自身增加 1 回合亢奮狀態"
        ],
        "comboEffect": [
          "敵人行動 CD +1"
        ],
        "roundEffect": [
          "增加 5 連擊 (Combo)"
        ],
        "PointMax": 4,
        "PointConsume": 1,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_30.png",
        "keyword": [
          "瑪米圖"
        ],
        "tag": [
          29,
          31
        ],
        "roundTag": [
          20
        ],
        "comboTag": [
          28
        ],
        "PointEnter": 4
      },
      {
        "id": 31,
        "name": "英靈的感召",
        "rarity": 2,
        "image": "/images/card/icon/1_31.png",
        "instantEffect": [
          "自身為光屬性成員，自身技能 CD -4"
        ],
        "comboEffect": [
          "回合結束時， 將單數直行的符石轉化為光強化符石， 將雙數直行的符石轉化為心強化符石",
          "自身攻擊力提升 100%"
        ],
        "roundEffect": [
          "自身無視「攻前盾」",
          "隊伍不會被封鎖主動技能"
        ],
        "PointMax": 6,
        "PointConsume": 3,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_31.png",
        "spread": {
          "image": "/images/card/spread/1_31.png",
          "index": 1
        },
        "keyword": [
          "雪萊"
        ],
        "tag": [
          48
        ],
        "roundTag": [
          10,
          68
        ],
        "comboTag": [
          23,
          81,
          83,
          84
        ],
        "PointEnter": 6
      },
      {
        "id": 32,
        "name": "龍的馴服者",
        "rarity": 3,
        "image": "/images/card/icon/1_32.png",
        "instantEffect": [
          "自身增加 2 回合亢奮狀態"
        ],
        "comboEffect": [
          "自身攻擊力提升 150%",
          "自身擊中敵人後凍結敵人，持續 3 回合"
        ],
        "roundEffect": [
          "自身以 20% 攻擊力追打五屬性攻擊各 4 次",
          "自身無視「連擊相等盾」",
          "迴避所有敵人攻擊"
        ],
        "PointMax": 8,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_32.png",
        "keyword": [
          "司路域"
        ],
        "tag": [
          29
        ],
        "roundTag": [
          3,
          27,
          57
        ],
        "comboTag": [
          23,
          86
        ],
        "PointEnter": 8
      },
      {
        "id": 33,
        "name": "晨曦中的憶念",
        "rarity": 1,
        "image": "/images/card/icon/1_33.png",
        "instantEffect": [
          "自身發動攻擊前對敵方造成 10000000 點光屬性傷害 10 次"
        ],
        "comboEffect": [
          "自身攻擊力提升 100%"
        ],
        "roundEffect": [
          "所有成員以 50% 攻擊力追打五屬性攻擊各 1 次"
        ],
        "PointMax": 4,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_33.png",
        "keyword": [
          ""
        ],
        "tag": [
          22
        ],
        "roundTag": [
          64
        ],
        "comboTag": [
          23
        ],
        "PointEnter": 4
      },
      {
        "id": 34,
        "name": "疾速前行",
        "rarity": 2,
        "image": "/images/card/icon/1_34.png",
        "instantEffect": [
          "自身為木屬性成員，自身技能 CD -4"
        ],
        "comboEffect": [
          "回合結束時， 將單數橫行的符石轉化為木強化符石， 將雙數橫行的符石轉化為心強化符石",
          "自身攻擊無視「起結有序」"
        ],
        "roundEffect": [
          "自身攻擊力提升 100%",
          "自身無視「固定連擊盾」"
        ],
        "PointMax": 6,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_34.png",
        "spread": {
          "image": "/images/card/spread/1_34.png",
          "index": 1
        },
        "keyword": [
          ""
        ],
        "tag": [
          47
        ],
        "roundTag": [
          2,
          23
        ],
        "comboTag": [
          16,
          80,
          83,
          85
        ],
        "PointEnter": 6
      },
      {
        "id": 35,
        "name": "命定儀式的異動",
        "rarity": 1,
        "image": "/images/card/icon/1_35.png",
        "instantEffect": [
          "增加 3 連擊 (Combo)"
        ],
        "comboEffect": [
          "自身攻擊力提升 100%"
        ],
        "roundEffect": [
          "自身直行的符石轉化為心符石",
          "自身以 30% 攻擊力追打無屬性攻擊 10 次"
        ],
        "PointMax": 4,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_35.png",
        "keyword": [
          ""
        ],
        "tag": [
          20
        ],
        "roundTag": [
          56,
          77
        ],
        "comboTag": [
          23
        ],
        "PointEnter": 4
      },
      {
        "id": 36,
        "name": "少女們與巧克力",
        "rarity": 1,
        "image": "/images/card/icon/1_36.png",
        "instantEffect": [
          "解除自身被封鎖主動技能 ( 此技能無視封鎖技能 )"
        ],
        "comboEffect": [
          "自身攻擊力提升 100%"
        ],
        "roundEffect": [
          "自身技能 CD -2"
        ],
        "PointMax": 4,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_36.png",
        "keyword": [
          ""
        ],
        "tag": [
          67
        ],
        "roundTag": [
          36
        ],
        "comboTag": [
          23
        ],
        "PointEnter": 4
      },
      {
        "id": 37,
        "name": "大魔女的加護",
        "rarity": 2,
        "image": "/images/card/icon/1_37.png",
        "instantEffect": [
          "自身為暗屬性成員，自身技能 CD -4"
        ],
        "comboEffect": [
          "回合結束時，將單數橫行的符石轉化為暗強化符石，將雙數橫行的符石轉化為光強化符石",
          "自身攻擊力提升 100%"
        ],
        "roundEffect": [
          "增加 10 連擊 (Combo)",
          "無視「燃燒」",
          "無視「黏腐」"
        ],
        "PointMax": 6,
        "PointConsume": 3,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_37.png",
        "spread": {
          "image": "/images/card/spread/1_37.png",
          "index": 1
        },
        "keyword": [
          "大魔女"
        ],
        "tag": [
          49
        ],
        "roundTag": [
          20,
          65,
          66
        ],
        "comboTag": [
          23,
          81,
          82,
          85
        ],
        "PointEnter": 6
      },
      {
        "id": 38,
        "name": "以炮響拉開帷幕",
        "rarity": 3,
        "image": "/images/card/icon/1_38.png",
        "instantEffect": [
          "自身增加 2 回合亢奮狀態"
        ],
        "comboEffect": [
          "自身攻擊力提升 150%",
          "自身無視「首消組數屬性符石盾」"
        ],
        "roundEffect": [
          "自身以 10% 攻擊力追打木屬性攻擊 20 次",
          "自身無視「反首消符石盾」",
          "自身無視「全版消除盾」"
        ],
        "PointMax": 8,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_38.png",
        "keyword": [
          "砲響牌"
        ],
        "tag": [
          29
        ],
        "roundTag": [
          11,
          14,
          53
        ],
        "comboTag": [
          17,
          23
        ],
        "PointEnter": 8
      },
      {
        "id": 39,
        "name": "守護的羽翼",
        "rarity": 2,
        "image": "/images/card/icon/1_39.png",
        "instantEffect": [
          "該回合增加 4 連擊 (Combo)"
        ],
        "comboEffect": [
          "自身攻擊力提升 150%",
          "自身無視「攻前盾」"
        ],
        "roundEffect": [
          "無視「燃燒」",
          "自身技能 CD -1"
        ],
        "PointMax": 6,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_39.png",
        "keyword": [
          "卡西爾"
        ],
        "tag": [
          20
        ],
        "roundTag": [
          36,
          65
        ],
        "comboTag": [
          10,
          23
        ],
        "PointEnter": 6
      },
      {
        "id": 40,
        "name": "彩球競逐",
        "rarity": 1,
        "image": "/images/card/icon/1_40.png",
        "instantEffect": [
          "自身進入 1 回合亢奮狀態"
        ],
        "comboEffect": [
          "自身攻擊力提升 100%"
        ],
        "roundEffect": [
          "自身無視「指定連擊法印」",
          "自身無視「符石連擊零化」"
        ],
        "PointMax": 4,
        "PointConsume": 1,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_40.png",
        "keyword": [
          ""
        ],
        "tag": [
          29
        ],
        "roundTag": [
          9,
          15
        ],
        "comboTag": [
          23
        ],
        "PointEnter": 4
      },
      {
        "id": 41,
        "name": "無畏航路",
        "rarity": 2,
        "image": "/images/card/icon/1_41.png",
        "instantEffect": [
          "自身為火屬性成員，自身技能 CD -4"
        ],
        "comboEffect": [
          "回合結束時，將單數橫行的符石轉化為火強化符石，將雙數橫行的符石轉化為心強化符石",
          "自身攻擊無視「起結有序」"
        ],
        "roundEffect": [
          "隊伍不會被封鎖主動技能",
          "迴避每個敵人的首次攻擊"
        ],
        "PointMax": 6,
        "PointConsume": 3,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_41.png",
        "spread": {
          "image": "/images/card/spread/1_41.png",
          "index": 1
        },
        "keyword": [
          "德古拉"
        ],
        "tag": [
          46
        ],
        "roundTag": [
          27,
          68
        ],
        "comboTag": [
          16,
          79,
          83,
          85
        ],
        "PointEnter": 6
      },
      {
        "id": 42,
        "name": "諄諄龍語",
        "rarity": 1,
        "image": "/images/card/icon/1_42.png",
        "instantEffect": [
          "解除自身休眠狀態"
        ],
        "comboEffect": [
          "自身攻擊力提升 100%"
        ],
        "roundEffect": [
          "自身無視「指定形狀盾」",
          "自身以 50% 攻擊力追打木屬性攻擊 1 次",
          "自身以 50% 攻擊力追打光屬性攻擊 1 次"
        ],
        "PointMax": 4,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_42.png",
        "keyword": [
          ""
        ],
        "tag": [
          33
        ],
        "roundTag": [
          1,
          53,
          54
        ],
        "comboTag": [
          23
        ],
        "PointEnter": 4
      },
      {
        "id": 43,
        "name": "墓碑前的誓言",
        "rarity": 1,
        "image": "/images/card/icon/1_43.png",
        "instantEffect": [
          "自身技能 CD -2"
        ],
        "comboEffect": [
          "自身攻擊力提升 100%"
        ],
        "roundEffect": [
          "所有成員以 100% 攻擊力追打火屬性攻擊 1 次",
          "自身無視「攻前盾」"
        ],
        "PointMax": 4,
        "PointConsume": 1,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_43.png",
        "keyword": [
          ""
        ],
        "tag": [
          36
        ],
        "roundTag": [
          10,
          59
        ],
        "comboTag": [
          23
        ],
        "PointEnter": 4
      },
      {
        "id": 44,
        "name": "誓守北域",
        "rarity": 3,
        "image": "/images/card/icon/1_44.png",
        "instantEffect": [
          "自身增加 2 回合暴怒狀態"
        ],
        "comboEffect": [
          "回合結束時，將單數直行的符石轉化為光強化符石，將雙數直行的符石轉化為暗強化符石",
          "自身擊中敵人後使敵人置身刀傷狀態：每回合所受傷害 4 倍，持續 3 回合"
        ],
        "roundEffect": [
          "自身無視「符石連擊零化」",
          "「灼熱地型」傷害減少 100%",
          "場上位置不受「結界地型」技能影響"
        ],
        "PointMax": 8,
        "PointConsume": 4,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_44.png",
        "spread": {
          "image": "/images/card/spread/1_44.png",
          "index": 1
        },
        "keyword": [
          "零覓牌",
          "一願牌"
        ],
        "tag": [
          30
        ],
        "roundTag": [
          9,
          70,
          71
        ],
        "comboTag": [
          81,
          82,
          84,
          87
        ],
        "PointEnter": 8
      },
      {
        "id": 45,
        "name": "殘魂的呼喚",
        "rarity": 2,
        "image": "/images/card/icon/1_45.png",
        "instantEffect": [
          "自身發動攻擊前對敵方造成 50000000 點木屬性傷害 1 次"
        ],
        "comboEffect": [
          "完全回復生命力"
        ],
        "roundEffect": [
          "自身攻擊力提升 100%",
          "自身無視「固定連擊盾」"
        ],
        "PointMax": 6,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_45.png",
        "keyword": [
          ""
        ],
        "tag": [
          22
        ],
        "roundTag": [
          2,
          23
        ],
        "comboTag": [
          25
        ],
        "PointEnter": 6
      },
      {
        "id": 46,
        "name": "血脈的本能",
        "rarity": 1,
        "image": "/images/card/icon/1_46.png",
        "instantEffect": [
          "自身進入 1 回合亢奮狀態"
        ],
        "comboEffect": [
          "自身攻擊力提升 150%",
          "自身無視指定減傷抗性敵技"
        ],
        "roundEffect": [
          "自身不會被封鎖主動技能"
        ],
        "PointMax": 4,
        "PointConsume": 1,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_46.png",
        "keyword": [
          "卡蜜拉牌"
        ],
        "tag": [
          29
        ],
        "roundTag": [
          68
        ],
        "comboTag": [
          12,
          23
        ],
        "PointEnter": 4
      },
      {
        "id": 47,
        "name": "面對未知的勇氣",
        "rarity": 3,
        "image": "/images/card/icon/1_47.png",
        "instantEffect": [
          "所有成員技能 CD -2",
          "自身發動攻擊前對敵方造成 500000000 點火屬性傷害 2 次"
        ],
        "comboEffect": [
          "自身攻擊力提升 150%",
          "自身擊中敵人後點燃敵人，持續 3 回合"
        ],
        "roundEffect": [
          "自身攻擊傷害無視「起結有序」",
          "自身無視「二屬盾」、「三屬盾」、「四屬盾」及「五屬盾」",
          "自身無視「首消組數屬性符石盾」"
        ],
        "PointMax": 8,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_47.png",
        "keyword": [
          "阿圖姆牌"
        ],
        "tag": [
          22,
          50
        ],
        "roundTag": [
          4,
          5,
          6,
          7,
          16,
          17
        ],
        "comboTag": [
          23,
          88
        ],
        "PointEnter": 8
      },
      {
        "id": 48,
        "name": "甦醒的妖刀",
        "rarity": 1,
        "image": "/images/card/icon/1_48.png",
        "instantEffect": [
          "該回合增加 4 連擊 (Combo)"
        ],
        "comboEffect": [
          "自身無視「十字限盾」"
        ],
        "roundEffect": [
          "將自身直行的符石轉化為暗符石",
          "自身以 30% 攻擊力追打暗屬性攻擊 10 次"
        ],
        "PointMax": 4,
        "PointConsume": 2,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_48.png",
        "keyword": [
          "",
          "妖刀"
        ],
        "tag": [
          20
        ],
        "roundTag": [
          55,
          76
        ],
        "comboTag": [
          8
        ],
        "PointEnter": 4
      },
      {
        "id": 49,
        "name": "終命一彈",
        "rarity": 2,
        "image": "/images/card/icon/1_49.png",
        "instantEffect": [
          "自身為魔族成員，自身技能 CD -3"
        ],
        "comboEffect": [
          "自身無視指定減傷抗性敵技",
          "自身以 100% 攻擊力追打五屬性攻擊各 1 次"
        ],
        "roundEffect": [
          "隊伍不會被封鎖主動技能"
        ],
        "PointMax": 6,
        "PointConsume": 3,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_49.png",
        "keyword": [
          "拿破崙"
        ],
        "tag": [
          39
        ],
        "roundTag": [
          68
        ],
        "comboTag": [
          12,
          57
        ],
        "PointEnter": 6
      },
      {
        "id": 50,
        "name": "機密查錄",
        "rarity": 1,
        "image": "/images/card/icon/1_50.png",
        "instantEffect": [
          "提升 100% 龍脈儀能量"
        ],
        "comboEffect": [
          "自身以 200% 攻擊力追打火屬性攻擊 1 次",
          "自身以 200% 攻擊力追打光屬性攻擊 1 次"
        ],
        "roundEffect": [
          "自身無視「固定連擊盾」"
        ],
        "PointMax": 4,
        "PointConsume": 1,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_50.png",
        "keyword": [
          ""
        ],
        "tag": [
          21
        ],
        "roundTag": [
          2
        ],
        "comboTag": [
          52,
          54
        ],
        "PointEnter": 4
      },
      {
        "id": 51,
        "name": "午後茶香",
        "rarity": 2,
        "image": "/images/card/icon/1_51.png",
        "instantEffect": [
          "自身為妖族成員，自身技能 CD -4"
        ],
        "comboEffect": [
          "\t\n自身擊中敵人後魅惑敵人，持續 1 回合",
          "自身以 100% 攻擊力追打五屬性攻擊各 1 次"
        ],
        "roundEffect": [
          "自身無視「攻前盾」",
          "自身攻擊傷害無視「起結有序」"
        ],
        "PointMax": 6,
        "PointConsume": 3,
        "PointGet": 2,
        "fullimage": "/images/card/image/1_51.png",
        "keyword": [
          "曼陀羅"
        ],
        "tag": [
          43
        ],
        "roundTag": [
          10,
          16
        ],
        "comboTag": [
          57,
          89
        ],
        "PointEnter": 6
      },
      {
        "id": 52,
        "name": "不協調的氣氛",
        "rarity": 1,
        "image": "/images/card/icon/1_52.png",
        "instantEffect": [
          "解除自身被封鎖主動技能"
        ],
        "roundEffect": [
          "自身無視「連擊相等盾」",
          "自身以 50% 攻擊力追打木屬性攻擊 1 次",
          "自身以 50% 攻擊力追打火屬性攻擊 1 次"
        ],
        "comboEffect": [
          "自身攻擊力提升 150%",
          "自身無視指定減傷抗性敵技"
        ],
        "PointMax": 4,
        "PointEnter": 4,
        "PointConsume": 2,
        "PointGet": 2,
        "tag": [
          67
        ],
        "comboTag": [
          12,
          23
        ],
        "roundTag": [
          3,
          52,
          53
        ],
        "fullimage": "/images/card/image/1_52.png",
        "keyword": []
      },
      {
        "id": 53,
        "name": "亂局中的突襲",
        "rarity": 1,
        "image": "/images/card/icon/1_53.png",
        "instantEffect": [
          "解除自身休眠狀態",
          "自身技能 CD -2"
        ],
        "roundEffect": [
          "自身以 100% 攻擊力追打五屬性攻擊各 1 次",
          "迴避水屬性敵人的攻擊"
        ],
        "comboEffect": [
          "自身攻擊力提升 150%",
          "自身無視「全消盾」"
        ],
        "PointMax": 4,
        "PointEnter": 4,
        "PointConsume": 2,
        "PointGet": 2,
        "tag": [
          33,
          36
        ],
        "comboTag": [
          13,
          23
        ],
        "roundTag": [
          27,
          57
        ],
        "fullimage": "/images/card/image/1_53.png",
        "keyword": []
      },
      {
        "id": 54,
        "name": "未來的火種",
        "rarity": 3,
        "image": "/images/card/icon/1_54.png",
        "instantEffect": [
          "自身增加 2 回合神選狀態"
        ],
        "roundEffect": [
          "增加 11 連擊 (Combo)",
          "自身以 110% 攻擊力追打無屬性攻擊 1 次",
          "自身無視「攻前盾」",
          "自身無視「首消組數屬性符石盾」"
        ],
        "comboEffect": [
          "回合結束時，將單數直行的符石轉化為光強化符石，將雙數直行的符石轉化為木強化符石",
          "自身無視「L字限盾」",
          "自身無視「T字限盾」"
        ],
        "PointMax": 8,
        "PointEnter": 8,
        "PointConsume": 4,
        "PointGet": 2,
        "tag": [
          35
        ],
        "comboTag": [
          18,
          19,
          80,
          81,
          84
        ],
        "roundTag": [
          10,
          17,
          20,
          56
        ],
        "fullimage": "/images/card/image/1_54.png",
        "keyword": [
          "普羅米修斯"
        ],
        "spread": {
          "image": "/images/card/spread/1_54.png",
          "index": 1
        }
      }
    ]
  }
] ;
export default Card;