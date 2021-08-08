import React, { useState } from 'react';
import RangeSlider from './';
import { centerDecorator } from '../../../utils/storybook/decorators';
import styles from './RangeSlider.modules.scss';

export default {
  title: 'User Inputs/RangeSlider',
  component: RangeSlider,
  decorators: [centerDecorator],
};

export const Basic = () => {
  const [value, setValue] = useState(50);

  return (
    <>
      <RangeSlider
        min={0}
        max={100}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <p>Value: {value}</p>
    </>
  );
};
