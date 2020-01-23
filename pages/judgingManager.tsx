import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import parse from "csv-parse";
import stringify from "csv-stringify";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import styled from "styled-components";

import { Background, Container, Button, Flex, Column } from "../styles";
import { configureScope } from "@sentry/browser";

const judgingManager = ({ profile }) => {
  const [uploaded, setUploaded] = useState(false)
  const [message, setMessage] = useState("")
  const [verticals, setVerticals] = useState([])
  const [sponsors, setSponsors] = useState([])

  // private variables
  const [projects, setProjects] = useState([])
  const [sponsorsList, setSponsorsList] = useState([])
  const [verticalJudges, setVerticalJudges] = useState({})

  // read logic
  const handleUpload = function(event){
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

    setMessage("Uploading csv...")

    let reader = new FileReader();
    let working_projects: Array<Project>

    // Read the file and attempt to upload
    reader.onloadend = async function () {
      // upload
      try {
        working_projects = await readCSV(reader.result)
        setMessage("Successfully uploaded and parsed file!")
      } catch (err) {
        setMessage(err.message)
      }

      // populate
      let verticals_obj = {}
      let sponsors_list = new Set()
      for (let i = 0; i < working_projects.length; i++) {
        if (working_projects[i].vertical != "") {
          verticals_obj[working_projects[i].vertical.toString()] = 0;
        }
        for (let j = 0; j < working_projects[i].desiredPrizes.length; j++) {
          if (working_projects[i].desiredPrizes[j] != "") {
            sponsors_list.add(working_projects[i].desiredPrizes[j])
          }
        }
      }
      setVerticalJudges(verticals_obj)
      populateVerticals(verticals_obj)

      setSponsorsList(Array.from(sponsors_list))
      populateSponsors(sponsors_list)
      

      setUploaded(true)
    };

    reader.onerror = function () {
      setMessage("Error reading file. Please select a different file.")
    };

    reader.readAsText(file);
  }

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
    fileUrl : String;
    desiredPrizes : Array<String>;
    builtWith : Array<String>;
    vertical: String;
    phone: String;
    submitter : Profile;
    schools: Array<String>;
    teammates: Array<Profile>;
    table: String;
  }

  const parseCSV = async function (data): Promise<Array<String>>{
    return new Promise(function(resolve, reject){
      let output = [];

      let parser = parse({
        delimiter: ",",
        relax_column_count: true,
      });

      parser.on("readable", function () {
        let record;
        while (record = parser.read()) {
          output.push(record)
        }
      });

      parser.on("error", function (err) {
        reject(new Error(err.message))
      });

      parser.on("end", function () {
        resolve(output)
      });

      parser.write(data.trim());

      parser.end()
    });
  }

  const readCSV = async function(data): Promise<Array<Project>> {
    // Clear all judging and projects
    setProjects([])
    setMessage("")
    setVerticals([])
    setSponsors([])

    let working_projects = []
    let output: Array<String>
    
    try {
      output = await parseCSV(data)
    } catch (err) {
      throw err
    }

    // remove first item the header
    output.shift();
    // Add into projects
    let tableCounter = 0;
    while(tableCounter < output.length){
      let val = output[tableCounter];
      let p = new Project();
      p.submissionTitle = val[0];
      p.submissionUrl = val[1];
      p.submissionTagline = val[2];
      p.submissionCreatedAt = val[3];
      p.plainDescription = val[4];
      p.video = val[5];
      p.website = val[6];
      p.fileUrl = val[7];
      p.desiredPrizes = val[8].split(",").map(v => v.trim()).slice(0, 6);
      p.builtWith = val[9].split(",").map(v => v.trim());
      p.vertical = val[10];
      p.phone = val[11];
      // 12-14 is MLH
      p.submitter = {
        screenName: val[15],
        firstName: val[16],
        lastName: val[17],
        email: val[18],
      };
      p.schools = val[19].split(",").map(v => v.trim());
      p.teammates = [];
      // add teammates
      let numTeammates = Number(val[20]);
      for (let j = 0; j < numTeammates; j++) {
        let index = 4 * j;
        p.teammates.push({
          screenName: val[20 + index + 1],
          firstName: val[20 + index + 2],
          lastName: val[20 + index + 3],
          email: val[20 + index + 4],
        });
      }
      p.table = String(tableCounter);
      tableCounter++;

      working_projects.push(p)
    }

    setProjects(working_projects)
    return working_projects
  }

  const populateVerticals = function(verticals_obj) {
    let verticals_display = []
    Object.entries(verticals_obj).forEach(([vertical, judges]) => {
      verticals_display.push(
        <Flex direction="row" justify="space-between" align="center">
          <Column flexBasis={50}>
            <p>{vertical}</p>
          </Column>

          <Column flexBasis={50}>
            <Input
              type="number"
              onChange={e => {
                let temp_verticalJudges = verticalJudges
                temp_verticalJudges[vertical] = Number(e.target.value)
                setVerticalJudges(temp_verticalJudges)
              }}
              value={verticalJudges[vertical]}
            />
          </Column>
        </Flex>
      )
      verticals_display.push(<br/>)
    });
    if (verticals_display.length > 1) {
      verticals_display.pop()
    }
    setVerticals(verticals_display)
  }

  const populateSponsors = function(sponsors_list) {
    let sponsors_display = []
    sponsors_list.forEach(sponsor => {
      sponsors_display.push(<p>{sponsor}</p>)
    });
    setSponsors(sponsors_display)
  }

  const genProjectsCSV = async function (header, values, filters={}, split=1): Promise<Array<Array<String>>> {
    return new Promise(function(resolve, reject) {
      let promises = []
      split = split < 1 ? 1: split
      for (let splitCount = 0; splitCount < split; splitCount++) {
        promises.push(new Promise(function(resolve, reject) {
          let data = [];
          let stringifier = stringify({
            delimiter: ","
          });
          stringifier.on("readable", function () {
            let row;
            while (row = stringifier.read()) {
              data.push(row)
            }
          });
          stringifier.on("error", function (err) {
            reject(new Error(err.message))
          });
          stringifier.write(header);
          stringifier.on("finish", function () {
            resolve(data)
          });
          // read projects sorry hella ugly
          let projectCount = 0;
          for (let i = 0; i < projects.length; i++) {
            let project = projects[i]
            let passFilter = true
            Object.entries(filters).forEach(([key, value]) => {
              if (Array.isArray(project[key])) {
                if (!project[key].includes(value)) {
                  passFilter = false
                }
              } else if (project[key] != value) {
                passFilter = false
              }
            });
            if (passFilter) {
              projectCount++;
              let passSplit = false
              if ((projectCount % split) === splitCount) {
                passSplit = true
              }
              if (passSplit) {
                let line = []
                for (let j = 0; j < values.length; j++) {
                  let value = values[j].split(".")
                  if (value.length > 1) {
                    line.push(project[value[0]][value[1]])
                  } else {
                    line.push(project[value[0]])
                  }
                }
                stringifier.write(line);
              }
            }
          }
          stringifier.end()
        }));
      }

      // return all csvs
      Promise.all(promises).then(resolve).catch(reject)
    });
  };

  const exportTableAssignments = async function() {
    setMessage("Generating Table Assignments CSV")

    let data: String

    try {
      let headers = [
        "Project Name",
        "Submission Email",
        "Table Number"
      ]
      let values = [
        "submissionTitle",
        "submitter.email",
        "table"
      ]
      let csvs = await genProjectsCSV(headers, values)
      data = csvs[0].join("")
    } catch (err) {
      setMessage(err.message)
      return
    }

    let blob = new Blob([data.toString()], { type: "text/csv;charset=utf-8"})
    saveAs(blob, "table_assignments.csv")
    setMessage("")
  }

  const exportVerticalsCSV = async function() {
    setMessage("Generating Vertical CSV")

    let zip = new JSZip()

    // split into vert datasets
    try {
      let headers = [
        "Project Name",
        "Vertical",
        "Table Number"
      ]
      let values = [
        "submissionTitle",
        "vertical",
        "table",
      ]
      for (let vertical in verticalJudges) {
        let filters = {
          vertical: vertical
        }
        let split = verticalJudges.hasOwnProperty(vertical) ? verticalJudges[vertical] : 1
        let csvs = await genProjectsCSV(headers, values, filters, split)
        for (let i = 0; i < csvs.length; i++) {
          let data = csvs[i].join("")
          zip.file(vertical.split(" ").join("_") + "_" + String(i) + "_judging.csv", data)
        }
      }
    } catch (err) {
      setMessage(err.message)
      return
    }
    // assign judges based on judges (can be teams, just print multiple times)

    zip.generateAsync({type:"blob"})
    .then(function(content) {
      console.log('saving')
      saveAs(content, "verticals_data.zip")
      setMessage("")
    });  
  }

  const exportSponsorsCSV = async function() {
    setMessage("Generating Sponsor CSVs")

    let zip = new JSZip()

    try {
      let headers = [
        "Project Name",
        "Submission Email",
        "Table Number"
      ]
      let values = [
        "submissionTitle",
        "submitter.email",
        "table"
      ]
      for (let i = 0; i < sponsorsList.length; i++) {
        let sponsor = sponsorsList[i]
        let filters = {
          desiredPrizes: sponsor
        }
        let csvs = await genProjectsCSV(headers, values, filters)
        let data = csvs[0].join("")
        zip.file(sponsor.split(" ").join("_") + "_judging.csv", data)
      }
    } catch (err) {
      setMessage(err.message)
      return
    }

    zip.generateAsync({type:"blob"})
    .then(function(content) {
      saveAs(content, "sponsors_data.zip")
      setMessage("")
    });  
  }

  return (
    <>
      <Head title="HackSC Odyssey - Application"/>
      <Navbar loggedIn admin activePage="/"/>
      <Background>
        <Container>
          <Flex direction="row" justify="space-between">
            <Column flexBasis={48}>
              <FullButton>
                <label 
                  htmlFor="devpost"> 
                  Upload 
                </label>
                <InvisInput 
                  type="file"
                  id="devpost"
                  name="devpost"
                  onChange={handleUpload}/>
              </FullButton>
            </Column>
            <Column flexBasis={48}>
              <FullStyledButton onClick={exportTableAssignments} disabled={!uploaded}>
                Export Table Assignments
              </FullStyledButton>
            </Column>
          </Flex>
          <br/>
          <p>{message}</p>
          <br/>
          <Flex direction="row" justify="space-between">
            <Column flexBasis={48}>
              <h1> Verticals </h1>

              <Panel>
                <StyledButton onClick={exportVerticalsCSV} disabled={!uploaded}>
                  Generate CSV
                </StyledButton>
              </Panel>

              <Panel>
                <h2>Number of Judges</h2>

                <div id="judges-gen">
                  {verticals}
                </div>
              </Panel>
            </Column>

            <Column flexBasis={48}>
              <h1> Sponsors </h1>

              <Panel>
                <StyledButton onClick={exportSponsorsCSV} disabled={!uploaded}>
                  Generate CSV
                </StyledButton>
              </Panel>

              <Panel>
                <h2> Sponsors </h2>

                <div id="sponsors-gen">
                  {sponsors}
                </div>
              </Panel>
            </Column>
          </Flex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

judgingManager.getInitialProps = async ctx => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in or user does not have enough rights
  if (!profile || profile.role != "admin") {
    handleLoginRedirect(req);
  }

  return {
    profile
  };
};

const Panel = styled.div`
  padding: 24px 36px;
  margin: 0 0 16px;
  background: #ffffff;
  border-radius: 4px;
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

const ScoreInputLabel = styled.h3`
  padding: 0;
  margin-bottom: 8px;
`;

const ScoreKeyLabel = styled.p`
  display: inline-block;
  padding: 10px 16px;
  margin-right: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  color: ${({ theme }) => theme.colors.gray50};
`;

const SubmittingText = styled.p`
  margin-top: 8px;
`;

const InvisInput = styled.input`
  display: none;
`;

const FullButton = styled(Button)`
  width: 100%;
  text-align: center;
`;

const FullStyledButton = styled(Button)`
  width: 100%;
  text-align: center;
  ${({ disabled }) => disabled && `opacity: 0.5`};
`;

const StyledButton = styled(Button)`
  ${({ disabled }) => disabled && `opacity: 0.5`};
`;

export default judgingManager;
