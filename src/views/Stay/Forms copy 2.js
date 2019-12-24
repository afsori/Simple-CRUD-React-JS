import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { connect } from "react-redux";

import { editLibrary } from "../../Public/Redux/Actions/library";

import axios from "axios";

class Forms extends Component {
  constructor(props) {
    super(props);

    this.postVouchers = this.postVouchers.bind(this);
    this.removeVouchers = this.removeVouchers.bind(this);

    this.inputChange = this.inputChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.state = {
      transactionsData: [],
      transactionsDataUpdate: {},
      collapse: true,
      fadeIn: true,
      timeout: 300,
      modals: false,
      userData: [],
      vouchersDataPost: {
        location: "",
        owner: "",
        room_type: "",
        price: "",
        description: "",
        fasilitas: "",
        image: ""
      },
      data: [],
      newBook: {
        price: "",
        room_type: "",
        description: ""
      }
    };
  }

  getStay() {
    axios
      .get("http://192.168.6.122:9000/stay")
      .then(res => {
        this.setState({
          userData: res.data.response
        });
      })
      .catch(err => {});
  }

  postVouchers() {
    const data = {
      location: this.state.vouchersDataPost.location,
      owner: this.state.vouchersDataPost.owner,
      room_type: this.state.vouchersDataPost.room_type,
      price: this.state.vouchersDataPost.price,
      description: this.state.vouchersDataPost.description,
      fasilitas: this.state.vouchersDataPost.fasilitas
    };

    axios.post("http://192.168.6.122:9000/stay/postBooks", data).then(() => {
      this.getStay();
      console.log("ini data");
    });
  }

  removeVouchers(id) {
    console.log(id, "apa dapat id");
    axios.delete(`http://192.168.6.122:9000/stay/${id}`).then(() => {
      this.getStay();
    });
  }

  inputChange(e) {
    let newVouchers = { ...this.state.vouchersDataPost };
    newVouchers[e.currentTarget.name] = e.currentTarget.value;
    console.log(newVouchers);
    this.setState({
      vouchersDataPost: newVouchers
    });
  }

  imageChange(e) {
    let image = { ...this.state.vouchersDataPost };
    image[e.currentTarget.name] = e.target.files[0];
    console.log(image);
    this.setState({
      vouchersDataPost: image
    });
  }

  componentDidMount() {
    this.getStay();
    this.setState({
      newBook: this.props.getbyid.libraryData
    });
    // await this.props.dispatch(editStay(id));
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      newBook: { ...this.state.newBook, [name]: value }
    });
  };

  onSubmit = e => {
    this.setState({
      btnDisabled: "disabled"
    });

    e.preventDefault();
    const { price, room_type } = this.state.newBook;

    const bookData = {
      price,
      room_type
    };
    let id = this.props.match.params.id;

    let edit = async data => {
      await this.props.dispatch(editLibrary(id, data)).then(() => this.gte);
    };
    edit(bookData);
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Col>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Stay Forms</strong>
              </CardHeader>
              <CardBody>
                <Form encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Location </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Location"
                        onChange={this.inputChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Owner </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="owner"
                        name="owner"
                        placeholder="Owner"
                        onChange={this.inputChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Room Type </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="room_type"
                        name="room_type"
                        placeholder="room type"
                        onChange={this.inputChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Price</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        onChange={this.inputChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="textarea"
                        name="description"
                        id="description"
                        rows="9"
                        placeholder="Content..."
                        onChange={this.inputChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Amenities</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="textarea"
                        name="fasilitas"
                        id="fasilitas"
                        rows="9"
                        placeholder="fasilitas..."
                        onChange={this.inputChange}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">Image input</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="file"
                        id="image"
                        name="image"
                        onChange={this.imageChange}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  size="sm"
                  color="primary"
                  onClick={this.postVouchers}
                >
                  <i className="fa fa-dot-circle-o"></i> Submit
                </Button>
                <Button type="reset" size="sm" color="danger">
                  <i className="fa fa-ban"></i> Reset
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Stay Table
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.userData.map((data, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{data.location}</td>
                        <td>{data.room_type}</td>
                        <td>Rp.{data.price}</td>
                        <td>{data.owner}</td>

                        <td>
                          <Button
                            size="sm"
                            color="primary"
                            // value={data.id}
                            // onClick={() => this.toggleModal(data)}
                            // value={data.id_room}
                            // onClick={() => this.toggleModal(data.id_room)}
                          >
                            <i className="fa fa-edit"></i>
                          </Button>
                          &nbsp;
                          <Button
                            size="sm"
                            color="danger"
                            // value={data.id}
                            onClick={() => this.removeVouchers(data.id_room)}
                          >
                            <i className="fa fa-trash"></i>
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
          </Col>
        </Col>

        <Modal
          isOpen={this.state.modals}
          toggle={this.toggleModal}
          className={"modal-sm " + this.props.className}
        >
          <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
          <ModalBody>
            <Form encType="multipart/form-data" className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Price</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="number"
                    id="price"
                    name="price"
                    defaultValue={this.state.transactionsDataUpdate.price}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Room Type</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="room_type"
                    name="room_type"
                    defaultValue={this.state.transactionsDataUpdate.room_type}
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
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    editLibrary: state.editLibrary
  };
};

export default connect(mapStateToProps)(Forms);
