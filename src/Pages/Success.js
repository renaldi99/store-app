import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class Success extends Component {
  render() {
    return (
      <div className="mt-5 text-center">
        <Image src="Assets/images/success.svg" width="400px" />
        <h3>Success Order</h3>
        <p>Thank you for ordering</p>
        <Button variant="primary" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
