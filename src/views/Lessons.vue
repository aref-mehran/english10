<template>
  <div>
    <Header />

      <v-container v-if="Math.floor(downloadAllProgress) != 100 || loading">
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col class="text-subtitle-1 text-center" cols="12">
            در حال دانلود(لطفا اینترنت خود را روشن کنید)
          </v-col>
          <v-col cols="6">
            <v-progress-linear
              color="deep-purple accent-4"
              v-model="downloadAllProgress"
              rounded
              height="6"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>



    <v-card v-if="Math.floor(downloadAllProgress) == 100" class="mx-auto">
      <v-list>

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
import Utils from "@/services/Utils.js"
export default {
  name: "Home",
  components: {
    Header,
  },

  methods: {
    async downloadAllPages(){

      this.downloadAllProgress=0;

      let pages=new Set();
      for (let lesson of this.book.lessons){
        for(let section of lesson.sectionItems){
          let arr=Utils.range(section.startPageNum,section.endPageNum);
          for(let page of arr){
            pages.add(page)
          };
        }
      }
      for (let pageNum of pages){
        var url =Utils.getPageUrl(pageNum, this.book.bookName);
        var indexdbFileName = Utils.getIndexDbFileName(pageNum, this.book.bookName);
        await Utils.downloadTOIndexedDb(indexdbFileName, url);
        this.downloadAllProgress=this.downloadAllProgress+(100/pages.size);
        console.log(this.downloadAllProgress);
      }
      this.downloadAllProgress=100;
    },
    lessonItemClick(itemTitle) {
      this.selectedLesson = itemTitle;
      console.log("selected lesson: ", itemTitle);
    },
  },
  computed: {
    book() { //Remember, computed props are functions in the end
        return books.filter((book) => book.bookName == this.$store.state.bookName)[0];
    }
},
created(){
  this.$store.commit('setBookName',this.$route.params.bookName);
  this.downloadAllPages();



  

},
  data: () => ({
    selectedLesson: "",
    books: books,
    downloadAllProgress:0,
  }),
};
</script>
