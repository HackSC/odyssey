import styled from "styled-components";
import Image from "next/image";

// import Logo from "@/assets/header_logo_21_transparent.png";
import Logo from "@/assets/logo.png";

type Props = {
  text?: string;
};

const DashHeader = ({ text }: Props) => {
  return (
    <Header>
      {text ? (
        <Title>HackSC 2021</Title>
      ) : (
        <LogoWrapper>
          <Image src={Logo} width="220%" height="100%" alt="" />
        </LogoWrapper>
      )}
    </Header>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin: 20px auto;
  width: 100%;
`;

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
