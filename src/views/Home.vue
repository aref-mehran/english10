<template>
  <div>
    <Header />
    <v-card class="mx-auto">
      <v-list>
        <v-list-group
          v-for="book in books"
          :key="book.bookName"
          v-model="book.active"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-avatar>
              <v-img :src="book.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="book.bookTitle"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item>
            <v-list>
              <v-list-group
                v-for="lesson in book.lessons"
                :key="lesson.title"
                v-model="lesson.active"
                no-action
              >
                <template v-slot:activator>
                  <v-list-item-avatar>
                    <v-img :src="lesson.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="lesson.title"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="lesson.subtitle"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="child in lesson.sectionItems"
                  :key="child.title"
                  @click="lessonItemClick(child.title)"
                  :to="`/lesson/${book.bookName}/${child.startPageNum}/${child.endPageNum}`"
                >
                  <v-list-item-content>
                    <!--<v-icon> mdi-domain </v-icon>-->
                    <v-list-item-title
                      v-text="
                        child.title +
                        ' ( ' +
                        child.startPageNum +
                        ' , ' +
                        child.endPageNum +
                        ' ) '
                      "
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-list-item>
        </v-list-group>
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
  methods: {
    lessonItemClick(itemTitle) {
      this.selectedLesson = itemTitle;
      console.log("selected lesson: ", itemTitle);
    },
  },
  data: () => ({
    selectedLesson: "",
    books: books,
  }),
};
</script>
