import React from 'react';
import { Item } from 'semantic-ui-react';
import Fade from '@material-ui/core/Fade';

// List of projects and students in each project
const Projects = props => {
  return (
    <Fade in="true" timeout={500}>
      <Item.Group divided>
        {Object.keys(props.projects).map((key, index) => (
          <Item key={index}>
            <Item.Image src="../../images/dalilogo.png" alt="hey" size="medium" />
            <Item.Content>
              <Item.Header>{key}</Item.Header>
              <Item.Meta>
                <span>Students</span>
              </Item.Meta>
              <Item.Description>{props.projects[key].join(', ')}</Item.Description>
            </Item.Content>
          </Item>

        ))}
      </Item.Group>
    </Fade>
  );
};


export default Projects;
