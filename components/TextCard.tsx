import * as React from "react";
import { TextCardDiv } from "../styles";
import styled from "styled-components";

type Props = {
  propHeader?: string;
  propText?: string;
  propTime?: string;
  firstFlexBasis?: number;
  secondFlexBasis?: number;
};

const TextCard: React.FunctionComponent<Props> = ({
  propHeader = "Announcement Header",
  propText = "Descriptive text...",
  propTime = "Sat 10:00 AM",
  firstFlexBasis = 50,
  secondFlexBasis = 50,
}: Props) => {
  return (
    <TextCardDiv>
      <h3>{propHeader}</h3>
      <p>{propText}</p>
      <AnnouncementTime>{propTime}</AnnouncementTime>
    </TextCardDiv>
  );
};

const AnnouncementTime = styled.p`
  width: 100%;
  display: block;
  margin-top: 0.5rem;
  text-align: right;
  color: #9b9b9b;
`;

export default TextCard;
