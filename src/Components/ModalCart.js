import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../Utils/Comma";

const ModalCart = ({
  showModal,
  handleClose,
  cartDetail,
  quantity,
  description,
  addQuantityOrder,
  minQuantityOrder,
  changeHandler,
  handleSubmit,
  total,
  deleteOrder,
}) => {
  if (cartDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {cartDetail.product.nama}
            <br />
            <strong>Rp. {numberWithCommas(cartDetail.product.harga)}</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total Order : </Form.Label>
              <p>
                <strong>Rp. {numberWithCommas(total)}</strong>
              </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah : </Form.Label>
              <br />
              <Button
                variant="danger"
                size="sm"
                onClick={() => minQuantityOrder()}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <strong className="mx-3">{quantity}</strong>
              <Button
                variant="primary"
                size="sm"
                onClick={() => addQuantityOrder()}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Deskripsi :</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Pedas, Nasi Setengah, Jangan pake sambel"
                rows={3}
                value={description}
                onChange={(e) => changeHandler(e)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteOrder(cartDetail.id)}>
            <FontAwesomeIcon icon={faTrash} /> Delete Order
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Empty</Modal.Title>
        </Modal.Header>
        <Modal.Body>Empty</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalCart;
