import React from 'react';
import {
    Collapse, 
    Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText
} from 'reactstrap';

import {Link} from 'react-router-dom'


class Navbarcomponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    onBtOpen = () => {
        this.setState({ isOpen: !this.state.isOpen})
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">RemedStrap</NavbarBrand>
                        <NavbarToggler onClick={this.onBtOpen} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <Link to='/products'>
                                    <NavItem>
                                        <NavLink>Products</NavLink>
                                    </NavItem>
                                </Link>
                                <Link to='/cart'>
                                    <NavItem>
                                        <NavLink>Cart</NavLink>
                                    </NavItem>
                                </Link>
                                <Link to='/histories'>
                                    <NavItem>
                                        <NavLink>Histories</NavLink>
                                    </NavItem>
                                </Link>
                            </Nav>
                            <NavbarText>Fesyah Bhaskara</NavbarText>
                        </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Navbarcomponent;