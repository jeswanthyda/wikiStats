import React, { Component } from 'react';
import reactFeature from '../../assets/images/react-feature.svg';
import NodeJSFeature from '../../assets/images/node-js.png';
import SparkStreamingFeature from '../../assets/images/spark-streaming.png';
import ApacheKafkaFeature from '../../assets/images/apache-kafka.png';
import MongoDBFeature from '../../assets/images/mongo-db.jpg';
import GCPFeature from '../../assets/images/gcp.png';
import HerokuFeature from '../../assets/images/heroku.png';
import AWSFeature from '../../assets/images/aws.png';
import { Card, CardBody, Row, Col } from 'reactstrap';

class Dashboard extends Component {
  render() {
    const heroStyles = {
      padding: '50px 0 70px'
    };

    return (
      <div>
        <Row>
          <Col md={6}>
            <div className="home-hero" style={heroStyles}>
              <h1>Welcome to WikiStats.</h1>
              <p className="text-muted">
                Responsive and dynamic analytics dashboard to consume processed streams from the base Wikipedia
                RecentChanges EventSource stream.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card>
              <CardBody className="display-flex">
                <img
                  src={reactFeature}
                  style={{ width: 70, height: 70 }}
                  alt="react.js"
                  aria-hidden={true}
                />
                <div className="m-l">
                  <h2 className="h4">React.js</h2>
                  <p className="text-muted">
                    Scaffolding framework for quick and easy interface design.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardBody className="display-flex" >
                <img
                  src={SparkStreamingFeature}
                  style={{ width: 90, height: 70 }}
                  alt="Spark Streaming"
                  aria-hidden={true}
                />
                <div className="m-l">
                  <h2 className="h4">Spark Stream Processing</h2>
                  <p className="text-muted">
                    Dstream based data processing engine to handle RecentChanges stream.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card>
              <CardBody className="display-flex">
                <img
                  src={NodeJSFeature}
                  style={{ width: 70, height: 70 }}
                  alt="NodeJS"
                  aria-hidden={true}
                />
                <div className="m-l">
                  <h2 className="h4">Node.js Backend</h2>
                  <p className="text-muted">
                    EventSource stream producer to allow for dynamic visualizations.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardBody className="display-flex">
                <img
                  src={ApacheKafkaFeature}
                  style={{ width: 50, height: 70 }}
                  alt="Apache Kafka"
                  aria-hidden={true}
                />
                <div className="m-l">
                  <h2 className="h4">Apache Kafka Pub/Sub</h2>
                  <p className="text-muted">
                    Topic wise messaging platform to exchange processed data in JSON form.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card>
              <CardBody className="display-flex">
                <img
                  src={MongoDBFeature}
                  style={{ width: 70, height: 70 }}
                  alt="MongoDB"
                  aria-hidden={true}
                />
                <div className="m-l">
                  <h2 className="h4">MongoDB</h2>
                  <p className="text-muted">
                    Document-based database to hold persistent statistics over time.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardBody className="display-flex" >
                <img
                  src={GCPFeature}
                  style={{ width: 120, height: 70 }}
                  alt="GCP"
                  aria-hidden={true}
                />
                <div className="m-l">
                  <h2 className="h4">GCP</h2>
                  <p className="text-muted">
                    Compute Engine and Dataproc cluster to manage Kafka and process streams.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card>
              <CardBody className="display-flex">
                <img
                  src={AWSFeature}
                  style={{ width: 70, height: 50 }}
                  alt="AWS"
                  aria-hidden={true}
                />
                <div className="m-l">
                  <h2 className="h4">AWS</h2>
                  <p className="text-muted">
                    Static web hosting in S3 bucket for ReactJS frontend application.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardBody className="display-flex" >
                <img
                  src={HerokuFeature}
                  style={{ width: 90, height: 70 }}
                  alt="Heroku"
                  aria-hidden={true}
                />
                <div className="m-l">
                  <h2 className="h4">Heroku</h2>
                  <p className="text-muted">
                    Deployment system for Node.js backend server. Linked to Git pipeline.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
