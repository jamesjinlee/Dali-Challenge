import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Menu } from 'semantic-ui-react';
import './style.scss';
import Dashboard from './Components/dashboard';

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

  componentWillMount() {
    let students = [];

    // Fetch JSON data
    axios.get('http://mappy.dali.dartmouth.edu/members.json')
      .then((res) => {
        students = res.data;

        // insert JSON data into students in state
        this.setState({
          students: res.data,
        });
        
        // res.data.map(obj => [obj.name, obj.terms_on]);
        console.log(students);
        
        // Separate current and past students
        const currStudents = [];
        const pastStudents = [];
        const projects = {};
        let sCount = 0;
        let fCount = 0;
        let wCount = 0;
        let xCount = 0;

        // Iterate through students
        for (let i = 0; i < students.length; i += 1) {
          // If in current term (17S) push to currStudents
          // Also increase count of sCount
          if (students[i].terms_on.includes('17S')) {
            currStudents.push(students[i]);
            sCount += 1;

          // If not in current term (17S) push to pastStudents
          } else {
            pastStudents.push(students[i]);
          }
          
          // Increase count of term count
          if (students[i].terms_on.includes('17W')) {
            wCount += 1;
          }
          if (students[i].terms_on.includes('17F')) {
            fCount += 1;
          }
          if (students[i].terms_on.includes('17X')) {
            xCount += 1;
          }

          // Get dictionary of projects to students for 'Projects' page
          for (let j = 0; j < students[i].project.length; j += 1) {
            if (students[i].project[j] === '') {
              break;
            }
            if (!(students[i].project[j] in projects)) {
              projects[students[i].project[j]] = [students[i].name];
            } else {
              projects[students[i].project[j]].push(students[i].name);
            }
          }
        }
        this.setState({
          currStudents,
          pastStudents,
          projects,
          termCounts: {
            fall: fCount, winter: wCount, spring: sCount, summer: xCount += 1 },
        });
      });
  }

  // Switch dashboard back to 'Students' page
  goBackToStudents = () => {
    this.setState({
      dashState: 'Students',
    });
  }

  // Function to change dashboard when clicking on a student
  handleStudentClick = (name, project, terms_on, url, latLong) => {
    if (url.charAt(0) === '/') {
      window.open(url);
    } else {
      this.setState({
        dashState: 'EachStudent',
        eachStudent: { name, project, terms_on, url, latLong },
      });
    }
  }

  // Handles menu item clicks to change dashboard
  handleItemClick = (e, { name }) => this.setState({ dashState: name });

  render() {
    return (
      <div>
      
        <Menu pointing secondary stackable>
          <Menu.Item className="menu-item"
            name="Students"
            active={this.state.dashState === 'Students'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Projects"
            active={this.state.dashState === 'Projects'}
            onClick={this.handleItemClick}
          />
          <Menu.Item name="Student Data"
            active={this.state.dashState === 'Map'}
            onClick={this.handleItemClick}
          />
        </Menu>

        <div className="dashboard">
          <Dashboard dashState={this.state.dashState}
            students={this.state.students}
            studentClick={this.handleStudentClick}
            eachStudent={this.state.eachStudent}
            goBack={this.goBackToStudents}
            currStudents={this.state.currStudents}
            pastStudents={this.state.pastStudents}
            projects={this.state.projects}
            termCounts={this.state.termCounts}
          />
        </div>

        <div className="footer">
          <a href="https://github.com/jamesjinlee/Dali-Challenge" target="_blank">
            <img className="footerPic" src="../images/github-logo.png" alt="not loaded" />
          </a>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));
