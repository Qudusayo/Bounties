const fs = require("fs");
const path = require("path");
const getTikTokData = require("../media_fetch/tiktok");

const entries = fs.readFileSync(
  path.join(__dirname, "../files/data.json"),
  "utf8"
);
const entriesJson = JSON.parse(entries);

async function makeRequests() {
  for (let i = 0; i < entriesJson.length; i++) {
    console.log(`Fetching TikTok data User ${i + 1} of ${entriesJson.length}`);
    let item = entriesJson[i];

    if (!item.TikTok || !item.TikTok.startsWith("@")) continue;

    try {
      const response = await getTikTokData(item.TikTok);
      entriesJson[i]["TikTok Followers"] = response.followers;
      entriesJson[i]["TikTok Bio"] = response.description;

      fs.writeFileSync(
        path.join(__dirname, "../files/data_tk-fix.json"),
        JSON.stringify(entriesJson, null, 2)
      );
    } catch (error) {
      console.error(error);
    }
    await delay(3500); // Wait for 1 seconds before making the next request
  }

  fs.writeFileSync(
    path.join(__dirname, "../files/data_tk-fix.json"),
    JSON.stringify(entriesJson, null, 2)
  );
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

makeRequests();
