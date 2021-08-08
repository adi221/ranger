import React from 'react';
import styles from './RangeSlider.module.scss';
import propTypes from 'prop-types';
import classNames from 'classnames';

const RangeSlider = ({ min, max, value, onChange, step, ...otherProps }) => {
  const renderLabels = () => {
    const minLabel = classNames(styles.label, styles.minLabel);
    const maxLabel = classNames(styles.label, styles.maxLabel);

    return (
      <>
        <span className={minLabel} data-testid='span'>
          {min}
        </span>
        <span className={maxLabel} data-testid='span'>
          {max}
        </span>
      </>
    );
  };

  return (
    <div className={styles.rangeContainer}>
      <input
        type='range'
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        step={step}
        {...otherProps}
      />
      {renderLabels()}
    </div>
  );
};

RangeSlider.defaultProps = {
  min: 0,
  max: 100,
  value: 50,
  onChnage: e => {},
  step: 1,
};

RangeSlider.propTypes = {
  /** The min value of the range */
  min: propTypes.number,
  /** The max value of the range */
  max: propTypes.number,
  /** Initial value of the slider*/
  value: propTypes.number,
  /** Callback when the component's state is changed. */
  onChange: propTypes.func,
  /** The step by which the value is incremented / decremented. */
  step: propTypes.number,
};

export default RangeSlider;
