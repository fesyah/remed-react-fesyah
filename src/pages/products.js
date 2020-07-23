import React from 'react';
import Axios from 'axios';
import { Table, ButtonDropdown, Input } from 'reactstrap';
import { ButtonToggle } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledButtonDropdown
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom'

const URL = 'http://localhost:2000'


class Productpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbProducts: [],
            className: false,
            buttonLabel: false,
            modal: false,
            modal2: false,
            dropdown: false,
            stock: '',
            index: null,
            redirect: false,
            popoverOpen1: false,
            idx: null,


        }
    }

    componentDidMount() {
        this.getproduct()
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

    toggle = (btn2) => {
        this.setState({ modal: !this.state.modal, index: btn2 })
    }
    toggle2 = (btn1) => {
        // let test = this.test.value
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
            stock: event.target.value
        });
    };

    proceed = () => {
        const { dbProducts, stock, index } = this.state
        let cartData = {
            nama: dbProducts[index].name,
            brands: dbProducts[index].brand,
            stock: stock,
            id: dbProducts.id,
            index: index
        }

        Axios.post(URL + '/users', cartData)
            .then(res => {
                this.setState({ redirect: true })
                console.log(res.data)
            })
            .catch(err => console.log(err))

    }

    getStock = (event) => {
        this.setState({ stock: event.target.innerText })
        console.log(this.state.stock)

    }

    popoverOpen1 = () => {
        this.setState({ popoverOpen1: !this.state.popoverOpen1 })
    }



    renderTablehead() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
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
                    <Table borderless>
                        <tbody>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td><img src={item.image} width='100px'></img></td>
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
                <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
                    <ModalHeader toggle={this.toggle2}>{this.state.dbProducts[this.state.index].name}</ModalHeader>
                    <ModalBody>
                        <ButtonDropdown isOpen={this.state.dropdown} toggle={this.toggleDropdown}>
                            <DropdownToggle>
                                <h4>Size :{this.state.stock}</h4>
                            </DropdownToggle>
                            {/* <DropdownMenu>
                                {this.state.dbProducts[this.state.index].stock.map((item, index) => {
                                    return (
                                        <DropdownItem onClick={this.getStock}>{item.code}</DropdownItem>
                                    )
                                })}
                            </DropdownMenu> */}
                        </ButtonDropdown>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.proceed}>Proceed</Button>
                        <Button color="secondary" onClick={() => this.toggle2(null)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            )
        }
    }

    // renderButtonDetail() {
    //     if (this.state.idx != null) {
    //         console.log(this.state.idx)
    //         return (
    //             <Modal isOpen={this.state.modal} toggle={this.toggle}>
    //                 <ModalHeader toggle={this.toggle}>{this.state.dbProducts[this.state.idx].name}</ModalHeader>
    //                 <ModalBody>
    //                     <td>Size :</td>

    //                     <td>Stock :</td>

    //                     {this.state.dbProducts[this.state.idx].stock.map((item, idx) => {
    //                         return (
    //                             <DropdownItem>{item.code}{item.stock}</DropdownItem>

    //                         )
    //                     })}

    //                 </ModalBody>
    //                 <ModalFooter>
    //                     <Button color="primary">Do Something</Button>
    //                     <Button color="secondary">Cancel</Button>
    //                 </ModalFooter>
    //             </Modal>
    //         )
    //     }
    // }


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
                {/* {this.renderButtonDetail()} */}
            </div>
        )
    }
}

export default Productpage;