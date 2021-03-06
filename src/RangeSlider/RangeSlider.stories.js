import React, { useState } from 'react'
import RangeSlider from './'
import { centerDecorator } from '../../utils/storybook/decorators'

export default {
  title: 'User Inputs/RangeSlider',
  component: RangeSlider,
  decorators: [centerDecorator],
}

export const Basic = () => {
  const [value, setValue] = useState(50)

  return (
    <RangeSlider
      min={0}
      max={100}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}

export const ToggledTooltip = () => {
  const [value, setValue] = useState(60)

  return (
    <RangeSlider
      min={0}
      max={100}
      value={value}
      onChange={e => setValue(e.target.value)}
      isToggleTooltip
    />
  )
}

export const Disabled = () => {
  const [value, setValue] = useState(40)

  return (
    <RangeSlider
      min={0}
      max={100}
      value={value}
      disabled
      onChange={e => setValue(e.target.value)}
    />
  )
}

export const DifferentSteps = () => {
  const [value1, setValue1] = useState(50)
  const [value2, setValue2] = useState(0.4)
  const [value3, setValue3] = useState(0.55)
  const [value4, setValue4] = useState(0.632)

  return (
    <>
      <RangeSlider
        min={0}
        max={100}
        value={value1}
        onChange={e => setValue1(e.target.value)}
      />

      <RangeSlider
        min={0}
        max={1}
        value={value2}
        onChange={e => setValue2(e.target.value)}
        step={0.1}
      />

      <RangeSlider
        min={0}
        max={1}
        value={value3}
        onChange={e => setValue3(e.target.value)}
        step={0.01}
      />

      <RangeSlider
        min={0}
        max={1}
        value={value4}
        onChange={e => setValue4(e.target.value)}
        step={0.001}
      />
    </>
  )
}