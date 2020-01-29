import * as React from "react";
import { Column } from "../../styles";
import CardWheel from "./CardWheel";
import styled from "styled-components";

const Announcements: React.FunctionComponent = () => {
  return (
    <>
      <h2>Announcements</h2>
      <AnnouncementsColumn>
        <AnnouncementsDiv>
          <CardWheel />
        </AnnouncementsDiv>
        <AnnouncementsFade />
      </AnnouncementsColumn>
    </>
  );
};

const AnnouncementsColumn = styled(Column)`
  position: relative;
`;

const AnnouncementsDiv = styled.div`
  max-height: 20rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const AnnouncementsFade = styled.div`
  content: "";
  position: absolute;
  z-index: 1;
  bottom: -1rem;
  left: 0;
  pointer-events: none;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    #f6f6f6 90%
  );
  width: 100%;
  height: 4rem;
`;

export default Announcements;
