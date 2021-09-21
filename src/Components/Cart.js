import React, { Component } from "react";
import { Col, ListGroup, Row, Badge } from "react-bootstrap";
import { numberWithCommas } from "../Utils/Comma";

export default class Cart extends Component {
  render() {
    const { listCart } = this.props;
    console.log(listCart);
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>List Order</strong>
        </h4>
        <hr />
        {listCart.length !== 0 && (
          <ListGroup variant="flush">
            {listCart.map((list) => (
              <ListGroup.Item key={list.product.id}>
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
          </ListGroup>
        )}
      </Col>
    );
  }
}
