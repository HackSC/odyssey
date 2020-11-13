import * as React from "react";
import { Column } from "../styles";
import LinkCard from "./LinkCard";
import styled from "styled-components";
import HackSC from "../assets/socialmedia/hacksc.png";
import Slack from "../assets/socialmedia/slack.svg";
import Devpost from "../assets/socialmedia/devpost.svg";
import MLH from "../assets/socialmedia/mlh.svg";
import Facebook from "../assets/socialmedia/facebook.svg";
import Twitter from "../assets/socialmedia/twitter.svg";
import Instagram from "../assets/socialmedia/instagram.svg";

const LinkScroll: React.FunctionComponent = () => {
  return (
    <Column>
      <h2>Links</h2>
      <LinkCard
        propLink="https://docs.google.com/presentation/d/1_LyuEO9Zjfox9vt5Y7FvhgMkssgUUvsc4OnLW79tCJk/edit?usp=sharing"
        propImg={HackSC}
        propAlt="HackSC"
        propTitle="Opening Slides"
        propText="Missed our opening ceremony? Here's our slides!"
        firstFlexBasis={30}
        secondFlexBasis={70}
      />
      <LinkCard
        propLink="https://hacksc.com/join-slack"
        propImg={Slack}
        propAlt="Slack"
        propTitle="Slack"
        propText="Join our Slack channel to stay up to date."
        firstFlexBasis={30}
        secondFlexBasis={70}
      />
      <LinkCard
        propLink="https://hacksc-2021.devpost.com"
        propImg={Devpost}
        propAlt="Devpost"
        propTitle="Devpost"
        propText="Submit your final project to Devpost."
        firstFlexBasis={30}
        secondFlexBasis={70}
      />
      <LinkCard
        propLink="https://mlh.io"
        propImg={MLH}
        propAlt="MLH"
        propTitle="MLH"
        propText="Read up on MLH guidelines and policies."
        firstFlexBasis={30}
        secondFlexBasis={70}
      />
      <LinkCard
        propLink="https://www.facebook.com/hackscofficial/"
        propImg={Facebook}
        propAlt="Facebook"
        propTitle="Facebook"
        propText="Like our official HackSC Facebook page!"
        firstFlexBasis={30}
        secondFlexBasis={70}
      />
      <LinkCard
        propLink="https://twitter.com/hackscofficial"
        propImg={Twitter}
        propAlt="Twitter"
        propTitle="Twitter"
        propText="Follow our Twitter for live updates."
        firstFlexBasis={30}
        secondFlexBasis={70}
      />
      <LinkCard
        propLink="https://www.instagram.com/hackscofficial/"
        propImg={Instagram}
        propAlt="Instagram"
        propTitle="Instagram"
        propText="Can't be an LA Hackathon without an Instagram."
        firstFlexBasis={30}
        secondFlexBasis={70}
      />
    </Column>
  );
};

export default LinkScroll;
