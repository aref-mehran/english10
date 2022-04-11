<template>
  <v-app-bar
    app
    color="primary"
    dark
  >

    <v-row no-gutters>
      <v-col
        cols="6"
        sm="4"
      >
          <v-toolbar-title v-if="bookName" >{{bookName}} </v-toolbar-title>

            </v-col>

            <v-col
        cols="6"
        sm="4"
      >
              <v-select
      :items="items"
      :value="bookName"
      @input="changeBook"
      hide-details
      :label="'انتخاب کتاب'"
    ></v-select>


      </v-col>
    </v-row>



  </v-app-bar>
</template>

<script>
import books from "@/data/books.js";

export default {
    data(){
      return{
        bookName: this.$store.state.bookName,
        items:books.map(book=>({value:book.bookName,text:book.bookTitle}) ),
      };
    },

  methods:{
   changeBook(bookName){
     this.$store.commit('setBookName',bookName);
     this.$router.push(`/lessons/${bookName}`);


   }
  }
};
</script>