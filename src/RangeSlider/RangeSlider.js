import React, { useState, useRef, useEffect } from 'react';
import styles from './RangeSlider.module.scss';
import propTypes from 'prop-types';
import classNames from 'classnames';

const RangeSlider = ({
  min,
  max,
  value,
  onChange,
  step,
  disabled,
  ...otherProps
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoverValue, setHoverValue] = useState(null);
  const sliderRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!showTooltip) return;
    tooltipRef.current.style.left = `${hoverValue}%`;
  }, [showTooltip, hoverValue]);

  const getMouseLocation = e => e.clientX;
  const calculatePercentage = e => {
    const mouseX = getMouseLocation(e);
    const { left, right } = sliderRef.current.getBoundingClientRect();
    const percentage = (mouseX - left) / (right - left);
    if (percentage > 1 || percentage < 0) {
      setShowTooltip(false);
      return;
    }
    setHoverValue(Math.round(percentage * 100));
  };

  const displayTooltip = e => {
    calculatePercentage(e);
    setShowTooltip(true);
  };

  const hideTooltip = e => {
    setShowTooltip(false);
  };

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
    <div className={styles.container}>
      <div className={styles.rangeContainer}>
        <input
          type='range'
          onMouseMove={displayTooltip}
          onMouseLeave={hideTooltip}
          onMouseOut={hideTooltip}
          ref={sliderRef}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          step={step}
          {...otherProps}
        />
        {renderLabels()}
        {showTooltip && (
          <div ref={tooltipRef} className={styles.tooltip}>
            {hoverValue}%
          </div>
        )}
      </div>
    </div>
  );
};

RangeSlider.defaultProps = {
  min: 0,
  max: 100,
  value: 50,
  onChange: e => {},
  step: 1,
  disabled: false,
};

RangeSlider.propTypes = {
  /** The min value of the range */
  min: propTypes.number,
  /** The max value of the range */
  max: propTypes.number,
  /** Value of the slider*/
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  /** Callback when the component's state is changed. */
  onChange: propTypes.func,
  /** The step by which the value is incremented / decremented. */
  step: propTypes.number,
  /** Determines the disabled mode of the RangeSlider, if true - disabled. */
  disabled: propTypes.bool,
};

export default RangeSlider;
