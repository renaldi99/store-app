import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../Utils/Constants";
export default class Success extends Component {
  componentDidMount = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const listCart = res.data;
        listCart.map(function (item) {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => {
        console.log("Ini Error nya Mas : ", error);
      });
  };

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
