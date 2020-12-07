import React from "react";
import styled from "styled-components";
import { Column, Flex } from "../styles";

const Hacker = ({ hacker }) => {
  return hacker !== null ? (
    <Result key={Object.entries(hacker).join()}>
      <Flex direction="row">
        <Column flexBasis={65}>
          <h2>
            {hacker.firstName} {hacker.lastName}
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
        </Column>
      </Flex>
    </Result>
  ) : (
    <></>
  );
};

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
