import {
  createApp
} from 'vue'
import App from './App.vue'
import './styles/index.scss'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import store from './store/main.js';

createApp(App).use(store).use(router).use(Antd).mount('#app')