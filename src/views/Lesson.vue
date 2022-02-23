<template>
  <div>
    <Header />

    <div
      :key="componentKey"
      @click="clicked"
    >

      <v-container v-if="Object.keys( offlineSrc).length< (endPage-startPage+1)">
        <v-row
          class="fill-height"
          align-content="center"
          justify="center"
        >
          <v-col
            class="text-subtitle-1 text-center"
            cols="12"
          >
            در حال بارگذاری
          </v-col>
          <v-col cols="6">
            <v-progress-linear
              color="deep-purple accent-4"
              v-model="progressValue"
              rounded
              height="6"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>

      <div
        v-for="i in range(startPage,endPage+1)"
        :key="i"
      >
        <pdf
          v-if="Object.keys( offlineSrc).length==(endPage-startPage+1)"
          :src="offlineSrc[i+'_english-10.pdf']"
          :page="1"
        ></pdf>
      </div>
    </div>
    <div>
      <Footer :translate="this.farsiSentence" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/HeaderLesson.vue";
import Footer from "@/components/Footer.vue";
import Speak from "@/services/Speak.js";
import Translate from "@/services/Translate.js";
import pdf from "pdfvuer";
import localforage from "localforage";
export default {
  data() {
    return {
      lesson: "",
      startPage: 1,
      endPage: 5,
      alignments: "center",
      farsiSentence: "",
      offlineSrc: {},
      offlineSrc_length: 0,
      componentKey: 0,
      progressValue:5
    };
  },
  mounted() {
    this.lesson = this.$route.params.lessonTitle;
    this.startPage = +this.$route.params.startPage;
    this.endPage = +this.$route.params.endPage;

    for (var start = this.startPage; start <= this.endPage; start++) {
      var title = start + "_english-10.pdf";
      var url = process.env.BASE_URL + "pdfs/" + title;
      this.downloadTOIndexedDb(title, url);
    }
  },
  created() {
    this.speak = new Speak();
    this.translator = new Translate();
  },

  methods: {
    async setOfflineSrc(title, blob) {
      var urlCreator = window.URL || window.webkitURL;

      var fileUrl = urlCreator.createObjectURL(blob);
      this.offlineSrc[title] = fileUrl;
      this.componentKey++;
      console.log(this);
    },
    async downloadTOIndexedDb(title, url) {
      var currentBlob = await localforage.getItem(title);
      if (currentBlob) {
        this.setOfflineSrc(title, currentBlob);
        return;
      }
      var temp_url = url; // require(url);
      const res = await fetch(url);

      var blob = await res.blob();
      await localforage.setItem(title, blob);
      this.setOfflineSrc(title, blob);

      this.progressValue=(Object.keys( this.offlineSrc).length/(this.endPage-this.startPage+1))*100;
    },
    range(start, end) {
      start = Number(start);
      end = Number(end);
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    },
    clickOnSentence() {
      let cursor = window.getSelection();

      cursor.modify("move", "backward", "lineboundary");
      cursor.modify("extend", "forward", "lineboundary");
      var selectedStr = cursor.toString();


      this.speak.read(selectedStr, this.$store.state.readingSpeed / 100);

      this.farsiSentence = this.translator.getTranslated(selectedStr);
    },
    clickOnWord() {
      let cursor = window.getSelection();
      cursor.modify("move", "backward", "word");
      cursor.modify("extend", "forward", "word");
      var selectedStr = cursor.toString();

      this.speak.read(selectedStr, this.$store.state.readingSpeed / 100);

      this.farsiSentence = this.translator.getTranslated(selectedStr);
    },
    clicked() {
      console.log("State    " + this.$store.state.SentenceReadingMode);
      console.log("speed    " + this.$store.state.readingSpeed);
      if (this.$store.state.SentenceReadingMode) {
        this.clickOnSentence();
      } else {
        this.clickOnWord();
      }
    },
  },
  components: {
    pdf,
    Header,
    Footer,
  },
};
</script>
