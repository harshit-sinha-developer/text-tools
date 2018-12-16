export default class Utility {
  /**
   * Generates a string of given length
   * 
   * @static
   * @param {Number} stringLength 
   * @returns 
   * @memberof Utility
   */
  static generateRandomString(stringLength) {
    const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";

    for (let i = 0; i < stringLength; i++)
      text += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));

    return text;
  }

  /**
   * Deep merges objects sent as arguments
   * 
   * @static
   * @returns 
   * @memberof Utility
   */
  static merge() {
    let result = {};
    if (!arguments || !arguments.length) {
      return result;
    }

    for (let i = 0; i < arguments.length; i++) {
      let currentArg = arguments[i];
      if (!currentArg) {
        continue;
      }
      Object.keys(currentArg).forEach(key => {
        if (Utility.isObject(currentArg[key]) && result[key] && Utility.isObject(result[key])) {
          result[key] = Utility.merge(result[key], currentArg[key]);
        } else {
          result[key] = currentArg[key];
        }
      });
    }
    return result;
  }

  /**
   * Determines if a variable is Plain JS Object
   * 
   * @static
   * @param {any} data 
   * @returns {Boolean}
   * @memberof Utility
   */
  static isObject(data) {
    if (!data) return false;
    return (Object.prototype.toString.call(data) === '[object Object]');
  }

  static isNill(data) {
    if (data == null || data == undefined) return true;
    return false;
  }

  static isEmpty(data) {
    if (data == null || data == undefined) return true;
    if (Array.isArray(data) || typeof data == 'string') return data.length ? false : true;
    if (Utility.isObject(data)) return Object.keys(data).length ? false : true;
  }

  static exportTableToCsv(tableEle, filename) {
    let csv = [];
    let rows = tableEle.querySelectorAll("tr");

    for (let i = 0; i < rows.length; i++) {
      let row = [], cols = rows[i].querySelectorAll("td, th");

      for (let j = 0; j < cols.length; j++)
        row.push(cols[j].innerText);

      csv.push(row.join(","));
    }

    // Download CSV
    Utility.downloadCsv(csv.join("\n"), filename);
  }

  static downloadCsv(csv, filename, fileType) {
    let csvFile;
    let downloadLink;
    fileType = fileType || "text/csv";
    // CSV FILE
    csvFile = new Blob([csv], { type: fileType });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // We have to create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Make sure that the link is not displayed
    downloadLink.style.display = "none";

    // Add the link to your DOM
    document.body.appendChild(downloadLink);

    // Lanzamos
    downloadLink.click();
  }

  static convertCsvToJson(csvString, lineSeparator) {
    if(Utility.isEmpty(csvString)) return [];

    lineSeparator = lineSeparator || '\n';
    let csv = csvString.split(lineSeparator);
    csv = csv.map(row => row.split(','));
    let headers = csv[0];
    let jsonData = [];

    for(let i=1; i < csv.length; i++) {
      let dataObj = {};
      headers.forEach((header, index) => {
        dataObj[header] = csv[i][index];
      });
      jsonData.push(dataObj);
    }
    return jsonData;
  } 
}