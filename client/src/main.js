import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

//ELEMENT_UI
import element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import * as VueGoogleMaps from "vue2-google-maps";
import '@/styles/styles.scss';

Vue.use(element, { locale });
Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyC-OEkTrXEyUU98tgZfsvuTBhWgS-SLX8c",
        libraries: "places",
    },
});

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
