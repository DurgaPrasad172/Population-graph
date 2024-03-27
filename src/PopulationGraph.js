import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './PopulationGraph.css';

class PopulationGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populationData: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then(data => {
        const populationData = data.data.map(item => ({
          year: item.Year,
          population: item.Population
        }));
        this.setState({ populationData, loading: false });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  render() {
    const { populationData, loading, error } = this.state;

    if (loading) {
      return <div className="graph-container"><div className="loading">Loading...</div></div>;
    }

    if (error) {
      return <div className="graph-container"><div className="error">Error: {error.message}</div></div>;
    }

    return (
      <div className="graph-container">
        <h2 className="graph-title">Population Data for Different Nations</h2>
        <div className="line-chart">
          <LineChart width={800} height={400} data={populationData} margin={{ top: 20, right: 30, left: 70, bottom: 20 }}>
            <CartesianGrid strokeDasharray="4 3" />
            <XAxis dataKey="year" label={{ position: 'bottom', dy: 10, className: 'axis-label' }} />
            <YAxis  label={{ value:'population',angle: -90, position: 'insideLeft', dx: -30, className: 'axis-label' }} />
            <Tooltip />
            <Legend wrapperStyle={{ paddingBottom: '20px' }} />
            <Line type="monotone" dataKey="population" stroke="#3E517A" strokeWidth={2} dot={{ stroke: '#3E517A', fill: '#fff' }} />
          </LineChart>
        </div>
      </div>
    );
  }
}

export default PopulationGraph;
