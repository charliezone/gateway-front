import React from 'react';

import {
    Table,
    Button
  } from 'reactstrap';

function Peripherals(props){
    return (
        <div className="peripherals">
            <Table>
                <thead>
                    <tr>
                        <th>Vendor</th>
                        <th>Create at</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.peripherals.map(v => {
                        return (
                            <tr key={v._id}>
                                <td>{v.vendor}</td>
                                <td>{v.create_at}</td>
                                <td>{v.status}</td>
                                <td><Button onClick={ () => props.handleDelete(v._id) } color="danger">delete</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Peripherals;