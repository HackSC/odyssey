import styled from "styled-components";

import { Header, Body } from "./type";

const Directory = ({ apis }) => {
  return (
    <Wrapper>
      {apis.map((item) => (
        <Company>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <br />
          {item.links.map((link) => (
            <>
              <Link href={link.link}>{link.name}</Link>
              <br />
            </>
          ))}
        </Company>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 93.75%;
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
