import React from "react";

export type ProfileFormData = {
  form: React.MutableRefObject<any>;
  firstName: React.MutableRefObject<any>;
  lastName: React.MutableRefObject<any>;
  phoneNumber: React.MutableRefObject<any>;
  school: React.MutableRefObject<any>;
  major: React.MutableRefObject<any>;
  minor: React.MutableRefObject<any>;
  year: React.MutableRefObject<any>;
  graduationDate: React.MutableRefObject<any>;
  gender: React.MutableRefObject<any>;
  over18: React.MutableRefObject<any>;
  needBus: React.MutableRefObject<any>;
  skillLevel: React.MutableRefObject<any>;
  skills: React.MutableRefObject<any>;
  interests: React.MutableRefObject<any>;
  links: React.MutableRefObject<any>;
};

function getProfileFromFormData(formData: ProfileFormData, isSubmit?: boolean) {
  return {
    firstName: formData.firstName.current.value,
    lastName: formData.lastName.current.value,
    phoneNumber: formData.phoneNumber.current.value,
    school: formData.school.current.value,
    major: formData.major.current.value,
    minor: formData.minor.current.value,
    year: formData.year.current.value,
    graduationDate: formData.graduationDate.current.value,
    gender: formData.gender.current.value,
    ethnicity: formData.form.current.ethnicity.value,
    over18: formData.over18.current.checked,
    needBus: formData.needBus.current.checked,
    skillLevel: formData.skillLevel.current.value,
    skills: formData.skills.current.value,
    interests: formData.interests.current.value,
    links: formData.links.current.value,
    submit: isSubmit
  };
}

export async function submitProfile(
  e: React.FormEvent<HTMLFormElement>,
  formData: ProfileFormData,
  setSubmitted: Function,
  setError: Function
) {
  e.preventDefault();

  const profile = getProfileFromFormData(formData, true);

  const response = await fetch("/api/profile", {
    method: "PUT",
    body: JSON.stringify(profile),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.status === 200) {
    setSubmitted(true);
  } else {
    const data = await response.json();
    setError(data.error);
  }
}

export async function addResumeUrl(resumeUrl: String) {
  const resumeBody = { resume: resumeUrl };
  await fetch("/api/profile", {
    method: "PUT",
    body: JSON.stringify(resumeBody),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export async function saveProfile(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  formData: ProfileFormData,
  setSaved: Function,
  setError: Function
) {
  e.preventDefault();

  const profile = getProfileFromFormData(formData);

  const response = await fetch("/api/profile", {
    method: "PUT",
    body: JSON.stringify(profile),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.status === 200) {
    setSaved(true);
  } else {
    const data = await response.json();
    setError(data.error);
  }
}
