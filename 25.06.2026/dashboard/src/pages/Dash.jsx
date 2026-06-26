import React from 'react'
import Card from '../components/Card'

export default function Dash() {
    const items = [{
        title: 'Employee',
        count: '7',
        to: './about'
    },
    {
        title: 'Asserts',
        count: '7',
        to: './about'
    },
    {
        title: 'Employee',
        count: '7',
        to: './about'
    },
    {
        title: 'Employee',
        count: '7',
        to: './about'
    }]
    return (
        <div className='w-100 m-2'>
            <h3 className='text-primary text-start p-2'>Dashboard</h3>
            <div className='border rounded p-2 d-flex gap-2'>
                {items.map(item => (<Card item={item} />))}
            </div>
        </div>
    )
}
