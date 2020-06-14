import React, {useState} from 'react';
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

function AddGateway(){
    const [loading, setLoading] = useState(false);
    const [gateway, setGateway] = useState({});

    const [visible, setVisible] = useState(false);

    const onDismiss = () => setVisible(false);

    function handleSubmit(e){
        e.preventDefault();

        const postGateway = async () => {
            const name = document.getElementById('name').value;
            const ip = document.getElementById('ip').value;

            setLoading(true);
            try{
                const response = await fetch(`${BASE_URL}add/gateway`, {
                    method: 'POST',
                    body: JSON.stringify({name: name, ip: ip}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                const result = await response.json();
                setLoading(false);
                if(result.success){
                    setGateway(result.data);
                    setVisible(true);
                }
            }catch(err){
                console.log(err)
            }
        }
        postGateway();
    }

    return (
        <div className="add-gateway">
            <div className="content">
                <Row>
                    <Col>
                        <Alert className="mt-5" color="info" isOpen={visible} toggle={onDismiss}>
                            Gateway: {gateway.name} was added susefully.
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="mt-5">Add Gateway</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" required name="name" id="name" placeholder="Enter the gateway name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="ip">Ip (example: 204.120.0.15)</Label>
                                <Input type="text" required pattern="\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b" name="ip" id="ip" placeholder="Enter a valid ip address" />
                            </FormGroup>
                            <div className="submit d-flex">
                                <Button>Add Gateway</Button>
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

export default AddGateway;