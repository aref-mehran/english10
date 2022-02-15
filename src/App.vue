<template>
    <v-app>
        <Header 
            :correctCount="correctCount"
            :totalCount="totalCount"
        />
        <v-main>
            <router-view/>
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
    
  name: 'App',
    components: {
    Header,
    Footer
  },
  data: () => ({
    //
  }),
};
</script>
