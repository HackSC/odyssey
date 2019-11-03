import emailToSchool from "../assets/data/email-to-school.json";

function getSchoolFromEmail(email: string): string {
  const emailSplit = email.split("@");
  const domain = emailSplit[1];

  if (domain in emailToSchool) {
    return emailToSchool[domain];
  } else {
    return null;
  }
}

export default getSchoolFromEmail;
