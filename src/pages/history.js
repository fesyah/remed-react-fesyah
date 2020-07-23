import React from 'react'
import Axios from 'axios'
import { Table,Card } from 'reactstrap'

const URL = 'http://localhost:2000'
class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHistories: []
        }
    }

    componentDidMount() {
        this.getHistory()
    }

    getHistory = () => {
        Axios.get(URL + '/histories')
            .then((res) => {
                console.log(res.data)
                this.setState({ dataHistories: res.data })
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
                        <th>No</th>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Qty Total</th>
                        <th>Total</th>
                    </tr>
                </thead>
            </Table>
        )
    }

    renderTableBody() {
        return this.state.dataHistories.map((item, index) => {
            return (
                <div>
                    <Table>
                        <th>{index + 1}</th>
                        <th>{item.transID}</th>
                        <th>{item.date}</th>
                        {(item.products || []).map((value,index1) => {
                            return(
                                <Card>
                            <td>{value.name}</td>
                            </Card>
                            )
                        })}
                        <th>{item.qty}</th>
                        <th>{item.total}</th>
                        
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

export default History;