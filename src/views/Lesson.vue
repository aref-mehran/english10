<template>
  <div>
    <Header />

    <div :key="componentKey">
      <v-container v-if="progressValue != 100 || loading">
        <v-row class="fill-height" align-content="center" justify="center">
          <v-col class="text-subtitle-1 text-center" cols="12">
            در حال دانلود(لطفا اینترنت خود را روشن کنید)
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

      <div v-for="i in range(startPage, endPage + 1)" :key="i">
        <pdf
          v-if="progressValue == 100"
          :src="offlineSrc[bookName + '_' + i + '.pdf']"
          :page="1"
        ></pdf>
      </div>
    </div>
    <div>
      <Footer
        :en_translate="this.englishSentence"
        :fa_translate="this.farsiSentence"
      />
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

import books from "@/data/books.js";

export default {
  data() {
    return {
      lesson: "",
      bookName: "",
      startPage: 1,
      endPage: 5,
      alignments: "center",
      farsiSentence: "",
      englishSentence: "",

      offlineSrc: {},
      componentKey: 0,
      progressValue: 5,
      loading: true,
    };
  },
  mounted() {
    this.bookName = this.$route.params.bookName;
    let pageOffset = books.filter((book) => book.bookName == this.bookName)[0]
      .pageOffset;
    if (!pageOffset) {
      pageOffset = 0;
    }
    this.startPage = +this.$route.params.startPage + pageOffset;
    this.endPage = +this.$route.params.endPage + pageOffset;
    this.init_pdf();

    // Select the node that will be observed for mutations
    const targetNode = document.getElementsByTagName("body")[0];

    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };

    var self = this;

    // Callback function to execute when mutations are observed
    const callback = function (mutationsList, observer) {
      // Use traditional 'for loops' for IE 11
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          if (document.getElementsByTagName("span").length > 10) {
            self.loading = false;
          }

          for (var el of mutation.addedNodes) {
            if (el.tagName == "SPAN") {
              el.addEventListener("click", function (e) {
                self.clickOnSentence(e.target.innerText);
              });
            }
          }
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  },
  created() {
    this.speak = new Speak();
    this.translator = new Translate();
  },
  updated() {},

  methods: {
    async init_pdf() {
      for (var start = this.startPage; start <= this.endPage; start++) {
        var fileName = start + ".pdf";
        var url =
          process.env.BASE_URL + "pdfs/" + this.bookName + "/" + fileName;
        var indexdbFileName = this.bookName + "_" + fileName;
        await this.downloadTOIndexedDb(indexdbFileName, url);
      }

      this.progressValue = 100;
    },
    async setOfflineSrc(title, blob) {
      var urlCreator = window.URL || window.webkitURL;

      var fileUrl = urlCreator.createObjectURL(blob);
      this.offlineSrc[title] = fileUrl;
      this.componentKey++;
    },
    async downloadTOIndexedDb(title, url) {
      var currentBlob = await localforage.getItem(title);
      if (currentBlob) {
        this.setOfflineSrc(title, currentBlob);

        return;
      }
      const res = await fetch(url);
      console.log(res);

      var blob = await res.blob();
      await localforage.setItem(title, blob);
      this.setOfflineSrc(title, blob);

      this.progressValue =
        (Object.keys(this.offlineSrc).length /
          (this.endPage - this.startPage + 1)) *
        100;
    },
    range(start, end) {
      start = Number(start);
      end = Number(end);
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    },
    clickOnSentence(sentence) {
      let cursor = window.getSelection();

      cursor.modify("move", "backward", "lineboundary");
      cursor.modify("extend", "forward", "lineboundary");

      this.speak.read(sentence, this.$store.state.readingSpeed / 100);

      this.farsiSentence = this.translator.getTranslated(sentence);
      this.englishSentence = sentence;
    },
    clickOnWord() {
      let cursor = window.getSelection();
      cursor.modify("move", "backward", "word");
      cursor.modify("extend", "forward", "word");
      var selectedStr = cursor.toString();

      this.speak.read(selectedStr, this.$store.state.readingSpeed / 100);

      this.farsiSentence = this.translator.getTranslated(selectedStr);
      this.englishSentence = selectedStr;
    },
    clicked() {
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
