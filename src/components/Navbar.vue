<template>
  <nav>
    <v-navigation-drawer app v-model="drawer" class="primary lighten-2" disable-resize-watcher>
      <v-col align="right">
        <v-btn fab class="white--text" text @click="drawer = !drawer">
          <v-icon class="white--text">mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-action>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      prominent
      shrink-on-scroll
      fade-img-on-scroll
      src="dobranowinalogothinflaggrad.jpg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
        ></v-img>
      </template>

      <v-app-bar-nav-icon x-large @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>

      <v-toolbar-title>Q&amp;A Dobra Nowina</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text v-for="link in links" :key="link.icon" class="white--text"  router :to="link.route">
            <v-icon left class="white--text">{{ link.icon }}</v-icon>
            <span>{{ link.text }}</span>
          </v-btn>
        </v-toolbar-items>
    </v-app-bar>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'mdi-magnify', text: 'Szukaj', route: '/' },
        { icon: 'mdi-format-list-bulleted', text: 'Lista pytań', route: '/list' },
        { icon: 'mdi-hand-right', text: 'Chcesz pomóc?', route: '/iwillhelp' }
      ],
    }
  },
}
</script>
<style>
.v-toolbar > .v-toolbar__content {
    padding: 0 16px;
}
</style>
