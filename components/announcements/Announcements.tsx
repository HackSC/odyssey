import * as React from "react";
import { Column } from "../../styles";
import CardWheel from "./CardWheel";
import styled from "styled-components";

const Announcements: React.FunctionComponent = () => {
  return (
    <>
      <h2>Announcements</h2>
      <Column>
        <AnnouncementsDiv>
          <CardWheel />
        </AnnouncementsDiv>
        <AnnouncementsFade />
      </Column>
    </>
  );
};

const AnnouncementsDiv = styled.div`
  max-height: 20rem;
  overflow-y: scroll;
  padding-bottom: 2rem;
`;

const AnnouncementsFade = styled.div`
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  pointer-events: none;
  background-images: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    white 90%
  );
  width: 100%;
  max-height: 4rem;
`;

export default Announcements;
