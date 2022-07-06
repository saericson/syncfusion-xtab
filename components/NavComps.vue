<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" dense hide-on-scroll app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-spacer />

      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} - ActERM</span>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'NavDrawer',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-table-plus',
          title: 'Issue Page',
          to: '/simparms',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vue Grid CRUD Issue',
    }
  },
}
</script>
