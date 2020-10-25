import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, Typography } from '@material-ui/core'

import './style.css'

const InfoBox = ({ title, cases, total, active, isRed,...props }) => {
    return (
        <Card
          onClick={props.onClick}
          className={`InfoBox ${active && "InfoBox--selected"} ${
            isRed && "InfoBox--red"
          }`}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <h2 className={`InfoBox__cases ${!isRed && "InfoBox__cases--green"}`}>
              {cases}
            </h2>
            <Typography className="InfoBox__total" color="textSecondary">
              {total} Total
            </Typography>
          </CardContent>
        </Card>
      );
}

InfoBox.propTypes = {
    title: PropTypes.string.isRequired,
    cases: PropTypes.number,
    total: PropTypes.number,
    active: PropTypes.bool,
    isRed: PropTypes.bool,
}

InfoBox.defaultProps = {
    total: 0,
    cases: 0,
    active: false,
    isRed: false,
}

export default InfoBox
