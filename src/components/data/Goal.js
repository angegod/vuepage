//顯示該年度的bingo目標
let Goal=[{
    rarity:1,
    count:0,
    bind:750,
    goal:15,
    open:16
},{
    rarity:2,
    count:0,
    bind:1000,
    goal:10,
    open:16,
},{
    rarity:3,
    count:0,
    bind:1250,
    goal:8,
    open:6
}];

export default Goal;


//資料屬性解釋
//rarity:稀有度
//count:數量 預設為0 給系統用的
//bind: 該稀有度的時光排練到滿等所需要的琉璃數量
//goal:該年度的bingo所需要練滿的數量
//open:目前該稀有度的牌開放的數量 (有可能會改成用資料抓取)