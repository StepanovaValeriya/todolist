<script setup>
import ToDoList from './components/ToDoList.vue';
</script>

<template>
  <div class="wrapper">
    <header class="header">
      <div class="header-logo">
        <a class="header-link" href="/макет 5 toDoList/html/index.html">
          ToDoList
        </a>
      </div>
    </header>
    <main class="page">
      <div class="container">
        <section class="page-sidebar sidebar">
          <nav class="sidebar-menu menu">
            <h3 class="menu-title">Меню</h3>
            <ul class="menu-list">
              <li class="menu-item">
                <a class="menu-link" href="./components/App.vue">Календарь</a>
              </li>
              <li class="menu-item">
                <a class="menu-link" href="../html/list.html"
                  >Завершенные задачи</a
                >
              </li>
              <li class="menu-item">
                <a class="menu-link" href="../html/list.html"
                  >Предстоящие задачи</a
                >
              </li>
            </ul>
          </nav>
        </section>
        <ToDoList />
      </div>
    </main>
    <footer class="footer">
      <div class="footer-main">
        <div class="footer-row">
          <div class="footer-column">
            <div class="footer-label">Company Info</div>
            <nav class="footer-menu menu-footer">
              <ul class="menu-footer-list">
                <li class="menu-footer-item">
                  <a class="menu-footer-link" href="#">About Us</a>
                </li>
                <li class="menu-footer-item">
                  <a class="menu-footer-link" href="#">Carrier</a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="footer-column">
            <div class="footer-label">Legal</div>
            <nav class="footer-menu menu-footer">
              <ul class="menu-footer-list">
                <li class="menu-footer-item">
                  <a class="menu-footer-link" href="#">About Us</a>
                </li>
                <li class="menu-footer-item">
                  <a class="menu-footer-link" href="#">Carrier</a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="footer-column">
            <div class="footer-label">Resources</div>
            <nav class="footer-menu menu-footer">
              <ul class="menu-footer-list">
                <li class="menu-footer-item">
                  <a class="menu-footer-link" href="#">IOS & Android</a>
                </li>
                <li class="menu-footer-item">
                  <a class="menu-footer-link" href="#">Watch a Demo</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style>
@media (max-width: 992px) {
}
@media (max-width: 1060px) {
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
</style>
