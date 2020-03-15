import React from 'react';
import { Doughnut} from 'react-chartjs-2';
import NodeConnector from '../../vibe/helpers/NodeConnector';

class DomainCountDynamicDonut extends React.Component {
    generateColors(len) {
      var arr = [];
      for (var i = 0; i < len; i++) {
        arr.push('#'+Math.floor(Math.random()*16777215).toString(16));
      }
      return arr;
    }
    values = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
        datasets: [
          {
            data: [300, 50, 100, 10, 10, 10, 10],
            backgroundColor: this.generateColors(7),
            hoverBackgroundColor: this.generateColors(7)
          }
        ]
      };
      state = this.values;
      UNSAFE_componentWillMount(){
        this.eventSource = new EventSource(NodeConnector["endpoint"] + "domainCountDonut");
        this.eventSource.onmessage = e => {
          let data = JSON.parse(e.data);
          this.values.labels = data.labels;
          this.values.datasets[0].data = data.data;
          this.setState(this.values);
        }
      }
        
    render(){
        return (
            <Doughnut
                data={this.state}
                width={908}
                height={768}
                legend={{ display: false }}
            />
        );
    }
}

export default DomainCountDynamicDonut;