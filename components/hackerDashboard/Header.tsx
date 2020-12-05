import styled from "styled-components";

const DashHeader = () => {
  return (
    <Header>
      <Title> HackSC 2021 </Title>
    </Header>
  );
};

const Header = styled.div`
  display: grid;
  grid-area: Header;
  border-bottom: 1px solid white;
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
