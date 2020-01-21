import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import parse from "csv-parse"
import stringify from "csv-stringify"

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import styled from "styled-components";

import { Background, Container, Button, Flex, Column } from "../styles";

const judgingManager = ({ profile }) => {
  const [message, setMessage] = useState("")

  var projects = []

  // read logic
  const handleUpload = function(event){
    console.log(event)
    // Check null
    if (event.target.files.length < 1) {
      return;
    }
    let file = event.target.files[0];

    // Check type
    if (file.name.split('.').pop() !== 'csv') {
      setMessage("Incorrect File Type. Please select a csv file!");
      return;
    }

    setMessage("Uploading csv...")

    let reader = new FileReader();

    // Read the file and attempt to upload
    reader.onloadend = function () {
      // upload
      readCSV(reader.result)
      setMessage("Successfully uploaded file!")
      console.log(projects)
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
    plainDescription: String;
    video: String;
    website: String;
    fileUrl : String;
    desiredPrizes : Array<String>;
    builtWith : Array<String>;
    vertical: String;
    vr: Boolean;
    submitter : Profile;
    schools: Array<String>;
    teammates: Array<Profile>;
    table: String;
  }

  const parseCSV = function (data) {
    return new Promise(function(resolve, reject){
      let output = [];
      // Create the parser
      let parser = parse({
        delimiter: ",",
        relax_column_count: true,
      });
      // Use the readable stream api
      parser.on('readable', function () {
        let record;
        while (record = parser.read()) {
          output.push(record)
        }
      });
      // Catch any error
      parser.on('error', function (err) {
        reject(err.message)
      });
      // When we are done, test that the parsed output matched what expected
      parser.on('end', function () {
        // can use output
        resolve(output)
      });
      // Write to the parser
      parser.write(data.trim());
      // Close the readable stream
      parser.end()
    });
  }

  const readCSV = function(data) {
    // Clear all judging and projects
    projects = []

    Promise.all([]).then(function () {
      parseCSV(data).then(function(output: Array<String>) {
        // remove first item the header
        output.shift();
        // Add into projects
        let tableCounter = 0;
        let vrTableCounter = 0;
        while(tableCounter + vrTableCounter < output.length){
          let val = output[tableCounter+vrTableCounter];
          let p = new Project();
          p.submissionTitle = val[0];
          p.submissionUrl = val[1];
          p.plainDescription = val[2];
          p.video = val[3];
          p.website = val[4];
          p.fileUrl = val[5];
          p.desiredPrizes = val[6].split(',').map(v => v.trim()).slice(0, 6);
          p.builtWith = val[7].split(',').map(v => v.trim());
          p.vertical = val[8];
          p.vr = val[9] === 'Yes';
          // 10-12 is MLH
          p.submitter = {
            screenName: val[13],
            firstName: val[14],
            lastName: val[15],
            email: val[16],
          };
          p.schools = val[17].split(',').map(v => v.trim());
          p.teammates = [];

          if(!p.vr){
            let tableNum = tableCounter + 1 + 53;
            if(tableNum === 78){
              tableNum = 144;
            }else if(tableNum === 86){
              tableNum = 145
            }else if(tableNum === 99){
              tableNum = 146
            }else if(tableNum === 102){
              tableNum = 147
            }
            p.table = String(tableNum); // offset emergency
            tableCounter++;
          }else{
            p.table = 'V' + (vrTableCounter + 1);
            vrTableCounter++;
          }

          // add teammates
          let numTeammates = Number(val[18]);
          for (let j = 0; j < numTeammates; j++) {
            let index = 4 * j;
            p.teammates.push({
              screenName: val[18 + index + 1],
              firstName: val[18 + index + 2],
              lastName: val[18 + index + 3],
              email: val[18 + index + 4],
            });
          }

          projects.push(p)
        }
      }, function (err) {
        setMessage(err)
      });
    });
  }

  const genVerticalsCSV = function(event){
    setMessage("Generating Vertical CSV")
    var response = {data:''}
    var csvContent = "data:text/csv;charset=utf-8," + response.data;
    var encodedUri = encodeURI(csvContent);
    var downloadLink = document.createElement("a");
    downloadLink.href = encodedUri;
    downloadLink.download = "table-assignments.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setMessage("")
  }

  const genSponsorsCSV = function(event){
    setMessage("Generating Sponsor CSV")
    var response = {data:''}
    var csvContent = "data:text/csv;charset=utf-8," + response.data;
    var encodedUri = encodeURI(csvContent);
    var downloadLink = document.createElement("a");
    downloadLink.href = encodedUri;
    downloadLink.download = "judging-data.csv";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setMessage("")
  }

  return (
    <>
      <Head title="HackSC Odyssey - Application"/>
      <Navbar loggedIn admin activePage="/"/>
      <Background>
        <Container>
          <Flex direction="row">
            <Button>
              <label 
                htmlFor="devpost"> 
                Upload 
              </label>
              <InvisInput 
                type="file"
                id="devpost"
                name="devpost"
                onChange={handleUpload}/>
            </Button>
          </Flex>
          <br/>
          <p>{message}</p>
          <br/>
          <Flex direction="row" justify="space-between">
            <Column flexBasis={48}>
              <h1> Verticals </h1>

              <Panel>
                <Button onClick={genVerticalsCSV}>
                  Generate CSV
                </Button>
              </Panel>

              <Panel>
                <h2>Number of Judges</h2>

                <div id="judges-gen">
                  <Flex direction="row" justify="space-between" align="center">
                    <Column flexGrow={1}>
                      <p>vert 1</p>
                    </Column>

                    <Column flexGrow={1}>
                      <Input
                        type="number"
                        onChange={e => {
                          console.log(e.target.value);
                        }}
                        value={0}
                      />
                    </Column>
                  </Flex>

                  <br/>
                </div>

                <Button>
                  Save
                </Button>
              </Panel>
            </Column>

            <Column flexBasis={48}>
              <h1> Sponsors </h1>

              <Panel>
                <Button onClick={genSponsorsCSV}>
                  Generate CSV
                </Button>
              </Panel>

              <Panel>
                <h2> Sponsors </h2>

                <div id="sponsors-gen">
                  <p>spon1</p>
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
  if (!profile || profile.role != 'admin') {
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

export default judgingManager;
