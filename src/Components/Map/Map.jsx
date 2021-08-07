import React from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl';

import marker from '../../marker.svg'
import './Map.css'
function Map({ parkData, viewport, onViewportChange, onClick, popup, closePopup }) { 
  return (
    <div id="map" className="map-container">
      <ReactMapGL
        {...viewport}
        onViewportChange={onViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/fakekoji/ckmsvgin11q5g17p8ilwinsoe"
      >
        {parkData.map((park) => {
          return(
            <Marker
              key={park._id}
              longitude={park.LONGITUDE}
              latitude={park.LATITUDE}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  onClick(park);
                }}
              >
                <img src={marker} alt="Icons made by Freepik from www.flaticon.com"></img>
              </button>
            </Marker>
          )
        })}
        {popup ? (
          <Popup
            latitude = {popup.latitude}
            longitude = {popup.longitude}
          >
            <h3>{popup.name}</h3>
            <h4>{popup.neighborhood}</h4>
            <h4>{popup.county}</h4>
            <div
              class="close-button"
              type="button"
              onClick={closePopup}
              >
            </div>
          </Popup>
        ) : null}
  
      </ReactMapGL>
    </div>
  )
}

export default Map
