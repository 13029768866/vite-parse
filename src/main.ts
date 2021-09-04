import { createApp } from 'vue';
import { registerApp } from './global';

import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
// 依赖注册
registerApp(app);
app.use(store).use(router).mount('#app');
