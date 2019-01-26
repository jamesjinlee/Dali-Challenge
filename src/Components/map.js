import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet';

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
     const position = [this.state.lat, this.state.lng]
     return (
       <Map className="map" center={position} zoom={this.state.zoom}>
  <TileLayer
    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
{this.props.students.map(function(d, idx){
  return (<Marker key={idx} position={d.lat_long}><Popup>{d.name}</Popup></Marker>)
})}
</Map>

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
