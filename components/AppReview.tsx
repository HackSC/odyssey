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

const AppReview = ({ review }) => {
  return (
    <Result key={review.id}>
      <WordBreakH2>{review.hackerId}</WordBreakH2>
      <WordBreakP>
        <b>Total Score: </b>
        {review.scoreOne + review.scoreTwo + review.scoreThree}
      </WordBreakP>
      <WordBreakP>
        <b>Score 1: </b>
        {review.scoreOne}
      </WordBreakP>
      <WordBreakP>
        <b>Score 2: </b>
        {review.scoreTwo}
      </WordBreakP>
      <WordBreakP>
        <b>Score 2: </b>
        {review.scoreThree}
      </WordBreakP>
      <WordBreakP>
        <b>Last Updated: </b>
        {review.updatedAt}
      </WordBreakP>
      <WordBreakP>
        <b>Created At: </b>
        {review.createdAt}
      </WordBreakP>
      <WordBreakP>
        <b>Created By: </b>
        {review.createdBy}
      </WordBreakP>
    </Result>
  );
};

export default AppReview;
