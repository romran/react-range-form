import React from "react";
import { render } from 'react-dom'
import { Field } from 'react-final-form-html5-validation'
import { OnChange } from 'react-final-form-listeners'
import './Assets/css/Reset.css'
import Styles from './Assets/css/Styles'
import Wizard from './Components/Wizard'
import Tip from './Components/Tooltip.js'
import { Provider } from 'react-redux'
import store from './store'
import RangeSlider from './Components/RangeSlider'
import ConditionTitle from './Components/ConditionTitle'


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}

const WhenFieldChanges = ({ field, becomes, set, to }) => (
    <Field name={set} subscription={{}}>
        {(
            { input: { onChange } }
        ) => (
                <OnChange name={field}>
                    {value => {
                        if (value === becomes) {
                            onChange(to)
                        }
                    }}
                </OnChange>
            )}
    </Field>
)

const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (value === is ? children : null)}
    </Field>
);


const normalizeInput = value => {
    if (!value) return value
    const onlyNums = value.replace(/^0+/, '')
    return onlyNums
}

const MonthlyObligationsError = ({ name }) => (
    <Field
        name={name}
        subscribe={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) =>
            error ? <span className='error'>{error}</span> : null
        }
    />
)

const ProductsError = ({ name }) => (
    <Field
        name={name}
        subscribe={{ error: true }}
        render={({ meta: { error } }) =>
            error ? <span className='error-border'>{error}</span> : null
        }
    />
)

const App = () => (
    <Provider store={store}>

        <Styles>
            <h1 className="title">Vartojimo paskolos ir kredito linijos skaičiuoklė</h1>
            <Wizard
                initialValues={{ RequestedLoanAmount: '500', NetMonthlyIncome: '245', SpouseNetMonthlyIncome: "0", CreditFor: 'Person', Debt: "noDebt", AmountOfConsumerProducts: "0", AmountOfHousingProducts: "0", AmountOfLeasingProducts: "0", MonthlyObligationsPayment: "0" }}
                onSubmit={onSubmit}
            >
                <Wizard.Page
                    validate={values => {
                        const errors = {}
                        if (values.MonthlyObligationsPayment !== '0' && values.AmountOfConsumerProducts === '0' && values.AmountOfHousingProducts === '0' && values.AmountOfLeasingProducts === '0') {
                            errors.MonthlyObligationsPayment = 'Įveskite bent vieną grąžintino finansinio įsipareigojimo sumą.'
                        }
                        if (values.MonthlyObligationsPayment === '0' && (values.AmountOfConsumerProducts !== '0' || values.AmountOfHousingProducts !== '0' || values.AmountOfLeasingProducts !== '0')) {
                            errors.AmountOfConsumerProducts = ' '
                        }
                        return errors
                    }}
                >
                    <div className="step">
                        <div className="step-title">
                            <h2>Informacija apie jūsų pageidaujamą paskolą</h2>
                        </div>

                        <div className="step-range">
                            <div className="step-input-title-container range">
                                <Tip classTitle={"tip"} overlay={"Nurodykite sumą, kurią norite pasiskolinti. Jei pageidaujama paskolos suma yra didesnė kaip 20 000 Eur, reikalingas nekilnojamojo turto užstatas."} />
                                <label htmlFor="RequestedLoanAmount" className="label">Pageidaujama paskolos suma</label>
                            </div>

                            <div className="step-range-container">
                                <div className="range-slider-container">
                                    <Field id="RequestedLoanAmount" name="RequestedLoanAmount" component="input" step="500" type="range" min="500" max="20000" />
                                    <RangeSlider valueName="RequestedLoanAmount" minValue={500} maxValue={20000} form="creditCounter" />
                                </div>
                            </div>

                            <div className="step-text-container">
                                <Field id="RequestedLoanAmountNumber" parse={normalizeInput} className="cur-value" name="RequestedLoanAmount" component="input" type="number" min={500} max={20000} required />
                                <label htmlFor="RequestedLoanAmountNumber" className="label">Eur</label>
                            </div>
                        </div>

                        <div className="step-radio">
                            <div className="step-input-title-container radio">
                                <Tip classTitle={"tip"} overlay={"Net jei esate vedęs (ištekėjusi), paskolą galite imti vienas (-a)."} />
                                <label className="label"><strong>Paskolą imsiu</strong></label>
                            </div>
                            <div className="step-radio-container">
                                <label className="label">
                                    <Field
                                        name="CreditFor" component="input" type="radio" value="Person"
                                    />{' '}
                                    Vienas
                            </label>
                                <label className="label">
                                    <Field name="CreditFor" component="input" type="radio" value="Family" />
                                    {' '}
                                    Su sutuoktiniu (bendraskoliu)
                            </label>
                            </div>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-title">
                            <ConditionTitle form="creditCounter"/>
                            <Tip classTitle={"tip"} overlay={"Toliau prašome pateikti informaciją apie bendras savo ir bendraskolio pajamas."} />
                        </div>
                        <div className="step-range">
                            <div className="step-input-title-container range">
                                <Tip classTitle={"tip"} overlay={"Prašome nurodyti oficialiai gaunamas pajamas atskaičius mokesčius."} />
                                <label htmlFor="NetMonthlyIncome" className="label">Jūsų grynosios mėnesio pajamos</label>
                            </div>

                            <div className="step-range-container">
                                <div className="range-slider-container">
                                    <Field id="NetMonthlyIncome" name="NetMonthlyIncome" component="input" step="1" type="range" min="245" max="3000" />
                                    <RangeSlider valueName="NetMonthlyIncome" minValue={245} maxValue={3000} form="creditCounter" />
                                </div>
                            </div>

                            <div className="step-text-container month">
                                <Field id="NetMonthlyIncomeNumber" parse={normalizeInput} className="cur-value" name="NetMonthlyIncome" component="input" type="number" min={245} max={3000} required />
                                <label htmlFor="NetMonthlyIncomeNumber" className="label">Eur/mėn</label>
                            </div>
                        </div>

                        <Condition when="CreditFor" is="Family">
                            <div className="step-range">
                                <div className="step-input-title-container range">
                                    <Tip classTitle={"tip right"} overlay={"Jei esate vedęs (ištekėjusi), tačiau bendraskolis yra ne jūsų sutuoktinis, o kitas asmuo, nurodykite šio asmens pajamas (ne sutuoktinio)."} />
                                    <label htmlFor="SpouseNetMonthlyIncome" className="label long">Sutuoktinio (bendraskolio) grynosios mėnesio pajamos</label>
                                </div>

                                <div className="step-range-container">
                                    <div className="range-slider-container">
                                        <Field id="SpouseNetMonthlyIncome" name="SpouseNetMonthlyIncome" value="0" component="input" step="1" type="range" min="0" max="3000" />
                                        <RangeSlider valueName="SpouseNetMonthlyIncome" minValue={0} maxValue={3000} form="creditCounter" />
                                    </div>
                                </div>
                                <div className="step-text-container month">
                                    <Field parse={normalizeInput} className="cur-value" name="SpouseNetMonthlyIncome" value="0" component="input" type="number" min={0} max={3000} required />
                                    <label className="label">Eur/mėn</label>
                                </div>
                            </div>
                        </Condition>
                        <WhenFieldChanges
                            field="CreditFor"
                            becomes={"Person"}
                            set="SpouseNetMonthlyIncome"
                            to={"0"}
                        />

                    </div>

                    <div className="step">
                        <div className="step-title">
                            <h2 className="step-title">Informacija apie jūsų (šeimos) finansinius įsipareigojimus</h2>
                            <Tip classTitle={"tip"} overlay={"Jei esate vedęs/ištekėjusi, būtinai nurodykite ne tik savo asmeninius ir bendrus šeimos įsipareigojimus, bet ir asmeninius sutuoktinio (-ės) turimus įsipareigojimus."} />
                        </div>

                        <div className="step-radio">
                            <div className="step-input-title-container radio long-title">
                                <label className="label long">Ar turite banke „Swedbank“ arba kitose kredito įstaigose paimtų ir dar negrąžintų paskolų arba esate tokių paskolų laiduotojas?</label>
                            </div>

                            <div className="step-radio-container up">
                                <label className="label">
                                    <Field
                                        name="Debt" component="input" type="radio" value="noDebt" />{' '}
                                    Ne
                            </label>
                                <label className="label">
                                    <Field name="Debt" component="input" type="radio" value="isDebt" />{' '}
                                    Taip
                            </label>
                            </div>
                        </div>

                        <Condition when="Debt" is="isDebt">

                            <div className="step-range">
                                <div className="step-input-title-container range">
                                    <Tip classTitle={"tip right margin"} overlay={"Prašome nurodyti bendrą kreditoriams (bankams, greitųjų kreditų bendrovėms, fiziniams ar juridiniams asmenims ir kt.) grąžintiną visų savo ir sutuoktinio (bendraskolio) paskolų, gautų neįkeitus turto, negrąžintos greitųjų paskolų dalies ir banko ar kredito kortelės sąskaitoje (-ose) suteiktų limitų sumą (nurodoma be palūkanų). Informaciją nurodoma ir tuo atveju, jeigu esate šių paskolų laiduotojas."} />
                                    <label htmlFor="AmountOfConsumerProducts" className="label long width">Likusi grąžinti <strong>vartojimo kreditų</strong> suma</label>
                                </div>

                                <div className="step-range-container up">
                                    <div className="range-slider-container">
                                        <Field id="AmountOfConsumerProducts" name="AmountOfConsumerProducts" component="input" step="1" type="range" min="0" max="30000" />
                                        <RangeSlider valueName="AmountOfConsumerProducts" minValue={0} maxValue={30000} form="creditCounter" />
                                    </div>
                                </div>

                                <div className="step-text-container up">
                                    <Field parse={normalizeInput} className="cur-value" name="AmountOfConsumerProducts" component="input" type="number" min={0} max={30000} required />
                                    <label className="label">Eur</label>
                                </div>
                            </div>

                            <div className="step-range">
                                <div className="step-input-title-container range">
                                    <Tip classTitle={"tip right margin"} overlay={"Prašome nurodyti bendrą kreditoriams (bankams, greitųjų kreditų bendrovėms, fiziniams ar juridiniams asmenims ir kt.) grąžintiną visų savo ir sutuoktinio (bendraskolio) būsto paskolų, kitų paskolų, gautų įkeitus nekilnojamąjį turtą, sumą (nurodoma be palūkanų). Informaciją nurodoma ir tuo atveju, jeigu esate šių paskolų laiduotojas."} />
                                    <label htmlFor="AmountOfHousingProducts" className="label long width">Likusi grąžinti <strong>būsto finansavimo</strong> suma</label>
                                </div>

                                <div className="step-range-container up">
                                    <div className="range-slider-container">
                                        <Field id="AmountOfHousingProducts" name="AmountOfHousingProducts" component="input" step="1" type="range" min="0" max="870000" />
                                        <RangeSlider valueName="AmountOfHousingProducts" minValue={0} maxValue={870000} form="creditCounter" />
                                    </div>
                                </div>

                                <div className="step-text-container up">
                                    <Field parse={normalizeInput} className="cur-value" name="AmountOfHousingProducts" component="input" type="number" min={0} max={870000} required />
                                    <label className="label">Eur</label>
                                </div>
                            </div>

                            <div className="step-range">
                                <div className="step-input-title-container range">
                                    <Tip classTitle={"tip right margin"} overlay={"Prašome nurodyti bendrą sumą (nurodoma be palūkanų), kurią jūs su sutuoktiniu (bendraskoliu) turite grąžinti kreditoriams (bankams, greitųjų kreditų bendrovėms, fiziniams ar juridiniams asmenims ir kt.) už visas lizingo būdu įsigytas prekes (už išsimokėtinai pirktą (-us ) automobilį (-ius), namų apyvokos ir kitus daiktus). Informaciją nurodoma ir tuo atveju, jeigu esate šių paskolų laiduotojas."} />
                                    <label htmlFor="AmountOfLeasingProducts" className="label long width">Likusi grąžinti <strong>finansavimo pagal lizingo sutartį(-is)</strong> suma</label>
                                </div>

                                <div className="step-range-container up">
                                    <div className="range-slider-container">
                                        <Field id="AmountOfLeasingProducts" name="AmountOfLeasingProducts" component="input" step="1" type="range" min="0" max="145000" />
                                        <RangeSlider valueName="AmountOfLeasingProducts" minValue={0} maxValue={145000} form="creditCounter" />
                                    </div>
                                </div>

                                <div className="step-text-container up">
                                    <Field parse={normalizeInput} className="cur-value" name="AmountOfLeasingProducts" component="input" type="number" min={0} max={145000} required />
                                    <label className="label">Eur</label>
                                </div>
                            </div>

                            <div className="step-range">
                                <div className="step-input-title-container range">
                                    <Tip classTitle={"tip right margin"} overlay={"Prašome nurodyti bendrą sumą, kurią kas mėnesį turite mokėti visiems kreditoriams (bankams, greitųjų kreditų bendrovėms, fiziniams ar juridiniams asmenims ir kt.). Nurodoma suma su palūkanomis. Informaciją nurodoma ir tuo atveju, jeigu esate šių paskolų laiduotojas."} />
                                    <label htmlFor="MonthlyObligationsPayment" className="label long width">Paminėtų <strong>finansinių įsipareigojimų mėnesio</strong> įmokų suma</label>
                                </div>

                                <div className="step-range-container up">
                                    <div className="range-slider-container">
                                        <Field id="MonthlyObligationsPayment" name="MonthlyObligationsPayment" component="input" step="1" type="range" min="0" max="7000" />
                                        <RangeSlider valueName="MonthlyObligationsPayment" minValue={0} maxValue={7000} form="creditCounter" />
                                    </div>
                                </div>

                                <div className="step-text-container month up">
                                    <Field parse={normalizeInput} className="cur-value" name="MonthlyObligationsPayment" component="input" type="number" min={0} max={7000} required />
                                    <label className="label">Eur/mėn</label>
                                    <ProductsError name="AmountOfConsumerProducts" />
                                 </div>
                            </div>

                            <div className='errors-container'>
                                <MonthlyObligationsError name="MonthlyObligationsPayment" />
                            </div>

                        </Condition>

                        <WhenFieldChanges
                            field="Debt"
                            becomes={"noDebt"}
                            set="AmountOfConsumerProducts"
                            to={"0"}
                        />
                        <WhenFieldChanges
                            field="Debt"
                            becomes={"noDebt"}
                            set="AmountOfHousingProducts"
                            to={"0"}
                        />
                        <WhenFieldChanges
                            field="Debt"
                            becomes={"noDebt"}
                            set="AmountOfLeasingProducts"
                            to={"0"}
                        />
                        <WhenFieldChanges
                            field="Debt"
                            becomes={"noDebt"}
                            set="MonthlyObligationsPayment"
                            to={"0"}
                        />
                    </div>

                </Wizard.Page>
                <Wizard.Page>
                    <div className="result-title">
                        <h2>Jūsų pateikta informacija:</h2>
                    </div>
                </Wizard.Page>
            </Wizard >

        </Styles >
    </Provider>

)

render(<App />, document.getElementById("root"));

