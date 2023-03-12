require("dotenv").config();
const axios = require("axios");

module.exports = async function getTwitterProfile(username) {
  try {
    if (!username) {
      return {
        description: "",
        followers: "",
      };
    }

    if (username.startsWith("@")) {
      username = username.slice(1);
    }
    // Get twitter profile data from the API
    const response = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics,description`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    if (response.data?.title === "Not Found Error") {
      console.log(`Error fetching twitter profile for ${username}`);
      return {
        description: "",
        followers: "",
      };
    }

    console.log(`Fethced twitter profile for ${username} successfully`);
    let description = response.data.data.description;
    let followers = response.data.data.public_metrics.followers_count;

    const responseData = {
      description,
      followers,
    };

    return responseData;
  } catch (error) {
    console.log(error.response);
    console.log(`Error fetching twitter profile for ${username}`);
    return {
      description: "",
      followers: "",
    };
  }
};
