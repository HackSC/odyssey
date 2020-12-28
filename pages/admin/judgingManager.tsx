import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../../lib/authenticate";

import parse from "csv-parse";
import stringify from "csv-stringify";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import Head from "../../components/Head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import styled from "styled-components";
import {} from "styled-components/cssprop";

import { Background, Container, Button, Flex, Column } from "../../styles";

const judgingManager = ({}) => {
  const [uploaded, setUploaded] = useState(false);
  const [message, setMessage] = useState("");

  // control vars
  const [currTable, setCurrTable] = useState(["", 0]);
  const [tables, setTables] = useState({});
  const [projects, setProjects] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [verticalJudges, setVerticalJudges] = useState({});
  const [verticalCount, setVerticalCount] = useState({});

  const tablesBlocks = Object.keys(tables).map((table) => {
    return (
      <Cell>
        <Column>
          <SmallCell>{table}</SmallCell>
          <SmallCell>{tables[table]}</SmallCell>
          <Button
            onClick={(e) => {
              delete tables[table];
              setTables(tables);
              // hacky but it refreshes
              setCurrTable([currTable[0], currTable[1]]);
              assignTables();
            }}
          >
            X
          </Button>
        </Column>
      </Cell>
    );
  });

  const verticalsBlocks = Object.keys(verticalJudges).map((vertical) => {
    return (
      <Flex direction="row" justify="space-between" align="center">
        <Column flexBasis={50}>
          <p>{vertical + " (" + verticalCount[vertical] + ")"}</p>
        </Column>

        <Column flexBasis={50}>
          <Input
            type="number"
            onChange={(e) => {
              let temp_verticalJudges = verticalJudges;
              temp_verticalJudges[vertical] = Number(e.target.value);
              setVerticalJudges(temp_verticalJudges);
            }}
            defaultValue={verticalJudges[vertical]}
          />
        </Column>
      </Flex>
    );
  });

  const sponsorsBlocks = sponsors.map((sponsor) => {
    return <p>{sponsor}</p>;
  });

  const handleUpload = function (event) {
    // Check null
    if (event.target.files.length < 1) {
      return;
    }
    let file = event.target.files[0];

    // Check type
    if (file.name.split(".").pop() !== "csv") {
      setMessage("Incorrect File Type. Please select a csv file!");
      return;
    }

    setMessage("Uploading csv...");

    let reader = new FileReader();
    let working_projects: Array<Project>;

    // Read the file and attempt to upload
    reader.onloadend = async function () {
      // upload
      try {
        setMessage("");
        working_projects = await readCSV(reader.result);
        setMessage("Successfully uploaded and parsed file!");
      } catch (err) {
        setMessage(err.message);
      }

      // populate
      let verticalJudges_obj = {};
      let verticalCount_obj = {};
      let sponsors_list = new Set();
      for (let i = 0; i < working_projects.length; i++) {
        if (working_projects[i].vertical != "") {
          let vertical = working_projects[i].vertical.toString();
          verticalJudges_obj[vertical] = 0;
          verticalCount_obj[vertical] = verticalCount_obj.hasOwnProperty(
            vertical
          )
            ? verticalCount_obj[vertical] + 1
            : 1;
        }
        for (let j = 0; j < working_projects[i].desiredPrizes.length; j++) {
          if (working_projects[i].desiredPrizes[j] != "") {
            sponsors_list.add(working_projects[i].desiredPrizes[j]);
          }
        }
      }
      setProjects(working_projects);
      setSponsors(Array.from(sponsors_list));
      setVerticalJudges(verticalJudges_obj);
      setVerticalCount(verticalCount_obj);

      setUploaded(true);
    };

    reader.onerror = function () {
      setMessage("Error reading file. Please select a different file.");
    };

    reader.readAsText(file);
  };

  class Profile {
    screenName: String;
    firstName: String;
    lastName: String;
    email: String;
  }

  class Project {
    submissionTitle: String;
    submissionUrl: String;
    submissionTagline: String;
    submissionCreatedAt: String;
    plainDescription: String;
    video: String;
    website: String;
    fileUrl: String;
    desiredPrizes: Array<String>;
    builtWith: Array<String>;
    vertical: String;
    videoDemo: String;
    phone: String;
    submitter: Profile;
    schools: Array<String>;
    teammates: Array<Profile>;
    table: String;
  }

  const parseCSV = async function (data): Promise<Array<String>> {
    return new Promise(function (resolve, reject) {
      let output = [];

      let parser = parse({
        delimiter: ",",
        relax_column_count: true,
      });

      parser.on("readable", function () {
        let record;
        while ((record = parser.read())) {
          output.push(record);
        }
      });

      parser.on("error", function (err) {
        reject(new Error(err.message));
      });

      parser.on("end", function () {
        resolve(output);
      });

      parser.write(data.trim());

      parser.end();
    });
  };

  const readCSV = async function (data): Promise<Array<Project>> {
    let working_projects = [];
    let output: Array<String>;

    try {
      output = await parseCSV(data);
    } catch (err) {
      // * IGNORE
    }

    // remove first item the header
    output.shift();
    // Add into projects
    for (let i = 0; i < output.length; i++) {
      let val = output[i];
      let p = new Project();
      p.submissionTitle = val[0];
      p.submissionUrl = val[1];
      p.submissionTagline = val[2];
      p.submissionCreatedAt = val[3];
      p.plainDescription = val[4];
      p.video = val[5];
      p.website = val[6];
      p.fileUrl = val[7];
      p.desiredPrizes = val[8]
        .split(",")
        .map((v) => v.trim())
        .slice(0, 6);
      p.builtWith = val[9].split(",").map((v) => v.trim());
      p.vertical = val[10];
      p.videoDemo = val[11];
      p.phone = val[12];
      // 12-14 is MLH
      p.submitter = {
        screenName: val[16],
        firstName: val[17],
        lastName: val[18],
        email: val[19],
      };
      p.schools = val[20].split(",").map((v) => v.trim());
      p.teammates = [];
      // add teammates
      let numTeammates = Number(val[21]);
      for (let j = 0; j < numTeammates; j++) {
        let index = 4 * j;
        p.teammates.push({
          screenName: val[21 + index + 1],
          firstName: val[21 + index + 2],
          lastName: val[21 + index + 3],
          email: val[21 + index + 4],
        });
      }
      p.table = "";

      working_projects.push(p);
    }

    return working_projects;
  };

  const genProjectsCSV = async function (
    header,
    values,
    filters = {},
    split = 1
  ): Promise<Array<Array<String>>> {
    return new Promise(function (resolve, reject) {
      let promises = [];
      split = split < 1 ? 1 : split;
      for (let splitCount = 0; splitCount < split; splitCount++) {
        promises.push(
          new Promise(function (resolve, reject) {
            let data = [];
            let stringifier = stringify({
              delimiter: ",",
            });
            stringifier.on("readable", function () {
              let row;
              while ((row = stringifier.read())) {
                data.push(row);
              }
            });
            stringifier.on("error", function (err) {
              reject(new Error(err.message));
            });
            stringifier.write(header);
            stringifier.on("finish", function () {
              resolve(data);
            });
            // read projects sorry hella ugly
            let projectCount = 0;
            for (let i = 0; i < projects.length; i++) {
              let project = projects[i];
              let passFilter = true;
              Object.entries(filters).forEach(([key, value]) => {
                if (Array.isArray(project[key])) {
                  if (!project[key].includes(value)) {
                    passFilter = false;
                  }
                } else if (project[key] != value) {
                  passFilter = false;
                }
              });
              if (passFilter) {
                projectCount++;
                let passSplit = false;
                if (projectCount % split === splitCount) {
                  passSplit = true;
                }
                if (passSplit) {
                  let line = [];
                  for (let j = 0; j < values.length; j++) {
                    let value = values[j].split(".");
                    if (value.length > 1) {
                      line.push(project[value[0]][value[1]]);
                    } else {
                      line.push(project[value[0]]);
                    }
                  }
                  stringifier.write(line);
                }
              }
            }
            stringifier.end();
          })
        );
      }

      // return all csvs
      Promise.all(promises).then(resolve).catch(reject);
    });
  };

  const assignTables = function () {
    let working_tables = Object.assign({}, tables);
    let working_projects = [...projects];
    let count = 0;
    let max = 79;
    for (let i = 0; i < working_projects.length; i++) {
      let assigned = false;
      for (let table in working_tables) {
        if (working_tables[table] > 0) {
          working_tables[table]--;
          working_projects[i].table =
            String(table) + String(tables[table] - working_tables[table]);
          assigned = true;
          break;
        }
      }
      if (!assigned) {
        count++;
        if (count > max) {
          count = 1;
        }
        working_projects[i].table = count;
      }
    }
    setProjects(working_projects);
  };

  const exportTableAssignments = async function () {
    setMessage("Generating Table Assignments CSV");

    // run table assignments
    assignTables();

    let data: String;

    try {
      let headers = ["Project Name", "Table Number"];
      let values = ["submissionTitle", "table"];
      let csvs = await genProjectsCSV(headers, values);
      data = csvs[0].join("");
    } catch (err) {
      setMessage(err.message);
      return;
    }

    let blob = new Blob([data.toString()], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "table_assignments.csv");
    setMessage("");
  };

  const exportVerticalsCSV = async function () {
    setMessage("Generating Vertical CSV");
    assignTables();

    let zip = new JSZip();

    // split into vert datasets
    try {
      let headers = [
        "Project Name",
        "Table",
        "Tech Complexity",
        "Functionality",
        "Feasibility",
        "Passion",
        "Wow Factor",
        "Total",
        "Comments",
      ];
      let values = ["submissionTitle", "table"];
      for (let vertical in verticalJudges) {
        let filters = {
          vertical: vertical,
        };
        let split = verticalJudges.hasOwnProperty(vertical)
          ? verticalJudges[vertical]
          : 1;
        let csvs = await genProjectsCSV(headers, values, filters, split);
        for (let i = 0; i < csvs.length; i++) {
          let data = csvs[i].join("");
          zip.file(
            vertical.split(" ").join("_") + "_" + String(i) + "_judging.csv",
            data
          );
        }
      }
    } catch (err) {
      setMessage(err.message);
      return;
    }
    // assign judges based on judges (can be teams, just print multiple times)

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "verticals_data.zip");
      setMessage("");
    });
  };

  const exportSponsorsCSV = async function () {
    setMessage("Generating Sponsor CSVs");
    assignTables();

    let zip = new JSZip();

    try {
      let headers = ["Project Name", "Table", "Points", "Comments"];
      let values = ["submissionTitle", "table"];
      for (let i = 0; i < sponsors.length; i++) {
        let sponsor = sponsors[i];
        let filters = {
          desiredPrizes: sponsor,
        };
        let csvs = await genProjectsCSV(headers, values, filters);
        let data = csvs[0].join("");
        zip.file(sponsor.split(" ").join("_") + "_judging.csv", data);
      }
    } catch (err) {
      setMessage(err.message);
      return;
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "sponsors_data.zip");
      setMessage("");
    });
  };

  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn admin activePage="/judgingManager" />
      <Background padding="2rem">
        <Container>
          <PaddedTitle>Judging Manager</PaddedTitle>
          <Flex
            direction="row"
            justify="space-between"
            style={{ flexWrap: "wrap" }}
          >
            <Column flexBasis={30}>
              <Flex direction="column" style={{ flexWrap: "wrap" }}>
                <TimeCard primary>
                  <TimeCardLabel>Time</TimeCardLabel>
                  <TimeCardTeamName>Team 1</TimeCardTeamName>
                  <TimeCardTeamList>List of team members</TimeCardTeamList>
                  <TimeCardLink>Link to slack room or zoom call</TimeCardLink>
                </TimeCard>
                <TimeCard>
                  <TimeCardLabel>Time</TimeCardLabel>
                  <TimeCardTeamName>Team 1</TimeCardTeamName>
                  <TimeCardTeamList>List of team members</TimeCardTeamList>
                  <TimeCardLink>Link to slack room or zoom call</TimeCardLink>
                </TimeCard>
                <TimeCard>
                  <TimeCardLabel>Time</TimeCardLabel>
                  <TimeCardTeamName>Team 1</TimeCardTeamName>
                  <TimeCardTeamList>List of team members</TimeCardTeamList>
                  <TimeCardLink>Link to slack room or zoom call</TimeCardLink>
                </TimeCard>
                <TimeCard>
                  <TimeCardLabel>Time</TimeCardLabel>
                  <TimeCardTeamName>Team 1</TimeCardTeamName>
                  <TimeCardTeamList>List of team members</TimeCardTeamList>
                  <TimeCardLink>Link to slack room or zoom call</TimeCardLink>
                </TimeCard>
              </Flex>
            </Column>
            <Column flexBasis={65}>
              <Cell style={{ padding: "20px" }}>
                <JudgeField>
                  <JudgeFieldLabel>Vertical</JudgeFieldLabel>
                  <JudgeFieldSelectInput
                    placeholder="Vertical"
                    id="verticalSelect"
                  >
                    <option value="person">Person</option>
                    <option value="team">Team</option>
                    <option value="customer">Customer</option>
                    <option value="device">Device</option>
                  </JudgeFieldSelectInput>
                </JudgeField>
                <JudgeField>
                  <JudgeFieldLabel>Sponsor</JudgeFieldLabel>
                  <JudgeFieldSelectInput placeholder="Sponsor">
                    <option value="sponsor1">Sponsor 1</option>
                    <option value="sponsor2">Sponsor 2</option>
                  </JudgeFieldSelectInput>
                </JudgeField>
                <JudgeField>
                  <JudgeFieldLabel>Notes</JudgeFieldLabel>
                  <JudgeFieldTextArea placeholder="Write notes here..."></JudgeFieldTextArea>
                </JudgeField>
                <JudgeField>
                  <JudgeFieldLabel>Score</JudgeFieldLabel>
                  <JudgeFieldSelectInput placeholder="Score" id="scoreSelect">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </JudgeFieldSelectInput>
                  <p style={{ marginTop: "4px", fontSize: "14px" }}>
                    For unsubmitted projects and/or judging mishaps, enter a
                    score of 0 and hit up engineering slack channel:
                    #2021-engineering.
                  </p>
                </JudgeField>
                <FullButton>Submit</FullButton>
              </Cell>
            </Column>
          </Flex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

judgingManager.getInitialProps = async (ctx) => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in or user does not have enough rights
  if (!profile || !(profile.role == "admin" || profile.role == "superadmin")) {
    handleLoginRedirect(req);
  }

  return {};
};

const PaddedTitle = styled.h1`
  padding: 1rem 0 2rem 0;
`;

const MarginColumn = styled(Column)`
  margin: 1rem 0;
`;

const Cell = styled.div`
  display: inline-block;
  padding: 10px 20px;
  margin: 5px 5px;
  background: #ffffff;
  border-radius: 8px;
  font-size: 16px;
`;

const SmallCell = styled.div`
  padding: 12px 1px;
  margin: 0px 1px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #b2b2b2;
  min-width: 39px;
  display: inline-block;
  text-align: center;
  font-size: 16px;
`;

const Input = styled.input`
  border-radius: 8px;
  border: 1px solid #b2b2b2;
  padding: 12px 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const FullButton = styled(Button)`
  width: 100%;
  text-align: center;
`;

type TimeCardType = {
  primary?: boolean;
};

const TimeCard = styled.div<TimeCardType>`
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 4px;
  border: 2px solid;
  border-color: ${(props) => (props.primary ? "#FF8379" : "white")};
`;

const TimeCardLabel = styled.label`
  margin-bottom: 20px;
  color: #757575;
  font-weight: 600;
  font-size: 16px;
  text-indent: 1em;
  &::before {
    content: "🕐 ";
    padding-right: 4px;
  }
`;

const TimeCardTeamName = styled.h2`
  margin-bottom: 16px;
  margin-top: 12px;
  padding: 0;
`;

const TimeCardTeamList = styled.p`
  margin-bottom: 8px;
  font-size: 18px;
`;

const TimeCardLink = styled.a`
  font-size: 16px;
`;

const JudgeField = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const JudgeFieldLabel = styled.label`
  display: block;
  margin-bottom: 4px;
`;

const JudgeFieldTextInput = styled.input`
  width: 100%;
  padding: 10px 0px 10px 10px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  border: 2px solid #e5e5e5;
  border-radius: 4px;
  font-size: 16px;
`;

const JudgeFieldTextArea = styled.textarea`
  width: 100%;
  padding: 10px 0px 10px 10px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  border: 2px solid #e5e5e5;
  border-radius: 4px;
  height: 150px;
  font-size: 16px;
  font-family: Arial;
`;

const JudgeFieldSelectInput = styled.select`
  width: 100%;
  padding: 10px 0px 10px 10px;
  background-color: #f8f8f8;
  border: 2px solid #e5e5e5;
  border-radius: 4px;
  font-size: 16px;
`;

export default judgingManager;
