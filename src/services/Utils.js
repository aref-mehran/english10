import localforage from "localforage";
class Utils {
  static async downloadTOIndexedDb(title, url) {
    var currentBlob = await localforage.getItem(title);
    if (currentBlob) {
      return currentBlob;
    }
    const res = await fetch(url);

    var blob = await res.blob();
    await localforage.setItem(title, blob);
    return blob;
  }
  static range(start, end) {
    let arr = [];
    for (let i = start; i <= end; i++){
      arr.push(i);
    }
    return arr;
  }
  static getIndexDbFileName(pageNum, bookName) {
    var fileName = pageNum + ".pdf";
    var url = process.env.BASE_URL + "pdfs/" + bookName + "/" + fileName;
    var indexdbFileName = bookName + "_" + fileName;
    return indexdbFileName;
  }
  static getPageUrl(pageNum, bookName) {
    var fileName = pageNum + ".pdf";
    var url = process.env.BASE_URL + "pdfs/" + bookName + "/" + fileName;
    return url;
  }
}
export default Utils;
