import React, {useState, useEffect} from 'react';

import {
    useParams
  } from "react-router-dom";

import {
    Row,
    Col,
    Table,
    Spinner,
    Button
  } from 'reactstrap';

  import { BASE_URL } from '../../config';

function ShowGateway(){
    const [loading, setLoading] = useState(false);
    const [gateway, setGateway] = useState({});
    const [peripherals, setPeripherals] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetch(`${BASE_URL}gateway/${id}`),
            fetch(`${BASE_URL}peripherals/${id}`)
        ]).then(function (responses) {
            return responses.map(function (response) {
                return response.json();
            });
        }).then(function(data){
            data[0].then(data => {
                setGateway(data.data)
            })
            data[1].then(data => {
                setPeripherals(data.data)
            })

            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [id])

    return (
        <div className="show-gateway">
            <div className={(loading) ? 'loading' : 'd-none'}>
                <Spinner color="primary" />
            </div>
            <div className={(loading) ? 'd-none' : 'content'}>
                <Row>
                    <Col>
                        <h1 className="mt-5">Gateway: {gateway.name}</h1> 
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Ip: {gateway.ip}</h2> 
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className="mt-5">Peripherals</h3>
                    </Col>
                </Row>
                <Row className={peripherals.length < 1 && 'd-none'}>
                    <Col>
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
                                {peripherals.map(v => {
                                    return (
                                        <tr key={v._id}>
                                            <td>{v.vendor}</td>
                                            <td>{v.create_at}</td>
                                            <td>{v.status}</td>
                                            <td><Button delete-peripheral={v._id} color="danger">delete</Button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ShowGateway;
