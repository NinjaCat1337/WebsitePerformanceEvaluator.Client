import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios';

Vue.config.productionTip = false

Axios.defaults.baseURL = 'https://localhost:44341/api';

new Vue({
  render: h => h(App),
}).$mount('#app')
