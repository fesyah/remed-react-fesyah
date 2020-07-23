import React from 'react';
import { Table, Button } from 'reactstrap'
import Axios from 'axios';
const URL = 'http://localhost:2000'

class CartPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: [],
            dataHistory: [],
            selectedIndex: null
        }
    }

    componentDidMount() {
        this.getProduct()
        this.getHistory()
    }

    getProduct = () => {
        Axios.get(URL + '/users')
            .then((res) => {
                console.log(res.data)
                this.setState({ dataProduct: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getHistory = () => {
        Axios.get(URL + '/histories')
            .then((res) => {
                console.log(res.data)
                this.setState({ dataHistory: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    edit = (index) => {
        this.setState ({editrow: index, count: this.state.dataProduct.cart[index].qty})
    }
    plus = (index) => {
        let countedit = this.state.count;
        countedit++;
        this.setState({ count: countedit})
    }
    minus = (index) => {
        let countedit = this.state.count;
        countedit--;
        this.setState({count: countedit})
        if (countedit === 0) {
            this.handleDelete({editrow: null})
        }
    }
    // save = (index) => {
        
    // }

    handleDelete = (index) => {
        const { dataProduct } = this.state
        this.setState({ selectedIndex: index })
        console.log(index)

        let tempCart = dataProduct[0].cart
        console.log(tempCart)
        tempCart.splice(index, 1)

        Axios.patch(URL + '/users/1', { cart: tempCart })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    handleCheckout = () => {
        const { dataProduct } = this.state
        console.log('check out')
        console.log(Date.now())

        let history = {
            id: dataProduct.id,
            transID: Date.now(),
            date: new Date().toLocaleString(),
            products: dataProduct[0].cart,
            qtyTotal : dataProduct[0].qty,
            total : dataProduct[0].total
        }
        console.log(history)
        Axios.post(URL + '/histories', history)
            .then(res => {
                this.setState({ redirect: true })
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    renderTablehead() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>No</th>
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
                    <Table>
                        <tbody>
                            <tr>
                                <td>
                                    {item.cart.map((value, index) => {
                                        return (

                                            <Table>
                                                <th>{index + 1}</th>
                                                <th><img src={value.image} width='80px'></img></th>
                                                <th>{value.name}</th>
                                                <th>{value.qty}</th>
                                                <th>{value.total}</th>
                                                <th>
                                                    {/* {index === this.state.editrow ? ()} */}
                                                    <Button color="primary">Edit</Button>
                                                    <Button color="danger" onClick={() => this.handleDelete(index)}>Delete</Button>
                                                </th>
                                            </Table>

                                        )
                                    })}</td>
                            </tr>
                        </tbody>
                    </Table>
                                <Button color="primary" href ='/history'onClick={this.handleCheckout}>CheckOut</Button>
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