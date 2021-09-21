import React from "react";
import { Card, Col } from "react-bootstrap";
import { numberWithCommas } from "../Utils/Comma";

const Menus = ({ datamenu, addToCart }) => {
  return (
    <Col md={4}>
      <Card
        style={{ width: "15rem" }}
        className="m-1 shadow"
        onClick={() => addToCart(datamenu)}
      >
        <Card.Img
          style={{ height: "10rem" }}
          variant="top"
          src={
            "Assets/images/" +
            datamenu.category.nama.toLowerCase() +
            "/" +
            datamenu.gambar
          }
        />
        <Card.Body>
          <Card.Title>{datamenu.nama}</Card.Title>
          <p>Code: {datamenu.kode}</p>
          <Card.Text>Rp. {numberWithCommas(datamenu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
