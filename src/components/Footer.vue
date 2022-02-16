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
      <strong>ترجمه:</strong> {{this.translate}}
    </v-col>
    
  </v-footer>
</template>


<script>
export default {
    data(){
        return{
            translate:'ترجمه متن بالا در این جا نوشته شده است.'
        }
    }
    //props:{
    //    totalCount:Number,
    //    correctCount: Number
    //},
}
</script>