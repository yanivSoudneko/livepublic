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

// Vue.directive('click-outside', {
//     bind: function(el, binding, vnode) {
//         this.event = function(event) {
//             console.log('🚀 ~ file: main.js ~ line 25 ~ event', event);
//             if (!(el == event.target || el.contains(event.target))) {
//                 vnode.context[binding.expression](event);
//             }
//         };
//         document.body.addEventListener('click', this.event);
//     },
//     unbind: function(el) {
//         document.body.removeEventListener('click', this.event);
//     },
// });

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
