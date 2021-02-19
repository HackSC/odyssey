import styled from "styled-components";

const PrizesWidget = ({ prizes }) => {
  return (
    <Wrapper>
      {prizes &&
        prizes.map((prize) => {
          if (prize.sponsor.toLowerCase() === "hacksc") {
            return (
              <ResourceWrapper key={prize.title}>
                <img height={300} src={prize.image_url} />
                <ResourceBlurb>
                  <ResourceTitle>{prize.title}</ResourceTitle>
                  <ResourceDescription>
                    Provided by HackSC for all Verticals. {prize.description}
                  </ResourceDescription>
                </ResourceBlurb>
              </ResourceWrapper>
            );
          } else {
            return (
              <ResourceWrapper key={prize.title}>
                <ResourceImageWrapper>
                  <ResourceImage src={prize.image_url} />
                </ResourceImageWrapper>
                <ResourceBlurb>
                  <ResourceTitle>{prize.name}</ResourceTitle>
                  <ResourceDescription>{prize.description}</ResourceDescription>
                  <Button href={prize.sponsor_url}>
                    Visit {prize.sponsor}
                  </Button>
                </ResourceBlurb>
              </ResourceWrapper>
            );
          }
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 600px;
  overflow-y: scroll;
  overflow-x: auto;
`;

const ResourceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 20px;
`;

const HackSCWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 20px;
`;

const ResourceImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 20vw;
  min-width: 300px;
  max-width: 350px;
  height: 10vh;
  max-height: 144px;
  min-height: 120px;
  border-radius: 15px 15px 0px 0px;
`;

const ResourceImage = styled.img`
  max-height: 120px;
  max-width: 250px;
`;

const ResourceBlurb = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #28303a;
  border-radius: 15px;
  height: 225px;
  width: calc(20vw - 30px);
  min-width: 270px;
  max-width: 320px;
  border-radius: 0px 0px 15px 15px;
  padding: 15px;
  overflow-y: auto;
  overflow-x: auto;
  flex: 1;
`;

const ResourceTitle = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  letter-spacing: 1px;
  color: #ffffff;
`;

const ResourceDescription = styled.p`
  padding-top: 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`;

const Button = styled.a`
  background: #4a96f0;
  border-radius: 10px;
  width: 7vw;
  max-width: 300px;
  min-width: 200px;
  margin-top: 10px;
  margin-bottom: 0px;
  align-self: center;
  padding-top: 8px;
  padding-bottom: 5px;

  color: white;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  text-align: center;
  letter-spacing: 1px;
`;

export default PrizesWidget;
