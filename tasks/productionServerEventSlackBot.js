const productionServerSlackBot = async () => {
  if (process.env.URL_BASE && process.env.URL_BASE.includes("staging")) {
    fetch("https://cronjobs.hacksc.com/api/send_slack_message").then(
      async (res) => {
        if (res.status !== 200)
          console.error(
            "Did not receive 200 response from https://cronjobs.hacksc.com/api/send_slack_message"
          );

        // * Try to get json object from response
        /*
        try {
          let new_res = await res.json();
        } catch (e) {
          console.error("could not get json object from response.")
        }
        */
      }
    );
  }
};

module.exports = productionServerSlackBot;
