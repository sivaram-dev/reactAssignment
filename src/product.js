import React, { Component } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseURL = "https://fakestoreapi.com/products/";


class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataid: {}
        }
    }
    componentDidMount() {
        const id = this.props.params.id
        axios.get(baseURL + id).then((response) => {
            this.setState({
                dataid: response.data

            })
        });
    }

    render() {
        return (
            <div className="product-main-div">
                <div className="product-div-wrapper">
                    <div className="product-left">
                        <img src={this.state.dataid.image} alt="Paris" width="300" height="300"></img>
                    </div>
                    <div className="product-right">
                        <h2>{this.state.dataid.title}</h2>
                        <p>{this.state.dataid.description}</p>
                        <span><b>Price:</b> ${this.state.dataid.price}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default (props) => (
    <Product
        {...props}
        params={useParams()}
    />
)