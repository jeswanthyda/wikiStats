import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Progress
} from 'reactstrap';
import NodeConnector from '../../vibe/helpers/NodeConnector';


class BotPercentCard extends React.Component {
    values = {
        "botPercent": 3,
        "botPercentOld": 2,
    };
    state = this.values;
    UNSAFE_componentWillMount(){
        this.eventSource = new EventSource(NodeConnector["endpoint"] + `botPercent`);
        this.eventSource.onmessage = e => {
          let data = JSON.parse(e.data);
          this.values.botPercentOld = this.values.botPercent;
          this.values.botPercent = data.percent;
          this.setState(this.values);
        }
    }
    render(){
        return(
            <Card>
              <CardHeader>
                Bot Changes
              </CardHeader>
              <CardBody>
                <h2 className="m-b-md inline-block">
                  <span>{this.state.botPercent}%</span>
                </h2>{' '}
                {(this.state.botPercent >= this.state.botPercentOld) ? 
                 <i
                    className="fa fa-caret-up text-success"
                    aria-hidden="true"
                  /> : 
                <i
                className="fa fa-caret-down text-danger"
                aria-hidden="true"
              />}
                <Progress value={this.state.botPercent} color="warning" />
              </CardBody>
            </Card>
        );
    }
}

export default BotPercentCard;