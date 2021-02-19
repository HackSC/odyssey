import styled from "styled-components";

const renderText = (txt) => {
  const URL_REGEX = /(http:\/\/|https:\/\/)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  return txt.split(" ").map((part) =>
    URL_REGEX.test(part) ? (
      <a key={part} href={part}>
        {part}{" "}
      </a>
    ) : (
      part + " "
    )
  );
};

const Directory = ({ apis }) => {
  return (
    <Wrapper>
      {apis && apis.success && apis.success.length > 0
        ? apis.success.map((item) => (
            <Company key={Object.entries(item).join()}>
              <h2 style={{ wordBreak: "break-all" }}>{item.name}</h2>
              <p style={{ wordBreak: "break-all" }}>
                {renderText(item.description)}
              </p>
              <br />
              {!item.links || item.links.length == 0 ? (
                <></>
              ) : (
                item.links.map((link) => (
                  <div
                    style={{ display: "flex", paddingBottom: ".5rem" }}
                    key={Object.entries(link).join()}
                  >
                    <Link href={link.link}>{link.name}</Link>
                  </div>
                ))
              )}
            </Company>
          ))
        : ""}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  margin-bottom: 64px;
`;

const Company = styled.div`
  border: 1px solid #cfcfcf;
  background: white;
  z-index: 999;
  border-radius: 4px;
  padding: 1.5rem 1.5rem;
  margin-top: 1.5rem;
  color: #5f5f5f;
  width: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  h2 {
    font-size: 28px;
    text-transform: uppercase;
    margin-bottom: 16px;
    font-weight: bold;
    color: black;
  }

  p {
    line-height: 1.5em;
  }

  b {
    font-weight: bold;
  }

  ul {
    list-style-type: disc;
    padding: 10px;
    li {
      line-height: 24px;
    }
  }
`;

const Link = styled.a`
  padding: 14px 18px;
  border: none;
  border-radius: 8px;
  background: #ff8379;
  font-size: 14px;
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  flex-shrink: 1;
`;

export default Directory;
