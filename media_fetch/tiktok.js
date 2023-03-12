const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async function getTikTokData(username) {
  try {
    if (!username || !username.startsWith("@")) {
      return {
        description: "",
        followers: "",
      };
    }

    let result = await axios.request({
      method: "GET",
      url: `https://www.tiktok.com/${username}`,
      headers: {},
    });

    const html = result.data;
    const $ = cheerio.load(html);

    const scriptTag = $('script[id="Person"]');
    const response = JSON.parse(scriptTag.html());

    if (response.status === 404) {
      console.log(`Error fetching TikTok profile for ${username}`);
      return {
        description: "",
        followers: "",
      };
    }

    let description = response.description;
    let followers = response.interactionStatistic[1].userInteractionCount;

    const responseData = {
      description,
      followers,
    };

    console.log(`Successfully get TikTok data for ${username}`);
    return responseData;
  } catch (e) {
    // console.log(e);
    console.log(`Failed to get TikTok data for ${username}`);
    const responseData = {
      description: "",
      followers: "",
    };
    return responseData;
  }
};
