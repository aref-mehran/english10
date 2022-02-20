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
    <strong> {{message}} &nbsp; </strong>
    <strong style="color:white" > {{translate}} </strong>
    </v-col>
    
  </v-footer>
</template>


<script>
export default {
    data(){
        return{
            message : 'ترجمه:   '
        }
    },
    props:{
        translate:String,
    },
}
</script>