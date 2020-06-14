import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Table,
    Spinner,
    Button,
    Alert
  } from 'reactstrap';

import { Link } from 'react-router-dom';

import '../../App.css';
import './gateway.scss';
import { BASE_URL } from '../../config';

function ListGateways(){
    const [loading, setLoading] = useState(false);
    const [gateways, setGateways] = useState([]);
    const [gateway, setGateway] = useState({});

    useEffect(() => {
        async function fetchGateways(){
            setLoading(true);
            const response = await fetch(`${BASE_URL}gateways`);
            const data = await response.json()
            setLoading(false);
            setGateways(data.data)
        }

        fetchGateways()
    }, [])

    function handleDelete(e){
        async function deleteGateway(){
            setLoading(true);
            const gatewayId = e.target.getAttribute('deleteGateway');

            const response = await fetch(`${BASE_URL}remove/gateway/${gatewayId}`, {method: 'DELETE'});
            const result = await response.json();

            setLoading(false);
            if(result.success){
                setGateway(result.data);
                setGateways(gateways.filter(e => e._id != gatewayId));
                setVisible(true);
            }
        }

        deleteGateway();
    }

    const [visible, setVisible] = useState(false);

    const onDismiss = () => setVisible(false);

    return (
        <div className="list-gateways pb-5">
            <div className={(loading) ? 'loading' : 'd-none'}>
                <Spinner color="primary" />
            </div>
            <div className={(loading) ? 'd-none' : 'content'}>
                <Row>
                    <Col>
                        <Alert className="mt-5" color="info" isOpen={visible} toggle={onDismiss}>
                            Gateway: {gateway.name} was deleted susefully.
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 className="my-5">List Gateways</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>ip</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gateways.map(v => {
                                return (
                                    <tr key={v._id}>
                                        <td><Link to={`gateway/${v._id}`}>{v.name}</Link></td>
                                        <td>{v.ip}</td>
                                        <td><Button deleteGateway={v._id} onClick={handleDelete} color="danger">delete</Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    </Col>
                </Row>
                <Row>
                    <Col><Link to="add/gateway" className="btn btn-primary">Add Gateway</Link></Col>
                </Row>
            </div>
        </div>   
    )
}

export default ListGateways;