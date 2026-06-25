import React from 'react'
import Card from '../components/Card'

export default function Dash() {
    return (
        <div className='w-100'>
            <h1 className='text-primary'>Dashboard</h1>
            <div className='border rounded'>
                <Card/>
            </div>
        </div>
    )
}
