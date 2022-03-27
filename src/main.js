import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import { message, message2 } from './data/file1';
// import notification from './data/file2';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// notification(message);
// notification(message2);
