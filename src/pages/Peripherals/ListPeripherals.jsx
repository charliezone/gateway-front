import React, {useState, useEffect} from 'react';
import Peripherals from './Peripherals';

import { 
    Row,
    Col,
    Spinner,
    Alert
  } from 'reactstrap';

import { Link } from 'react-router-dom';

import { BASE_URL } from '../../config';

function ListPeripherals(){
    const [loading, setLoading] = useState(false);
    const [peripherals, setPeripherals] = useState([]);
    const [peripheral, setPeripheral] = useState({});

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

    useEffect(() => {
        async function fetchGateways(){
            setLoading(true);
            const response = await fetch(`${BASE_URL}peripherals`);
            const data = await response.json()
            setLoading(false);
            setPeripherals(data.data)
        }

        fetchGateways()
    }, []);

    const [visible, setVisible] = useState(false);

    const onDismiss = () => setVisible(false);

    return (
        <div className="list-peripherals pb-5">
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
                        <h2 className="mt-5">List Peripherals</h2>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <Peripherals peripherals={peripherals} handleDelete={handleDelete} />
                    </Col>
                </Row>
                <Row>
                    <Col><Link to="add/peripheral" className="btn btn-primary">Add Peripheral</Link></Col>
                </Row>
            </div>
        </div>   
    )
}

export default ListPeripherals;