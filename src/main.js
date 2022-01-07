import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// filters
import { currency, date } from './methods/filters';

const app = createApp(App);
app.use(router);

// global properties
app.config.globalProperties.$filters = {
  currency,
  date,
};

app.mount('#app');
