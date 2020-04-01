import Vue from 'vue';

import App from './App.vue';

import router from './router';
import store from './store';

import vuetify from './plugins/vuetify';
import './plugins/vueCookies';
import apolloProvider from './plugins/apollo';
import '@/plugins/veeValidate';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';

import '@/styles/global.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
