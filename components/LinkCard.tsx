import * as React from "react";
import { Flex, Column } from "../styles";
import { Card } from "../styles";
import styled from "styled-components";

type Props = {
  propLink?: string;
  propImg: any;
  propAlt: string;
  propTitle?: string;
  propText?: string;
  firstFlexBasis?: number;
  secondFlexBasis?: number;
};

const LinkCard: React.FunctionComponent<Props> = ({
  propLink = "",
  propTitle = "Title",
  propText = "Descriptive text...",
  firstFlexBasis = 50,
  secondFlexBasis = 50,
  ...props
}: Props) => {
  const { propImg, propAlt } = props;

  return (
    <CardLink href={propLink} target="_blank">
      <MarginedCard>
        <Flex justify="space-between" tabletVertical>
          <MarginedColumn flexBasis={firstFlexBasis}>
            <SMImage src={propImg} alt={propAlt} />
          </MarginedColumn>
          <Column flexBasis={secondFlexBasis}>
            <h3>{propTitle}</h3>
            <p>{propText}</p>
          </Column>
        </Flex>
      </MarginedCard>
    </CardLink>
  );
};

const MarginedColumn = styled(Column)`
  margin: auto;
`;

const MarginedCard = styled(Card)`
  margin-top: 0.5rem;
  text-align: center;
  &:hover {
    transform: translate3D(0, -1px, 0) scale(1.03);
  }
`;

const CardLink = styled.a`
  margin-top: 0.5rem;
`;

const SMImage = styled.img`
  margin-right: 1rem;
  width: 50px;
  height: auto;
`;

export default LinkCard;
