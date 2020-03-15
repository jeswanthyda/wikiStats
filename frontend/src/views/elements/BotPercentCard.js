import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Progress
} from 'reactstrap';
import NodeConnector from '../../vibe/helpers/NodeConnector';


class BotPercentCard extends React.Component {
    values = {
        "botPercent": 3
    };
    state = this.values;
    UNSAFE_componentWillMount(){
        this.eventSource = new EventSource(NodeConnector["endpoint"] + `botPercent`);
        this.eventSource.onmessage = e => {
          let data = JSON.parse(e.data);
          this.values.botPercent = data.percent;
          this.setState(this.values);
        }
    }
    render(){
        return(
            <Card>
              <CardHeader>
                Bot Changes
                <Button size="sm" className="pull-right">
                  View
                </Button>
              </CardHeader>
              <CardBody>
                <h2 className="m-b-md inline-block">
                  <span>{this.state.botPercent}%</span>
                </h2>{' '}
                <i
                  className="fa fa-caret-down text-danger"
                  aria-hidden="true"
                />
                <Progress value={this.state.botPercent} color="warning" />
              </CardBody>
            </Card>
        );
    }
}

export default BotPercentCard;