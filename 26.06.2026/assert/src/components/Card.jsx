import { FaArrowRight } from "react-icons/fa";
import {Link} from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function TodoCard({ item }) {
    return <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.count}</Card.Text>
            <Link to={item.to}><FaArrowRight /></Link>
        </Card.Body>
    </Card>
}

export default TodoCard