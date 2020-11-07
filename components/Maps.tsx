import styled from "styled-components";

const Maps = () => {
  return (
    <Wrapper>
      <Row>
        <Header>Maps</Header>
        <br />
        <Body>
          Below are some helpful maps that will help you navigate around campus
          and this year's hacker space
        </Body>
      </Row>

      <MapRow>
        <Header>Flat</Header>
        <MapImg src="/static/map/FLAT.png" />
      </MapRow>

      <MapRow>
        <Header>Campus</Header>
        <MapImg src="/static/map/CAMPUS.png" />
      </MapRow>

      <MapRow>
        <Header>3D</Header>
        <MapImg src="/static/map/3D.png" />
      </MapRow>

      <div
        style={{
          paddingBottom: 100,
        }}
      />
    </Wrapper>
  );
};

const Body = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 24px;
`;

const Header = styled.h1`
  font-weight: 700;
  font-size: 48px;
  line-height: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 93.75%;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
`;

const MapRow = styled(Row)`
  margin-top: 48px;
  text-align: center;
`;

const MapImg = styled.img`
  width: 100%;
  border: 8px solid #ff8379;
  box-sizing: border-box;
  border-radius: 2px;
`;

export default Maps;
