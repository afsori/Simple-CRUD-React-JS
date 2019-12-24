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

import axios from "axios";
import Swal from "sweetalert2";
class Forms extends Component {
  constructor(props) {
    super(props);

    this.postExperience = this.postExperience.bind(this);
    this.updateTransactions = this.updateTransactions.bind(this);

    this.removeVouchers = this.removeVouchers.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      transactionsData: [],
      transactionsDataUpdate: {},
      collapse: true,
      fadeIn: true,
      timeout: 300,
      modals: false,
      experienceData: [],
      experienceDataPost: {
        location: "",
        image_url: "",
        packet_name: "",
        price: "",
        latitude: "",
        longitude: ""
      },
      editLocation: "",
      editPacketname: "",
      editImage_url: "",
      editPrice: "",
      editLatitude: "",
      editLongitude: "",
      editId: ""
    };
  }

  getExperience() {
    axios
      .get("http://192.168.6.122:9000/experience")
      .then(res => {
        this.setState({
          experienceData: res.data.response
        });
      })
      .catch(err => {});
  }

  postExperience() {
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data"
    //   }
    // };

    const data = {
      location: this.state.experienceDataPost.location,
      image_url: this.state.experienceDataPost.image_url,
      packet_name: this.state.experienceDataPost.packet_name,
      price: this.state.experienceDataPost.price,
      latitude: this.state.experienceDataPost.latitude,
      longitude: this.state.experienceDataPost.longitude
    };
    axios
      .post("http://192.168.6.122:9000/experience/postExperience", data)
      .then(() => {
        Swal.fire(
          "Congratulations!",
          "Data has been entered successfully!",
          "success"
        );
        this.getExperience();
      });
  }

  removeVouchers(id) {
    // let id = this.props.match.params.id;
    console.log(id, "dapat id");

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
        axios.delete(`http://192.168.6.122:9000/experience/${id}`).then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          this.getExperience();
        });
      }
    });
  }

  // Update Experience
  updateTransactions = () => {
    const data = {
      location: this.state.editLocation,
      packet_name: this.state.editPacketname,
      image_url: this.state.editImage_url,
      price: this.state.editPrice,
      latitude: this.state.editLatitude,
      longitude: this.state.editLongitude
    };
    axios
      .put(
        `http://192.168.6.122:9000/experience/edit/${this.state.editId}`,
        data
      )
      .then(() => {
        Swal.fire("Good job!", "Data successfully changed!", "success");
        this.getExperience();
        this.toggleModalClose();
      })
      .catch(err => console.log(err, "data tidak dapat"));
  };

  inputChange(e) {
    let newVouchers = { ...this.state.experienceDataPost };
    newVouchers[e.currentTarget.name] = e.currentTarget.value;
    console.log(newVouchers);
    this.setState({
      experienceDataPost: newVouchers
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
    this.getExperience();
  }

  // Modal
  // toggleModal(row) {
  //   this.setState({});
  // }
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
        <Col>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Experience Forms</strong>
              </CardHeader>
              <CardBody>
                <Form encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Name Location </Label>
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
                      <Label htmlFor="text-input">Packet name </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="packet_name"
                        name="packet_name"
                        placeholder="Packet name"
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
                      <Label htmlFor="text-input">Latitude</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="latitude"
                        name="latitude"
                        placeholder="Latitude"
                        onChange={this.inputChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Longitude</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="longitude"
                        name="longitude"
                        placeholder="Longitude"
                        onChange={this.inputChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Detail</Label>
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
                      <Label htmlFor="date-input">Image Input</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="image_url"
                        name="image_url"
                        placeholder="Image"
                        onChange={this.inputChange}
                      />
                    </Col>
                  </FormGroup>
                  {/* <FormGroup row>
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
                  </FormGroup> */}
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  type="submit"
                  size="sm"
                  color="primary"
                  onClick={this.postExperience}
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
                <i className="fa fa-align-justify"></i> Experince Table
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <td>No.</td>
                      <th>Location</th>
                      <th>Paket Name</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.experienceData.map((data, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{data.location}</td>
                        <td>{data.packet_name}</td>
                        <td>Rp.{data.price}</td>

                        <td>
                          <Button
                            size="sm"
                            color="primary"
                            // value={data.id}
                            onClick={() => {
                              this.setState({
                                editLocation: data.location,
                                editPacketname: data.packet_name,
                                editId: data.id_experience,
                                editImage_url: data.image_url,
                                editLatitude: data.latitude,
                                editLongitude: data.longitude,
                                editPrice: data.price
                              });

                              this.toggleModal();
                            }}
                          >
                            <i className="fa fa-edit"></i>
                          </Button>
                          &nbsp;
                          <Button
                            size="sm"
                            color="danger"
                            // value={data.id}
                            onClick={() =>
                              this.removeVouchers(data.id_experience)
                            }
                            // onClick={this.removeVouchers.bind(this)}
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
                  <Label htmlFor="text-input">Location</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    onChange={e => {
                      this.setState({
                        editLocation: e.target.value
                      });
                    }}
                    value={this.state.editLocation}
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
                    onChange={e => {
                      this.setState({
                        editPrice: e.target.value
                      });
                    }}
                    value={this.state.editPrice}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Paket Name</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="packet_name"
                    name="packet_name"
                    onChange={e => {
                      this.setState({
                        editPacketname: e.target.value
                      });
                    }}
                    value={this.state.editPacketname}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Latitude</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="latitude"
                    name="latitude"
                    onChange={e => {
                      this.setState({
                        editLatitude: e.target.value
                      });
                    }}
                    value={this.state.editLatitude}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Longitude</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="longitude"
                    name="longitude"
                    onChange={e => {
                      this.setState({
                        editLongitude: e.target.value
                      });
                    }}
                    value={this.state.editLongitude}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Image</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="image_url"
                    name="image_url"
                    onChange={e => {
                      this.setState({
                        editImage_url: e.target.value
                      });
                    }}
                    value={this.state.editImage_url}
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

export default Forms;
