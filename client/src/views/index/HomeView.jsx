import React, { Component } from "react";
import "../CenterView.css";
import ErrorMessage from "../../components/ErrorMessage";
import { getInputCoordinates } from "../../services/geocoder";
import { getUserCoordinates } from "../../services/geocoder";
import { getUserLocation } from "../../services/geocoder";

export class HomeView extends Component {
  constructor() {
    super();
    this.state = {
      category: "",
      location: "",
      error: null
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await getInputCoordinates(this.state.location);
      if (!data.results[0]) throw new Error("Unable to find that place");
      const lng = data.results[0].geometry.location.lng;
      const lat = data.results[0].geometry.location.lat;
      const location = data.results[0].address_components[0].long_name;
      const coordinates = [lng, lat];
      this.props.handleCoordinatesUpdate(coordinates);
      this.props.handleLocationUpdate(location);
      this.props.handleCategoryUpdate(this.state.category);
      this.props.history.push(`/things/list`);
    } catch (error) {
      this.setState({ error });
    }
  };

  handleNearbySubmit = async (event) => {
    event.preventDefault();
    try {
      const coordinateData = await getUserCoordinates();
      const lng = coordinateData.coords.longitude;
      const lat = coordinateData.coords.latitude;
      const coordinates = [lng, lat];
      this.props.handleCoordinatesUpdate(coordinates);
      this.props.handleCategoryUpdate(this.state.category);
      const locationData = await getUserLocation(coordinates);
      const location = locationData.results[0].address_components[2].long_name;
      this.props.handleLocationUpdate(location);
      this.props.history.push(`/things/list`);
    } catch (error) {
      this.setState({
        error: error.response.data.error
      });
    }
  };

  handleClearError = () => {
    this.setState({ error: null });
  };

  render() {
    return (
      <main id="home-main">
        <div className="container center">
          <div id="home-top-row" className="row form-wrapper">
            <div className="col">
              <form onSubmit={this.handleSearchSubmit}>
                <div className="form-group">
                  <label htmlFor="category-select">Category</label>
                  <select
                    className="form-control"
                    id="category-select"
                    name="category"
                    value={this.state.category}
                    onChange={this.handleInputChange}
                  >
                    <option value="all the things">all the things</option>
                    <option value="art things">art things</option>
                    <option value="athletic things">athletic things</option>
                    <option value="auto things">auto things</option>
                    <option value="clothing things">clothing things</option>
                    <option value="collectible things">collectible things</option>
                    <option value="electronic things">electronic things</option>
                    <option value="equipment things">equipment things</option>
                    <option value="furniture things">furniture things</option>
                    <option value="household things">household things</option>
                    <option value="music things">music things</option>
                    <option value="media things">media things</option>
                    <option value="recreation things">recreation things</option>
                    <option value="tool things">tool things</option>
                    <option value="toy things">toy things</option>
                    <option value="yard things">yard things</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="location-input">Location</label>
                  <input
                    className="form-control"
                    id="location-input"
                    type="text"
                    name="location"
                    placeholder="Whereabouts?"
                    value={this.state.location}
                    onChange={this.handleInputChange}
                  />
                </div>
                <button className="btn btn-primary">Search Things</button>
              </form>
            </div>
            <div id="home-bottom-row" className="row">
              <div className="col">
                <h3 id="sharing">Sharing Is Caring</h3>
                <p>
                  Borrowly is a community for lending/borrowing things, no strings attached. Discover what the nice
                  folks nearby have up for grabs.
                </p>
                <form onSubmit={this.handleNearbySubmit}>
                  <button className="btn btn-primary">Nearby Things</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {this.state.error && (
          <ErrorMessage
            classToAdd="error-center"
            message={this.state.error.message}
            handleClearError={this.handleClearError}
          />
        )}
      </main>
    );
  }
}

export default HomeView;
