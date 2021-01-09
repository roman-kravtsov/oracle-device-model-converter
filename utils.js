const fs = require("fs");
/**
 * Get Thing Data From a JSON file
 *
 * @param {String} filePath
 * @return {Object} Thing Data
 */
function getDataFromFile(filePath) {
  const content = fs.readFileSync("./" + filePath);
  return JSON.parse(content);
}
/**
 * Read the console arguments and get required data
 *
 * @return {Object[]}
 */
function getConsoleArguments() {
  if (process.argv.length !== 3) {
    console.warn("Usage: node index.js <oracleModel.json>");

    process.exit(-1);
  }

  const fileName = process.argv[2];

  return {
    fileName,
  };
}

module.exports = {
  getDataFromFile: getDataFromFile,
  getConsoleArguments: getConsoleArguments,
};
