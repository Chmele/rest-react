import React, { Component } from 'react';

class PlaceForm extends Component {

    state = {
        editedPlace: this.props.place
    }

    cancelClicked = () => {
        this.props.cancelForm();
    }
    inputChanged = event => {
        console.log('changed');
        let place = this.state.editedPlace;
        place.type == null ? place.type = 1 : console.log();
        place[event.target.name] = event.target.value;
        this.setState({editedPlace: place});
        console.log(this.editedPlace);
    }

    saveClicked = () => {
        fetch(`${process.env.REACT_APP_API_URL}/main/places/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.editedPlace)
            }).then( resp => resp.json())
            .then(res => this.props.newPlace(res))
            .catch(error => console.log(error));
    }

    updateClicked = () => {
        fetch(`${process.env.REACT_APP_API_URL}/main/places/${this.props.place.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Token ${this.props.token}`
            },
            body: JSON.stringify(this.state.editedPlace)
            }).then( resp => resp.json())
            .then(res => this.props.editedPlace(res))
            .catch(error => console.log(error));
    }

    render() {

        const isDisabled = this.state.editedPlace.name.length == 0;

        this.state.editedPlace.type = this.state.editedPlace.type || 1;

        return (
            <React.Fragment>
                <span>Назва</span><br/>
                <input type="text" name="name" value={this.props.place.name} 
                    onChange={this.inputChanged}/><br/>
                <span>Тип</span><br/>
                <select name="type" value={this.props.place.type || 1} onChange={this.inputChanged}>
                    {
                    this.props.placetypes.map(function(item){
                        return(
                        <option key={item.id} value={item.id}>{item.typename}</option>
                        )
                    })
                    }
                </select><br/>
                {this.props.place.id ? 
                <button disabled={isDisabled} onClick={this.updateClicked}>Змінити</button> :
                <button disabled={isDisabled} onClick={this.saveClicked}>Зберегти</button>
                }
                
                <button onClick={this.cancelClicked}>Скасувати</button>
            </React.Fragment>
        )
    }
}

export default PlaceForm;