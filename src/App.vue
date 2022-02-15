<template>
  <v-app>
    <Header 
      :correctCount="correctCount"
      :totalCount="totalCount"
     />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'

export default {
    
  name: 'App',
    components: {
    Header,
  },
  data: () => ({
    //
  }),
};
</script>
