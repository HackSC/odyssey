const sgClient = require("@sendgrid/client");

const sendgridSync = async () => {
  //Lazy Load Models so you can change process.ENV dynamically
  const models = require("../api/models");
  sgClient.setApiKey(process.env.SENDGRID_API_KEY);

  const hackerProfiles = await models.HackerProfile.findAll({});

  // Applicants Odyssey List in Sendgrid
  const HackersListID = "95f43e1d-83c2-4818-a7d7-19eb44c30ae4";

  // https://github.com/sendgrid/sendgrid-nodejs/issues/953
  // Explains why we have weird custom field ID's, it's kinda disgusting but ok
  const contacts = hackerProfiles
    .filter((hp) => hp.submittedAt) // Only Submitted Hackers
    .map((hp) => {
      return {
        first_name: hp.firstName,
        last_name: hp.lastName,
        email: hp.email,
        custom_fields: {
          e9_T: hp.status,
          e3_T: hp.school,
          e10_D: hp.submittedAt,
        },
      };
    });

  const updateListRequest = {
    method: "PUT",
    url: "/v3/marketing/contacts",
    body: {
      list_ids: [HackersListID],
      contacts,
    },
  };

  sgClient.request(updateListRequest).then(([response, body]) => {});
};

module.exports = sendgridSync;
