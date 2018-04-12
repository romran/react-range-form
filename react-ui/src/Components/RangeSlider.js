import React from 'react'
import { connect } from 'react-redux'
import { getFormState } from './finalFormDuck'
import PropTypes from 'prop-types';

const RangeSlider = ({ state, valueName, maxValue, minValue }) => (
  <span className="RangeSlider" style={{
    width: `${100 - ( (state.values[valueName] - minValue) * 100 / (maxValue - minValue))}%`,
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


/* {!isLastPage && (<div>
  <div style={{ width: `${values.spouseIncome}px`, height: `5px`, backgroundColor: `blue` }}></div>
</div>)} */