import styled from "styled-components";

const ResourcesWidget = ({ resources }) => {
  return (
    <Wrapper>
      {resources.map((resource) => 
        <ResourceWrapper>
            <ResourceImageWrapper>
                <ResourceImage src={resource.image_url} />
            </ResourceImageWrapper>
            <ResourceBlurb>
                <ResourceTitle>{resource.name}</ResourceTitle>
                <ResourceDescription>{resource.description}</ResourceDescription>
                {resource.links.map((link) => 
                    <Button href={link.linke}>{link.name}</Button>
                )}
                <Button href={resource.slack_channel}>Join Slack Channel</Button>
            </ResourceBlurb>
        </ResourceWrapper>
    )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-height: 600px;
    overflow: scroll;
`;

const ResourceWrapper = styled.div`
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
    background-color: #28303A;
    border-radius: 15px;
    height: 225px;
    width: calc(20vw - 30px);
    min-width: 270px;
    max-width: 320px;
    border-radius: 0px 0px 15px 15px;
    padding: 15px;
    overflow: scroll;
`;

const ResourceTitle = styled.p`
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    letter-spacing: 1px;

    color: #FFFFFF;
`;

const ResourceDescription = styled.p`
    padding-top: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
`;

const Button = styled.a`
    background: #4A96F0;
    border-radius: 10px;
    width: 7vw;
    max-width: 300px;
    min-width: 200px;;
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

export default ResourcesWidget;
