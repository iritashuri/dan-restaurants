import React from 'react'

class RestaurantsList extends React.Component {

    render() {
        return (
            <div>
                <div id="map"></div>
                <ul>
                    {this.props.restaurants.map((name, idx) => {
                        return (
                            <li 
                                onClick={() => this.props.onItemSelected(name)} 
                                key={idx} 
                            > 
                                {name} 
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default RestaurantsList;