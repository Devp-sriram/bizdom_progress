import React from 'react'
import Card from '../components/Card'

export default function Dash() {
    const items = [{
        title: 'Employee',
        count: '7',
        to: './Employee'
    },
    {
        title: 'Asserts',
        count: '3',
        to: './contact'
    },
    {
        title: 'Avilable',
        count: '7',
        to: './about'
    },
    {
        title: 'Assinged',
        count: '7',
        to: './not-found'
    }]
    return (
        <div className='w-100 m-2'>
            <h3 className='text-primary text-start p-2'>Dashboard</h3>
            <div className='border rounded m-2 p-2 row gap-2'>
                {items.map(item => (<Card key={item.title} item={item} className='col-12 col-md-3 ' />))}
            </div>
        </div>
    )
}
