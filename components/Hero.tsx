import styled from "styled-components";

const Hero = () => (
  <Wrapper>
    <h1>Apply to HackSC 2020</h1>

    <p>
      HackSC is the University of Southern California’s largest hackathon. This
      year, we’re focused on bringing real solutions to those in need by pushing
      the boundaries of technology, innovation, and collaboration.
    </p>

    <br />

    <p>
      TODO: Style this landing page with an attractive hero component that
      entices people to sign up and apply
    </p>
  </Wrapper>
);

// TODO: Flesh this out and make it pretty
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 600px;
`;

export default Hero;
