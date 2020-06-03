import React from 'react'
var FontAwesome = require('react-fontawesome')

function PlaceList(props) {
    
    const placeClicked = place => evt => {
        props.placeClicked(place);
    }

    const removePlace = place => {
        fetch(`${process.env.REACT_APP_API_URL}/main/places/${place.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Token d020cf4b9d015624a50e719e2732efa520ebf6b5`
            }
            }).then( resp => props.placeDeleted(place))
            .catch(error => console.log(error));
    }

    const editPlace = place => {
        props.editPlace(place);
    };

    const newPlace = () => {
        props.newPlace()
    };

    return (
        <div>
            { props.list.map(item => {
                return (
                    <div key={item.id} className="place-item">
                        <p onClick={placeClicked(item)}>
                            {item.name}
                        </p>
                        <FontAwesome name="edit" onClick={() => editPlace(item)}/>
                        <FontAwesome name="trash" onClick={() => removePlace(item)}/>
                    </div>
                )
            })}
            <button onClick={newPlace}> Додати нове місце </button>
        </div>
    )
}

export default PlaceList;