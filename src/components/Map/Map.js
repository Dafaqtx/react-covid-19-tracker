import React from 'react'
import PropTypes from 'prop-types'
import { Map as LeafletMap, TileLayer } from "react-leaflet";

import { showDataOnMap } from "../../utils";

import './style.css'

const Map = ({ countries, casesType, center, zoom }) => {
    return (
      <div className="Map">
        <LeafletMap center={center} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {showDataOnMap(countries, casesType)}
        </LeafletMap>
      </div>
    )
}

Map.propTypes = {
  countries: PropTypes.array.isRequired,
  casesType: PropTypes.string.isRequired,
  center: PropTypes.oneOfType([PropTypes.array,PropTypes.object]).isRequired,
  zoom: PropTypes.number.isRequired,
}

export default Map
