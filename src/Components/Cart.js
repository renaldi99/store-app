import React, { Component } from "react";
import { Col, ListGroup, Row, Badge } from "react-bootstrap";
import { numberWithCommas } from "../Utils/Comma";
import ModalCart from "./ModalCart";
import TotalPay from "./TotalPay";
import axios from "axios";
import { API_URL } from "../Utils/Constants";
import swal from "sweetalert";

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      cartDetail: false,
      quantity: 0,
      description: "",
      total: 0,
    };
  }

  handleShow = (list) => {
    console.log(list.total);
    this.setState({
      showModal: true,
      cartDetail: list,
      quantity: list.quantity,
      description: list.description,
      total: list.total,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  addQuantityOrder = () => {
    this.setState({
      quantity: this.state.quantity + 1,
      total: this.state.cartDetail.product.harga * (this.state.quantity + 1),
    });
  };

  minQuantityOrder = () => {
    if (this.state.quantity !== 1) {
      this.setState({
        quantity: this.state.quantity - 1,
        total: this.state.cartDetail.product.harga * (this.state.quantity - 1),
      });
    }
  };

  changeHandler = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.handleClose();

    const data = {
      quantity: this.state.quantity,
      total: this.state.total,
      product: this.state.cartDetail.product,
      description: this.state.description,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.cartDetail.id, data)
      .then((res) => {
        console.log(res);
        swal({
          title: "Update Data",
          text: "Success Update! " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Ini Error nya Mas : ", error);
      });
  };

  deleteOrder = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        console.log(res);
        swal({
          title: "Delete Data",
          text: "Success Delete! " + this.state.cartDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Ini Error nya Mas : ", error);
      });
  };

  render() {
    const { listCart } = this.props;
    // console.log(listCart);
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>List Order</strong>
        </h4>
        <hr />
        {listCart.length !== 0 && (
          <ListGroup variant="flush">
            {listCart.map((list) => (
              <ListGroup.Item
                key={list.product.id}
                onClick={() => this.handleShow(list)}
              >
                <Row>
                  <Col className="justify-content-center align-items-center d-flex">
                    <h5>
                      <Badge pill variant="primary">
                        {list.quantity} X
                      </Badge>
                    </h5>
                  </Col>
                  <Col>
                    <p>{list.product.nama}</p>
                    <p>Rp. {numberWithCommas(list.product.harga)}</p>
                  </Col>
                  <Col>
                    <p>Rp. {numberWithCommas(list.total)}</p>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ModalCart
              {...this.state}
              handleClose={this.handleClose}
              addQuantityOrder={this.addQuantityOrder}
              minQuantityOrder={this.minQuantityOrder}
              handleSubmit={this.handleSubmit}
              changeHandler={this.changeHandler}
              deleteOrder={this.deleteOrder}
            />
          </ListGroup>
        )}
        <TotalPay listCart={listCart} {...this.props} />
      </Col>
    );
  }
}
