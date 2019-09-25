import styled from '@emotion/styled'

const ContentBlockWide = (props) => {
    const { children } = props;
    const MyStyledDiv = styled.div`
    width: 100%;
    height: max-content;
    margin-top: 30px;
    text-align: center;
    display: flex;
    justify-content: center;
    `;
    const InnerDiv = styled.div`
    width: 80%;
    height: 100%;
    color: white;
    border-radius: 7px;
    margin: 0 auto;
    padding-bottom: 20px;
    background-color: #FEA645;
    `;

    return (
        <MyStyledDiv>
            <InnerDiv>
                {children}
            </InnerDiv>
        </MyStyledDiv>
    );
}

export default ContentBlockWide;