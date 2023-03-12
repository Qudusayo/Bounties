const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(
  path.join(__dirname, "../files/data.json"),
  "utf8"
);
const data_yt = fs.readFileSync(
  path.join(__dirname, "../files/data_yt-fix.json"),
  "utf8"
);
const data_tw = fs.readFileSync(
  path.join(__dirname, "../files/data_tw-fix.json"),
  "utf8"
);
const data_tk = fs.readFileSync(
  path.join(__dirname, "../files/data_tk-fix.json"),
  "utf8"
);
const data_ig = fs.readFileSync(
  path.join(__dirname, "../files/data_ig-fix.json"),
  "utf8"
);

const entriesJson = JSON.parse(data);
const igEntriesJson = JSON.parse(data_ig);
const ytEntriesJson = JSON.parse(data_yt);
const twEntriesJson = JSON.parse(data_tw);
const tkEntriesJson = JSON.parse(data_tk);

const aggregatedEntries = [];

async function aggregateResult() {
  for (let i = 0; i < entriesJson.length; i++) {
    try {
      let item = entriesJson[i];
      let igItem = igEntriesJson[i];
      let ytItem = ytEntriesJson[i];
      let twItem = twEntriesJson[i];
      let tkItem = tkEntriesJson[i];

      let profile = {
        Name: item.Name,
        College: item.College,
        Sport: item.Sport,
        Agency: item.Agency,
        Instagram: item.Instagram,
        "Instagram Followers": igItem["Instagram Followers"],
        "Instagram Bio": igItem["Instagram Bio"],
        Rating: item.Rating,
        Twitter: item.Twitter,
        "Twitter Followers": twItem["Twitter Followers"],
        "Twitter Bio": twItem["Twitter Bio"],
        YouTube: item.YouTube,
        "YouTube Subscribers": ytItem["YouTube Subscribers"],
        "YouTube About": ytItem["YouTube About"],
        TikTok: item.TikTok,
        "TikTok Followers": tkItem["TikTok Followers"],
        "TikTok Bio": tkItem["TikTok Bio"],
        "Platform 1": item["Platform 1"],
        "Platform 2": item["Platform 2"],
        "Platform 3": item["Platform 3"],
        "Sponsor 1": item["Sponsor 1"],
        "Sponsor 2": item["Sponsor 2"],
        "Sponsor 3": item["Sponsor 3"],
        "Sponsor 4": item["Sponsor 4"],
        "Sponsor 5": item["Sponsor 5"],
        "Sponsor 6": item["Sponsor 6"],
        "Sponsor 7": item["Sponsor 7"],
        "Sponsor 8": item["Sponsor 8"],
        "Sponsor 9": item["Sponsor 9"],
        "Sponsor 10": item["Sponsor 10"],
        "Sponsor 11": item["Sponsor 11"],
        "Sponsor 12": item["Sponsor 12"],
        About: item.About,
      };

      aggregatedEntries.push(profile);
    } catch (error) {
      console.log(error);
    }
  }

  fs.writeFileSync(
    path.join(__dirname, "../files/data_aggregated.json"),
    JSON.stringify(aggregatedEntries, null, 2)
  );
}

aggregateResult();
