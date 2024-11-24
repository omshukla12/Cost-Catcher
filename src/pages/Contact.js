import React from 'react'
import pageHolder from './assets/pageHolder.svg'

const Contact = () => {
    return (

        <div className='font-inter text-center flex flex-col items-center'>
            <h1 className='font-bold text-4xl'>
                Contact
            </h1>
            <img src={pageHolder} className='h-1/2 w-1/2 mt-4' />
        </div>

    )
}

export default Contact