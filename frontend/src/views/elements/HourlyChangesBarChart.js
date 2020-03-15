import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card,
        CardBody,
        CardHeader,
        Dropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem} from 'reactstrap';
import APIConnector from '../../vibe/helpers/APIConnector';
import axios from 'axios';

var today = new Date();
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

class HourlyChangesBarChart extends React.Component {
    constructor(props){
      super(props);
      this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    generateColors(len) {
      var arr = [];
      for (var i = 0; i < len; i++) {
        arr.push('#'+Math.floor(Math.random()*16777215).toString(16));
      }
      return arr;
    }
    

    values = {
        shownDay: this.getDataofDay(days[today.getDay()]),
        dropdownOpen: false,
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13',
      '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        datasets: [
          {
            data: Array(24).fill(3),
            backgroundColor: this.generateColors(24),
            hoverBackgroundColor: this.generateColors(24)
          }
        ]
      };

      state = this.values;
      getDataofDay(day){
        //Axios Get Request
        axios.get(APIConnector["endpoint"] + "hourlyChangesBarChart?day=" + day)
            .then((response) => {
                let data = response.data;
                if (!data.hasOwnProperty("error")){
                  this.values.labels = data.labels;
                  this.values.datasets[0].data = data.data;
                  this.values.dropdownOpen = false;
                  this.values.shownDay = day;
                  this.setState(this.values);
                }
        });
      }
      componentDidMount(){
        //Set default view as the current day
        this.getDataofDay(days[today.getDay()]);
      }
        
    render(){
        return (
          <Card>
              <CardHeader>Hourly Changes on {this.state.shownDay}
                <Dropdown isOpen={this.state.dropdownOpen} className="pull-right" toggle={this.toggle}>
                <DropdownToggle caret size="sm">
                  Day of Week
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => this.getDataofDay("Monday")} >Monday</DropdownItem>
                  <DropdownItem onClick={() => this.getDataofDay("Tuesday")}>Tuesday</DropdownItem>
                  <DropdownItem onClick={() => this.getDataofDay("Wednesday")}>Wednesday</DropdownItem>
                  <DropdownItem onClick={() => this.getDataofDay("Thursday")}>Thursday</DropdownItem>
                  <DropdownItem onClick={() => this.getDataofDay("Friday")}>Friday</DropdownItem>
                  <DropdownItem onClick={() => this.getDataofDay("Saturday")}>Saturday</DropdownItem>
                  <DropdownItem onClick={() => this.getDataofDay("Sunday")}>Sunday</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              </CardHeader>
          <CardBody>
                <div className="full-bleed">
                  <Bar
                  data={this.state}
                  width={2068}
                  height={846}
                  legend={{ display: false }}
                  />
                </div>
          </CardBody>
          </Card>
        );
    }
}

export default HourlyChangesBarChart;