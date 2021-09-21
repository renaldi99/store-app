import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../Utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faUtensils,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="" />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="" />;

  return <FontAwesomeIcon icon={faUtensils} className="" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        // console.log(res);
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log("Ini Error nya Mas : ", error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categorySelect } = this.props;
    return (
      <Col md={2} mt="2">
        <h4>
          <strong>List Category</strong>
        </h4>
        <hr />
        <ListGroup className="text-center">
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.nama)}
                className={
                  categorySelect === category.nama && "category-active"
                }
                style={{ cursor: "pointer" }}
              >
                <Icon nama={category.nama} /> {category.nama}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
