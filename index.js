const fs = require("fs");
const OracleModelConverter = require("./models/OracleModelConverter");
const utils = require("./utils");
/**
 * Convert a Vorto Model to a Thing Model
 *
 */
async function convert() {
  const { fileName } = utils.getConsoleArguments();
  const oracleModel = utils.getDataFromFile(fileName);
  // const { data: vortoModel } = await vortoApi.get(
  //   `${VortoModelId}/content/jsonschema`
  // );
  // console.log(util.inspect(vortoModel, true, 5));
  const oracleModelConverter = new OracleModelConverter(oracleModel);
  const thingModel = oracleModelConverter.convert();
  //   const sdfObject = utils.getDataFromFile('./' + sdfObjectFileName);
  //   const sdfObjectConverter = new SDFObjectConverter(sdfObject);
  //   const thingModel = sdfObjectConverter.convert();
  //   const thingModelJSON = JSON.stringify(thingModel, null, '\t');
  fs.writeFileSync(
    "./generated-thing-model.json",
    JSON.stringify(thingModel, null, "\t")
  );
}

convert();
