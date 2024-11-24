import React from 'react'

export const Card = ({ className, ...props }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`} {...props} />
)

export const CardHeader = ({ className, ...props }) => (
  <div className={`px-6 py-4 border-b ${className}`} {...props} />
)

export const CardContent = ({ className, ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props} />
)

export const CardFooter = ({ className, ...props }) => (
  <div className={`px-6 py-4 border-t ${className}`} {...props} />
)