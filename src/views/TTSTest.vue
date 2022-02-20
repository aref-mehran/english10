<template>
  <div
    class="about"
    @click="clickOnSentence"
  >
    <h1>This is text to speech test. </h1>
    <h1>This is text to speech test. </h1>
    <h1>This is text to speech test. </h1>
  </div>
</template> 

<script>
import Speak from "@/services/Speak.js";

export default {
  data() {
    return {
      text: "This is text to speech test.",
    };
  },
  created() {
    this.speak = new Speak();
  },
  methods: {
    clickOnSentence() {
      let cursor = window.getSelection();

      cursor.modify("move", "backward", "lineboundary");
      cursor.modify("extend", "forward", "lineboundary");
      var selectedStr = cursor.toString();

      selectedStr = selectedStr.trim();
      this.speak.read(selectedStr);
    },
  },
};
</script>
