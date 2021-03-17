import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

//ELEMENT_UI
import element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';

import '@/styles/styles.scss';

Vue.use(element, { locale });
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
