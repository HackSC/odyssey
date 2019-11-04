import React, { useEffect } from "react";

import styled from "styled-components";

import * as THREE from "three";
import SimplexNoise from "simplex-noise";

import Blob from "./Blob";
import { Flex, Column } from "../styles";

const Hero = () => {
  return (
    <Wrapper>
      <Flex align="center" tabletVertical>
        <Column flexBasis={60}>
          <Blob />
        </Column>

        <Column flexBasis={38}>
          <h1>Apply to HackSC</h1>

          <p>
            HackSC is the University of Southern California’s largest hackathon.
            This year, we’re focused on bringing real solutions to those in need
            by pushing the boundaries of technology, innovation, and
            collaboration.
          </p>

          <GetStartedLink href="/auth/login">Get Started</GetStartedLink>
        </Column>
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 600px;

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.large};

    ${({ theme }) =>
      theme.media.tablet`
      margin-top: 32px;
    `}
  }

  p {
    line-height: 28px;
  }
`;

const GetStartedLink = styled.a`
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.peach};
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSizes.regular};
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  margin-top: 16px;
  display: inline-block;
`;

export default Hero;
