import * as React from "react";
import styled from "styled-components";
import { Flex, Column } from "../../styles";

const ConfirmedStep: React.FunctionComponent = () => {
  return (
    <Flex justify="space-between" tabletVertical>
      <SadNewsColumn flexBasis={100}>
        <LateTitle>Sorry! Applications have closed. </LateTitle>

        <SadNews>
          {" "}
          We occasionally accept more applications closer to the hackathon, so
          be sure to follow us on{" "}
          <a href="https://twitter.com/hackscofficial" target="_blank">
            Twitter
          </a>{" "}
          to stay up-to-date.
        </SadNews>
      </SadNewsColumn>
    </Flex>
  );
};

const SadNewsColumn = styled(Column)`
  padding: 64px 0;

  ${({ theme }) =>
    theme.media.tablet`
    margin-top: 32px;
    text-align: center;
  `}
`;

const QRCodeCaption = styled.p`
  margin-top: 16px;
  text-align: center;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
`;

const LateTitle = styled.h2`
  text-align: center;
`;

const SadNews = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 300;
`;

export default ConfirmedStep;
