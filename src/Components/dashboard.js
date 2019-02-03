import React from 'react';
import Students from './students';
import MapPage from './map';
import Projects from './projects';
import EachStudent from './eachStudent';

const Dashboard = (props) => {
  // dashboard: Students
  if (props.dashState === 'Students') {
    return (
      <div>
        <Students students={props.students} pastStudents={props.pastStudents} currStudents={props.currStudents} studentClick={props.studentClick} />
      </div>);
  }

  // dashboard: Each Student
  if (props.dashState === 'EachStudent') {
    return (
      <div>
        <EachStudent goBack={props.goBack} eachStudent={props.eachStudent} />
      </div>);
  }

  // dashboard: Projects
  if (props.dashState === 'Projects') {
    return (
      <div>
        <Projects projects={props.projects} />
      </div>
    );
  }

  // dashboard: Map
  return (
    <MapPage students={props.students} termCounts={props.termCounts} projects={props.projects} />
  );
};

export default Dashboard;
