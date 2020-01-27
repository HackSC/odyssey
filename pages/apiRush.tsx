import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import { getReferrerCode } from "../lib/referrerCode";

import { getCurrentTasks } from "../lib/live";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Background, Container, Button, FormGroup } from "../styles";
import Select from "react-select";

const CategoryEditableCell = ({ category, taskOptions }) => {
  const [currentTasks, setCurrentTasks] = useState(category.tasks);
  return (
    <>
      <Container>
        <FormGroup>
          <label>Grouping</label>
          <input type="text" placeholder="Name" />
        </FormGroup>
        <Select
          isMulti
          value={currentTasks}
          onChange={e => {
            setCurrentTasks(e);
          }}
          options={taskOptions}
        />
      </Container>
    </>
  );
};

const APIRushManager = ({ profile, currentCategories, currentTasks }) => {
  const taskOptions = currentTasks.tasks.map(task => {
    return {
      value: task,
      label: task.name
    };
  });
  const categoryEditors = currentCategories.map(category => {
    return CategoryEditableCell({ category, taskOptions });
  });
  return (
    <>
      <Head title="API Rush Manager" />
      <Navbar />
      <Background>
        <Container>
          <Button> Create New Grouping </Button>
        </Container>
        {categoryEditors}
      </Background>
      <Footer />
    </>
  );
};

APIRushManager.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const currentCategories = [
    {
      id: 1,
      name: "Sample Category"
    },
    {
      id: 2,
      name: "Volunteer Tasks"
    }
  ];
  const currentTasks = await getCurrentTasks(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  return {
    profile,
    currentCategories,
    currentTasks
  };
};

export default APIRushManager;
