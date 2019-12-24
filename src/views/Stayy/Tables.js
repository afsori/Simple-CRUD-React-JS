import React, { Component } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from "reactstrap";

import axios from "axios";

class Tables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersData: []
    };
  }

  getUsers() {
    axios
      .get("http://192.168.6.122:9000/stay")
      .then(res => {
        this.setState({
          usersData: res.data.response
        });
        console.log("userData");
      })
      .catch(err => {});
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Simple Table
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <td>No.</td>
                      <th>Location</th>
                      <th>Room Type</th>
                      <th>Price</th>
                      <th>Owner</th>
                      {/* <th>Status</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.usersData.map((data, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{data.location}</td>
                        <td>{data.room_type}</td>
                        <td>Rp.{data.price}</td>
                        <td>{data.owner}</td>
                        {/* <td>
                          <Badge color="success">Premium</Badge>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Tables;
