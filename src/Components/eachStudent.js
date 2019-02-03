import React from 'react';

const EachStudent = props => {
  return (
    <div>
      <h1>{props.eachStudent.name}</h1>
      <h1>{props.eachStudent.project}</h1>
      <h1>{props.eachStudent.terms_on}</h1>
      <h1>{props.eachStudent.url}</h1>
      <h1>{props.eachStudent.lat_long}</h1>
      <h1 onClick={props.goBack}>CLICK TO GO BBACK TO STUDENTS</h1>
    </div>
  );
};


export default EachStudent;
