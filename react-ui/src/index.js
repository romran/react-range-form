import React from "react";
import { render } from 'react-dom'

import { Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import './Assets/css/Reset.css'
import Styles from './Assets/css/Styles'
import Wizard from './Components/Wizard'
import Tip from './Components/Tooltip.js'

import { Provider } from 'react-redux'
import store from './store'
import RangeSlider from './Components/RangeSlider'


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}

const Error = ({ name }) => (
    <Field
        name={name}
        subscribe={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) =>
            touched && error ? <span>{error}</span> : null
        }
    />
)

const WhenFieldChanges = ({ field, becomes, set, to }) => (
    <Field name={set} subscription={{}}>
        {(
            // No subscription. We only use Field to get to the change function
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
    const onlyNums = value.match("^[0-9]+$")

    if (onlyNums) {
        const number = parseInt(onlyNums[0])
         if (number < 500) {
            console.log(number)
            number.toString().replace(/[0-9]/g, "500")
        }
        return number
    }
    else {
        return 500;
    }
}

//const required = value => (value ? undefined : 'Required')


const App = () => (
    <Provider store={store}>

        <Styles>
            <h1 className="title">Vartojimo paskolos ir kredito linijos skaičiuoklėss</h1>
            <Wizard
                initialValues={{ creditAmount: '500', yourIncome: '245', spouseIncome: "0", creditPerson: 'alone', debt: "noDebt", consumerCreditDebt: "0", housingFinanceDebt: "0", leasingDebt: "0", monthlySubscriptionDebt: "0" }}
                onSubmit={onSubmit}
            >
                <Wizard.Page >
                    <div className="step">
                        <div className="step-title">
                            <h2>Informacija apie jūsų pageidaujamą paskolą</h2>
                        </div>

                        <div className="step-range">
                            <div className="step-input-title-container range">
                                <Tip classTitle={"tip"} overlay={"Nurodykite sumą, kurią norite pasiskolinti. Jei pageidaujama paskolos suma yra didesnė kaip 20 000 Eur, reikalingas nekilnojamojo turto užstatas."} />
                                <label>Pageidaujama paskolos suma</label>
                            </div>

                            <div className="step-range-container">
                                <div className="range-slider-container">
                                    <Field name="creditAmount" component="input" type="range" min="500" max="20000" />
                                    <RangeSlider valueName="creditAmount" minValue={500} maxValue={20000} form="creditCounter" />
                                </div>
                            </div>

                            <div className="step-text-container">
                                <Field className="cur-value" parse={normalizeInput} name="creditAmount" component="input" type="text" />
                                <label>Eur</label>
                            </div>
                        </div>

                        <div className="step-radio">
                            <div className="step-input-title-container radio">
                                <Tip classTitle={"tip"} overlay={"Net jei esate vedęs (ištekėjusi), paskolą galite imti vienas (-a)."} />
                                <label>Paskolą imsiu</label>
                            </div>
                            <div className="step-radio-container">
                                <label>
                                    <Field
                                        name="creditPerson" component="input" type="radio" value="alone"
                                    />{' '}
                                    Vienas
                            </label>
                                <label>
                                    <Field name="creditPerson" component="input" type="radio" value="together" />
                                    {' '}
                                    Su sutuoktiniu (bendraskoliu)
                            </label>
                            </div>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-title">
                            <h2>Informacija apie jūsų pajamas</h2>
                            <Tip classTitle={"tip"} overlay={"Toliau prašome pateikti informaciją apie bendras savo ir bendraskolio pajamas."} />
                        </div>
                        <div className="step-range">
                            <div className="step-input-title-container range">
                                <Tip classTitle={"tip"} overlay={"Prašome nurodyti oficialiai gaunamas pajamas atskaičius mokesčius."} />
                                <label>Jūsų grynosios mėnesio pajamos</label>
                            </div>

                            <div className="step-range-container">
                                <div className="range-slider-container">
                                    <Field name="yourIncome" component="input" type="range" min="245" max="3000" />
                                    <RangeSlider valueName="yourIncome" minValue={245} maxValue={3000} form="creditCounter" />
                                </div>
                            </div>

                            <div className="step-text-container month">
                                <Field className="cur-value" name="yourIncome" component="input" type="text" value="500" />
                                <label>Eur/mėn</label>
                            </div>
                        </div>

                        <Condition when="creditPerson" is="together">
                            <div className="step-range">
                                <div className="step-input-title-container range">
                                    <Tip classTitle={"tip right"} overlay={"Jei esate vedęs (ištekėjusi), tačiau bendraskolis yra ne jūsų sutuoktinis, o kitas asmuo, nurodykite šio asmens pajamas (ne sutuoktinio)."} />
                                    <label className="long">Sutuoktinio (bendraskolio) grynosios mėnesio pajamos</label>
                                </div>

                                <div className="step-range-container">
                                    <div className="range-slider-container">
                                        <Field name="spouseIncome" value="0" component="input" type="range" min="0" max="3000" />
                                        <RangeSlider valueName="spouseIncome" minValue={0} maxValue={3000} form="creditCounter" />
                                    </div>
                                </div>
                                <div className="step-text-container month">
                                    <Field className="cur-value" name="spouseIncome" value="0" component="input" type="text" />
                                    <label>Eur/mėn</label>
                                </div>
                                <Error name="message" />
                            </div>
                        </Condition>
                        <WhenFieldChanges
                            field="creditPerson"
                            becomes={"alone"}
                            set="spouseIncome"
                            to={"0"}
                        />

                    </div>

                    <div className="step">
                        <div className="step-title">
                            <h2 className="step-title">Informacija apie jūsų (šeimos) finansinius įsipareigojimus</h2>
                            <Tip classTitle={"tip"} overlay={"Jei esate vedęs/ištekėjusi, būtinai nurodykite ne tik savo asmeninius ir bendrus šeimos įsipareigojimus, bet ir asmeninius sutuoktinio (-ės) turimus įsipareigojimus."} />
                        </div>

                        <div className="step-radio">
                            <div className="step-input-title-container radio">
                                <label className="long">Ar turite banke „Swedbank“ arba kitose kredito įstaigose paimtų ir dar negrąžintų paskolų arba esate tokių paskolų laiduotojas?</label>
                            </div>

                            <div className="step-radio-container up">
                                <label>
                                    <Field
                                        name="debt" component="input" type="radio" value="noDebt" />{' '}
                                    Ne
                            </label>
                                <label>
                                    <Field name="debt" component="input" type="radio" value="isDebt" />{' '}
                                    Taip
                            </label>
                            </div>
                        </div>

                        <Condition when="debt" is="isDebt">

                            <div className="step-range">
                                <div className="step-input-title-container range">
                                    <Tip classTitle={"tip right margin"} overlay={"Prašome nurodyti bendrą kreditoriams (bankams, greitųjų kreditų bendrovėms, fiziniams ar juridiniams asmenims ir kt.) grąžintiną visų savo ir sutuoktinio (bendraskolio) paskolų, gautų neįkeitus turto, negrąžintos greitųjų paskolų dalies ir banko ar kredito kortelės sąskaitoje (-ose) suteiktų limitų sumą (nurodoma be palūkanų). Informaciją nurodoma ir tuo atveju, jeigu esate šių paskolų laiduotojas."} />
                                    <label className="long width">Likusi grąžinti vartojimo kreditų suma</label>
                                </div>

                                <div className="step-range-container up">
                                    <div className="range-slider-container">
                                        <Field name="consumerCreditDebt" component="input" type="range" min="0" max="30000" />
                                        <RangeSlider valueName="consumerCreditDebt" minValue={0} maxValue={30000} form="creditCounter" />
                                    </div>
                                </div>

                                <div className="step-text-container up">
                                    <Field className="cur-value" name="consumerCreditDebt" component="input" type="text" />
                                    <label>Eur</label>
                                </div>
                            </div>

                            <div className="step-range">
                                <div className="step-input-title-container range">
                                    <Tip classTitle={"tip right margin"} overlay={"Prašome nurodyti bendrą kreditoriams (bankams, greitųjų kreditų bendrovėms, fiziniams ar juridiniams asmenims ir kt.) grąžintiną visų savo ir sutuoktinio (bendraskolio) būsto paskolų, kitų paskolų, gautų įkeitus nekilnojamąjį turtą, sumą (nurodoma be palūkanų). Informaciją nurodoma ir tuo atveju, jeigu esate šių paskolų laiduotojas."} />
                                    <label className="long width">Likusi grąžinti būsto finansavimo suma</label>
                                </div>

                                <div className="step-range-container up">
                                    <div className="range-slider-container">
                                        <Field name="housingFinanceDebt" component="input" type="range" min="0" max="870000" />
                                        <RangeSlider valueName="housingFinanceDebt" minValue={0} maxValue={870000} form="creditCounter" />
                                    </div>
                                </div>

                                <div className="step-text-container up">
                                    <Field className="cur-value" name="housingFinanceDebt" component="input" type="text" />
                                    <label>Eur</label>
                                </div>
                            </div>

                            <div className="step-range">
                                <div className="step-input-title-container range">
                                    <Tip classTitle={"tip right margin"} overlay={"Prašome nurodyti bendrą sumą (nurodoma be palūkanų), kurią jūs su sutuoktiniu (bendraskoliu) turite grąžinti kreditoriams (bankams, greitųjų kreditų bendrovėms, fiziniams ar juridiniams asmenims ir kt.) už visas lizingo būdu įsigytas prekes (už išsimokėtinai pirktą (-us ) automobilį (-ius), namų apyvokos ir kitus daiktus). Informaciją nurodoma ir tuo atveju, jeigu esate šių paskolų laiduotojas."} />
                                    <label className="long width">Likusi grąžinti finansavimo pagal lizingo sutartį (-is) suma</label>
                                </div>

                                <div className="step-range-container up">
                                    <div className="range-slider-container">
                                        <Field name="leasingDebt" component="input" type="range" min="0" max="145000" />
                                        <RangeSlider valueName="leasingDebt" minValue={0} maxValue={145000} form="creditCounter" />
                                    </div>
                                </div>

                                <div className="step-text-container up">
                                    <Field className="cur-value" name="leasingDebt" component="input" type="text" />
                                    <label>Eur</label>
                                </div>
                            </div>

                            <div className="step-range">
                                <div className="step-input-title-container range">
                                    <Tip classTitle={"tip right margin"} overlay={"Prašome nurodyti bendrą sumą, kurią kas mėnesį turite mokėti visiems kreditoriams (bankams, greitųjų kreditų bendrovėms, fiziniams ar juridiniams asmenims ir kt.). Nurodoma suma su palūkanomis. Informaciją nurodoma ir tuo atveju, jeigu esate šių paskolų laiduotojas."} />
                                    <label className="long width">Paminėtų finansinių įsipareigojimų mėnesio įmokų suma</label>
                                </div>

                                <div className="step-range-container up">
                                    <div className="range-slider-container">
                                        <Field name="monthlySubscriptionDebt" component="input" type="range" min="0" max="7000" />
                                        <RangeSlider valueName="monthlySubscriptionDebt" minValue={0} maxValue={7000} form="creditCounter" />
                                    </div>
                                </div>

                                <div className="step-text-container month up">
                                    <Field className="cur-value" name="monthlySubscriptionDebt" component="input" type="text" />
                                    <label>Eur/mėn</label>
                                </div>
                            </div>

                        </Condition>

                        <WhenFieldChanges
                            field="debt"
                            becomes={"noDebt"}
                            set="consumerCreditDebt"
                            to={"0"}
                        />
                        <WhenFieldChanges
                            field="debt"
                            becomes={"noDebt"}
                            set="housingFinanceDebt"
                            to={"0"}
                        />
                        <WhenFieldChanges
                            field="debt"
                            becomes={"noDebt"}
                            set="leasingDebt"
                            to={"0"}
                        />
                        <WhenFieldChanges
                            field="debt"
                            becomes={"noDebt"}
                            set="monthlySubscriptionDebt"
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

