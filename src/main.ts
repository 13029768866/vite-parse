import { createApp } from 'vue';
import { globalRegister } from './global';

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
// 依赖注册
globalRegister(app);
app.use(store).use(router).mount('#app');

import http from './request';
http.request({
  url: '/get',
  method: 'GET',
  showLoading: true,
});
