import React from 'react';
import { Image, Item } from 'semantic-ui-react'


// data of how many students per terms
// how many students per project



const Projects = props => {
  return (
    <Item.Group divided>
      {Object.keys(props.projects).map((key, index) =>(
           <Item key={index}>
             <Item.Content>
                <Item.Header>{key}</Item.Header>
                <Item.Meta>
                  <span>Students</span>
                </Item.Meta>
                <Item.Description>{props.projects[key].join(", ")}</Item.Description>
              </Item.Content>
              </Item>

          ))}
    </Item.Group>
  )
}


export default Projects;
