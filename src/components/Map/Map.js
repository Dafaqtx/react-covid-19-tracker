import React from 'react'
import PropTypes from 'prop-types'
// import { Map as LeafletMap, TileLayer } from "react-leaflet";

import './style.css'

const Map = ({ countries, casesType, center, zoom }) => {
    return (
      <div className="Map">
        {/* <LeafletMap center={center} zoom={zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {showDataOnMap(countries, casesType)}
        </LeafletMap> */}
      </div>
    )
}

Map.propTypes = {

}

export default Map
