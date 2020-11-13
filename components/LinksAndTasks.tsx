import styled from "styled-components";

import HackSC from "../assets/socialmedia/hacksc.png";
import Slack from "../assets/socialmedia/slack.svg";
import Devpost from "../assets/socialmedia/devpost.svg";
import MLH from "../assets/socialmedia/mlh.svg";
import Facebook from "../assets/socialmedia/facebook.svg";
import Twitter from "../assets/socialmedia/twitter.svg";
import Instagram from "../assets/socialmedia/instagram.svg";

import { Body } from "./type";
import TaskBreakdown from "./TaskBreakdown";

const LinksAndTasks = () => {
  return (
    <Wrapper>
      <Row>
        <LinksCol>
          <Header>Helpful Links</Header>

          <Links>
            <Link
              href="https://docs.google.com/presentation/d/1_LyuEO9Zjfox9vt5Y7FvhgMkssgUUvsc4OnLW79tCJk/edit?usp=sharing"
              target="_blank"
            >
              <img src={Slack} />

              <LinkDescription>
                <h2>Slack</h2>
                <p>Join our Slack channel to stay up to date</p>
              </LinkDescription>
            </Link>

            <Link href="https://hacksc-2021.devpost.com/" target="_blank">
              <img src={Devpost} />

              <LinkDescription>
                <h2>Devpost</h2>
                <p>Submit your final project to Devpost</p>
              </LinkDescription>
            </Link>

            <Link href="https://mlh.io/" target="_blank">
              <img src={MLH} />

              <LinkDescription>
                <h2>MLH</h2>
                <p>Read up on MLH guidelines and policies</p>
              </LinkDescription>
            </Link>

            <Link
              href="https://www.facebook.com/hackscofficial/"
              target="_blank"
            >
              <img src={Facebook} />

              <LinkDescription>
                <h2>Facebook</h2>
                <p>Like us on Facebook!</p>
              </LinkDescription>
            </Link>

            <Link href="https://twitter.com/hackscofficial" target="_blank">
              <img src={Twitter} />

              <LinkDescription>
                <h2>Twitter</h2>
                <p>Follow us on Twitter!</p>
              </LinkDescription>
            </Link>

            <Link
              href="https://www.instagram.com/hackscofficial/"
              target="_blank"
            >
              <img src={Instagram} />

              <LinkDescription>
                <h2>Instagram</h2>
                <p>Can't be an LA hackathon without an Instagram</p>
              </LinkDescription>
            </Link>
          </Links>
        </LinksCol>

        <TaskCol>
          <Header>Hacker Pass Breakdown</Header>
          <Body>
            This year's HackSC features a hacker pass that allows hackers to
            receive prizes and raffle tickets for engaging and participating in
            HackSC events.
          </Body>

          <Body>
            Get your Hacker Code scanned by volunteers and sponsors to gain
            points! Below is a full breakdown of tasks you can complete, and how
            many points they are worth.
          </Body>

          <TaskBreakdown />
        </TaskCol>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 93.75%;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  padding: 48px 0;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${({ theme }) => theme.media.tablet`
    flex-direction: column;
  `}
`;

const LinksCol = styled.div`
  flex-basis: 35%;
`;

const TaskCol = styled.div`
  flex-basis: 63%;
`;

const Header = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 60px;
  text-transform: uppercase;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled.a`
  border: 1px solid #cfcfcf;
  background: white;
  z-index: 999;
  border-radius: 4px;
  padding: 1.5rem 1.5rem;
  margin-top: 0.75rem;
  color: #5f5f5f;
  width: 100%;
  box-sizing: border-box;

  display: flex;

  img {
    width: 20%;
    height: 20%;
  }

  &:hover {
    transform: translate3D(0, -1px, 0) scale(1.03);
  }
`;

const LinkDescription = styled.div`
  flex-grow: 1;
  padding-left: 18px;

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }
`;

export default LinksAndTasks;
