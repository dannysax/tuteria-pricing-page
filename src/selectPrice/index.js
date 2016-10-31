import React from 'react'
import {Li, P, Span, Ul, Wrapper,
    H3, SelectDiv, Ol, Select, SelectBox, Div} from './components';
import { Provider } from 'react-redux';
import configureStore from '../store';
import {connect} from "react-redux";
import {getFullDetails, noOfWeeksDisplay, getCssStyle} from './details';

const SinglePrice = ({heading, perHour, subject=null, }) => {
    const {description, portfolio} = getFullDetails(heading, subject);
    const duration = noOfWeeksDisplay(2);
    const newPrice = new Number(perHour);
    const classType = getCssStyle(heading)
    return (
        <Li {...{ classType }} >
            <Wrapper>
                <H3>{heading}</H3>
                <P>
                    <Span country className="country">&#x20A6; </Span>
                    <Span dollar dollarOrMonth className="dollars">{newPrice.toLocaleString() }</Span>
                    <Span month dollarOrMonth className="month">{duration}</Span>
                </P>
                {description}
                <br/><br/>
                <p className="blue-font font-head">PORTFOLIO</p>
                <Ul>
                    {portfolio.map((p, index) =>
                        <li key={index}>{p}</li>) }
                </Ul>
                <SelectDiv>
                    <button className="btn btn-tutor btn-lg col-xs-12 col-sm-8 col-sm-offset-2">
                        Select
                    </button>
                </SelectDiv>
            </Wrapper>
        </Li>
    )
}

const SelectItem = ({options, heading, displayKey, plural, value="", onChange}) =>
    <SelectBox className="select-box">
        <Select className="form-control filter-form" {...{value, onChange}}>
            <option value="">{heading}</option>
            {options.map((opt, index) =>
                <option key={index} value={opt}>{`${opt} ${opt === 1 ? displayKey: plural}`}</option>
            ) }
        </Select>
    </SelectBox>

const FilterForm = () => {
    return (
        <div className="row" id="calc-host-container">
            <Div className="host_7w28ng">
                <SelectItem {...{
                    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                    heading: "No. of Students",
                    displayKey: "student",
                    plural: "students",
                    onChange:()=>{}
                }}/>
                <SelectItem {...{
                    options: [1, 2, 3, 4, 5, 6, 7],
                    heading: "Lessons per week",
                    displayKey: "lesson/week",
                    plural: "lessons/week",
                    onChange:()=>{}
                }}/>
                <SelectItem {...{
                    options: [1, 1.5, 2, 2.5, 3, 4, 5],
                    heading: "Hours per Lesson",
                    displayKey: "hour/lesson",
                    plural: "hours/lesson",
                    onChange:()=>{}
                }} />
            </Div>
        </div>

    )
}
const store = configureStore();

const Root = ({priceOptions}) =>
    <div>
        <div className="text-center padding-bottom-15">
            <h1 className="dollars blue-font">Pricing Options</h1>
            <p className="padding-down-10 level-font">Select a price that matches your budget and requirements.</p>
        </div>
        <FilterForm />
        <div className="row">
            <Ol>
                {priceOptions.map((price, index) =>
                    <SinglePrice key={index} {...price} />) }
            </Ol>
        </div>
    </div>

const mapStateToProps = (state, ownProps) => {
    return {
        priceOptions: state.priceOptions.map((x,)=> ({...x,subject: state.subject})),
    }
}

const App = connect(mapStateToProps)(Root);

const Pricing = () => {
    return (
        <Provider store={store} >
            <App />
        </Provider>
    )
}
export default Pricing