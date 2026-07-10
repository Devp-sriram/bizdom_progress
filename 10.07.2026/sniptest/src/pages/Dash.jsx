import { FaUsers } from "react-icons/fa";
import { FaDropbox } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";

import { Card, Row } from 'react-bootstrap'
import { useProduct, useUser } from '../context/context'

export default function Dash() {
    const { users } = useUser();
    const { products } = useProduct()
    return (
        <Row className="w-100 gap-2 m-4 h-100">
            <Card style={{ width: '18rem'}} className="col-12 col-md-6 col-lg-3 mx-auto">
                <Card.Body>
                    <FaUsers />
                    <Card.Title>Total cart</Card.Title>
                    <Card.Text>{users.length}</Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem'}} className="col-12 col-md-6 col-lg-3 mx-auto">
                <Card.Body>
                    <FaUsers />
                    <Card.Title>Total products</Card.Title>
                    <Card.Text>{products.length}</Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem'}} className="col-12 col-md-6 col-lg-3 mx-auto">
                <Card.Body>
                    <FaUsers />
                    <Card.Title>Total orders</Card.Title>
                    <Card.Text>0</Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem'}} className="col-12 col-md-6 col-lg-3 mx-auto">
                <Card.Body>
                    <FaUsers />
                    <Card.Title>Total Revenue</Card.Title>
                    <Card.Text>0</Card.Text>
                </Card.Body>
            </Card>
        </Row>
    )
}
