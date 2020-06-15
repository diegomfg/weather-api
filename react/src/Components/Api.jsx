import React, { useState, useEffect } from "react";
import axios from 'axios';
import Wrapper from "./HOC/Wrapper";

const geoApiToken = "pk.eyJ1IjoiZGllZ29tZmciLCJhIjoiY2p3eTU0b2pwMDBuZTQ5bzFzbnF1NnA3MSJ9.4PNeV8Pr0pye2xVU6VxIFw";

/**
 * Starting class.
 * @param props
 * @returns {*}
 * @constructor
 */
const API  = (props)=>{


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cityToVisit, setCityToVisit] = useState('Miami Florida');
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [geoLocationUrl, setGeoLocationUrl] = useState(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(cityToVisit)}.json?access_token=${geoApiToken}`);

  const toggleModal = () => {
    return setIsModalOpen(!isModalOpen);
  };

  /**
   * @implements an api (proxy) call to the server and fetches the entire data
   * @author Diego A. Matheus
   */

  const fetchDarksky = async (latitude = 0, longitude = 0) => {

      axios.get(`http://localhost:9000/api/weather/${latitude}/${longitude}`).then((response)=>{
        setData(response.data);
          setIsModalOpen(true);
      }).catch((error)=>{
          console.log(error);
          console.log("error fetchDarkSky");
          setError(error.message);
      });


  };
  const fetchGeolocation = async () => {
    try {
      // sets the geolocation URL after getting the input from the user
      setGeoUrl()
      // fetching the latitude (center[1]) and longitude (center[0])
      let response = await axios.get(geoLocationUrl);
      const { center } = response.data.features[0];
      let latitude = center[1];
      let longitude = center[0];

      /**
       * @param latitude is the latitude of the city, collected from the Geolocation API
       * @param longitude is the longitude of the city, collected from the Geolocation API
       */
      fetchDarksky(latitude, longitude);
    } catch (error) {
      setError("Unable to connect to the service!");
      console.log(error);
    }
  };
  const setGeoUrl = () => {

    if (!cityToVisit) {
      setCityToVisit("Miami Florida")
    }

    setCityToVisit(cityToVisit)
    let encodedComponent = encodeURIComponent(cityToVisit);
    let newUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedComponent}.json?access_token=${geoApiToken}`;

    return setGeoLocationUrl(newUrl)
  };

 const onCityChange = (value)=>{
     setCityToVisit(value)
 }

  return (
      <React.Fragment>
        <Wrapper
            className="Wrapper"
            fetchGeolocation={fetchGeolocation}
            toggleModal={toggleModal}
            isModalOpen={isModalOpen}
            data={data}
            city={cityToVisit}
            setCity={onCityChange}
        />
      </React.Fragment>
  );
}

export default API;
