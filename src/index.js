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
      dashState: 'Students',
      eachStudent: {},
      projects: [],
      termCounts: [],
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
          });
        console.log(res.data);
        console.log(this.state.lat_long);
        const terms = res.data.map(obj => [obj.name,obj.terms_on]);

      console.log(students);
      //separate curr and past students for 'Students' page

      var currStudents = [];
      var pastStudents = [];
      var projects = {}
      var s_count = 0;
      var f_count = 0;
      var w_count = 0;
      var x_count = 0;

      for (var i = 0; i < students.length; i++) {

        // separate curr/past students
        if (students[i].terms_on.includes("17S")) {
          currStudents.push(students[i]);
          s_count++;
        } else {
          pastStudents.push(students[i]);
        };

        if (students[i].terms_on.includes("17W")) {
          w_count++;
        }
        if (students[i].terms_on.includes("17F")) {
          f_count++;
        }
        if (students[i].terms_on.includes("17X")) {
          x_count++;
        }

        // get dictionary of projects to students
        for (var j = 0; j < students[i].project.length; j++) {
          if (students[i].project[j] == "") {
            break;
          }
          if (!(students[i].project[j] in projects)) {
            projects[students[i].project[j]] = [students[i].name];
          } else {
            projects[students[i].project[j]].push(students[i].name);
          }
        }

        // get count of students per terms

      }

      console.log(projects);
      this.setState( {
        currStudents: currStudents,
        pastStudents: pastStudents,
        projects: projects,
        termCounts: {fall: f_count, winter: w_count, spring: s_count, summer: x_count}
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
                pastStudents={this.state.pastStudents}
                projects={this.state.projects}
                termCounts={this.state.termCounts}/>


 </div>
    );
  }
};


ReactDOM.render(<App />, document.getElementById('main'));
