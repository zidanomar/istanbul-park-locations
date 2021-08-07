import React, { useState } from 'react'
import {FlyToInterpolator} from 'react-map-gl';

import './App.css';
import { values as parks } from './istanbulPark'
import Sidebar from './Components/Sidenav/Sidebar';
import Map from './Components/Map/Map';
import Navbar from './Components/Navbar/Navbar';

function App() {

  const [viewport, setViewport] = useState({
    longitude:29.2981822,
    latitude:41.0225292,
    width: "100%",
    height: "100vh",
    zoom: 9,
    transitionDuration: 2000,
    transitionInterpolator: new FlyToInterpolator()
  });

  const [selectedPark, setSelectedPark] = useState(null)
  const [inputFilter, setInputFilter] = useState('')
  // const [parks, setParks] = useState(values);

  const filteredParks = parks.filter(park => (
    park.COUNTY_NAME.toLocaleLowerCase().includes(inputFilter.toLocaleLowerCase()) ||
    park.NAME.toLocaleLowerCase().includes(inputFilter.toLocaleLowerCase())
  ))

  const listener = e => {
    if (e.key === "Escape") {
      setSelectedPark(null);
    }
  };
  window.addEventListener("keydown", listener);

  const handleClick = (p) => {
    setViewport({
      latitude : p.LATITUDE,
      longitude : p.LONGITUDE,
      width : "100%",
      height : "100vh",
      zoom : 14,
      transitionDuration : 2000,
      transitionInterpolator : new FlyToInterpolator()
    })
    setSelectedPark({
      latitude : p.LATITUDE,
      longitude : p.LONGITUDE,
      name : p.NAME,
      neighborhood : p.NEIGHBORHOOD_NAME,
      county : p.COUNTY_NAME
    })
  }

  const closePopup = () => {
    setSelectedPark(null);
  }
  return (
    <div className="App">
      <Sidebar
        parkData = {filteredParks}
        onClick = {(park) => {
          handleClick(park)
        }} 
        setInputFilter = {setInputFilter}
      />
      <Navbar />
      <Map
        parkData = {filteredParks}
        viewport = {viewport}
        onViewportChange = {setViewport}
        onClick = {(park) => {
          handleClick(park)
        }}
        popup = {selectedPark}
        closePopup = {closePopup}
      />
    </div>
  );
}

export default App;
