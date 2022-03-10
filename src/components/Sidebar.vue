<template>
  <div>
    <main class="page">
      <div class="container">
        <section class="page-sidebar sidebar">
          <nav class="sidebar-menu menu">
            <h3 class="menu-title">Меню</h3>
            <ul class="menu-list">
              <router-link
                v-for="link in links"
                :key="link.url"
                active-class="menu-link"
                :to="link.url"
                custom
                v-slot="{ href, navigate, isExactActive }"
              >
                <li :class="[isExactActive && 'active']" class="menu-item">
                  <a @click="navigate" :href="href" class="menu-link">{{
                    link.title
                  }}</a>
                </li>
              </router-link>
            </ul>
          </nav>
        </section>
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { title: 'Календарь', url: '/calendar' },
        { title: 'Предстоящие задачи', url: '/' },
      ],
    };
  },
};
</script>
