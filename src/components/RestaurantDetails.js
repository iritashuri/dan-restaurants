import React from 'react';
import { getDistance } from '../helpers/places';

class RestaurantDetails extends React.Component {

    isRestaurantOpen = () => {
        return this.props.restaurant.opening_hours.open_now
            ? "Open"
            : "Closed";
    }

    renderPhotos = () => {
        const photos = this.props.restaurant.photos;
        return photos.map((p, idx) => (
            <div key={idx}>
                <a target="_blank" href={p.html_attributions[0].split("\"")[1]}> Click to get photos </a>  
            </div>
        ));
    }

    calculateDistance = () => {
        const restaurantPosition = this.props.restaurant.geometry.location;
        return getDistance({
            latitude: restaurantPosition.lat(),
            longitude: restaurantPosition.lng()
        })
    }

    render() {
        const restaurant = this.props.restaurant;
        return(
            <div>
                <div>name: {restaurant.name}</div>
                <div>distance: {this.calculateDistance()}</div>
                <div>isOpen: {this.isRestaurantOpen()}</div>
                <div>{this.renderPhotos()}</div>
            </div>
        )
    }
}

export default RestaurantDetails;