import React from 'react';
import { Line } from 'react-chartjs-2';
import NodeConnector from '../../vibe/helpers/NodeConnector';

class DeletionLineChart extends React.Component {
    values = {
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: '# of Votes',
              data: [3, 6, 4, 10, 8, 12],
              borderColor: 'transparent',
              backgroundColor: 'rgb(68, 159, 238)',
              pointBackgroundColor: 'rgba(0,0,0,0)',
              pointBorderColor: 'rgba(0,0,0,0)',
              borderWidth: 4
            }
          ]
        },
        options: {
          scales: {
            xAxes: [
              {
                display: true
              }
            ],
            yAxes: [
              {
                display: false
              }
            ]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          }
        }
      };

      state = this.values;
      componentDidMount(){
        this.setState(this.values);
        this.eventSource = new EventSource(NodeConnector["endpoint"] + `deletionLineChart`);
        this.eventSource.onmessage = e => {
          let data = JSON.parse(e.data);
          this.values.data.labels = data.labels;
          this.values.data.datasets[0].data = data.data;
          this.setState(this.values);
        }
      }
        
    render(){
        return (
            <Line
            data={this.state.data}
            width={2068}
            height={282}
            legend={{ display: false }}
            options={this.state.options}
            />
        );
    }
}

export default DeletionLineChart;