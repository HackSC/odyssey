import styled from "styled-components";

const Result = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  height: min-content;

  input[type="text"] {
    border-radius: 8px;
    border: 1px solid #b2b2b2;
    padding: 12px 16px;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.black};
    font-size: 16px;
    flex-grow: 1;
    margin-right: 16px;
    text-transform: uppercase;
  }
`;

const WordBreakH2 = styled.h2`
  word-break: break-all;
`;

const WordBreakP = styled.p`
  word-break: break-all;
`;

const AppReview = ({ review, index = 1 }) => {
  return (
    <Result key={review.id}>
      <WordBreakH2>
        {index}. {review.ReviewedProfile.firstName}{" "}
        {review.ReviewedProfile.lastName}
      </WordBreakH2>
      <WordBreakP>
        <b>Hacker Email: {review.ReviewedProfile.email}</b>
      </WordBreakP>
      <WordBreakP>
        <b>Reviewed By: {review.HackerProfile.email}</b>
      </WordBreakP>
      <WordBreakP>
        <b>Total Score: </b>
        <TanColoredText>
          {review.scoreOne + review.scoreTwo + review.scoreThree}
        </TanColoredText>
      </WordBreakP>
      <WordBreakP>
        <b>Score 1: </b>
        <TanColoredText>{review.scoreOne}</TanColoredText>
      </WordBreakP>
      <WordBreakP>
        <b>Score 2: </b>
        <TanColoredText>{review.scoreTwo}</TanColoredText>
      </WordBreakP>
      <WordBreakP>
        <b>Score 2: </b>
        <TanColoredText>{review.scoreThree}</TanColoredText>
      </WordBreakP>
      <WordBreakP>
        <b>Last Updated: </b>
        {new Date(review.updatedAt)
          .toString()
          .replace("GMT-0800 (Pacific Standard Time)", "PST")}
      </WordBreakP>
      <WordBreakP>
        <b>Created At: </b>
        {new Date(review.createdAt)
          .toString()
          .replace("GMT-0800 (Pacific Standard Time)", "PST")}
      </WordBreakP>
    </Result>
  );
};

const ColoredText = styled.span`
  font-weight: 600;
  font-style: italic;
  padding: 2px;
  padding-right: 4px;
`;

const TanColoredText = styled(ColoredText)`
  background-color: #fadfad;
`;

export default AppReview;
