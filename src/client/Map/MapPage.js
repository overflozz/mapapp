import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Map, GoogleApiWrapper, Marker, InfoWindow
} from 'google-maps-react';
import Grid from '@material-ui/core/Grid';
import Card from '../Static/Card/Card';

const mapStyles = { height: '500px', width: '100%', position: 'relative' };

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      currentLocation: {
        lat: props.position.lat,
        lng: props.position.lng
      }
    });
    console.log(this);
  }

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
          authGeoloc: true,
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        });
      });
    }
  }

  render() {
    return (
      <Grid container justify="center" spacing={0}>
        <Grid item md={12} xs={12} style={{ position: 'relative', height: mapStyles.height }}>
          {(this.state.authGeoloc && (
            <Map
              google={this.props.google}
              style={mapStyles}
              initialCenter={{
                lat: this.state.currentLocation.lat,
                lng: this.state.currentLocation.lng
              }}
              center={{
                lat: this.state.currentLocation.lat,
                lng: this.state.currentLocation.lng
              }}
              zoom={15}
              onClick={this.onMapClicked}
              streetViewControl={false}
              mapTypeControl={false}
              fullscreenControl={false}
            >
              <Marker
                onClick={this.onMarkerClick}
                name="CurrentPos"
                marker={this}
                position={{
                  lat: this.state.currentLocation.lat,
                  lng: this.state.currentLocation.lng
                }}
              />
            </Map>
          )) || <Card>Please authorize the Geoloc</Card>}
        </Grid>
        <Grid item md="8" style={{ padding: '10px' }}>
          <Grid container spacing={24}>
            <Grid item md="3">
              <Card>
                <div className="card_body">
                  <div className="card_title">Best spot for the tour eiffel</div>
                  <div style={{ backgroundColor: '#E5E5E5', height: '200px', width: '100%' }} />
                </div>
              </Card>
            </Grid>
            <Grid item md="3">
              dsqdsf
            </Grid>
            <Grid item md="3">
              dsqdsf
            </Grid>
            <Grid item md="3">
              dsqdsf
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB496MM3_Oqw-gJJ5WFog98xEgT8JYtDUw'
})(MapPage);
