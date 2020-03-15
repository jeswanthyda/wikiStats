import React from 'react';
import { Line } from 'react-chartjs-2';
import NodeConnector from '../../vibe/helpers/NodeConnector';
import {
    Col,
    Card,
    CardHeader,
    CardBody
  } from 'reactstrap';

class TrafficLineChart extends React.Component {
    values = {
        addition: {
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
        },
        deletion: {
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
        },
        noedit: {
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
        }
    }
    state = this.values;
    componentDidMount(){
        this.setState(this.values);
        this.eventSource = new EventSource(NodeConnector["endpoint"] + `lineChart`);
        this.eventSource.onmessage = e => {
            let data = JSON.parse(e.data);
            if(data.hasOwnProperty('additionLineChart')){
                this.values.addition.data.labels = data.additionLineChart.labels;
                this.values.addition.data.datasets[0].data = data.additionLineChart.data;
                this.setState(this.values);
            }
            if (data.hasOwnProperty('deletionLineChart')) {
                this.values.deletion.data.labels = data.deletionLineChart.labels;
                this.values.deletion.data.datasets[0].data = data.deletionLineChart.data;
                this.setState(this.values);
            }
            if (data.hasOwnProperty('noeditLineChart')) {
                this.values.noedit.data.labels = data.noeditLineChart.labels;
                this.values.noedit.data.datasets[0].data = data.noeditLineChart.data;
                this.setState(this.values);
            }
        }
    }
        
    render(){
        return (
            <Col md={8} sm={12}>
            <Card>
              <CardHeader>Addition Traffic</CardHeader>
              <CardBody>
                <div className="full-bleed">
                    <Line
                        data={this.state.addition.data}
                        width={2068}
                        height={282}
                        legend={{ display: false }}
                        options={this.state.addition.options}
                    />
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Deletion Traffic</CardHeader>
              <CardBody>
                <div className="full-bleed">
                <Line
                    data={this.state.deletion.data}
                    width={2068}
                    height={282}
                    legend={{ display: false }}
                    options={this.state.deletion.options}
                />
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>Noedit Traffic</CardHeader>
              <CardBody>
                <div className="full-bleed">
                <Line
                    data={this.state.noedit.data}
                    width={2068}
                    height={282}
                    legend={{ display: false }}
                    options={this.state.noedit.options}
                />
                </div>
              </CardBody>
            </Card>
            </Col>
        );
    }
}

export default TrafficLineChart;