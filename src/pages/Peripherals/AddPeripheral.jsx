import React, {useState, useEffect} from 'react';
import {
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Spinner,
    Alert,
    Input
  } from 'reactstrap';

  import { BASE_URL } from '../../config';

function AddPeripheral(){
    const [loading, setLoading] = useState(false);
    const [peripheral, setPeripheral] = useState({});
    const [gateways, setGateways] = useState([]);

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

    const [visible, setVisible] = useState(false);

    const onDismiss = () => setVisible(false);

    function handleSubmit(e){
        e.preventDefault();

        const postPeripheral = async () => {
            const gatewayId = document.getElementById('gateway').value;
            const vendor = document.getElementById('vendor').value;
            const status = document.getElementById('status').value;

            setLoading(true);
            try{
                const response = await fetch(`${BASE_URL}add/peripheral`, {
                    method: 'POST',
                    body: JSON.stringify({id: gatewayId, vendor: vendor, status: status}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                const result = await response.json();
                setLoading(false);
                if(result.success){
                    setPeripheral(result.data);
                    setVisible(true);
                }
            }catch(err){
                console.log(err)
            }
        }
        postPeripheral();
    }

    return (
        <div className="add-gateway">
            <div className="content">
                <Row>
                    <Col>
                        <Alert className="mt-5" color="info" isOpen={visible} toggle={onDismiss}>
                            Peripheral: {peripheral.vendor} was added susefully.
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="mt-5">Add Peripheral</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="gateway">Select Gateway</Label>
                                <Input type="select" name="gateway" id="gateway">
                                    {gateways.map(v => {
                                        return (
                                            <option key={v._id} value={v._id}>{v.name}</option>
                                        )
                                    })}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Vendor</Label>
                                <Input type="text" required name="vendor" id="vendor" placeholder="Enter the peripheral vendor" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="status">Select Status</Label>
                                <Input type="select" name="status" id="status">
                                    <option>Online</option>
                                    <option>Offline</option>
                                </Input>
                            </FormGroup>
                            <div className="submit d-flex">
                                <Button>Add Peripheral</Button>
                                <div className={(loading) ? 'ml-3' : 'd-none'}>
                                    <Spinner color="primary" />
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default AddPeripheral;