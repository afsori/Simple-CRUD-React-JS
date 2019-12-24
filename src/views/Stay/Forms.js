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

    this.postVouchers = this.postVouchers.bind(this);
    this.removeVouchers = this.removeVouchers.bind(this);
    this.updateTransactions = this.updateTransactions.bind(this);

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
      userData: [],
      vouchersDataPost: {
        location: "",
        owner: "",
        room_type: "",
        price: "",
        description: "",
        fasilitas: "",
        image_url: "",
        name:""
      },

      editPrice: "",
      editRoom: "",
      editId: "",
      editLocation: "",
      editOwner: "",
      editDescription: "",
      editFasilitas: "",
      editLatitude: "",
      editLongitude: "",
      editImage_url: "",
      editName:""
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
      fasilitas: this.state.vouchersDataPost.fasilitas,
      latitude: this.state.vouchersDataPost.latitude,
      longitude: this.state.vouchersDataPost.longitude,
      image_url: this.state.vouchersDataPost.image_url,
      name: this.state.vouchersDataPost.name

    };

    axios.post("http://192.168.6.122:9000/stay/postBooks", data).then(() => {
      Swal.fire(
        "Congratulations!",
        "Data has been entered successfully!",
        "success"
      );

      this.getStay();
      console.log("ini data");
    });
  }

  removeVouchers(id) {
    console.log(id, "apa dapat id");
    // axios.delete(`http://192.168.6.122:9000/stay/${id}`).then(() => {
    //   this.getStay();
    // });

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
        axios.delete(`http://192.168.6.122:9000/stay/${id}`).then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          this.getStay();
        });
      }
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
    // await this.props.dispatch(editStay(id));
  }

  // Update Stay
  updateTransactions = () => {
    const data = {
      location: this.state.editLocation,
      owner: this.state.editOwner,
      room_type: this.state.editRoom,
      price: this.state.editPrice,
      description: this.state.editDescription,
      fasilitas: this.state.editFasilitas,
      latitude: this.state.editLatitude,
      longitude: this.state.editLongitude,
      image_url: this.state.editImage_url,
      name: this.state.editName
    };
    console.log(data, "data didapat");
    axios
      .put(`http://192.168.6.122:9000/stay/edit/${this.state.editId}`, data)
      .then(() => {
        Swal.fire("Good job!", "Data successfully changed!", "success");
        this.getStay();
        this.toggleModalClose();
      })
      .catch(err => console.log(err));
  };

  // Modal Edit
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
                      <Label htmlFor="text-input">Name </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name Location"
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
                        placeholder="longitude"
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
                      <Label htmlFor="textarea-input">Image</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        name="image_url"
                        id="image_url"
                        rows="9"
                        placeholder="Image..."
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
                            onClick={() => {
                              this.setState({
                                editPrice: data.price,
                                editRoom: data.room_type,
                                editId: data.id_room,
                                editLocation: data.location,
                                editOwner: data.owner,
                                editDescription: data.description,
                                editFasilitas: data.fasilitas,
                                editLatitude: data.latitude,
                                editLongitude: data.longitude,
                                editImage_url: data.image_url,
                                editName: data.name
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
                  <Label htmlFor="text-input">Location</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    onChange={e =>
                      this.setState({
                        editLocation: e.target.value
                      })
                    }
                    value={this.state.editLocation}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Name Location</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    onChange={e =>
                      this.setState({
                        editName: e.target.value
                      })
                    }
                    value={this.state.editName}
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
                    onChange={e =>
                      this.setState({
                        editPrice: e.target.value
                      })
                    }
                    value={this.state.editPrice}
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
                    onChange={e =>
                      this.setState({
                        editRoom: e.target.value
                      })
                    }
                    value={this.state.editRoom}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Owner</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="owner"
                    name="owner"
                    onChange={e =>
                      this.setState({
                        editOwner: e.target.value
                      })
                    }
                    value={this.state.editOwner}
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
                    onChange={e =>
                      this.setState({
                        editLatitude: e.target.value
                      })
                    }
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
                    onChange={e =>
                      this.setState({
                        editLongitude: e.target.value
                      })
                    }
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
                    onChange={e =>
                      this.setState({
                        editImage_url: e.target.value
                      })
                    }
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
