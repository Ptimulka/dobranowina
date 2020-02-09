<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <Navbar/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'DobraNowina',

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
  computed: {
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
};
</script>
