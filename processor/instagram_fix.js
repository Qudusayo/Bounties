const fs = require("fs");
const path = require("path");
const getInstagramData = require("../media_fetch/instagram");

const entries = fs.readFileSync(
  path.join(__dirname, "../files/data.json"),
  "utf8"
);
const entriesJson = JSON.parse(entries);

async function makeRequests() {
  for (let i = 7066; i < entriesJson.length; i++) {
    console.log(
      `Fetching Instagram data User ${i + 1} of ${entriesJson.length}`
    );
    let item = entriesJson[i];

    if (!item.Instagram) continue;
    if(item["Instagram Followers"]) continue;

    try {
      const response = await getInstagramData(item.Instagram);
      entriesJson[i]["Instagram Followers"] = response.followers;
      entriesJson[i]["Instagram Bio"] = response.description;
      fs.writeFileSync(
        path.join(__dirname, "../files/data_ig-fix.json"),
        JSON.stringify(entriesJson, null, 2)
      );
    } catch (error) {
      console.error(error);
      fs.writeFileSync(
        path.join(__dirname, "../files/data_ig-fix.json"),
        JSON.stringify(entriesJson, null, 2)
      );
    }
    await delay(500); // Wait for 3.5 seconds before making the next request
  }

  fs.writeFileSync(
    path.join(__dirname, "../files/data_ig-fix.json"),
    JSON.stringify(entriesJson, null, 2)
  );
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

makeRequests();

// let fixedInstagram = entriesJson.map(async (entry) => {
//   if (entry.Instagram) {
//     const instagramData = await getInstagramData(entry.Instagram);
//     entry["Instagram Followers"] = instagramData.followers;
//     entry["Instagram Bio"] = instagramData.description;
//   }
//   return entry;
// });

// Promise.all(fixedInstagram).then((fixedInstagram) => {
//   fs.writeFileSync(
//     path.join(__dirname, "../files/data_ig-fix.json"),
//     JSON.stringify(fixedInstagram, null, 2)
//   );
// });
