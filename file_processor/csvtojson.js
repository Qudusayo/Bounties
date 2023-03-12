const path = require("path");

const csvFilePath = path.join(__dirname, "../files/data.csv");

const csv = require("csvtojson");
const fs = require("fs");

csv({ flatKeys: false })
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    jsonObj = jsonObj.map((obj) => {
      return {
        Name: obj.Name,
        College: obj.College,
        Sport: obj.Sport,
        Agency: obj.Agency,
        Instagram: obj.Instagram,
        "Instagram URL": obj.InstagramURL,
        "Instagram Followers": "",
        "Instagram Bio": "",
        Rating: obj.Rating,
        Twitter: obj.Twitter,
        "Twitter Followers": "",
        "Twitter Bio": "",
        YouTube: obj.YouTube,
        "YouTube Subscribers": "",
        "YouTube About": "",
        TikTok: obj.TikTok,
        "TikTok Followers": "",
        "TikTok Bio": "",
        "Platform 1": obj["Platform 1"],
        "Platform 2": obj["Platform 2"],
        "Platform 3": obj["Platform 3"],
        "Sponsor 1": obj["Sponsor 1"],
        "Sponsor 2": obj["Sponsor 2"],
        "Sponsor 3": obj["Sponsor 3"],
        "Sponsor 4": obj["Sponsor 4"],
        "Sponsor 5": obj["Sponsor 5"],
        "Sponsor 6": obj["Sponsor 6"],
        "Sponsor 7": obj["Sponsor 7"],
        "Sponsor 8": obj["Sponsor 8"],
        "Sponsor 9": obj["Sponsor 9"],
        "Sponsor 10": obj["Sponsor 10"],
        "Sponsor 11": obj["Sponsor 11"],
        "Sponsor 12": obj["Sponsor 12"],
        About: obj.About,
      };
    });

    fs.writeFileSync(
      path.join(__dirname, "../files/data.json"),
      JSON.stringify(jsonObj, null, 2)
    );
  });
