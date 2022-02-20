import zaban10_en from "../assets/zaban10_en.js";
import zaban10_fa from "../assets/zaban10_fa.js";

class Translate {
  englishFile = null;
  farsiFile = null;
  constructor() {
    this.englishFile = zaban10_en.split("\n");
    this.farsiFile = zaban10_fa.split("\n");
  }
  getTranslated(englishSentence) {
    let index = 0;
    let farsiSentence = "";
    for (let el of this.englishFile) {
      if (
        el.indexOf(englishSentence) != -1 &&
        englishSentence.length / el.length > 0.7
      ) {
        farsiSentence = this.farsiFile[index];
        break;
      }
      index++;
    }
    return farsiSentence;
  }
}
export default Translate;
