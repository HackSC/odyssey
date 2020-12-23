import styled from "styled-components";
import FooterComp from "../Footer";

const Footer = () => (
  <FooterContainer>
    <FooterComp dark={true} />
  </FooterContainer>
);

const FooterContainer = styled.div`
  display: grid;
  grid-area: Footer;
  height: 100%;
  background: #1d2c3f;
`;

export default Footer;
