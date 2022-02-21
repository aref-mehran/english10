<template>
  <v-app>

    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    //
  }),
};
</script>
<style>
@font-face {
  font-family: "vazir";
  src: local("vazir"), url(./fonts/Vazir.ttf) format("truetype");
}
#app {
  font-family: "Vazir";
}
</style>
