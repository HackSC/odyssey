import styled from '@emotion/styled'

const Footer = (props) => {
    const { children } = props;

    const MyFooterBox = styled.div`
  width: 80%;
  height: max-content;
  margin-left: 10%;
  margin-right: 10%;
  padding-top: 40px;
`;

    const DroppingBox = styled.div`
width: 100%;
height: max-content;
margin-bottom: -20px;
margin-top: 10px;
background-color: #1A1A1A;
border-radius: 7px;
display: flex;
justify-content: center;
`;

    const InnerDiv = styled.div`
margin: 20px auto;
margin-bottom: 40px;
width: auto;
color: white;
text-align: center;
`;

    return (
        <MyFooterBox>
            <DroppingBox>
                <InnerDiv>
                    {children}
                </InnerDiv>
            </DroppingBox>
        </MyFooterBox>
    );
}

export default Footer;