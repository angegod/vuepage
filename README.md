# 網站程式筆記紀錄

## 路由(vue-router)

### 1.前置作業
先去載入"vue-router"的套件，然後將分頁(components)一併引入至router.js當中，如下圖所示:

```
import { createWebHashHistory,createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import N01 from '../components/sealedking/N01.vue';
import N02 from '../components/sealedking/N02.vue';
import N03 from '../components/sealedking/N03.vue';
import N04 from '../components/sealedking/N04.vue';


```

### 2.設定路徑以及匹配分頁(簡易版):

path:相對路徑
name:分頁名稱(It is not critical for this part)
component:其導向分頁

```
const routes=[
    {
        path:'/vuepage/Home',
        name:'Home',
        component:Home,
    },{
        path:'/vuepage/about',
        name:'About',
        component:About
    },{
        path:'/vuepage/King/N01',
        name:'King1',
        component:N01
    },{
        path:'/vuepage/King/N02',
        name:'King2',
        component:N02
    },{
        path:'/vuepage/King/N03',
        name:'King3',
        component:N03
    },{
        path:'/vuepage/King/N04',
        name:'King4',
        component:N04
    }
]


```

### 3.最終設定以及導出:

```

const router=createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;

```

### 4.路由設置完成:
在app.js底下增加一段程式碼

```
import { createApp } from "vue";
import App from './App.vue';
import router from './route';


createApp(App).use(router).mount('#app')

```


## 照片路徑處理(how to import images path in vuejs)

### 1.本地測試

如果是利用網址來引用照片的話，則跟一般html img標籤引用照片的方式一樣，照抄即可。

如果需要引用本地資源，請先在public資料夾新增一個images資料夾，方便匯入。接著將需要引用的照片一一放入。

比方說我現在需要引用一個名叫intro1.jpg的照片，那麼引用方法則如下面所示:

```
<img :src="/images/intro1.jpg" alt="" />

```


### 2.github page(include former settings 包含前置作業)

小的覺得這塊其實很難，看網路上大多數的教學文章都沒有特別講這個步驟，所以我會稍微花多一點偏幅講。

在你完成vue檔案編輯之後，會先在terminal輸入npm run build，主要作用是打包成github.io上能夠讀懂且執行的程式碼。

這一步驟大部分人都不太會有問題，但如果你的網頁需要引用照片且是使用本地資源的話，那接下來就會碰到跟我一樣的問題。

你會看到網頁一片空白，幾乎甚麼都沒有，甚至你輸入你的分頁連結也都沒有反應。光是上述提到的這一段話就足足有三個問題要處理

問題出在這個index.html檔案身上。其中應該有兩行程式碼都這樣寫的...

```
<script type="module" crossorigin src="/assets/index-8a9688b0.js"></script>
<link rel="stylesheet" href="/assets/index-e90b732f.css">


```
這兩行乍看之下沒問題，但因為你今天將檔案部屬在github.io的某個路徑底下，所以上述檔案的路徑前面都還要加上你部屬的位置。我這邊是部屬在vuepage底下，所以把上面兩串程式碼改成......

```
<script type="module" crossorigin src="/vuepage/assets/index-8a9688b0.js"></script>
<link rel="stylesheet" href="/vuepage/assets/index-e90b732f.css">


```
上述的程式碼只要你重新打包過，那麼就要手動改回上面的做法，注意一下即可。


接下來講照片的事情，照道理說照片照著上面的步驟做一次就好了，但是你會在建構打包那關被打槍，因為在你本地上並不存在這樣的路徑。這下麻煩了，本地跟github pages的環境有所差異，有沒有一種方式能夠兼顧兩邊!答案是:YES!

我們只需要利用程式碼來條件性增加路徑即可，這邊使用provide/inject這個做法來實施。當然如果你的檔案結構比較單純可以直接跳過，直接輸入條件判定就好。

在父檔案中打上這樣一段程式碼

username:使用者名稱(依github帳號名稱為主)
repo:存放路徑名稱(通常是github專案名稱)

```
/*抓取目前網站路徑*/
var currentpath=window.location.href;

/*確定來源 根據來源將相對應照片添加相對路徑 */
var isAddable="";
if(currentpath.includes("https://{username}.github.io/{repo}/"))
    isAddable="/{repo}";
else
    isAddable="";
    
provide('frontpath',isAddable);


```

 接著在需要判定結果的子檔案中輸入這樣的內容......
 
 ```
 <script setup>
 import { inject,ref } from 'vue';
    

const isAddable=inject('frontpath');
console.log("the value "+isAddable);
 </setup>
 
 /*以下是範例 This is an example code.*/

<img :src="isAddable+'/images/3002.jpg'" />
 ```
 
 這樣網站就完成80%的設置了
 
 
 ## 刷新自動導向
 
 由於在github上面的靜態檔案只有一個，也就是index.html。正常來說我們是不能手動輸入相關路徑連結去導向該分頁的，會出現404error。這邊我參考網路上的這篇文章:
https://shorturl.at/aCOWX

首先我們先在public資料夾新增404.html，這樣只要出現404error時就會自動導向這個頁面。接下來新增這串程式碼......

```
<script>
    sessionStorage.redirect = location.href;
 </script>
 

```


最後回到index.html，新增這段程式碼並重新上傳即可，當然如果後續有重新打包就要重加一次。

```
<script>
    (function(){
      let redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      if (redirect && redirect !== location.href) {
        history.replaceState(null, null, redirect);
      }
    })();
  </script>


```
