import React, { Component } from 'react';
import './App.css';
import PlaceList from './components/place-list'
import PlaceDetails from './components/place-details'
import PlaceForm from './components/place-form'
var FontAwesome = require('react-fontawesome')

class App extends Component{

  state = {
    places: [],
    placetypes: [],
    selectedPlace: null,
    editedPlace: null
  }

  componentDidMount(){
    fetch('http://192.168.1.80:8000/main/places', {
      method: 'GET',
      headers: {
        'Authorization':'Token d020cf4b9d015624a50e719e2732efa520ebf6b5'
      }
    }).then( resp => resp.json())
    .then(res => this.setState({places:res}))
    .catch(error => console.log(error));
    fetch('http://192.168.1.80:8000/main/place_types', {
      method: 'GET',
      headers: {
        'Authorization':'Token d020cf4b9d015624a50e719e2732efa520ebf6b5'
      }
    }).then( resp => resp.json())
    .then(res => this.setState({placetypes:res}))
    .catch(error => console.log(error));
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
              newPlace={this.newPlace}/>
              <div>
                {!this.state.editedPlace ? 
                  <PlaceDetails place={this.state.selectedPlace} updateRating={this.placeClicked}/>
                 : <PlaceForm place={this.state.editedPlace}
              cancelForm={this.cancelForm}
              placetypes={this.state.placetypes}
              newPlace={this.addPlace}
              editedPlace={this.placeClicked}/>
              }
              </div>
            
          </div>
      </div>
    );
  }
}

export default App;
