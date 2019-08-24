import React from 'react';
import RestaurantsList from './components/RestaurantsList';
import { updateRestaurants } from './helpers/places';
import RestaurantDetails from './components/RestaurantDetails';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      selected: undefined
    }
  }

  componentDidMount(){
    this.updateRestaurants();
  }

  updateRestaurants() {
    updateRestaurants((apiResult => {
      this.setState({
        restaurants: apiResult
      })
    }));
  }

  onRestaurantSelected = (name) => {
    this.setState({
      selected: name
    })
  }

  supplySelectedRestaurant = () => {
    if (!this.state.selected) {
      return undefined;
    }
    return this.state.restaurants.find(r => r.name === this.state.selected)
  }

  render() {
    return (
      <div>
        <RestaurantsList 
          restaurants={this.state.restaurants.map(apiObj => apiObj.name)}
          onItemSelected={this.onRestaurantSelected}
        />
        { this.state.selected
          ? <RestaurantDetails restaurant={this.supplySelectedRestaurant()}/>
          : <div> No selected restaurant! </div>      
      }
      </div>
    );
  }
}

export default App;
