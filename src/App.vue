<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <Navbar/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default {
  name: 'DobraNowina',

  components: {
    Navbar,
    Footer
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
