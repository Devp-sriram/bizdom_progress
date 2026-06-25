import Card from 'react-bootstrap/Card'
type Card ={
    item : string
}
function TodoCard({ item }:Card) {
    return <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{item}</Card.Title>
        </Card.Body>
    </Card>
}

export default TodoCard