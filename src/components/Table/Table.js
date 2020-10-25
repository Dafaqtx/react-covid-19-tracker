import React from 'react'
import PropTypes from 'prop-types'

import "./style.css"

const Table = ({countries = []}) => {
    return (
      <div className="Table">
        <table>
          <tbody>
            {countries.map(({country, cases}, i) => (
              <tr key={i}>
                <td>{country}</td>
                <td>{cases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}

Table.propTypes = {
  countries: PropTypes.array.isRequired,
}

export default Table
