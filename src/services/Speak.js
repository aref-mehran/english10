import Speech from "speak-tts";
class Speak {
  speech = null;
  constructor() {
    this.speech = new Speech(); // will throw an exception if not browser supported
    if (this.speech.hasBrowserSupport()) {
      // returns a boolean
      console.log("speech synthesis supported");
    }
  }
  async read(text, speed) {
    const firstOfflineVoice = speechSynthesis.getVoices().filter((el) => {
      return el.localService == true;
    })[0]?.name;
    await this.speech.init({
      volume: 1,
      lang: "en-GB",
      rate: speed,
      pitch: 1,
      voice: firstOfflineVoice,
    });
    this.speech.speak({
      text: text,
      queue: false,
    });
  }
}
export default Speak;
