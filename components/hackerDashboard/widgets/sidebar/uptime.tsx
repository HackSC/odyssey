import styled from "styled-components";

const Uptime = () => {
  return (
    <>
      <h3>Website Status</h3>
      <UptimeWrapper>
        <UptimeItem>
          <UptimeSubtitle>hacksc.com </UptimeSubtitle>
          <a href="https://status.hacksc.com">
            <img src="https://betteruptime.com/status-badges/v1/monitor/50yh.svg"></img>
          </a>
        </UptimeItem>
        <UptimeItem>
          <UptimeSubtitle>staging.hacksc.com </UptimeSubtitle>
          <a href="https://status.hacksc.com">
            <img src="https://betteruptime.com/status-badges/v1/monitor/518z.svg"></img>
          </a>
        </UptimeItem>
        <UptimeItem>
          <UptimeSubtitle>dashboard.hacksc.com </UptimeSubtitle>
          <a href="https://status.hacksc.com">
            <img src="https://betteruptime.com/status-badges/v1/monitor/50yp.svg"></img>
          </a>
        </UptimeItem>
      </UptimeWrapper>
    </>
  );
};

const UptimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UptimeItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const UptimeSubtitle = styled.h4`
  margin: 8px 0;
`;

export default Uptime;
