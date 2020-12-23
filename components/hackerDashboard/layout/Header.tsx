import styled from "styled-components";

type Props = {
  text?: string;
};

const DashHeader = ({ text }: Props) => {
  return (
    <Header>
      <Title> {text || "HackSC 2021"} </Title>
    </Header>
  );
};

const Header = styled.div`
  display: grid;
  grid-area: Header;
  background: #1d2c3f;
`;

const Title = styled.h1`
  color: #ffffff;
  text-align: center;
  align-self: center;
  padding: 0;
  margin: 0 auto;
`;

export default DashHeader;
