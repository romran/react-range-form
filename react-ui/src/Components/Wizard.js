import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import FormStateToRedux from './FormStateToRedux'

export default class Wizard extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }
  static Page = ({ children }) => children

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      values: props.initialValues || {},
    }
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }))

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }))


  first = () =>
    this.setState(state => ({
      page: 0,
    }))

  reset = () =>
    setTimeout(() => {
      this.setState(state => ({
        page: 0,
        values: { RequestedLoanAmount: '500', NetMonthlyIncome: '245', SpouseNetMonthlyIncome: "0", CreditFor: 'Person', Debt: "noDebt", AmountOfConsumerProducts: "0", AmountOfHousingProducts: "0", AmountOfLeasingProducts: "0", MonthlyObligationsPayment: "0" }
      }))
    }, 500)


  /**
  * NOTE: Both validate and handleSubmit switching are implemented
  * here because 🏁 Redux Final Form does not accept changes to those
  * functions once the form has been defined.
  */

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = values => {
    const { children, onSubmit } = this.props
    const { page } = this.state
    const isLastPage = page === React.Children.count(children) - 1
    if (isLastPage) {
      this.reset(values)
      return onSubmit(values)
    } else {
      this.next(values)
    }
  }

  render() {
    const { children } = this.props
    const { page, values } = this.state
    const activePage = React.Children.toArray(children)[page]
    const isLastPage = page === React.Children.count(children) - 1


    // let arrayOfJsx = values.map(item => <div key={item} > I am {item} </div>
    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}>
        {({ handleSubmit, change, submitting, values, reset }) => (

          <form ref="creditCounter"
            onSubmit={handleSubmit}>
            <FormStateToRedux form="creditCounter" />
            {activePage}
            <div className="results-content">

              {!isLastPage && (<div>
                <button className="golden" type="submit">Skaičiuoti</button>
              </div>)}

              {isLastPage && (<div className="table-container">

                <div className="table">

                  <div className="row">
                    <div className="key">
                      <h3>Pageidaujama paskolos suma</h3>
                    </div>
                    <div className="value">
                      <h3>{values.RequestedLoanAmount} Eur</h3>
                    </div>
                  </div>

                  <div className="row">
                    <div className="key">
                      <h3>Jūsų grynosios mėnesio pajamos</h3>
                    </div>
                    <div className="value">
                      <h3>{values.NetMonthlyIncome} Eur/mėn</h3>
                    </div>
                  </div>
                  {values.CreditFor === "Family" && (
                    <div className="row">
                      <div className="key">
                        <h3>Sutuoktinio (bendraskolio) grynosios mėnesio pajamos</h3>
                      </div>
                      <div className="value">
                        <h3>{values.SpouseNetMonthlyIncome} Eur/mėn</h3>
                      </div>
                    </div>
                  )}

                  {values.Debt === "isDebt" && values.AmountOfConsumerProducts !== "0" && (
                    <div className="row">
                      <div className="key">
                        <h3>Likusi grąžinti vartojimo kreditų suma</h3>
                      </div>
                      <div className="value">
                        <h3>{values.AmountOfConsumerProducts} Eur</h3>
                      </div>
                    </div>
                  )}

                  {values.Debt === "isDebt" && values.AmountOfHousingProducts !== "0" && (
                    <div className="row">
                      <div className="key">
                        <h3>Likusi grąžinti būsto finansavimo suma</h3>
                      </div>
                      <div className="value">
                        <h3>{values.AmountOfHousingProducts} Eur</h3>
                      </div>
                    </div>
                  )}

                  {values.Debt === "isDebt" && values.AmountOfLeasingProducts !== "0" && (
                    <div className="row">
                      <div className="key">
                        <h3>Likusi grąžinti finansavimo pagal lizingo sutartį (-is) suma</h3>
                      </div>
                      <div className="value">
                        <h3>{values.AmountOfLeasingProducts} Eur</h3>
                      </div>
                    </div>
                  )}

                  {values.Debt === "isDebt" && (
                    <div className="row">
                      <div className="key">
                        <h3>Paminėtų finansinių įsipareigojimų mėnesio įmokų suma</h3>
                      </div>
                      <div className="value">
                        <h3>{values.MonthlyObligationsPayment} Eur/mėn</h3>
                      </div>
                    </div>
                  )}

                </div>

                <div className="buttons">
                  <button className="golden black" type="button" onClick={this.first}>
                    Skaičiuoti iš naujo
                </button>

                  <button className="golden" type="submit">
                    Paraišką vartojimo paskolai
                </button>

                </div>
                
              </div>
              )}
            </div>
          </form>
        )}
      </Form>
    )
  }
}

