import styled from "styled-components";

const resources = [
    {
        title: "Vercel", 
        imageUrl: "https://logovtor.com/wp-content/uploads/2020/10/vercel-inc-logo-vector.png",
        description: "Vercel combines the best development experience with obsessive focus on end-user performance. our platform enables frontend teams to do their best work.",
        slackChannel: "https://www.hacksc.com/",
    },
    {
        title: "Microsoft", 
        imageUrl: "http://assets.stickpng.com/images/58480fd7cef1014c0b5e4943.png",
        description: "Vercel combines the best development experience with obsessive focus on end-user performance. our platform enables frontend teams to do their best work.",
        slackChannel: "https://www.hacksc.com/",
    },
    {
        title: "Vercel", 
        imageUrl: "https://logovtor.com/wp-content/uploads/2020/10/vercel-inc-logo-vector.png",
        description: "Vercel combines the best development experience with obsessive focus on end-user performance. our platform enables frontend teams to do their best work.",
        slackChannel: "https://www.hacksc.com/",
    },
    {
        title: "Microsoft", 
        imageUrl: "http://assets.stickpng.com/images/58480fd7cef1014c0b5e4943.png",
        description: "Vercel combines the best development experience with obsessive focus on end-user performance. our platform enables frontend teams to do their best work.",
        slackChannel: "https://www.hacksc.com/",
    },
    {
        title: "Vercel", 
        imageUrl: "https://logovtor.com/wp-content/uploads/2020/10/vercel-inc-logo-vector.png",
        description: "Vercel combines the best development experience with obsessive focus on end-user performance. our platform enables frontend teams to do their best work.",
        slackChannel: "https://www.hacksc.com/",
    },
    {
        title: "Microsoft", 
        imageUrl: "http://assets.stickpng.com/images/58480fd7cef1014c0b5e4943.png",
        description: "Vercel combines the best development experience with obsessive focus on end-user performance. our platform enables frontend teams to do their best work.",
        slackChannel: "https://www.hacksc.com/",
    },
    {
        title: "Vercel", 
        imageUrl: "https://logovtor.com/wp-content/uploads/2020/10/vercel-inc-logo-vector.png",
        description: "Vercel combines the best development experience with obsessive focus on end-user performance. our platform enables frontend teams to do their best work.",
        slackChannel: "https://www.hacksc.com/",
    },
]

const ResourcesWidget = () => {
  return (
    <Wrapper>
      {resources.map((resource) => 
        <ResourceWrapper>
            <ResourceImageWrapper>
                <ResourceImage src={resource.imageUrl} />
            </ResourceImageWrapper>
            <ResourceBlurb>
                <ResourceTitle>{resource.title}</ResourceTitle>
                <ResourceDescription>{resource.description}</ResourceDescription>
                <Button href={resource.slackChannel}>Join Channel</Button>
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
    // height: auto;
    max-height: 120px;
    // min-height: 100px;
    max-width: 250px;
`;

const ResourceBlurb = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #28303A;
    border-radius: 15px;
    height: 14.25vh
    min-height: 200px;
    max-height: 250px;
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
