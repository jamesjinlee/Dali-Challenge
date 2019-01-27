import React, {Component} from 'react';
import { Card, Icon, Image, Menu, Button } from 'semantic-ui-react';

class Students extends Component{
  constructor(props) {
    super(props);

    this.state = {
      active: "all",
    }
  }

  handleClick = (number) => {
    this.setState({ active: number});
  }

  render(){
    const buttonActive = this.state.active;
    const clickFunc = this.props.studentClick;
    let studentFilter;

    if (buttonActive == "past") {
      studentFilter = this.props.pastStudents;
    } if (buttonActive == "current") {
      studentFilter = this.props.currStudents;
    } if (buttonActive == "all"){
      studentFilter = this.props.students;
    }

    return (
      <div>

        <Button.Group>
          <Button onClick={() => this.handleClick("past")}>Past Students</Button>
          <Button.Or />
        <Button onClick={() => this.handleClick("current")}>Current Students (17S)</Button>
          <Button.Or />
        <Button onClick={() => this.handleClick("all")}>All Students</Button>
        </Button.Group>


    <Card.Group className="CardGroup" itemsPerRow={4}>
      {studentFilter.map(function(d, idx){
         return (<Card key={idx} color='green' onClick={() => clickFunc(d.name, d.project, d.terms_on, d.url, d.lat_long)}>
           <Card.Content>
             <Card.Header>{d.name}</Card.Header>
           <Card.Meta>{d.terms_on.join(" ")}</Card.Meta>
             <Card.Description>{d.message}</Card.Description>
           </Card.Content>
         </Card>)
       })}
  </Card.Group>
</div>
  )
}
}


export default Students;
