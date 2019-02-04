import React, { Component } from 'react';
import { Image, Card, Button, Icon } from 'semantic-ui-react';
import Fade from '@material-ui/core/Fade';

class Students extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'all',
    };
  }

  // Handles click on filtering for current/past/all students
  handleClick = (number) => {
    this.setState({ active: number });
  }

  render() {
    const buttonActive = this.state.active;
    const clickFunc = this.props.studentClick;
    let studentFilter;
    let header = 'All Students';

    // Show correct student filter depending on what button is active
    if (buttonActive === 'past') {
      studentFilter = this.props.pastStudents;
      header = 'Past Students';
    } if (buttonActive === 'current') {
      studentFilter = this.props.currStudents;
      header = 'Current Students';
    } if (buttonActive === 'all') {
      studentFilter = this.props.students;
      header = 'All Students';
    }

    return (
      <div>
        <Fade in="true" timeout={500}>
          <div>
            <h1>{header}</h1>
            <div className="filter-wrapper">
              <Button.Group color="yellow" className="student-filter-buttons" floated="right" stackable>
                <Button onClick={() => this.handleClick('past')}>Past Students</Button>
                <Button.Or />
                <Button onClick={() => this.handleClick('current')}>Current Students (17S)</Button>
                <Button.Or />
                <Button onClick={() => this.handleClick('all')}>All Students</Button>
              </Button.Group>
            </div>

            <Card.Group ui four doubling stackable cards itemsPerRow={4}>
              {studentFilter.map((d, idx) => {
                const ai = d.iconUrl;
                const image = `../../${ai}`;

                return (
                  <Card fluid key={idx} onClick={() => clickFunc(d.name, d.project, d.terms_on, d.url, d.lat_long)}>
                    <Image src={image} alt="../../images/default_profile.jpeg" /> 
                    <Card.Content>
                      <Card.Header>{d.name}</Card.Header>
                      <Card.Meta>{d.terms_on.join(' ')}</Card.Meta>
                      <Card.Description>{d.message}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <span className="second-icon">
                        <Icon name="bookmark" />
                        {d.project.length} <span>Projects</span>
                      </span>
                      <span>
                        <Icon name="star" />
                        {d.terms_on.length} Terms on
                      </span>
                    </Card.Content>
                  </Card>);
              })}
            </Card.Group>
          </div>
        </Fade>
      </div>
    );
  }
}

export default Students;
