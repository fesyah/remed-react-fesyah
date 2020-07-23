import React from 'react';
import { Table } from 'reactstrap'
import Axios from 'axios';
const URL = 'http://localhost:2000'

class CartPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: []
        }
    }

    componentDidMount() {
        this.ambilProduct()
    }

    ambilProduct = () => {
        Axios.get(URL + '/cart')
            .then((res) => {
                console.log(res.data)
                this.setState({ dataProduct: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderTablehead() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Images</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
            </Table>
        )
    }

    renderTableBody() {
        return this.state.dataProduct.map((item, index) => {
            return (
                <div>
                    <Table borderless>
                        <tbody>
                            <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.brands}</td>
                            <td>{item.size}</td>
                            <td>{item.quantity}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderTablehead()}
                {this.renderTableBody()}
            </div>
        );
    }
}

export default CartPages;