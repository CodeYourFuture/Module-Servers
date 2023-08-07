// HelperFunctions.mjs
import fs from "fs";

export function readFromDatabase() {
  // read the json file
  const mailingListsJsonData = fs.readFileSync("mailing-lists.json");
  // parse the json file to javascript
  const mailingListsParsedData = JSON.parse(mailingListsJsonData);
  return mailingListsParsedData;
}

export function writeToDatabase(data) {
  // overwrite the JSON file with the updated version of the data
  fs.writeFileSync("mailing-lists.json", JSON.stringify(data));
}
