const fs = require("fs");
const path = require("path");
const converter = require("json-2-csv");

// Step 1: Parse the JSON data
const data_aggregated = fs.readFileSync(
  path.join(__dirname, "../files/data_aggregated.json"),
  "utf8"
);
const data = JSON.parse(data_aggregated);

converter.json2csv(data, (err, csv) => {
  if (err) {
    throw err;
  }

  fs.writeFileSync(path.join(__dirname, "../files/data_aggregated.csv"), csv);
});
