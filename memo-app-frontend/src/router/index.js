import { createRouter, createWebHistory } from 'vue-router';
import NoteList from '../components/NoteList.vue';
const routes = [
  {
    path: '/',
    name: 'NoteList',
    component: NoteList
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
export default router;

