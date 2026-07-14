import { FaUsers, FaDropbox, FaBox } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import Card from 'react-bootstrap/Card'

import { useEmployee, useAssert } from "../context/context.jsx";

function Dash() {
    const { employees } = useEmployee();
    const { asserts } = useAssert()
    return (
        <div className='w-100 d-flex flex-column flex-md-row justify-content-evenly gap-5 align-items-start m-5'>
            <Card className="w-100">
                <Card.Body>
                    <FaUsers lg />
                    <Card.Title>Total Employees</Card.Title>
                    <Card.Text>
                        {employees.length}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="w-100">
                <Card.Body>
                    <FaDropbox />
                    <Card.Title>Total Asserts</Card.Title>
                    <Card.Text>
                        {asserts.length}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="w-100">
                <Card.Body>
                    <FaBox />
                    <Card.Title>Total</Card.Title>
                    <Card.Text>
                        0
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="w-100">
                <Card.Body>
                    <BsCashCoin />
                    <Card.Title>Total</Card.Title>
                    <Card.Text>
                        0
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Dash