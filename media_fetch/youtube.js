require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");

const getChannelId = async (channelName) => {
  try {
    const axiosResponse = await axios.request({
      url: `https://www.youtube.com/${channelName}`,
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(axiosResponse.data);

    // Check if the channel exists
    if ($("title").text() === "404 Not Found") {
      return false;
    }

    const channelId = $("meta[itemprop=channelId]").attr("content");
    return channelId;
  } catch (error) {
    return false;
  }
};

module.exports = async function getYoutubeChannelData(channelId) {
  // Get youtube channel data from the API
  const axios = require("axios");

  if (channelId.startsWith("@")) {
    channelId = await getChannelId(channelId);
  }

  if (!channelId) {
    return {
      description: "Unavailable",
      subscribers: "Unavailable",
    };
  }

  const URI = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${process.env.YOUTUBE_API_KEY}`;

  const response = await axios.get(URI);

  const subscribers = parseInt(
    response.data.items[0].statistics.subscriberCount
  );
  const description = response.data.items[0].snippet.description;

  const responseData = {
    description,
    subscribers,
  };

  return responseData;
};
