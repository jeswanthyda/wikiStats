import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Progress,
    Row,
    Col,
} from 'reactstrap';
import NodeConnector from '../../vibe/helpers/NodeConnector';


class TopWikiCards extends React.Component {
    values = {
        data: []
    }

    UNSAFE_componentWillMount(){
        this.setState(this.values);
        this.eventSource = new EventSource(NodeConnector["endpoint"] + `topWikiCards`);
        this.eventSource.onmessage = e => {
          let data = JSON.parse(e.data);
          this.values = data;
          this.setState(this.values);
        }
    }
    render(){
        let progColors = ["warning", "success", "primary"]
        return(
            <Row>
            {this.state.data.map((value, index) => {
                return (
                <Col key={Math.random()} md={4} xs={12}>
                <Card key={Math.random()}>
                  <CardHeader key={Math.random()}>
                    {value['domain']}{' '}
                    <Button key={Math.random()}size="sm" className="pull-right" onClick={ () => window.open('https://' + value['domain']) }>
                      View
                    </Button>
                  </CardHeader>
                  <CardBody key={Math.random()}>
                    <h2 className="m-b-20 inline-block">
                      <span>{value['count']}</span>
                    </h2>{' '}
                    <i
                      className="fa"
                      aria-hidden="true"
                    />
                    <Progress key={Math.random()} value={value['percent']} color={progColors[index]} />
                  </CardBody>
                </Card>
                </Col>
                )
            })}
          </Row>
        );
    }
}

export default TopWikiCards;