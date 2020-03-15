import React from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Modal, 
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Table
} from 'reactstrap';
import NodeConnector from '../../vibe/helpers/NodeConnector';


class KeyChangesCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            additionModal: false,
            deletionModal: false,
            noeditModal: false
        };

        this.additionToggle = this.additionToggle.bind(this);
        this.deletionToggle = this.deletionToggle.bind(this);
        this.noeditToggle = this.noeditToggle.bind(this);
    }
    additionToggle() {
        this.setState(prevState => ({
            additionModal: !prevState.additionModal
        }));
    }
    deletionToggle() {
        this.setState(prevState => ({
            deletionModal: !prevState.deletionModal
        }));
    }
    noeditToggle() {
        this.setState(prevState => ({
            noeditModal: !prevState.noeditModal
        }));
    }

    values = {
        "additions": 3,
        "deletions": 3,
        "noedits": 3,
        "usersadditionsCount": 4,
        "usersdeletionsCount": 4,
        "usersnoeditsCount": 4,
        "usersadditionsList": [],
        "usersdeletionsList": [],
        "usersnoeditsList": []
    }
    state = this.values;
    UNSAFE_componentWillMount(){
        this.setState(this.values);
        this.eventSource = new EventSource(NodeConnector["endpoint"] + `keyChangesCard`);
        this.eventSource.onmessage = e => {
          let data = JSON.parse(e.data);
          this.values = data;
          this.setState(this.values);
        }
    }
    render(){
        return(
        <Card>
            <CardHeader>Key Changes</CardHeader>
            <CardBody>
            <Row className="m-b-md">
                <Col xs={4}>
                <h5>Additions</h5>
                <div className="h2">{this.state.additions}</div>
                <button className="btn-sm btn btn-link" onClick={this.additionToggle}>{this.state.usersadditionsCount} Visitors</button>
                <Modal isOpen={this.state.additionModal} toggle={this.additionToggle}>
                        <ModalHeader toggle={this.additionToggle}>Top Ten Adders</ModalHeader>
                        <ModalBody>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Username</th>
                                        <th>No-Edit Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.usersadditionsList.map((value, index) => {
                                    return (
                                    <tr key={index}><td>{index+1}</td><td>{value[0]}</td><td>{value[1]}</td></tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.additionToggle}>Close</Button>
                        </ModalFooter>
                </Modal>
                </Col>
                <Col xs={4}>
                <h5>Deletions</h5>
                <div className="h2">{this.state.deletions}</div>
                <button className="btn-sm btn btn-link" href="#" onClick={this.deletionToggle}>{this.state.usersdeletionsCount} Visitors</button>
                <Modal isOpen={this.state.deletionModal} toggle={this.deletionToggle}>
                        <ModalHeader toggle={this.deletionToggle}>Top Ten Deleters</ModalHeader>
                        <ModalBody>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Username</th>
                                        <th>No-Edit Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.usersdeletionsList.map((value, index) => {
                                    return <tr key={index}><td>{index+1}</td><td>{value[0]}</td><td>{value[1]}</td></tr>
                                })}
                                </tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.deletionToggle}>Close</Button>
                        </ModalFooter>
                </Modal>
                </Col>
                <Col xs={4}>
                <h5>No Edits</h5>
                <div className="h2">{this.state.noedits}</div>
                <button className="btn-sm btn btn-link" href="#" onClick={this.noeditToggle}>{this.state.usersnoeditsCount} Visitors</button>
                <Modal isOpen={this.state.noeditModal} toggle={this.noeditToggle}>
                        <ModalHeader toggle={this.noeditToggle}>Top Ten Time Wasters</ModalHeader>
                        <ModalBody>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Username</th>
                                        <th>No-Edit Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.usersnoeditsList.map((value, index) => {
                                    return <tr key={index}><td>{index+1}</td><td>{value[0]}</td><td>{value[1]}</td></tr>
                                })}
                                </tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.noeditToggle}>Close</Button>
                        </ModalFooter>
                </Modal>
                </Col>
            </Row>
            </CardBody>
        </Card>
        );
    }
}

export default KeyChangesCard;