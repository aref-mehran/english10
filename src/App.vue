<template>
    <v-app>
        
        <v-main>
            <router-view/>
        </v-main>
        <Footer />
    </v-app>
</template>

<script>


export default {
    
  name: 'App',
    components: {
  },
  data: () => ({
    //
  }),
};
</script>
