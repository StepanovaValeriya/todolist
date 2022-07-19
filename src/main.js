import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import './styles/normalize.css';
import './styles/main.css';
import App from './App.vue';
import ToDoList from './components/ToDoList.vue';
import Calendar from './components/Calendar.vue';
import Ready from './components/Ready.vue';

const routes = [
  {
    path: '/',
    component: ToDoList,
  },
  { path: '/calendar', component: Calendar },
  { path: '/ready', component: Ready },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
