import React, { Component } from "react";
import { slide as Menu } from 'react-burger-menu';
import { Link } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";
import "./products.css";

const baseURL = "https://fakestoreapi.com/products";

const MenuLists = ["Backpack Category", "T-Shirts Category", "Jacket Category"]

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            addToCart: []
        }

    }

    componentDidMount() {
        axios.get(baseURL).then((response) => {
            this.setState({
                data: response.data
            })
        });
    }

    showSettings(event) {
        event.preventDefault();
    }

    handleAddToCart(obj) {
        let addToCartArr = this.state.addToCart;
        addToCartArr.push(obj);
        this.setState({
            addToCart: addToCartArr
        })

    }

    gridItems() {
        let itemDivs = []
        this.state.data.map(obj => {
            if (!this.state.addToCart.find(obj2 => obj2.id == obj.id)) {
                itemDivs.push(
                    <div class="grid-item">
                        <img src={obj.image} alt="Paris" width="300" height="300"></img>
                        <h2> <Link to={`/product/${obj.id}`}>{obj.title}</Link></h2>
                        <div> <p>{obj.description}</p></div>
                        <div> <b>Price:</b> ${obj.price}</div>
                        <button class="button button2" onClick={() => this.handleAddToCart(obj)}>Add To Cart</button>
                    </div>
                )
            }

        })

        return itemDivs;
    }

    render() {
        // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            <div>
                <div className="menu-header">
                    <div>
                        <Menu>
                            {MenuLists.map(ele => (
                                <>
                                    <a id="home" className="menu-item" href="/" style={{ color: 'teal', display: 'inherit' }}>{ele}</a>
                                </>
                            ))
                            }
                        </Menu>
                    </div>
                    <div className="fa-shopping-div">
                        <i class="fa fa-shopping-cart icon-grey badge" data-count={this.state.addToCart.length} aria-hidden="true"></i>
                    </div>
                </div>

                <div class="grid-container">
                    {this.gridItems()}
                </div>
            </div>
        );
    }
}
export default Products;