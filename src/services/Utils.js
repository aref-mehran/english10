import localforage from "localforage";
class Utils {
  static async downloadTOIndexedDb(title, url) {
    var currentBlob = await localforage.getItem(title);
    if (currentBlob) {
      return currentBlob;
    }
    const res = await fetch(url);
    console.log(res);

    var blob = await res.blob();
    await localforage.setItem(title, blob);
    return blob;
  }
}
export default Utils;
