import { FaUsers } from "react-icons/fa";
import { FaDropbox } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { Card } from 'react-bootstrap'

import { useProduct, useUser } from "../context/context";

function Dash() {
    const { products } = useProduct();
    const { users } = useUser()
    return (
        <div className='w-100 d-flex flex-column flex-md-row justify-content-evenly gap-5 align-items-start m-5'>
            <Card className="w-100">
                <Card.Body>
                    <FaUsers lg />
                    <Card.Title>Total Users</Card.Title>
                    <Card.Text>
                        {products.length}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="w-100">
                <Card.Body>
                    <FaDropbox />
                    <Card.Title>Total Products</Card.Title>
                    <Card.Text>
                        {users.length}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="w-100">
                <Card.Body>
                    <FaBox />
                    <Card.Title>Total Orders</Card.Title>
                    <Card.Text>
                        0
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="w-100">
                <Card.Body>
                    <BsCashCoin />
                    <Card.Title>Total Revenue</Card.Title>
                    <Card.Text>
                        0
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Dash
