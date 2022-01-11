import { createApp } from 'vue';

// loading
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue';
import router from './router';

// BS
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// filters
import { currency, date } from './methods/filters';

const app = createApp(App);
app.use(router);

app.component('VueLoading', VueLoading);

// global properties
app.config.globalProperties.$filters = {
  currency,
  date,
};

app.mount('#app');
