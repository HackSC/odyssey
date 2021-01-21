import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  sendSlackMessage,
  updateProfileStatus,
  getHackathonConstants,
} from "../lib";
import { Button, Column, Flex, Form, FormGroup, TitleBox } from "../styles";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useToasts } from "react-toast-notifications";
import Modal from "./Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Hacker = ({
  hacker,
  index = 1,
  showAcceptButton = false,
  showRejectButton = false,
  showWaitlistButton = false,
  profile = null,
  setAcceptedHackersCallback = null,
  setRejectedHackersCallback = null,
  setWaitlistedHackersCallback = null,
  acceptedHackers = [],
  rejectedHackers = [],
  waitlistedHackers = [],
  hackathonConstants = [],
}) => {
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [waitlisting, setWaitlisting] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [currAction, setCurrAction] = useState("");

  const [disabled, setDisabled] = useState(
    hacker ? hacker.status !== "submitted" : true
  );
  const { addToast } = useToasts();

  const confirm = async () => {
    if (currAction === "Accept") {
      handleAcceptClicked();
    } else if (currAction === "Waitlist") {
      handleWaitlistClicked();
    } else if (currAction === "Reject") {
      handleRejectClicked();
    }
    setCurrAction("");
    setShowSecretModal(false);
  };
  const handleAcceptClicked = async () => {
    if (currAction === "Accept") {
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
    } else {
      setCurrAction("Accept");
      setShowSecretModal(true);
    }
  };

  const handleRejectClicked = async () => {
    if (currAction === "Reject") {
      setRejecting(true);
      if (profile) {
        let result = await updateProfileStatus(hacker.email, "rejected");
        if (result.status == 200) {
          hacker.status = "rejected";

          // * Call accepted callback
          if (setRejectedHackersCallback)
            setRejectedHackersCallback([...rejectedHackers, hacker]);

          // * Disable action buttons
          setDisabled(true);

          // * Send slack message
          let firstName = profile ? profile.firstName : "";
          let lastName = profile ? profile.lastName : "";
          let user_email = profile ? profile.email : "";
          let start_and_end_date =
            new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() + "";
          let slack_result = await sendSlackMessage(
            ":bangbang: :x: Rejected Hacker (/admin/appLeaderboard) executed by " +
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
              " was rejected",
            start_and_end_date,
            start_and_end_date
          );

          // * Add toast
          addToast("Rejected Hacker!", { appearance: "success" });
        } else {
          addToast("Failed to reject hacker. Error: " + result.statusText, {
            appearance: "error",
          });
        }
      }
      setRejecting(false);
    } else {
      setCurrAction("Reject");
      setShowSecretModal(true);
    }
  };

  const handleWaitlistClicked = async () => {
    if (currAction === "Waitlist") {
      setWaitlisting(true);
      if (profile) {
        let result = await updateProfileStatus(hacker.email, "waitlisted");
        if (result.status == 200) {
          hacker.status = "waitlisted";

          // * Call accepted callback
          if (setWaitlistedHackersCallback)
            setWaitlistedHackersCallback([...waitlistedHackers, hacker]);

          // * Disable action buttons
          setDisabled(true);

          // * Send slack message
          let firstName = profile ? profile.firstName : "";
          let lastName = profile ? profile.lastName : "";
          let user_email = profile ? profile.email : "";
          let start_and_end_date =
            new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() + "";
          let slack_result = await sendSlackMessage(
            ":bangbang: :page_with_curl: Waitlisted Hacker (/admin/appLeaderboard) executed by " +
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
              " was waitlisted.",
            start_and_end_date,
            start_and_end_date
          );

          // * Add toast
          addToast("Waitlisted Hacker!", { appearance: "success" });
        } else {
          addToast("Failed to waitlist hacker. Error: " + result.statusText, {
            appearance: "error",
          });
        }
      }
      setWaitlisting(false);
    } else {
      setCurrAction("Waitlist");
      setShowSecretModal(true);
    }
  };

  const showStatus = () =>
    hacker.status === "accepted" ||
    hacker.status === "checkedIn" ||
    hacker.status === "confirmed" ? (
      <GreenColoredText>accepted</GreenColoredText>
    ) : hacker.status === "rejected" || hacker.status === "declined" ? (
      <RedColoredText>{hacker.status}</RedColoredText>
    ) : hacker.status === "waitlisted" ? (
      <OrangeColoredText>waitlisted</OrangeColoredText>
    ) : (
      <GreyColoredText>{hacker.status}</GreyColoredText>
    );

  return hacker !== null ? (
    <Result key={Object.entries(hacker).join()}>
      <h2 style={{ wordBreak: "break-all" }}>
        {index}. {hacker.firstName} {hacker.lastName}
      </h2>
      <Flex direction="row" style={{ flexWrap: "wrap" }}>
        <Modal
          visible={showSecretModal}
          style={{
            minHeight: "auto",
            backgroundColor: "white",
            color: "black",
            borderColor: "#ff8379",
            borderStyle: "solid",
            borderWidth: "6px",
            borderRadius: "6px",
          }}
        >
          <Form>
            <TitleFlex direction="row">
              <OnePaddedH1>Verify secret phrase to confirm</OnePaddedH1>
              <DevModeButton onClick={() => setShowSecretModal(false)}>
                <AiOutlineCloseCircle size={"2rem"} />
              </DevModeButton>
            </TitleFlex>
            <Flex
              direction="row"
              style={{ flexWrap: "wrap" }}
              justify="space-between"
            >
              <Column flexBasis={46} style={{ margin: "auto" }}>
                <FullButton
                  style={{ backgroundColor: "#ffc87c" }}
                  onClick={() => confirm()}
                >
                  {currAction}
                </FullButton>
              </Column>

              <Column flexBasis={46}>
                <FullButton onClick={(e) => setShowSecretModal(false)}>
                  Close
                </FullButton>
              </Column>
            </Flex>
          </Form>
        </Modal>
        <Column flexBasis={65}>
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
          {hackathonConstants.find((constant) => constant.name === "needsBus")
            ?.boolean ? (
            <p>
              <b>Needs Bus: </b>
              {hacker.needBus ? "True" : "False"}
            </p>
          ) : (
            ""
          )}
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
            <span style={{ width: "min-content" }}>{showStatus()}</span>
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
                    Review #{index + 1} scores: {review.scoreOne},{" "}
                    {review.scoreTwo}, {review.scoreThree}
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
          <CenteredDiv>
            {showWaitlistButton ? (
              !disabled ? (
                waitlisting ? (
                  <PaddedFlex>
                    <PacmanLoader size={20} color={"#e97451"} />
                  </PaddedFlex>
                ) : (
                  <WaitlistButton
                    disabled={disabled}
                    onClick={(e) => handleWaitlistClicked()}
                  >
                    Waitlist
                  </WaitlistButton>
                )
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </CenteredDiv>
          <CenteredDiv>
            {showRejectButton ? (
              !disabled ? (
                rejecting ? (
                  <PaddedFlex>
                    <PacmanLoader size={20} color={"#e97451"} />
                  </PaddedFlex>
                ) : (
                  <RejectButton
                    disabled={disabled}
                    onClick={(e) => handleRejectClicked()}
                  >
                    Reject
                  </RejectButton>
                )
              ) : (
                <></>
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

Hacker.getInitialProps = async ({ req }) => {
  const hackathonConstants = await getHackathonConstants();

  return {
    hackathonConstants,
  };
};

const OnePaddedH1 = styled.h2`
  margin: auto 0;
  padding: 0 1rem 0 0;
`;

const TitleFlex = styled(Flex)`
  width: 100%;
  min-height: 3rem;
  margin: 0 0 1rem 0;
`;

const FullButton = styled(Button)`
  width: -webkit-fill-available;
`;

const CenteredDiv = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
`;

const ColoredText = styled.span`
  font-weight: 600;
  font-style: italic;
  padding: 2px;
  padding-right: 4px;
`;

const DevModeButton = styled(Button)`
  margin: 0 0 0 auto;
  height: min-content;
  width: min-content;
  padding: 0;
  color: black;
  outline: none;
  background-color: white;

  &:hover {
    background-color: #ff8379 !important;
    color: white !important;
  }
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

const GreyColoredText = styled(ColoredText)`
  background-color: #dcdcdc;
`;

const PaddedFlex = styled(Flex)`
  margin: auto;
  display: flex;
  min-height: 3rem;
`;

const RejectButton = styled(Button)`
  max-width: 120px;
  font: inherit;
  font-size: 14px !important;
  margin: 10px;
  padding: 10px;
  color: black;
  font-weight: 600 !important;
  outline: none;
  background-color: #e97451;
  border-radius: 4px;

  &:hover {
    background-color: #ff6e4a !important;
    color: black !important;
  }
`;

const WaitlistButton = styled(Button)`
  max-width: 120px;
  font: inherit;
  font-size: 14px !important;
  margin: 10px;
  padding: 10px;
  color: black;
  font-weight: 600 !important;
  outline: none;
  background-color: #ffae42;
  border-radius: 4px;

  &:hover {
    background-color: #ffb347 !important;
    color: black !important;
  }
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
