import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import numeral from "numeral";
import { Line } from 'react-chartjs-2'

import { getHistoricalData } from '../../api'

import './style.css'

const LineGraph = ({ casesType }) => {
  const [data, setData] = useState({})

  const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint = 0;

    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    getHistoricalData(120).then(data => {
      const chartData = buildChartData(data, casesType);
      setData(chartData);
    })
  }, [casesType])

  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: (tooltipItem) => numeral(tooltipItem.value).format("+0,0"),
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            callback: (value) => numeral(value).format("0a"),
          },
        },
      ],
    },
  };

  const lineGraphData = {
    datasets: [
      {
        backgroundColor: "rgba(204, 16, 52, 0.5)",
        borderColor: "#CC1034",
        data: data,
      },
    ],
  }

  return (
    <div className="LineGraph">
      {Object.keys(data).length ? (
        <Line
          data={lineGraphData}
          options={options}
        />
      ) : 'Loading...'}
    </div>
  )
}

LineGraph.propTypes = {
  casesType: PropTypes.string.isRequired,
}

export default LineGraph
