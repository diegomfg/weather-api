import React, { Component } from "react";
import axios from "axios";
import Wrapper from "./HOC/Wrapper";

const geoApiToken =
  "pk.eyJ1IjoiZGllZ29tZmciLCJhIjoiY2p3eTU0b2pwMDBuZTQ5bzFzbnF1NnA3MSJ9.4PNeV8Pr0pye2xVU6VxIFw";

class Api extends Component {
  state = {
    isModalOpen: false,
    geolocationUrl: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
      "Miami Florida"
    )}.json?access_token=${geoApiToken}`
  };

  setGeoUrl = () => {
    let cityToVisit = document.getElementById("input").value;
    if (!cityToVisit) {
      cityToVisit = "Miami Florida";
    }

    this.setState({ city: cityToVisit });
    let encodedComponent = encodeURIComponent(cityToVisit);
    let newUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedComponent}.json?access_token=${geoApiToken}`;

    this.setState({
      geolocationUrl: newUrl
    });
  };

  fetchGeolocation = async () => {
    try {
      // sets the geolocation URL after getting the input from the user
      await this.setGeoUrl();

      // fetching the latitude (center[1]) and longitude (center[0])
      let response = await axios.get(this.state.geolocationUrl);
      const { center } = response.data.features[0];
      let latitude = center[1];
      let longitude = center[0];

      /**
       * @param latitude is the latitude of the city, collected from the Geolocation API
       * @param longitude is the longitude of the city, collected from the Geolocation API
       */
      this.fetchDarksky(latitude, longitude);
    } catch (error) {
      this.setState({ error: "Unable to connect to the service!" });
      console.log(error);
    }
  };

  /**
   * @implements an api (proxy) call to the server and fetches the entire data
   * @author Diego A. Matheus
   */

  fetchDarksky = async (latitude = 0, longitude = 0) => {
    try {
      let response = await axios.get(`/api/weather/${latitude}/${longitude}`);

      this.setState({ data: response.data, isModalOpen: true });
    } catch (error) {
      this.setState({ error: "Unable to connect to the service!" });
      console.log(error);
      console.log("error fetchDarksky");
    }
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen
    }));
  };

  render() {
    return (
      <React.Fragment>
        <Wrapper
          className="Wrapper"
          fetchGeolocation={this.fetchGeolocation}
          toggleModal={this.toggleModal}
          isModalOpen={this.state.isModalOpen}
          data={this.state.data}
          city={this.state.city}
        />
      </React.Fragment>
    );
  }
}

export default Api;
