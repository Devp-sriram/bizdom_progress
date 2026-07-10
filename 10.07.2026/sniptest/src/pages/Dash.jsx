import { FaUsers } from "react-icons/fa";
import { FaDropbox } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";

import { Card } from 'react-bootstrap'
import { useProduct, useUser } from '../context/context'

export default function Dash() {
    const { users } = useUser();
    const { products } = useProduct()
    return (
        <div className="w-100 d-flex flex-column gap-2 flex-md-row justify-content-evenly align-items-center p-4">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <FaUsers />
                    <Card.Title>Total cart</Card.Title>
                    <Card.Text>{users.length}</Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <FaUsers />
                    <Card.Title>Total products</Card.Title>
                    <Card.Text>{products.length}</Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <FaUsers />
                    <Card.Title>Total orders</Card.Title>
                    <Card.Text>0</Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <FaUsers />
                    <Card.Title>Total Revenue</Card.Title>
                    <Card.Text>0</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
