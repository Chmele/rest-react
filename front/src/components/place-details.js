import React, { Component } from 'react';
var FontAwesome = require('react-fontawesome')

class PlaceDetails extends Component {

    state = {
        highlighted: -1
    }

    highlightRate = high => evt => {
        this.setState({highlighted: high});
    }

    rateClicked = stars => evt => {
        fetch(`${process.env.REACT_APP_API_URL}/main/places/${this.props.place.id}/rate_place/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Token d020cf4b9d015624a50e719e2732efa520ebf6b5'
            },
            body: JSON.stringify({mark:stars+1, text:''})
            }).then( resp => resp.json())
            .then(res => this.getDetails())
            .catch(error => console.log(error));
    }

    getDetails = () => {
        fetch(`${process.env.REACT_APP_API_URL}/main/places/${this.props.place.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Token d020cf4b9d015624a50e719e2732efa520ebf6b5'
            }
            }).then( resp => resp.json())
            .then(res => this.props.updateRating(res))
            .catch(error => console.log(error));
    }

    render() {
        const pl = this.props.place;
        return (
            <React.Fragment>
                {this.props.place ? (
                    <div>
                        <h4>{pl.name}</h4>
                        <FontAwesome name="star" className={pl.avg_rating > 0 ? 'orange': ''}/>
                        <FontAwesome name="star" className={pl.avg_rating > 1 ? 'orange': ''}/>
                        <FontAwesome name="star" className={pl.avg_rating > 2 ? 'orange': ''}/>
                        <FontAwesome name="star" className={pl.avg_rating > 3 ? 'orange': ''}/>
                        <FontAwesome name="star" className={pl.avg_rating > 4 ? 'orange': ''}/>
                        ({pl.no_of_ratings})
                        <p>{pl.typename}</p>
                        <div className="rate-container">
                            <h2>Залишити відгук</h2>
                            { [...Array(5)].map((e, i) => {
                                return <FontAwesome key={i} name="star" className={i <= this.state.highlighted ? 'purple': ''}
                                    onMouseEnter={this.highlightRate(i)} onMouseLeave={this.highlightRate(-1)} onClick={this.rateClicked(i)}/>
                            })}
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        )
    }
}

export default PlaceDetails;