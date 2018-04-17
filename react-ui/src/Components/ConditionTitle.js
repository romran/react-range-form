import React from 'react'
import { connect } from 'react-redux'
import { getFormState } from './finalFormDuck'
import PropTypes from 'prop-types';

const ConditionTitle = ({ state }) => (
    <h2>
        Informacija apie {state.values.CreditFor === "Family" ? 'ir bendraskolio' : ''} jūsų pajamas{state.values.RequestedLoanAmount >= 4000 ? ' ir turtą' : ''}
    </h2>
)

export default connect((state, ownProps) => ({
    state: getFormState(state, ownProps.form)
}))(ConditionTitle)

