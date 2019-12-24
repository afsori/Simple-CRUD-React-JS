import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  Button,
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
import Swal from "sweetalert2";

class Charts extends Component {
  constructor(props) {
    super(props);

    this.removeTransactions = this.removeTransactions.bind(this);
    this.updateTransactions = this.updateTransactions.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: true,
      modals: false,
      fadeIn: true,
      timeout: 300,
      transactionsData: [],
      transactionsDataUpdate: {},
      editStatus: "",
      editId: ""
    };
  }

  getTransactions() {
    axios
      .get("http://192.168.6.122:9000/bookingroom")
      .then(res => {
        this.setState({
          transactionsData: res.data.response
        });
      })
      .catch(err => {});
  }

  removeTransactions(id) {
    console.log(id, "apakah dapat id");

    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        axios.delete(`http://192.168.6.122:9000/bookingroom/${id}`).then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          // .then(
          //   () => {
          //     window.location.href = "/#transactions";
          //   }
          // );
          this.getTransactions();
        });
      }
    });
  }

  updateTransactions = id => {
    const id_tra = parseInt(id);
    console.log(id_tra);
    const data = {
      status: "success"
    };

    axios
      .put(`http://192.168.6.122:9000/bookingroom/edit/${id_tra}`, data)
      .then(() => {
        Swal.fire("Good job!", "Data successfully changed!", "success");
        this.getTransactions();
        // this.toggleModalClose();
      })
      .catch(err => console.log(err, "apakah dapat data"));
  };

  componentDidMount() {
    this.getTransactions();
  }

  toggleModal() {
    this.setState({
      modals: !this.state.modals
    });
  }

  toggleModalClose() {
    this.setState({
      modals: !this.state.modals
    });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Transactions Table
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Room Type</th>
                      <th>Star Date</th>
                      <th>End Date</th>
                      <th>Price</th>
                      <th>Location</th>
                      <th>Status</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.transactionsData.map((data, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{data.username}</td>
                        <td>{data.room_type}</td>
                        <td>{data.start_date}</td>
                        <td>{data.end_date}</td>
                        <td>{data.price}</td>
                        <td>{data.location}</td>

                        <td>
                          <Badge color="success">{data.status}</Badge>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="primary"
                            // value={data.id}
                            // onClick={() => {
                            //   this.setState({
                            //     editStatus: data.status
                            //   });
                            //   this.toggleModal();
                            // }}

                            onClick={() =>
                              this.updateTransactions(data.id_transaction)
                            }
                          >
                            <i className="fa fa-edit"></i>update
                          </Button>
                          &nbsp;
                          <Button
                            size="sm"
                            color="danger"
                            // value={data.id}
                            onClick={() =>
                              this.removeTransactions(data.id_transaction)
                            }
                          >
                            <i className="fa fa-trash"></i>delete
                          </Button>
                        </td>
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
            <Modal
              isOpen={this.state.modals}
              toggle={this.toggleModal}
              className={"modal-sm " + this.props.className}
            >
              <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
              <ModalBody>
                <Form encType="multipart/form-data" className="form-horizontal">
                  {/* <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Amount</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="number"
                        id="amount"
                        name="amount"
                        defaultValue={this.state.transactionsDataUpdate.amount}
                      />
                    </Col>
                  </FormGroup> */}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Status</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="status"
                        name="status"
                        onChange={e => {
                          this.setState({
                            editStatus: e.target.value
                          });
                        }}
                        value={this.state.editStatus}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.updateTransactions}>
                  Update
                </Button>{" "}
                <Button color="secondary" onClick={this.toggleModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Charts;
