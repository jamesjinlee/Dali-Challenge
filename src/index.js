import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Card, Icon, Image, Menu } from 'semantic-ui-react';
import './style.scss';
import Dashboard from './Components/dashboard.js';

class App extends Component {
  constructor(props) {
    super(props);

    // students contains json data for all students
    this.state = {
      students: [],
      currStudents: [],
      pastStudents: [],
      lat_long:[],
      dashState: 'Students',
      eachStudent: {},
    };
  }

  componentWillMount(){
    var students = [];

    axios.get('http://mappy.dali.dartmouth.edu/members.json')
      .then(res =>{
        const lat_long = res.data.map(obj => obj.lat_long);
        students = res.data;
        this.setState({
          students: res.data,
          lat_long});
        console.log(res.data);
        console.log(this.state.lat_long);
        const terms = res.data.map(obj => [obj.name,obj.terms_on]);

      console.log(students);
      //separate curr and past students for 'Students' page

      var currStudents = [];
      var pastStudents = [];

      for (var i = 0; i < students.length; i++) {
        if (students[i].terms_on.includes("17S")) {
          currStudents.push(students[i]);
        } else {
          pastStudents.push(students[i]);
        };
      }

      this.setState( {
        currStudents: currStudents,
        pastStudents: pastStudents
      })

      console.log(currStudents);
      console.log(pastStudents);
      })
  }

  goBackToStudents = () => {
    this.setState({
      dashState: 'Students'
    })
  }

  handleStudentClick = (name, project, terms_on, url, lat_long) => {
    this.setState({
      dashState: 'EachStudent',
      eachStudent: {name: name, project: project, terms_on: terms_on, url: url, lat_long: lat_long}
      })
  }

  handleItemClick = (e, { name }) => this.setState({ dashState: name });

  render() {
    return (
      <div>
      <Menu pointing secondary vertical>
       <Menu.Item name='Students'
       active={this.state.dashState === 'Students'}
     onClick={this.handleItemClick}/>
       <Menu.Item
         name='Projects'
         active={this.state.dashState === 'Projects'}
         onClick={this.handleItemClick}
       />
     <Menu.Item name='Map'
       active = {this.state.dashState === 'Map'}
       onClick={this.handleItemClick}
       />
     </Menu>

     <Dashboard dashState = {this.state.dashState}
                students = {this.state.students}
                studentClick= {this.handleStudentClick}
                eachStudent={this.state.eachStudent}
                goBack={this.goBackToStudents}
                currStudents={this.state.currStudents}
              pastStudents={this.state.pastStudents}/>


 </div>
    );
  }
};


ReactDOM.render(<App />, document.getElementById('main'));
