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
    let cards;

    if (buttonActive == "past") {
      cards = this.props.pastStudents.map(function(d, idx){
           return (<Card key={idx} color='green' onClick={() => this.props.studentClick(d.name, d.project, d.terms_on, d.url, d.lat_long)}>
             <Card.Content>
               <Card.Header>{d.name}</Card.Header>
               <Card.Meta>{d.terms_on}</Card.Meta>
               <Card.Description>{d.message}</Card.Description>
             </Card.Content>
           </Card>)
         })
    } if (buttonActive == "current") {
      cards = this.props.currStudents.map(function(d, idx){
           return (<Card key={idx} color='green' onClick={() => this.props.studentClick(d.name, d.project, d.terms_on, d.url, d.lat_long)}>
             <Card.Content>
               <Card.Header>{d.name}</Card.Header>
               <Card.Meta>{d.terms_on}</Card.Meta>
               <Card.Description>{d.message}</Card.Description>
             </Card.Content>
           </Card>)
         })
    } if (buttonActive =="all"){
      cards = this.props.students.map(function(d, idx){
       return (<Card key={idx} color='green' onClick={() => this.props.studentClick(d.name, d.project, d.terms_on, d.url, d.lat_long)}>
         <Card.Content>
           <Card.Header>{d.name}</Card.Header>
           <Card.Meta>{d.terms_on}</Card.Meta>
           <Card.Description>{d.message}</Card.Description>
         </Card.Content>
       </Card>)
     })
    }
    return (
      <div>

        <Button.Group>
          <Button onClick={() => this.handleClick("past")}>Past Students</Button>
          <Button.Or />
        <Button onClick={() => this.handleClick("current")}>Current Students</Button>
          <Button.Or />
        <Button onClick={() => this.handleClick("all")}>All Students</Button>
        </Button.Group>


    <Card.Group className="CardGroup" itemsPerRow={4}>
    {cards}
  </Card.Group>
</div>
  )
}
}


export default Students;
