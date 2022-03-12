<template>
  <div class="wrapper">
    <header class="header">
      <div class="header-logo">
        <router-link class="header-link" to="/"> ToDoList </router-link>
      </div>
    </header>
    <Sidebar></Sidebar>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Sidebar from './components/Sidebar.vue';
export default {
  components: { Footer, Sidebar },
};
</script>

<style>
@media (max-width: 992px) {
}
@media (max-width: 1250px) {
  .container {
    flex-direction: column;
  }
  .sidebar {
    min-height: 100%;
  }
  .menu {
    width: 100%;
  }
  .menu-list {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
  }
  .menu-title {
    display: none;
  }
}
@media (max-width: 510px) {
  .header-link {
    font-size: 56px;
  }
}
</style>
