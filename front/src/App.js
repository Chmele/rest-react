import React, { Component } from 'react';
import './App.css';
import PlaceList from './components/place-list';
import PlaceDetails from './components/place-details';
import PlaceForm from './components/place-form';
import { withCookies } from 'react-cookie';


var FontAwesome = require('react-fontawesome')

class App extends Component{

  state = {
    places: [],
    placetypes: [],
    selectedPlace: null,
    editedPlace: null,
    token: this.props.cookies.get('pl-token')
  }

  componentDidMount(){
    console.log(this.state.token);
    if(this.state.token){
      fetch(`${process.env.REACT_APP_API_URL}/main/places`, {
        method: 'GET',
        headers: {
          'Authorization':`Token ${this.state.token}`
        }
      }).then( resp => resp.json())
      .then(res => this.setState({places:res}))
      .catch(error => console.log(error));
      fetch(`${process.env.REACT_APP_API_URL}/main/place_types`, {
        method: 'GET',
        headers: {
          'Authorization':`Token ${this.state.token}`
        }
      }).then( resp => resp.json())
      .then(res => this.setState({placetypes:res}))
      .catch(error => console.log(error));
    }
    else{
      window.location.href = '/'
    }
    
  }

  placeClicked = place => {
    this.setState({selectedPlace: place, editedPlace: null})
  }

  placeDeleted = delplace => {
    const places = this.state.places.filter(place => place.id !== delplace.id);
    this.setState({places: places, selectedPlace: null});
  }

  editPlace = editplace => {
    this.setState({editedPlace: editplace});
  }

  newPlace = () => {
    this.setState({editedPlace: {name: '', type: ''}})
  }

  cancelForm = () => {
    this.setState({editedPlace: null})
  }

  addPlace = place => {
    this.setState({places: [...this.state.places, place]})
  }

  render(){
    return (
      <div className="App">
          <h1>
            <FontAwesome name="food"/>
            <span>Головна сторінка</span>
            </h1>
          <div className="layout">
            <PlaceList list={this.state.places} 
              placeClicked={this.placeClicked}
              placeDeleted={this.placeDeleted} 
              editPlace={this.editPlace}
              newPlace={this.newPlace}
              token={this.state.token}
              />
              <div>
                {!this.state.editedPlace ? 
                  <PlaceDetails place={this.state.selectedPlace} 
                  updateRating={this.placeClicked}
                  token={this.state.token}
                  />
                 : <PlaceForm place={this.state.editedPlace}
              cancelForm={this.cancelForm}
              placetypes={this.state.placetypes}
              newPlace={this.addPlace}
              editedPlace={this.placeClicked}
              token={this.state.token}
              />
              }
              </div>
            
          </div>
      </div>
    );
  }
}

export default withCookies(App);
