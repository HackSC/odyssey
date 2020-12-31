import styled from "styled-components";

const Result = styled.div`
  width: auto;
  min-width: 200px;
  background: #ffffff;
  border-radius: 6px;
  margin: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  height: auto;

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
  word-break: break-word;
`;

const WordBreakP = styled.p`
  word-break: break-all;
`;

const AdminReview = ({ admin, index = 1 }) => {
  return (
    <Result key={admin.id}>
      {admin.firstName ? (
        <>
          <WordBreakH2>
            {index}. {admin.firstName} {admin.lastName}
          </WordBreakH2>
          <WordBreakP>
            <b>Email: {admin.email}</b>
          </WordBreakP>
        </>
      ) : (
        <WordBreakH2 style={{ wordBreak: "break-all" }}>
          {index}. {admin.email}
        </WordBreakH2>
      )}
      <WordBreakP>
        <b>
          Review Count: {admin.hacker_reviews ? admin.hacker_reviews.length : 0}
        </b>
      </WordBreakP>
      <WordBreakP>
        <b>Average Score: </b>
        <TanColoredText>
          {admin.hacker_reviews && admin.hacker_reviews.length > 0
            ? Math.round(
                admin.hacker_reviews.reduce(
                  (a, b) => a + b.scoreOne + b.scoreTwo + b.scoreThree,
                  0
                ) / admin.hacker_reviews.length
              )
            : 0}
        </TanColoredText>
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

export default AdminReview;
