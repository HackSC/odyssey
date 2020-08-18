import styled from "styled-components";

import { Header, Body } from "./type";

const Directory = () => {
  return (
    <Wrapper>
      <Company>
        <h2>Accenture</h2>

        <p>
          Accenture is a leading global professional services company, providing
          a broad range of services and solutions in strategy, consulting,
          digital, technology and operations. Combining unmatched experience and
          specialized skills across more than 40 industries and all business
          functions – underpinned by the world’s largest delivery network –
          Accenture works at the intersection of business and technology to help
          clients improve their performance and create sustainable value for
          their stakeholders. With more than 449,000 people serving clients in
          more than 120 countries, Accenture drives innovation to improve the
          way the world works and lives. Visit us at{" "}
          <a href="http://www.accenture.com/">www.accenture.com</a>
        </p>

        <br />

        <Link href="https://www.accenture.com/us-en/careers/students-graduates">
          Student and Internship Opportunities
        </Link>
      </Company>

      <Company>
        <h2>alwaysAI</h2>

        <p>
          We are a software company that gives intelligent sight to embedded and
          loT devices. We enable these devices to autonomously make smart
          decisions in real time, untethered from the cloud. Our developer
          platform fast-tracks the creation and deployment of computer vision
          apps on edge devices. By working with many AI model framework
          technologies and endpoint environments, alwaysAI significantly
          accelerates the time it takes to get a computer vision app up and
          running. Our platform comes pre-loaded with a growing model catalog,
          starter apps, and core computer vision APIs (including object
          detection, tracking and counting; image classification, pose
          estimation & semantic segmentation) enabling the development of a wide
          range of computer vision applications that work with most endpoints.
        </p>

        <br />
        <br />

        <p>
          <b>Keywords: </b>
          AI, Artificial Intelligence, Computer Vision, Object Detection, Image
          Classification, Pose Estimation, Raspberry Pi, Edge Device, robotics,
          IoT
        </p>
        <br />

        <Link href="https://learn.alwaysai.co/hacksc">
          alwaysAI HackSC Link
        </Link>
      </Company>

      <Company>
        <h2>Education Ecosystem</h2>

        <p>
          Education Ecosystem (LEDU) is a project-based learning platform that
          teaches students how to build real products in areas such as
          programming, game development, artificial intelligence, cybersecurity,
          data science, and cryptocurrencies.
        </p>
      </Company>

      <Company>
        <h2>GCP</h2>

        <p>
          Prepare for a cloud-first workplace. Grow your career, startup, or
          business with a suite of secure storage, powerful compute, and
          integrated data analytics products provided by Google Cloud. Learn
          more at <a href="https://g.co/cloud">g.co/cloud</a>.
        </p>

        <br />

        <Link href="https://github.com/GoogleCloudPlatform/hackathon-toolkit">
          Hackathon Toolkit
        </Link>
      </Company>

      <Company>
        <h2>Linode</h2>

        <p>
          Linode accelerates innovation by making cloud computing simple,
          accessible, and affordable to all. Founded in 2003, Linode helped
          pioneer the cloud computing industry and is today the largest
          independent open cloud provider in the world. Headquartered in
          Philadelphia's Old City, the company empowers over 800,000 developers,
          startups, and businesses across its global network of 11 data centers.
        </p>
      </Company>

      <Company>
        <h2>Mux</h2>

        <p>
          Mux is video infrastructure built by the experts. Take any video file
          or live stream and make it play beautifully at scale on any device,
          powered by magical-feeling features like automatic thumbnails,
          animated gifs, and data-driven encoding decisions. Spend your time
          building what people want, not drudging through ffmpeg documentation.
        </p>

        <p>
          If you're interested in trying out Mux for your hack, shoot
          dylan@mux.com an email (or find him in Slack or at the Mux table) and
          we'll make sure you've got more than enough free credit to get through
          the weekend. Learn more at Mux.com (https://mux.com/) or our
          documentation (https://docs.mux.com/).
        </p>
        <br />

        <Link href="https://docs.mux.com">Mux Docs</Link>
      </Company>

      <Company>
        <h2>N3TWORK</h2>

        <p>
          We make games. We create solutions for people who make games. We
          create a network for people who play games. We love what we do. And
          we're just getting started. Come join us!
        </p>

        <br />

        <Link href="https://store.unity.com/products/unity-personal">
          Download Unity
        </Link>
      </Company>

      <Company>
        <h2>Nimbella</h2>
        <p>
          Create a unique and useful command using Nimbella Commnder! Connect
          with your favorite APIs while leveraging Slack's amazing UI. Our
          prizes will be given to the top 2 teams who create at least one
          command set using Nimbella Commander and post the set to GitHub for
          others to use! Example commands can utilize any of{" "}
          <a href="https://nimbella.com/product/commander">
            Commander's features
          </a>{" "}
          and can call out any cloud APIs such as:
        </p>

        <ul>
          <li>Adobe Creative Cloud </li>
          <li>Devops services like Github/Gitlab/Jenkins/Jira/Confluence</li>
          <li>Ecommerce platforms like Shopify</li>
          <li>Online marketplaces</li>
          <li>Social Media</li>
          <li>Any API that you find interesting!</li>
        </ul>

        <Link href="https://nimbella.com/resources-commander/quickstart">
          Getting Started
        </Link>

        <br />

        <Link href="https://github.com/nimbella/command-sets">
          Example Command Sets
        </Link>
      </Company>

      <Company>
        <h2>Teleportal</h2>

        <Link href="https://docs.google.com/document/d/17pE2tSDCoJhMQQSfSY_DU1jJZPi61pAkvCyQfKXEPdY/edit">
          Teleportal x HackSC Doc
        </Link>

        <br />

        <Link href="https://teleportal.dev/docs/">Teleportal Docs</Link>
      </Company>

      <Company>
        <h2>Xmatters</h2>

        <Link href="/static/xmatters.pdf">Xmatters Starter Pack</Link>

        <br />

        <Link href="https://help.xmatters.com">Help</Link>

        <br />

        <Link href="https://help.xmatters.com/ondemand/xmodwelcome/flowdesigner/laying-out-flow-designer.htm ">
          Flow Designer
        </Link>

        <br />

        <Link href="https://help.xmatters.com/xmapi">API</Link>
      </Company>

      <Company>
        <h2>Xpring</h2>

        <Link href="https://xpring.io/docs#started">Docs</Link>

        <br />

        <Link href="https://github.com/ripple/xrp-api">Ripple API</Link>
      </Company>
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
