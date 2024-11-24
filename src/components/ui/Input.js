import React from 'react'

export const Input = ({ className, ...props }) => (
  <input
    className={`border rounded-md px-3 py-2 w-full ${className}`}
    {...props}
  />
)