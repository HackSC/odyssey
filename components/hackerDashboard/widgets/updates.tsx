import Image from "next/image";
import styled from "styled-components";

import Logo from "@/assets/hackscFox.png";

const UpdatesWidget = ({ profile, announcements }) => {
  const items = [];
  if (announcements != null) {
    for (let i = announcements.length - 1; i >= 0; i--) {
      const target = announcements[i].target;
      if (target != profile.role) {
        continue;
      }
      const text = announcements[i].text;
      const from = announcements[i].from;
      items.push(
        <UpdateEntry img={Logo} from={from} text={text} target={target} />
      );
    }
  }
  return (
    <div>
      <Header>Announcements</Header>
      <AfterHeader>from Slack</AfterHeader>
      <UpdateList>{items}</UpdateList>
    </div>
  );
};

type UpdateProps = {
  img?: string;
  from: string;
  text: string;
};

const UpdateEntry = (props: Announcement) => {
  const { img, from, text, target } = props;

  return (
    <UpdateItem>
      <UpdateImg>{img && <Image height={45} width={45} src={img} />}</UpdateImg>
      <UpdateInfo>
        <UpdateFrom>{from}</UpdateFrom>
        <UpdateText>{text}</UpdateText>
      </UpdateInfo>
    </UpdateItem>
  );
};

const Header = styled.h2`
  display: inline;
`;

const AfterHeader = styled.h3`
  display: inline;
  margin-left: 6px;
`;

const UpdateList = styled.div`
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  overflow-y: scroll;
`;

const UpdateItem = styled.div`
  border-bottom: 1px solid #4a96f0;
  margin: 16px 0;
  height: 55px;
  display: flex;
  align-items: center;
`;

const UpdateImg = styled.div`
  display: inline-block;
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const UpdateInfo = styled.div`
  margin-left: 20px;
`;

const UpdateFrom = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
`;

const UpdateText = styled.div`
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 1px;
`;

export default UpdatesWidget;
