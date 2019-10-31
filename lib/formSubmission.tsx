import React from "react";

export type ProfileFormData = {
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

export async function submitProfile(
  e: React.FormEvent<HTMLFormElement>,
  formData: ProfileFormData
) {
  e.preventDefault();
  console.log(formData);
}

export async function saveProfile(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  formData: ProfileFormData,
  setSaved: Function
) {
  e.preventDefault();

  const profile = {
    firstName: formData.firstName.current.value,
    lastName: formData.lastName.current.value,
    phoneNumber: formData.phoneNumber.current.value,
    school: formData.school.current.value,
    major: formData.major.current.value,
    minor: formData.minor.current.value,
    year: formData.school.current.value,
    graduationDate: formData.graduationDate.current.value,
    gender: formData.gender.current.value,
    over18: formData.over18.current.value,
    needBus: formData.needBus.current.value,
    skillLevel: formData.skillLevel.current.value,
    skills: formData.skills.current.value,
    interests: formData.interests.current.value,
    links: formData.links.current.value
  };

  const response = await fetch("/api/profile", {
    method: "PUT",
    body: JSON.stringify(profile),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  setSaved(true);
}
