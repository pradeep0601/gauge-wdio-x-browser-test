const axios = require('axios');

const browserStackUtils = {

  /**
   * Gets detailed information of a session with given sessionId
   * @param  {String} sessionId
   */
  getSessionInfo: async (sessionId) => {
    const url = `https://api.browserstack.com/automate/sessions/${sessionId}.json`;
    const sessionInfo = await axios.get(url, {
      auth: {
        username: process.env.BROWSERSTACK_USERNAME,
        password: process.env.BROWSERSTACK_ACCESS_KEY,
      },
    });
    const { data } = sessionInfo;
    return data;
  },
};

module.exports = browserStackUtils;
