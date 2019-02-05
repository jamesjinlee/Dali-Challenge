import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
// import L from 'leaflet';
import { Bar } from 'react-chartjs-2';
import Fade from '@material-ui/core/Fade';

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 3,
    };
  }

  render() {
    // Bar Chart for Students Per Term
    const position = [this.state.lat, this.state.lng];
    const data = {
      labels: ['17F', '17W', '17S', '17X'],
      datasets: [
        {
          label: 'Students',
          data: [this.props.termCounts.fall, this.props.termCounts.winter, this.props.termCounts.spring, this.props.termCounts.summer],
          backgroundColor: '#A3D4A5',
        },
      ],
    };

    // Bar Chart for Students Per Project
    const proj = this.props.projects;
    const numStudents = [];
    Object.keys(proj).forEach((key) => {
      numStudents.push(proj[key].length);
    });
    const data2 = {
      labels: Object.keys(this.props.projects),
      datasets: [
        {
          label: 'Students',
          data: numStudents,
          backgroundColor: '#A3D4A5',
        },
      ],
    };

    return (
      <Fade in="true" timeout={500}>
        <div className="student-data-page">
          <h1 className="hey">Students Per Term</h1>
          <Bar data={data} />
          <h1 className="hey2">Students Per Project</h1>
          <Bar data={data2} />
          <h1 className="hey3">Where We Come From!</h1>
          <Map className="map" center={position} zoom={this.state.zoom} scrollWheelZoom={false}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              scroll
            />
            {this.props.students.map((d, idx) => {
              return (<Marker key={idx} position={d.lat_long}><Popup>{d.name}</Popup></Marker>);
            })}
          </Map>
        </div>
      </Fade>
    );
  }
}


export default MapPage;

/* {studentFilter.map(function(d, idx){
   return (<Card key={idx} color='green' onClick={() => this.props.studentClick(d.name, d.project, d.terms_on, d.url, d.lat_long)}>
     <Card.Content>
<Marker position={position}>
  <Popup>
    A pretty CSS3 popup. <br /> Easily customizable.
  </Popup>
</Marker> */
