import React from 'react'
import { connect } from 'react-redux'
import { getFormState } from './finalFormDuck'
import PropTypes from 'prop-types';

const RangeSlider = ({ state, valueName, maxValue, minValue }) => (
  <span className="RangeSlider" style={{
    width: `${ state.values[valueName] >= minValue && state.values[valueName] <= maxValue ? 100 - ( (state.values[valueName] - minValue) * 100 / (maxValue - minValue)) : 100 }%`,
    position: `absolute`,
    right: `0`,
    zIndex: `0`,
    top: `5px`,
    height: `9px`, 
    backgroundColor: `#bfbfbf`,
    borderRadius: `3px`
  }}></span>

)
 
export default connect((state, ownProps) => ({
  state: getFormState(state, ownProps.form)
}))(RangeSlider)

RangeSlider.propTypes = {
  valueName: PropTypes.string,
  maxValue: PropTypes.number,
  minValue: PropTypes.number
};
