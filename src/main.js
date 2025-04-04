import { createApp } from "vue";
import App from './App.vue';
import router from './route';
import VueLazyload from '@jambonn/vue-lazyload';
import { createHead } from '@vueuse/head';

const head = createHead();
const app=createApp(App);

app.use(head); 
app.use(VueLazyload);
app.use(router).mount('#app');
