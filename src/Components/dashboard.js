import React, {Component} from 'react';
import Students from './students.js';
import Map from './map.js';
import Projects from './projects.js';
import EachStudent from './eachStudent.js';

// class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       dashState= 'students'
//       eachStudent = [],
//     }
//   };
//
//   render() {
//     return {
//       if (props.)
//     }
//   }
// }

const Dashboard = props => {
  if (props.dashState == 'Students'){
    return <div><Students studentClick={props.studentClick} students={props.students} pastStudents={props.pastStudents} currStudents={props.currStudents} /></div>
  }

  if (props.dashState == 'EachStudent') {
    return (<div><EachStudent goBack={props.goBack} eachStudent={props.eachStudent}/></div>)
  }

  if (props.dashState == 'Projects') {
	  return (
      <div>
        <Projects />
			 </div>
      )
  }
  return (
    <Map />
  )
}

export default Dashboard;
