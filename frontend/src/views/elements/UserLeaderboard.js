import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import NodeConnector from '../../vibe/helpers/NodeConnector';

class UserLeaderboard extends React.Component {
    generateColors(len) {
      var arr = [];
      for (var i = 0; i < len; i++) {
        arr.push('#'+Math.floor(Math.random()*16777215).toString(16));
      }
      return arr;
    }
    chartColors = {
        red: 'rgb(233, 30, 99)',
        danger: 'rgb(233, 30, 99)',
        dangerTransparent: 'rgba(233, 30, 99, .8)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 180, 0)',
        green: 'rgb(34, 182, 110)',
        blue: 'rgb(68, 159, 238)',
        primary: 'rgb(68, 159, 238)',
        primaryTransparent: 'rgba(68, 159, 238, .8)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)',
  
        primaryShade1: 'rgb(68, 159, 238)',
        primaryShade2: 'rgb(23, 139, 234)',
        primaryShade3: 'rgb(14, 117, 202)',
        primaryShade4: 'rgb(9, 85, 148)',
        primaryShade5: 'rgb(12, 70, 117)'
    };

    values = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: this.generateColors(10),
            hoverBackgroundColor: this.generateColors(10)
          }
        ]
      };

      options = {
        scales: {
          xAxes: [{
              gridLines: {
                  drawOnChartArea: false
              }
          }],
          yAxes: [{
              gridLines: {
                  drawOnChartArea: false
              }
          }]
        }
      };

      state = this.values;
      UNSAFE_componentWillMount(){
        this.eventSource = new EventSource(NodeConnector["endpoint"] + `userLeaderboard`);
        this.eventSource.onmessage = e => {
          let data = JSON.parse(e.data);
          this.values.labels = data.labels;
          this.values.datasets[0].data = data.data;
          this.setState(this.values);
        }
      }
        
    render(){
        return (
            <HorizontalBar
                data={this.state}
                width={846}
                height={800}
                legend={{ display: false }}
                options={this.options}
            />
        );
    }
}

export default UserLeaderboard;