import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet';
import {Line, Bar} from 'react-chartjs-2';

class MapPage extends Component{

  constructor(props) {
    super(props);
    this.state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 3,
  }
}
   render() {
     const position = [this.state.lat, this.state.lng];
     const data = {
       labels: ['17F', '17W', '17S', '17X'],
       datasets: [
         {
           label: 'Students',
           data: [this.props.termCounts["fall"], this.props.termCounts["winter"], this.props.termCounts["spring"], this.props.termCounts["summer"]]
         }
      ]
    };
    var proj = this.props.projects;
    var numStudents = [];
    Object.keys(proj).forEach(function(key) {
    numStudents.push(proj[key].length);
});
    const data2 = {
      labels: Object.keys(this.props.projects),
      datasets: [
        {
          label: 'Students',
          data: numStudents
        }
      ]
    }

     return (
       <div>
         <Bar className="lineChart" data={data} options={{}}/>
       <Bar className="lineChart" data={data2} />
       <Map className="map" center={position} zoom={this.state.zoom} scrollWheelZoom={false}>
  <TileLayer
    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    scroll
  />
{this.props.students.map(function(d, idx){
  return (<Marker key={idx} position={d.lat_long}><Popup>{d.name}</Popup></Marker>)
})}
</Map>
</div>
     )
   }
}


export default MapPage;

{/* {studentFilter.map(function(d, idx){
   return (<Card key={idx} color='green' onClick={() => this.props.studentClick(d.name, d.project, d.terms_on, d.url, d.lat_long)}>
     <Card.Content>
<Marker position={position}>
  <Popup>
    A pretty CSS3 popup. <br /> Easily customizable.
  </Popup>
</Marker> */}
