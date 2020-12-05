import styled from "styled-components";

import Logo from "../assets/logo.png";
import Email from "../assets/email.svg";
import Facebook from "../assets/facebook.svg";
import Instagram from "../assets/instagram.svg";
import Medium from "../assets/medium.svg";
import Twitter from "../assets/twitter.svg";

import { Link } from "../styles";

const Footer = ({ dark }: { dark?: boolean }) => {
  return (
    <Wrapper style={{ background: dark ? "#1D2C3F" : "#fff" }}>
      <Row>
        <SocialColumn>
          <LogoGraphic src={Logo} />
          <SocialLinks>
            <a href="mailto:team@hacksc.com">
              <img src={Email} />
            </a>
            <a href="https://www.facebook.com/hackscofficial/" target="_blank">
              <img src={Facebook} />
            </a>
            <a href="https://www.instagram.com/hackscofficial/" target="_blank">
              <img src={Instagram} />
            </a>
            <a href="https://medium.com/@hacksc" target="_blank">
              <img src={Medium} />
            </a>
            <a href="https://twitter.com/hackscofficial" target="_blank">
              <img src={Twitter} />
            </a>
          </SocialLinks>
          <Copyright>HackSC {new Date().getFullYear()} &copy;</Copyright>
        </SocialColumn>

        <LinksColumn>
          <b>HackSC</b>

          <Links>
            <a href="https://hacksc.com">Overview</a>
            <a
              href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
              target="_blank"
            >
              MLH Code of Conduct
            </a>
          </Links>
        </LinksColumn>

        <ContactColumn>
          <b>Contact us</b>
          <ContactBody>
            Reach out to us at{" "}
            <a href="mailto:team@hacksc.com">team@hacksc.com</a> or on social
            media if you have any questions, want more information, or want to
            talk about sponsorship!
          </ContactBody>
        </ContactColumn>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 64px;
  padding-bottom: 64px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  ${({ theme }) => theme.media.tablet`
    flex-direction: column;
  `}
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.tablet`
    width: 100%;
  `}
`;

const LogoGraphic = styled.img`
  width: 200px;
  margin-bottom: 16px;
`;

const SocialColumn = styled(Column)`
  width: 100%;
  padding: 0 32px;
  box-sizing: border-box;

  ${({ theme }) => theme.media.tablet`
    padding: 0 16px;
  `}
`;

const LinksColumn = styled(Column)`
  width: 100%;
  padding: 0 32px;
  box-sizing: border-box;

  ${({ theme }) => theme.media.tablet`
    margin-top: 32px;
  `}
`;

const ContactColumn = styled(Column)`
  width: 100%;
  padding: 0 32px;
  box-sizing: border-box;

  ${({ theme }) => theme.media.tablet`
    margin-top: 32px;
  `}
`;

const ContactBody = styled.p`
  margin-top: 16px;
`;

const SocialLinks = styled.div`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0 16px;

  a {
    display: inline-flex;
    margin-right: 24px;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  a {
    margin-bottom: 8px;
  }
`;

const Copyright = styled.p`
  font-size: 18px;
  color: #b2b2b2;
  padding-left: 16px;
  margin-top: 24px;
`;

export default Footer;
