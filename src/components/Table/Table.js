import React from 'react'
import PropTypes from 'prop-types'

import "./style.css"

const Table = ({countries}) => {
    return (
      <table className="Table">
        <tbody>
          {countries.map(({country, cases}, i) => (
            <tr key={i}>
              <td>{country}</td>
              <td>{cases}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

Table.propTypes = {
  countries: PropTypes.array.isRequired,
}

export default Table
