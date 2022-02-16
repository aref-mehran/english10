<template>
  <v-footer
    color="primary"
    padless
    fixed 
  >
    <v-col
      class="text-right"
      cols="12"
    >
      <strong> {{translate}} </strong>
    </v-col>
    
  </v-footer>
</template>


<script>
export default {
    data(){
        return{
        }
    },
    props:{
        translate:String,
    },
}
</script>