import React from "react";

import Router from "next/router";

export async function addResumeUrl(resumeUrl: string) {
  const resumeBody = { resume: resumeUrl };
  const response = await fetch("/api/profile", {
    method: "PUT",
    body: JSON.stringify(resumeBody),
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log("WE ARE HERE");
  console.log(response);
}

function getProfileFromFormData(
  formRef: React.MutableRefObject<any>,
  isSubmit?: boolean
) {
  return {
    firstName: formRef.current["first-name"].value,
    lastName: formRef.current["last-name"].value,
    phoneNumber: formRef.current["phone-number"].value,
    school: formRef.current["school"].value,
    major: formRef.current["major"].value,
    minor: formRef.current["minor"].value,
    year: formRef.current["year"].value,
    graduationDate: formRef.current["graduation-date"].value,
    gender: formRef.current["gender"].value,
    ethnicity: formRef.current["ethnicity"].value,
    over18: formRef.current["is-over-18"].checked,
    needBus: formRef.current["need-bus"].checked,
    skillLevel: formRef.current["skill-level"].value,
    skills: formRef.current["skills"].value,
    interests: formRef.current["interests"].value,
    links: formRef.current["links"].value,
    questionOne: formRef.current["question-one"].value,
    questionTwo: formRef.current["question-two"].value,
    questionThree: formRef.current["question-three"].value,
    codeOfConduct: formRef.current["code-of-conduct"].checked,
    authorize: formRef.current["authorize"].checked,
    marketing: formRef.current["marketing"].value,
    submit: isSubmit
  };
}

export async function syncProfile(
  e: any,
  formRef: React.MutableRefObject<any>,
  setSuccess: Function,
  setError: Function,
  isSubmit: boolean
) {
  e.preventDefault();

  const profile = getProfileFromFormData(formRef, isSubmit);

  const response = await fetch("/api/profile", {
    method: "PUT",
    body: JSON.stringify(profile),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.status === 200) {
    setSuccess(true);

    if (isSubmit) {
      Router.push("/results");
    }
  } else {
    const data = await response.json();
    setError(data.error);
  }
}
