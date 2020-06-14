import React from 'react';
import { 
    Row,
    Col
  } from 'reactstrap';

function ListPeripherals(){
    return (
        <div className="list-peripherals">
            <Row>
                <Col>
                    <h2 className="mt-5">List Peripherals</h2>
                </Col>
            </Row>
        </div>   
    )
}

export default ListPeripherals;