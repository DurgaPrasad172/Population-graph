import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './PopulationChart.css';
Chart.register(...registerables);

const PopulationChart = () => {
  const [populationData, setPopulationData] = useState([]);

  useEffect(() => {
    // Fetch population data from the API
    fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data structure has a 'data' property containing population info
        setPopulationData(data.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Extract Year and Population from fetched data
  const years = populationData.map((entry) => entry.Year);
  const populations = populationData.map((entry) => entry.Population);

  const state = {
    labels: years,
    datasets: [
      {
        label: 'Population',
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Background color for the chart area
        borderColor: 'rgba(54, 162, 235, 1)', // Border color for the line
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Color for the points
        pointBorderColor: '#fff', // Border color for the points
        pointHoverBackgroundColor: '#fff', // Background color for the points on hover
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)', // Border color for the points on hover
        data: populations,
      },
    ],
  };

  return (
    <div className="population-chart">
      <h2 className="chart-heading">Population Chart</h2>
      <Line
        data={state}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Population',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Year',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PopulationChart;
