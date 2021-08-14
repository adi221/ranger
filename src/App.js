import React, { useState } from 'react';
import RangeSlider from './RangeSlider';

const App = () => {
  const [value, setValue] = useState(50);
  const [value2, setValue2] = useState(0.5);

  return (
    <>
      <div
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#021d3d',
          marginBottom: '2rem',
        }}
      >
        <RangeSlider
          min={0}
          max={100}
          value={value}
          onChange={e => setValue(e.target.value)}
          isDarkTheme
          
        />
        <p style={{ color: 'white' }}>Value: {value}</p>
      </div>

      <RangeSlider
        min={0}
        max={1}
        step={0.1}
        value={value2}
        onChange={e => setValue2(e.target.value)}
      />
      <p>Value2: {value2}</p>
    </>
  );
};

export default App;
