const fs = require("fs");
const path = require("path");
const getYoutubeChannelData = require("../media_fetch/youtube");

const entries = fs.readFileSync(
  path.join(__dirname, "../files/data.json"),
  "utf8"
);
const entriesJson = JSON.parse(entries);

let fixedYoutube = entriesJson.map(async (entry) => {
  if (entry.YouTube) {
    const youtubeData = await getYoutubeChannelData(entry.YouTube);
    entry["YouTube Subscribers"] = youtubeData.subscribers;
    entry["YouTube About"] = youtubeData.description;
  }
  return entry;
});

Promise.all(fixedYoutube).then((fixedYoutube) => {
  fs.writeFileSync(
    path.join(__dirname, "../files/data.json"),
    JSON.stringify(fixedYoutube, null, 2)
  );
});
