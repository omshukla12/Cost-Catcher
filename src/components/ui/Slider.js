import React from 'react'

export const Slider = ({ min, max, value, onChange }) => (
  <input
    type="range"
    min={min}
    max={max}
    value={value}
    onChange={onChange}
    className="w-full"
  />
)