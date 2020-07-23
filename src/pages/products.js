import React from 'react';
import Axios from 'axios';
import { Table, Input, InputGroup, Alert } from 'reactstrap';
import { ButtonToggle } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom'

const URL = 'http://localhost:2000'


class Productpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        dbProducts: [],
        dataUser : [],
        buttonLabel: false,
        modal: false,
        modal2: false,
        index: null,
        redirect: false,
        qty: 0,
        total : 0,
        alert : false
        }
    }

    componentDidMount() {
        this.getproduct()
        this.getDataUser()
    }

    getproduct = () => {
        Axios.get(URL + '/products')
        .then((res) => {
            console.log(res.data)
            this.setState({ dbProducts: res.data })
        })
        .catch((err) => {
            console.log('message Error : ', err)
        })
    }

    getDataUser = () => {
        Axios.get(URL + '/users')
        .then((res) => {
        console.log(res.data)
        this.setState({ dataUser : res.data})
        })
        .catch((err) => {
        console.log('error', err)
        })
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }
    toggle2 = (btn1) => {
        console.log(btn1)
        console.log(!this.state.modal2)
        this.setState({ modal2: !this.state.modal2, index: btn1 })
    }

    toggleDropdown = () => {
        this.setState({ dropdown: !this.state.dropdown })
    }

    handleChange = event => {
        console.log(event.target.value)
        this.setState({
        size: event.target.value
        });
    };


    getQuantity = () => {
        // if (total === 0) {
        //     this.setState({alert: true})
        //     return
        // }

        const {dbProducts, qty, total, dataUser,index } = this.state
        console.log(this.getQty.value)
        console.log(index)
            let cartData = {
                image : dbProducts[index].image,
                name : dbProducts[index].name,
                qty : this.getQty.value,
                total : this.getQty.value * dbProducts[index].price 
        }
        
        let tempCart = dataUser[0].cart
        tempCart.push(cartData)
        console.log(cartData)
        console.log(tempCart)
        
        Axios.patch(URL + '/users/1', { cart : tempCart})
        .then(res => {
        this.setState({redirect : true})
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
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
            </tr>
            </thead>
        </Table>
        )
    }

    renderTablebody() {
        return this.state.dbProducts.map((item, index) => {
        return (
            <div>
            <Table >
                <tbody>
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td><img src={item.image} width='80px'></img></td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                    <td>
                    <ButtonToggle color="primary" onClick={() => this.toggle2(index)}>Add To Cart</ButtonToggle>
                    </td>
                </tr>
                </tbody>
            </Table>
            </div>
        )
        }
        )
    }


    renderModalcart() {
        if (this.state.index != null) {
        console.log(this.state.modal2)
        return (
            <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.className}>
            <ModalHeader>Name</ModalHeader>
            <ModalBody>
                <InputGroup>
                <Input type='number' id='qty' placeholder="quantity" innerRef={(getQty) => this.getQty = getQty} />
                </InputGroup>
                <Alert open={alert} color="danger">
                    This is a alert
                </Alert>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => this.getQuantity()}>Proceed</Button>
                <Button color="secondary" onClick={() => this.toggle2(null)}>Cancel</Button>
            </ModalFooter>
            </Modal>

        )
        }
    }



    render() {
        if (this.state.redirect) {
        return <Redirect to='/cart' />
        }
        return (
        <div>
            <Table>
            {this.renderTablehead()}
            {this.renderTablebody()}
            </Table>
            {this.renderModalcart()}
        </div>
        )
    }
}

export default Productpage;