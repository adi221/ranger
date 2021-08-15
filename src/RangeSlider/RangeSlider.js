import React, { useState, useRef, useEffect } from 'react';
import styles from './RangeSlider.module.scss';
import propTypes from 'prop-types';
import classNames from 'classnames';

const SLIDER_SETTINGS = {
  fill: styles.fill,
  background: styles.bg,
  thumbSize: 24,
  width: 480,
  get fixRangePercentage() {
    return ((this.thumbSize * 0.5) / this.width) * 100;
  },
};

const RangeSlider = ({
  min,
  max,
  value,
  onChange,
  step,
  disabled,
  isDarkTheme,
  isToggleTooltip,
  ...otherProps
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoverValue, setHoverValue] = useState(null);
  const [hoverPos, setHoverPos] = useState(null);
  const sliderRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (isToggleTooltip && !showTooltip) return;
    const tooltipPos = (100 * ((hoverPos || value) - min)) / (max - min);
    tooltipRef.current.style.left = `${tooltipPos}%`;
  }, [showTooltip, hoverPos, isToggleTooltip, min, max, value]);

  useEffect(() => {
    if (!sliderRef.current) return;
    const percentage = (100 * (value - min)) / (max - min);
    const bg = `linear-gradient(90deg, ${
      SLIDER_SETTINGS.fill
    } ${percentage}%, ${SLIDER_SETTINGS.background} ${percentage + 0.1}%)`;
    sliderRef.current.style.background = bg;
  }, [value, min, max]);

  // Get relative position in the slider, between 0 - 1
  const getPositionInSlider = val => {
    return (Number(val) - min) / (max - min);
  };

  /**
   * The problem stems from the fact that the range thumb is 24px size
   * and therefore there is a deviation percentage of thumbSizeRadius / sliderWidth.
   * For example, 24 * 0.5 / 480 = 2.5%. So if pos is in the lower half reduce 0 - 2.5%,
   * and if in the upper half add 0 - 2.5%
   * @function fixThumbRangeDeviation
   * @param {number} hoverVal the almost accurate hover value
   * @returns {number} returns the accurate value
   */
  const fixThumbRangeDeviation = hoverVal => {
    const pos = getPositionInSlider(hoverValue);
    const { fixRangePercentage } = SLIDER_SETTINGS;
    let fixedValue = hoverVal;

    if (pos < 0.5) {
      const substraction = (0.5 - pos) / 0.5;
      fixedValue -= substraction * fixRangePercentage;
    } else {
      const addition = (pos - 0.5) / 0.5;
      fixedValue += addition * fixRangePercentage;
    }

    if (fixedValue > max) fixedValue = max;
    if (fixedValue < min) fixedValue = min;
    return fixedValue;
  };

  const calculatePercentage = e => {
    const mouseX = Number(e.nativeEvent.offsetX);
    const hoverVal = (mouseX / e.target.clientWidth) * parseInt(max, 10);
    if (hoverVal > max || hoverVal < min) return;

    if (step === 0.1) {
      setHoverPos(hoverVal);
      setHoverValue(hoverVal.toFixed(1));
      return;
    }

    let updatedVal = fixThumbRangeDeviation(hoverVal);
    setHoverPos(hoverVal);
    setHoverValue(Math.round(updatedVal));
  };

  const posTooltipMiddleThumb = val => {
    const pos = getPositionInSlider(val);
    const { fixRangePercentage } = SLIDER_SETTINGS;
    let middleValue = Number(val);

    if (pos < 0.5) {
      const addition = (0.5 - pos) / 0.5;
      middleValue += addition * fixRangePercentage;
    } else {
      const substraction = (pos - 0.5) / 0.5;
      middleValue -= substraction * fixRangePercentage;
    }
    return middleValue;
  };

  const posTooltipToHover = e => {
    if (disabled) return;
    calculatePercentage(e);
    isToggleTooltip && setShowTooltip(true);
  };

  const hideTooltip = () => {
    setShowTooltip(false);
  };

  const posTooltipToValue = () => {
    if (disabled) return;
    if (isToggleTooltip) return hideTooltip();
    const middleValue = posTooltipMiddleThumb(value);
    setHoverPos(middleValue);
    setHoverValue(value);
  };

  const renderLabels = () => {
    const minLabel = classNames(
      styles.label,
      styles.minLabel,
      isDarkTheme && styles.dark
    );
    const maxLabel = classNames(
      styles.label,
      styles.maxLabel,
      isDarkTheme && styles.dark
    );

    return (
      <>
        <span className={minLabel}>{min}</span>
        <span className={maxLabel}>{max}</span>
      </>
    );
  };

  const renderTooltip = () => {
    const tooltipEl = (
      <div ref={tooltipRef} className={styles.tooltip}>
        {hoverValue ?? value}
      </div>
    );

    if (isToggleTooltip) return showTooltip && tooltipEl;
    return tooltipEl;
  };

  return (
    <div className={classNames(styles.container, disabled && styles.disabled)}>
      <div className={styles.rangeContainer}>
        <input
          type='range'
          onMouseMove={posTooltipToHover}
          onMouseOut={posTooltipToValue}
          ref={sliderRef}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          step={step}
          disabled={disabled}
          {...otherProps}
        />
        {renderLabels()}
        {renderTooltip()}
      </div>
    </div>
  );
};

RangeSlider.defaultProps = {
  min: 0,
  max: 100,
  value: 50,
  onChange: () => {},
  step: 1,
  disabled: false,
  isDarkTheme: false,
  isToggleTooltip: false,
};

RangeSlider.propTypes = {
  /** The min value of the range */
  min: propTypes.number,
  /** The max value of the range */
  max: propTypes.number,
  /** Value of the slider */
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  /** Callback when the component's state is changed. */
  onChange: propTypes.func,
  /** The step by which the value is incremented / decremented. */
  step: propTypes.number,
  /** Determines the disabled mode of the RangeSlider, if true - disabled. */
  disabled: propTypes.bool,
  /** Changes the styles based on background theme, if true - theme is dark. */
  isDarkTheme: propTypes.bool,
  /** Determines if tooltip is toggleable or not, if false - the tooltip is always shown,
   * else - tooltip is shown only when user hovers over the slider */
  isToggleTooltip: propTypes.bool,
};

export default RangeSlider;
