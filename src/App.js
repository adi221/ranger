import React, { useState } from 'react';
import RangeSlider from './RangeSlider';

const App = () => {
  const [value, setValue] = useState(50);
  const [value2, setValue2] = useState(0.5);
  const [value3, setValue3] = useState(50);
  const [value4, setValue4] = useState(50);

  return (
    <>
      <RangeSlider
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <p>Value: {value}</p>

      <RangeSlider
        min={99}
        max={100}
        step={0.1}
        value={value3}
        onChange={e => setValue3(e.target.value)}
        isToggleTooltip
      />
      <p>Value3: {value3}</p>

      <RangeSlider
        min={0}
        max={1}
        step={0.1}
        value={value4}
        onChange={e => setValue4(e.target.value)}
        isToggleTooltip
      />
      <p>Value4: {value4}</p>

      <RangeSlider
        min={0}
        max={1}
        step={0.01}
        value={value2}
        onChange={e => setValue2(e.target.value)}
      />
      <p>Value2: {value2}</p>
    </>
  );
};

export default App;
