import styled from '@emotion/styled'

const Header = (props) => {
  const { children } = props;

  const MyHeaderBox = styled.div`
  width: 80%;
  height: max-content;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 9px;
`;

  const DroppingBox = styled.div`
width: 100%;
height: max-content;
margin-top: -20px;
margin-bottom: 10px;
background-color: #1A1A1A;
border-radius: 7px;
display: flex;
justify-content: center;
`;

  const InnerDiv = styled.div`
margin: 40px auto;
margin-top: 50px;
width: auto;
`;

  return (
    <MyHeaderBox>
      <DroppingBox>
        <InnerDiv>
          {children}
        </InnerDiv>
      </DroppingBox>
    </MyHeaderBox>
  );
}

export default Header;