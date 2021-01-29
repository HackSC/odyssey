import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import { Form } from "../styles";
import Select from "../components/Select";
import Router from "next/router";
import ChevronGraphic from "../assets/chevron-left.png";

import SuggestedHackers from "../components/SuggestedHackers";

import { getProfileSuggestions } from "../lib/matching";

const SuggestionSlide = ({ color, type, prev }) => {
  const [suggestions, setSuggestions] = useState(null);

  useEffect(() => {
    async function getSuggestions() {
      const profileSuggestions = getProfileSuggestions(type);
      return profileSuggestions;
    }
    getSuggestions().then((result) => {
      setSuggestions(result);
    });
  }, []);

  return (
    <Instructions>
      <Back onClick={prev}>
        <img src={ChevronGraphic} style={{ width: "20px" }} />
      </Back>
      <Header2>
        <Heading>
          3 <Name>View your matches</Name>
        </Heading>
        <Subheading>
          view your potential matches and connect with any of your matches
        </Subheading>
        <SuggestedHackers hackers={suggestions} type={color} />
      </Header2>
      <NextButton onClick={() => Router.push("/dashboard")}>done</NextButton>
    </Instructions>
  );
};

const Profile = ({ profile, req }) => {
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [school, setSchool] = useState(profile.school);
  const [major, setMajor] = useState(profile.major);
  const [year, setYear] = useState(profile.year);
  const [igUrl, setIgUrl] = useState(
    profile.instagram ? profile.instagram : ""
  );
  const [liUrl, setLiUrl] = useState(
    profile.portfolioUrl ? profile.portfolioUrl : ""
  );
  const [bio, setBio] = useState(profile.bio ? profile.bio : "");

  const [type, setType] = useState("");
  const [color, setColor] = useState("");

  const next = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const instructions = [
    {
      heading: "Complete your profile.",
      details:
        "The more we know about you, the better we can match you! Some text about how to complete the profile.",
    },
    {
      heading: "Choose your type of match.",
      details:
        "Use our theme this year, Connectivity, to find new friends, initiate a romantic interest, or connect with an industry expert.",
    },
    {
      heading: "View your matches and connect!",
      details:
        "We'll provide you with a list of potential matches and you'll get the chance to schedule a chat!",
    },
  ];

  // Used for select inputs
  const yearOptions = [
    { label: "Freshman", value: "freshman" },
    { label: "Sophomore", value: "sophomore" },
    { label: "Junior", value: "junior" },
    { label: "Senior", value: "senior" },
    { label: "Graduate", value: "graduate" },
  ];

  const updateProfile = useCallback(
    async (
      fName: string,
      lName: string,
      s: string,
      m: string,
      y: any,
      ig: string,
      li: string,
      bio: string
    ) => {
      const response = await fetch("/api/profile/updateProfile", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          firstName: fName,
          lastName: lName,
          school: s,
          major: m,
          year: y,
          instagram: ig,
          portfolioUrl: li,
          bio: bio,
        }),
      });
      return response.status === 200;
    },
    []
  );

  return (
    <Container>
      {step === 0 ? (
        <Instructions>
          <Header>
            <Heading>
              hey there, <Name> {profile.firstName}</Name>
            </Heading>
            <Subheading>here's how profile matching works</Subheading>
          </Header>
          {instructions.map((item, index) => (
            <Step>
              <Number>{index + 1}</Number>
              <StepInfo>
                <StepHeading>{item.heading}</StepHeading>
                <StepDetails>{item.details}</StepDetails>
              </StepInfo>
            </Step>
          ))}
          <NextButton onClick={next}>get started</NextButton>
        </Instructions>
      ) : (
        <div />
      )}
      {step === 1 ? (
        <Instructions>
          <Back onClick={prev}>
            <img src={ChevronGraphic} style={{ width: "20px" }} />
          </Back>
          <Header2>
            <Heading>
              1 <Name> Complete your profile</Name>
            </Heading>
            <Subheading>
              the more we know, the better we can match you!
            </Subheading>
          </Header2>
          <ProfileCard>
            <LineInput
              type="text"
              placeholder="First Name"
              name="first-name"
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <LineInput
              type="text"
              placeholder="Last Name"
              name="last-name"
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <LineInput
              type="text"
              placeholder="Current School"
              name="school"
              required
              value={school}
              onChange={(e) => {
                setSchool(e.target.value);
              }}
            />
            <LineInput
              type="text"
              placeholder="Major(s)"
              name="major"
              required
              value={major}
              onChange={(e) => {
                setMajor(e.target.value);
              }}
            />
            {year ? (
              <CustomForm>
                <Select
                  name="year"
                  options={yearOptions}
                  defaultValue={year}
                  required
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
              </CustomForm>
            ) : (
              <UnselectedCustomForm>
                <Select
                  name="year"
                  options={yearOptions}
                  defaultValue={year}
                  required
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
              </UnselectedCustomForm>
            )}

            <LineInput
              type="text"
              placeholder="Instagram URL"
              name="instagram"
              value={igUrl}
              onChange={(e) => {
                setIgUrl(e.target.value);
              }}
            />
            <LineInput
              type="text"
              placeholder="LinkedIn URL"
              name="linkedIn"
              value={liUrl}
              onChange={(e) => {
                setLiUrl(e.target.value);
              }}
            />

            <Bio>
              <BioTitle>Enter a bio</BioTitle>
              <LongInput
                placeholder=""
                name="bio"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />
            </Bio>
          </ProfileCard>
          <NextButton
            onClick={() => {
              next();
              updateProfile(
                firstName,
                lastName,
                school,
                major,
                year,
                igUrl,
                liUrl,
                bio
              );
            }}
          >
            next
          </NextButton>
        </Instructions>
      ) : (
        <div />
      )}
      {step === 2 ? (
        <Instructions>
          <Back onClick={prev}>
            <img src={ChevronGraphic} style={{ width: "20px" }} />
          </Back>
          <Header2>
            <Heading>
              2 <Name>Choose your match</Name>
            </Heading>
            <Subheading>
              find new friends, initiate a romantic interest, or connect with an
              industry expert
            </Subheading>
          </Header2>
          <MatchChoice>
            <MatchTitle style={{ color: "#FF8379" }}>romantic</MatchTitle>
            <MatchDetails>
              <MatchDescription>
                Some description about finding love at a hackathon.
              </MatchDescription>
              <MatchButton
                style={{ background: "#FF8379" }}
                onClick={() => {
                  setColor("#FF8379");
                  setType("romantic");
                  next();
                }}
              >
                find me love
              </MatchButton>
            </MatchDetails>
          </MatchChoice>
          <MatchChoice>
            <MatchTitle style={{ color: "#94c5ff" }}>friend</MatchTitle>
            <MatchDetails>
              <MatchDescription>
                Some description about finding friends.
              </MatchDescription>
              <MatchButton
                style={{ background: "#94c5ff" }}
                onClick={() => {
                  setColor("#94c5ff");
                  setType("friend");
                  next();
                }}
              >
                find me a friend
              </MatchButton>
            </MatchDetails>
          </MatchChoice>
          <MatchChoice>
            <MatchTitle style={{ color: "rgba(77, 180, 100, 0.56)" }}>
              industry connection
            </MatchTitle>
            <MatchDetails>
              <MatchDescription>
                Some description about finding industry people.
              </MatchDescription>
              <MatchButton
                style={{ background: "rgba(77, 180, 100, 0.56)" }}
                onClick={() => {
                  setColor("rgba(77, 180, 100, 0.56)");
                  setType("industry");
                  next();
                }}
              >
                find me a cool connection
              </MatchButton>
            </MatchDetails>
          </MatchChoice>
        </Instructions>
      ) : (
        <div />
      )}
      {step === 3 ? (
        <SuggestionSlide type={type} color={color} prev={prev} />
      ) : (
        <div />
      )}
    </Container>
  );
};

export async function getServerSideProps({ req }) {
  const profile = await getProfile(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  return {
    props: {
      profile,
    },
  };
}

const Container = styled.div`
  background-color: #1d2c3f;
`;

const Back = styled.button`
  position: absolute;
  top: 60px;
  left: 5vw;
  background: none;
  border: none;
  outline: none;
`;

const Instructions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.p`
  font-weight: 500;
  // color: ${({ theme }) => theme.colors.peach};
  color: white;
  font-size: 44px;
  line-height: 52px;
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
`;

const Name = styled.p`
  font-weight: 500;
  // color: ${({ theme }) => theme.colors.peach};
  color: #4a96f0;
  font-size: 44px;
  line-height: 52px;
  padding-left: 10px;
`;

const Subheading = styled.div`
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 1px;
  color: #656f7b;
`;

const Step = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

const Number = styled.p`
  // color: ${({ theme }) => theme.colors.peach};
  color: #4a96f0;
  font-weight: 500;
  font-size: 60px;
  line-height: 80px;
  letter-spacing: 1px;
`;

const StepInfo = styled.div`
  // background: white;
  background: #28303a;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25),
    inset 0px 4px 4px rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  padding: 20px;
  width: 55vw;
  max-width: 500px;
  margin-left: 20px;
`;

const StepHeading = styled.p`
  font-style: normal;
  font-weight: 500px;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 1px;
  // color: #656f7b;
  color: white;
  padding-bottom: 10px;
`;

const StepDetails = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 1px;
  // color: #656f7b;
  color: #828282;
`;

const NextButton = styled.button`
  margin: 50px 0px 50px 0px;
  // background: ${({ theme }) => theme.colors.peach};
  background: #4a96f0;
  color: white;
  border-radius: 10px;
  width: 20vw;
  max-width: 300px;
  min-width: 150px;
  height: 35px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 1px;
  border: none;
`;

const Header2 = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  width: 55vw;
`;

const MatchChoice = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  justify-content: space-between;
  padding-bottom: 30px;
  align-items: center;
`;

const MatchTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 52px;
  letter-spacing: 1px;
`;

const MatchButton = styled.button`
  color: white;
  border-radius: 10px;
  padding: 10px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 1px;
  color: white;
  border: none;
  align-self: center;
  margin-top: 15px;
`;

const MatchDetails = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25),
    inset 0px 4px 4px rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  width: 40vw;
  max-width: 500px;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const MatchDescription = styled.p`
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 1px;
  // color: #656f7b;
  color: white;
`;

const ProfileCard = styled.div`
  width: 55vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 20px 20px 20px;
`;

const LineInput = styled.input`
  background: #1d2c3f;
  border: none;
  border-bottom: 1px solid #c4c4c4;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 1px;
  color: white;
  width: 50vw;
  padding: 30px 10px 10px 10px;

  &:focus {
    outline: none;
    // border-bottom: 1px solid ${({ theme }) => theme.colors.peach};
    border-bottom: 1px solid #4a96f0;
  }
`;

const Bio = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  margin-top: 30px;
`;

const BioTitle = styled.div`
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 1px;
  // color: #656f78;
  color: #828282;
  width: 60px;
  padding-right: 20px;
`;

const LongInput = styled.textarea`
  font-family: Arial;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 10px;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 1px;
  color: #656f7b;
  width: 43vw;
  height: 60px;
  padding: 10px;
  resize: none;
`;

const CustomForm = styled(Form)`
  margin-top: 30px;
  width: 150px;
  align-self: flex-start;

  select {
    // background-color: ${({ theme }) => theme.colors.peach};
    background-color: #4a96f0;
    color: white;
  }
`;

const UnselectedCustomForm = styled(Form)`
  margin-top: 30px;
  width: 150px;
  align-self: flex-start;

  select {
    background-color: #ffcac6;
    color: white;
  }
`;

export default Profile;
