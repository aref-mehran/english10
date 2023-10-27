<template>
  <div>
    <v-app-bar app color="primary" dark style="font-size: x-small">
      <v-btn :to="`/`" text>
        <v-icon> mdi-home </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      برای شنیدن تلفظ روی کلمات کلیک کنید

      <v-spacer></v-spacer>
      <v-select
        :items="$store.state.readingSpeedItems"
        :value="$store.state.readingSpeed"
        @input="changeSpeed"
        hide-details
        :label="speedSelectLable"
        style="max-width: 25%"
      ></v-select>
    </v-app-bar>

    <!-- <div>
      <a
        href="https://survey.porsline.ir/s/v2zlYdU7"
        style="
          text-decoration: auto;
          padding: 10%;
          font-size: larger;
          color: green;
        "
      >
        (کلیک کنید)خرید ارزان سی پی کالاف
      </a>
    </div> -->
    <script type="text/javascript" src="http://shopingo.mihanstore.net/partner/show_ads.php?ads_type=banner&ref=93936&row=1&col=1&class=1&prod=1&cats=138&prodType=1" ></script>
    <!-- <div id="pos-article-text-76542"></div> -->


</div>
</template>

<script>
export default {
  data() {
    return {
      speedSelectLable: "سرعت",
      switchLable: "خواندن جمله",
      switchSentence: this.$store.state.SentenceReadingMode,
    };
  },
  methods: {
    switchSentenceClick() {
      console.log(this.$store);
      this.$store.commit("setReadingMode", this.switchSentence);
      console.log(this.$store.state.SentenceReadingMode);
    },
    changeSpeed(speedValue) {
      console.log("change speed ...." + speedValue);
      this.$store.commit("setReadingSpeed", speedValue);
      console.log("change speed ...." + this.$store.state.readingSpeed);
    },
  },
};
</script>