<template>
  <div>
    <Header />
    <v-card class="mx-auto">
      <v-list>
        <v-list-item
          v-for="book in books"
          :key="book.bookName"
          v-model="book.active"
          no-action
          :to="`/lessons/${book.bookName}`"
        >
          <v-list-item-avatar>
            <v-img :src="book.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="book.bookTitle"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <div
      style="
        direction: rtl;
        font-size: smaller;
        text-align-last: center;
        margin-top: 10%;
      "
    >
      منبع کتاب درسی www.roshd.ir
    </div>
  </div>
</template>

<script>
import books from "@/data/books.js";
import Header from "@/components/HeaderHome.vue";

export default {
  name: "Home",
  components: {
    Header,
  },
  methods: {},
  created() {
    if (this.$store.state.bookName) {
      this.$router.push(`/lessons/` + this.$store.state.bookName);
    }
  },
  data: () => ({
    selectedLesson: "",
    books: books,
  }),
};
</script>
