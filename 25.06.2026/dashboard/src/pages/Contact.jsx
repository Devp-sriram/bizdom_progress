
import { useState, useEffect } from 'react'
import axios from 'axios'
function Contact() {
  const [data, setDate] = useState([]);
  const [count, setCount] = useState(0)

  async function fetcher() {
    await console.log(`---------fecth response----------`)
    // https://phosphorous-nonfatally-celena.ngrok-free.dev/api/users
    const axiosget = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    const skimed = axiosget.data.map(item => ({ ...item, address: item.address.street, company: item.company.name }))
    setDate(skimed)
  }

  useEffect(() => {
    fetcher()
  }, [])


  return (
    <div className='d-block'>
      <input type="number" value={count} onChange={(e) => setCount(e.target.value)} />
      <table className='table striped'>
        <thead>
          <tr>
            <td>id</td>
            <td>name</td>
            <td>username</td>
            <td>email</td>
            <td>address</td>
            <td>company</td>
            <td>Phone</td>
            <td>website</td>
          </tr>
        </thead>
        <tbody>
          {data.length > count ?  data.map((item, i) => {
            return (count === 0 || i < count ) ? <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>{item.company}</td>
              <td>{item.phone}</td>
              <td>{item.website}</td>
            </tr> : ""
          }) : <h1>out of range</h1>}
        </tbody>

      </table>
    </div>
  )
}

export default Contact
