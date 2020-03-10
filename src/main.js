import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router/index.js'

import $config from '@/common/config/config.js'

Vue.prototype.$config = $config

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
