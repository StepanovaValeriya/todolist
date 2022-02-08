import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import './styles/normalize.css';
import './styles/main.css';
import App from './App.vue';
import ToDoList from './components/ToDoList.vue';
import Calendar from './components/Calendar.vue';

const routes = [
  { path: '/', component: ToDoList },
  { path: '/calendar', component: Calendar },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
