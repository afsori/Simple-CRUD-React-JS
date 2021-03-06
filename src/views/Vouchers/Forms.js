import React, { Component } from 'react';
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
  Row,
  Pagination, PaginationItem, PaginationLink, Table
} from 'reactstrap';

import axios from 'axios';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.postVouchers = this.postVouchers.bind(this);
    this.removeVouchers = this.removeVouchers.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.imageChange = this.imageChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      vouchersData: [],
      vouchersDataPost: {
        name: '',
        amount: '',
        expired_at: '',
        image: ''
      }
    };
  }

  getVouchers () {
    axios.get('https://clonedana.herokuapp.com/api/vouchers')
        .then(res => {
          this.setState({
            vouchersData: res.data.data
          });
        })
        .catch(err => {

        })
  }

  postVouchers(){
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    const formData = new FormData();
    formData.append('name', this.state.vouchersDataPost.name);
    formData.append('amount', this.state.vouchersDataPost.amount);
    formData.append('expired_at', this.state.vouchersDataPost.expired_at);
    formData.append('image', this.state.vouchersDataPost.image);

    axios.post('https://clonedana.herokuapp.com/api/vouchers', formData, config)
        .then(() =>
        {
          this.getVouchers()
        })
  }

  removeVouchers(e){
    axios.delete(`https://clonedana.herokuapp.com/api/vouchers/${e.currentTarget.value}`)
      .then(() =>
        {
          this.getVouchers()
        })
  }

  inputChange(e) {
    let newVouchers = {...this.state.vouchersDataPost}
    newVouchers[e.currentTarget.name] = e.currentTarget.value;
    console.log(newVouchers)
    this.setState({
      vouchersDataPost: newVouchers
    });
  }

  imageChange(e) {
    let image = {...this.state.vouchersDataPost}
    image[e.currentTarget.name] = e.target.files[0]
    console.log(image)
    this.setState({
      vouchersDataPost: image
    });
  }

  componentDidMount() {
    this.getVouchers()
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Voucher Forms</strong>
              </CardHeader>
              <CardBody>
                <Form encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Name Voucher</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="name" name="name" placeholder="Name" onChange={this.inputChange} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Amount</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="number" id="amount" name="amount" placeholder="Amount" onChange={this.inputChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">Expired Date</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="expired_at" name="expired_at" placeholder="date" onChange={this.inputChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">Image input</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="file" id="image" name="image" onChange={this.imageChange}/>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.postVouchers}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Vouchers Table
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <td>No.</td>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Date Expired</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.vouchersData.map((data, idx) => (
                  <tr key={idx}>
                    <td>{idx+1}</td>
                    <td>{data.name}</td>
                    <td>Rp.{data.amount}</td>
                    <td>{data.expired_at}</td>
                    <td>
                    <Button size="sm" color="danger" value={data.id} onClick={this.removeVouchers}>
                        <i className="fa fa-trash"></i> delete</Button>
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
        </Row>
      </div>
    );
  }
}

export default Forms;
