import React from 'react'
import { connect } from 'react-redux'
import { getFormState } from './finalFormDuck'
import PropTypes from 'prop-types';

const ConditionalTitle = ({ state }) => (
    <h2>
        Informacija apie jūsų {state.values.CreditFor === "Family" ? 'ir bendraskolio' : ''} pajamas {state.values.RequestedLoanAmount >= 4000 ? 'ir turtą' : ''}
    </h2>
)

export default connect((state, ownProps) => ({
    state: getFormState(state, ownProps.form)
}))(ConditionalTitle)

