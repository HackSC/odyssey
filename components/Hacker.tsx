import React, { useState } from "react";
import styled from "styled-components";
import { sendSlackMessage, updateProfileStatus } from "../lib";
import { Button, Column, Flex } from "../styles";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useToasts } from "react-toast-notifications";

const Hacker = ({
  hacker,
  index = 1,
  showAcceptButton = false,
  profile = null,
  setAcceptedHackersCallback = null,
  acceptedHackers = [],
}) => {
  const [accepting, setAccepting] = useState(false);
  const [disabled, setDisabled] = useState(
    hacker ? hacker.status !== "submitted" : true
  );
  const { addToast } = useToasts();

  const handleAcceptClicked = async () => {
    setAccepting(true);
    if (profile) {
      let result = await updateProfileStatus(hacker.email, "accepted");
      if (result.status == 200) {
        hacker.status = "accepted";

        // * Call accepted callback
        if (setAcceptedHackersCallback)
          setAcceptedHackersCallback([...acceptedHackers, hacker]);

        // * Disable accept button
        setDisabled(true);

        // * Send slack message
        let firstName = profile ? profile.firstName : "";
        let lastName = profile ? profile.lastName : "";
        let user_email = profile ? profile.email : "";
        let start_and_end_date =
          new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() + "";
        let slack_result = await sendSlackMessage(
          ":bangbang: :white_check_mark: Accepted Hacker (/admin/appLeaderboard) executed by " +
            firstName +
            ", " +
            lastName +
            ", " +
            user_email,
          "Hacker: " +
            hacker.firstName +
            ", " +
            hacker.lastName +
            ", " +
            hacker.email +
            " was accepted",
          start_and_end_date,
          start_and_end_date
        );

        // * Add toast
        addToast("Accepted Hacker!", { appearance: "success" });
      } else {
        addToast("Failed to accept hacker. Error: " + result.statusText, {
          appearance: "error",
        });
      }
    }
    setAccepting(false);
  };

  const showStatus = () =>
    hacker.status === "accepted" ||
    hacker.status === "checkedIn" ||
    hacker.status === "confirmed" ? (
      <GreenColoredText>Accepted</GreenColoredText>
    ) : hacker.status === "rejected" || hacker.status === "declined" ? (
      <RedColoredText>{hacker.status}</RedColoredText>
    ) : hacker.status === "waitlisted" ? (
      <OrangeColoredText>Waitlisted</OrangeColoredText>
    ) : (
      <></>
    );


  return hacker !== null ? (
    <Result key={Object.entries(hacker).join()}>
      <Flex direction="row">
        <Column flexBasis={65}>
          <h2>
            {index}. {hacker.firstName} {hacker.lastName}
          </h2>
          <p>
            <b>E-Mail: </b>
            {hacker.email}
          </p>
          <p>
            <b>School: </b>
            {hacker.school}
          </p>
          <p>
            <b>Year: </b>
            {hacker.year}
          </p>
          <p>
            <b>Graduation Date: </b>
            {hacker.graduationDate}
          </p>
          <p>
            <b>Needs Bus: </b>
            {hacker.needBus ? "True" : "False"}
          </p>
          <p>
            <b>Gender: </b>
            {hacker.gender}
          </p>
          <p>
            <b>Ethnicity: </b>
            {hacker.ethnicity}
          </p>
          <p>
            <b>Status: </b>
            {hacker.status}
          </p>
          <p>
            <b>Role: </b>
            {hacker.role}
          </p>
          <p>
            <b>
              {hacker.qrCodeId === null
                ? "No QR code"
                : `Has a QR code (${hacker.qrCodeId})`}
            </b>
          </p>
        </Column>
        <Column flexBasis={35}>
          {hacker.HackerReviews ? (
            <>
              <p>
                <b>
                  Total Score:{" "}
                  {hacker.HackerReviews.reduce(
                    (a, b) => b.scoreOne + b.scoreTwo + b.scoreThree + a,
                    0
                  )}
                </b>
              </p>
              <p>
                <b>
                  Averaged Score:{" "}
                  {hacker.HackerReviews.reduce(
                    (a, b) => b.scoreOne + b.scoreTwo + b.scoreThree + a,
                    0
                  ) / hacker.HackerReviews.length}
                </b>
              </p>
            </>
          ) : (
            ""
          )}
          {hacker.HackerReviews
            ? hacker.HackerReviews.map((review, index) => (
                <p key={Object.entries(review).join()}>
                  <b>
                    Review #{index} scores: {review.scoreOne}, {review.scoreTwo}
                    , {review.scoreThree}
                  </b>
                </p>
              ))
            : ""}
          <CenteredDiv>
            {showAcceptButton ? (
              !disabled ? (
                accepting ? (
                  <PaddedFlex>
                    <PacmanLoader size={20} color={"#90ee90"} />
                  </PaddedFlex>
                ) : (
                  <AcceptButton
                    disabled={disabled}
                    onClick={(e) => handleAcceptClicked()}
                  >
                    Accept
                  </AcceptButton>
                )
              ) : (
                showStatus()
              )
            ) : (
              <></>
            )}
          </CenteredDiv>
        </Column>
      </Flex>
    </Result>
  ) : (
    <></>
  );
};

const CenteredDiv = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
`;

const ColoredText = styled.div`
  font-weight: 600;
  font-style: italic;
  padding: 2px;
  padding-right: 4px;
`;

const RedColoredText = styled(ColoredText)`
  background-color: #ff9999;
`;

const OrangeColoredText = styled(ColoredText)`
  background-color: #ffc87c;
`;

const GreenColoredText = styled(ColoredText)`
  background-color: #90ee90;
`;

const PaddedFlex = styled(Flex)`
  margin: auto;
  display: flex;
  min-height: 3rem;
`;

const AcceptButton = styled(Button)`
  max-width: 120px;
  font: inherit;
  font-size: 14px !important;
  margin: 10px;
  padding: 10px;
  color: black;
  font-weight: 600 !important;
  outline: none;
  background-color: #90ee90;
  border-radius: 4px;

  &:hover {
    background-color: #98fb98 !important;
    color: black !important;
  }
`;

const Result = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 6px;
  margin-bottom: 12px;
  padding: 18px;
  box-sizing: border-box;

  input[type="text"] {
    border-radius: 8px;
    border: 1px solid #b2b2b2;
    padding: 12px 16px;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.black};
    font-size: 16px;
    flex-grow: 1;
    margin-right: 16px;
    text-transform: uppercase;
  }
`;

export default Hacker;
