import React, { useState } from 'react';
import RangeSlider from './RangeSlider';

const App = () => {
  const [value, setValue] = useState(50);

  return (
    <>
      <RangeSlider
        min={0}
        max={100}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <p>value: {value}</p>
    </>
  );
};

export default App;
