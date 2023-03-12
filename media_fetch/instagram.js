require("dotenv").config();
const axios = require("axios");

module.exports = async function getInstagramData(username) {
  try {
    if (!username) {
      return {
        description: "",
        followers: "",
      };
    }

    const response = await axios.request({
      method: "GET",
      url: `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
      headers: {
        "X-IG-App-ID": "", // Extracted from headers
        "X-IG-WWW-Claim": "0",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": "", // Extracted from headers
        "X-Instagram-AJAX": "missing",
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    if (response.data?.data.user === null) {
      console.log(`Error fetching instagram profile for ${username}`);
      return {
        description: "",
        followers: "",
      };
    }

    let description = response.data.data.user.biography;
    let followers = response.data.data.user.edge_followed_by.count;

    const responseData = {
      description,
      followers,
    };

    console.log(`Successfully get Instagram data for ${username}`);
    return responseData;
  } catch (e) {
    console.log(`Failed to get Instagram data for ${username}`);
    const responseData = {
      description: "",
      followers: "",
    };
    return responseData;
  }
};
