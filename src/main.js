import { createApp } from 'vue';

// vue-meta
import { createMetaManager, plugin as vueMetePluguin } from 'vue-meta';

// loading-overlay
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// VeeValidate
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';

// BS
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// filters
import {
  currency, date, userPhone, userEmail, userName, userAddress,
} from './methods/filters';

// VeeValidate
defineRule('required', required);
defineRule('email', email);
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
  // validateOnBlur: true,
});
setLocale('zh_TW'); // 手動設定語系

// vue meta
const metaManager = createMetaManager();

const app = createApp(App);
app.use(router);
app.use(metaManager);
app.use(vueMetePluguin); // for optiion api

app.component('Form', Form);
app.component('ErrorMessage', ErrorMessage);
app.component('Field', Field);
app.component('VueLoading', VueLoading);

// global properties
app.config.globalProperties.$filters = {
  currency,
  date,
  userEmail,
  userPhone,
  userName,
  userAddress,
};

app.mount('#app');
