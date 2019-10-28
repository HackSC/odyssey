import * as React from "react";

import { Form, FormGroup, Button } from "../../styles";

type Props = {
  user: User;
};

const ProfileStep: React.FunctionComponent<Props> = props => {
  const { user } = props;

  return (
    <div>
      <h1>Hello {user.displayName}</h1>

      <p>
        This is a component that will let the user fill out their hacker
        profile. This will include a form where they can indicate their
        interests, skills, resume, and more.
        <Form>
          <FormGroup>
            <label>First Name</label>
            <input type="text" />
          </FormGroup>

          <FormGroup>
            <label>Last Name</label>
            <input type="text" />
          </FormGroup>

          <FormGroup>
            <label>E-Mail</label>
            <input type="text" />
          </FormGroup>

          <FormGroup>
            <label>Major</label>
            <input type="text" />
          </FormGroup>

          <FormGroup>
            <label>Ethnicity</label>
            <input type="text" />
          </FormGroup>

          <Button>Submit</Button>
        </Form>
      </p>
    </div>
  );
};

export default ProfileStep;
