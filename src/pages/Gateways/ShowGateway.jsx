import React, {useState, useEffect} from 'react';
import Peripherals from '../Peripherals/Peripherals';

import {
    useParams
  } from "react-router-dom";

import {
    Row,
    Col,
    Spinner,
    Alert
  } from 'reactstrap';

  import { BASE_URL } from '../../config';

function ShowGateway(){
    const [loading, setLoading] = useState(false);
    const [gateway, setGateway] = useState({});
    const [peripherals, setPeripherals] = useState([]);
    const [peripheral, setPeripheral] = useState({});
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

    function handleDelete(id){
        async function deletePeripheral(){
            setLoading(true);

            const response = await fetch(`${BASE_URL}remove/peripheral/${id}`, {method: 'DELETE'});
            const result = await response.json();

            setLoading(false);
            if(result.success){
                setPeripheral(result.data);
                setPeripherals(peripherals.filter(e => e._id !== id));
                setVisible(true);
            }
        }

        deletePeripheral();
    }

    const [visible, setVisible] = useState(false);

    const onDismiss = () => setVisible(false);

    return (
        <div className="show-gateway">
            <div className={(loading) ? 'loading' : 'd-none'}>
                <Spinner color="primary" />
            </div>
            <div className={(loading) ? 'd-none' : 'content'}>
                <Row>
                    <Col>
                        <Alert className="mt-5" color="info" isOpen={visible} toggle={onDismiss}>
                            Peripheral: {peripheral.vendor} was deleted susefully.
                        </Alert>
                    </Col>
                </Row>
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
                        <Peripherals peripherals={peripherals} handleDelete={handleDelete} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ShowGateway;
