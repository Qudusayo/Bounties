const fs = require("fs");
const path = require("path");
const getTwitterProfile = require("../media_fetch/twitter");

const entries = fs.readFileSync(
  path.join(__dirname, "../files/data.json"),
  "utf8"
);
const entriesJson = JSON.parse(entries);

async function makeRequests() {
  for (let i = 0; i < entriesJson.length; i++) {
    console.log(`Fetching Twitter data User ${i + 1} of ${entriesJson.length}`);
    let item = entriesJson[i];

    if (!item.Twitter) continue;
    if (item["Twitter Followers"]) continue;

    try {
      const response = await getTwitterProfile(item.Twitter);
      entriesJson[i]["Twitter Followers"] = response.followers;
      entriesJson[i]["Twitter Bio"] = response.description;

      fs.writeFileSync(
        path.join(__dirname, "../files/data_tw-fix.json"),
        JSON.stringify(entriesJson, null, 2)
      );
    } catch (error) {
      console.error(error);
    }
    await delay(2500); // Wait for 2.5 seconds before making the next request
  }

  fs.writeFileSync(
    path.join(__dirname, "../files/data_tw-fix.json"),
    JSON.stringify(entriesJson, null, 2)
  );
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

makeRequests();
