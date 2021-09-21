import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../Utils/Comma";
import axios from "axios";
import { API_URL } from "../Utils/Constants";
import { withRouter } from "react-router";

class TotalPay extends Component {
  submitTotalPay = (totalPay) => {
    const order = {
      total_pay: totalPay,
      menus: this.props.listCart,
    };

    axios
      .post(API_URL + "pesanans", order)
      .then((res) => {
        this.props.history.push("/success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const totalPay = this.props.listCart.reduce(function (result, item) {
      return result + item.total;
    }, 0);
    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total Order:{" "}
              <strong className="float-end me-1">
                {numberWithCommas(totalPay)}
              </strong>
            </h4>
            <div className="d-grid">
              <Button
                variant="primary"
                size="lg"
                className="mb-4 mt-2"
                onClick={() => this.submitTotalPay(totalPay)}
              >
                <FontAwesomeIcon icon={faShoppingCart} /> Process Payment
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(TotalPay);
