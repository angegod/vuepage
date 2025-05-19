import { createWebHashHistory, createRouter, createWebHistory } from "vue-router";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/Home.vue'),
    meta: {
      title: '侵蝕封王',
      description: 'The Home page of website.'
    }
  },
  {
    path: '/about/',
    name: 'About',
    component: () => import('../components/About.vue'),
    meta: {
      title: '侵蝕封王--關於',
      description: 'The about page of website.'
    }
  },
  {
    path: '/battle/',
    name: 'Battle',
    component: () => import('../components/Battle.vue'),
    meta: {
      title: '災厄級--關卡資訊',
      description: '彙整封王災厄級跟流光災厄級關卡資訊'
    }
  },
  {
    path: '/King/',
    name: 'King',
    component: () => import('../components/sealedking/King.vue'),
    meta: {
      title: '侵蝕封王--介紹',
      description: '彙整封王災厄級跟流光災厄級關卡資訊'
    }
  },
  {
    path: '/card/',
    name: 'Card',
    component: () => import('../components/Card.vue'),
    meta: {
      title: '時光牌圖鑑',
      description: '時光牌技能搜尋工具，玩家可以依照需求找到想要的時光牌'
    }
  },
  {
    path: '/modifyCard/',
    name: 'CardModify',
    component: () => import('../components/Modify.vue'),
    meta: {
      title: '時光牌圖鑑--卡片後台',
      description: '管理時光牌的後台'
    }
  },
  {
    path: '/modifyFunc/',
    name: 'FuncModify',
    component: () => import('../components/ModifyFunc.vue'),
    meta: {
      title: '時光牌圖鑑--技能後台',
      description: '管理時光牌技能的後台'
    }
  },{
    path: '/ImageMaker/', 
    name:'ImageMaker',
    component: () => import('../components/ImageMaker.vue') 
  },
  { 
    path: '/:catchAll(.*)/', 
    component: () => import('../components/NotFound.vue') 
  }
];

const router = createRouter({
  history: createWebHistory('/vuepage/'),
  routes
});

// 使用全局守衛來設置 meta 信息
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (to.meta.description) {
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description);
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.setAttribute('name', 'description');
      newMetaDescription.setAttribute('content', to.meta.description);
      document.head.appendChild(newMetaDescription);
    }
  }
  
  next();
});

export default router;
