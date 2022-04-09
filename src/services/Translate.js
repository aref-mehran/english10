var trnsaltedfile = {};

import english7_en from "../assets/english7_en.js";
trnsaltedfile["english7_en"] = english7_en; 

import english7_fa from "../assets/english7_fa.js";
trnsaltedfile["english7_fa"] = english7_fa;

import english8_en from "../assets/english8_en.js";
trnsaltedfile["english8_en"] = english8_en;

import english8_fa from "../assets/english8_fa.js";
trnsaltedfile["english8_fa"] = english8_fa;

import english9_en from "../assets/english9_en.js";
trnsaltedfile["english9_en"] = english9_en;

import english9_fa from "../assets/english9_fa.js";
trnsaltedfile["english9_fa"] = english9_fa;



import english10_en from "../assets/english10_en.js";
trnsaltedfile["english10_en"] = english10_en;

import english10_fa from "../assets/english10_fa.js";
trnsaltedfile["english10_fa"] = english10_fa;

import english11_en from "../assets/english11_en.js";
trnsaltedfile["english11_en"] = english11_en;

import english11_fa from "../assets/english11_fa.js";
trnsaltedfile["english11_fa"] = english11_fa;

import english12_en from "../assets/english12_en.js";
trnsaltedfile["english12_en"] = english12_en;

import english12_fa from "../assets/english12_fa.js";
trnsaltedfile["english12_fa"] = english12_fa;

class Translate {
  englishFile = null;
  farsiFile = null;
  constructor(bookName) {
    this.englishFile = trnsaltedfile[bookName + "_en"].split("\n");
    this.farsiFile = trnsaltedfile[bookName + "_fa"].split("\n");
  }

  trimAll(selectedStr) {
    selectedStr = selectedStr.trim();
    selectedStr = selectedStr.replace(/\s+/g, " ");
    return selectedStr;
  }
  getTranslated(englishSentence) {
    let index = 0;
    let farsiSentence = "";
    for (let el of this.englishFile) {
      el = this.trimAll(el);
      englishSentence = this.trimAll(englishSentence);

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
