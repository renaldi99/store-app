// import logo from "./logo.svg";
import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ListCategories, Cart, Menus } from "../Components";
import { API_URL } from "../Utils/Constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categorySelect: "Makanan",
      listCart: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categorySelect)
      .then((res) => {
        // console.log(res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Ini Error nya Mas : ", error);
      });

    this.getListCart();
  }

  // componentDidUpdate = (prevState) => {
  //   // console.log(prevState);
  //   if (this.state.listCart !== prevState.listCart) {
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then((res) => {
  //         // console.log(res);
  //         const listCart = res.data;
  //         this.setState({ listCart });
  //       })
  //       .catch((error) => {
  //         console.log("Ini Error nya Mas : ", error);
  //       });
  //   }
  // };

  getListCart = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        // console.log(res);
        const listCart = res.data;
        this.setState({ listCart });
      })
      .catch((error) => {
        console.log("Ini Error nya Mas : ", error);
      });
  };

  changeCategory = (value) => {
    this.setState({
      categorySelect: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        // console.log(res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log("Ini Error nya Mas : ", error);
      });
  };

  addToCart = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const productCart = {
            quantity: 1,
            total: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", productCart)
            .then((res) => {
              console.log(res);
              this.getListCart();
              swal({
                title: "Product Added to Your Cart",
                text: productCart.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Ini Error nya Mas : ", error);
            });
        } else {
          const productCart = {
            quantity: res.data[0].quantity + 1,
            total: res.data[0].total + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, productCart)
            .then((res) => {
              // console.log(res);
              swal({
                title: "Product Added to Your Cart",
                text: productCart.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Ini Error nya Mas : ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Ini Error nya Mas : ", error);
      });
  };

  render() {
    // console.log(this.state.menus);
    const { menus, categorySelect, listCart } = this.state;
    return (
      <div className="mt-5">
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              categorySelect={categorySelect}
            />
            <Col>
              <h4>
                <strong>List Product</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      datamenu={menu}
                      addToCart={this.addToCart}
                    />
                  ))}
              </Row>
            </Col>
            <Cart listCart={listCart} {...this.props} />
          </Row>
        </Container>
      </div>
    );
  }
}
