import { put, call, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
// import { selectedOption, mapStateToProps } from './selectors';

export const selectedOption = state => state.contents.filter(x => x.selected)[0];

export const getTotalPrice = (state, price = 1000, asString = true) => {
  let basePrice = price;
  return asString ? `₦${basePrice}` : basePrice + state.processingFee - state.referral.amount;
};

export const summaryDisplay = (state) => {
  return `12 lessons x 1 month`;
};

export const mapStateToProps = (state, ownProps) => {
    let selected = state.priceOptions.filter(x => x.selected)[0]
    let price = 0
    if (selected) {
        selected = {
            ...selected,
            alt_text: `${selected.heading} Package`,
            price: selected.price,
            formated_heading: `${state.subject ? state.subject : "Academic"} Lessons`,
        }
        price = selected.price;
    }
    return {
        priceOptions: state.priceOptions.map((x, ) => ({...x, subject: state.subject})),
        priceFactor: state.priceFactor,
        pricingDeterminant: state.pricingDeterminant,
        selected,
        phone_number: "09094526878",
        totalPrice: getTotalPrice(state, price),
        summary: summaryDisplay(state),
        actualPrice: getTotalPrice(state, price, false),
        processingFee: state.processingFee,
        referral: state.referral,
    }
}


export const mapDispatchToProps = dispatch => ({
    selectPrice: (heading, selected) => dispatch({ type: 'SELECT_PRICE', heading, selected }),
    selectNoOfStudent: no => dispatch({ type: 'SELECT_NO_OF_STUDENT', no_of_students: no }),
    selectHours: no => dispatch({ type: 'SELECT_HOURS', hrs: no }),
    selectDays: no => dispatch({ type: 'SELECT_DAYS', days: no }),
    onFormFieldChanged: data => dispatch({ type: 'POPULATE_FIELD', data }),
    onSubmitForm: () => dispatch({ type: 'SUBMIT_FORM' }),
    validateCode: (code) => dispatch({type: "VALIDATE_REFERRAL_CODE", code})
});


function submitFormServer(request) {
//   const myHeaders = new Headers({
//     'X-Requested-With': 'XMLHttpRequest',
//   });
//   return fetch(window.Urls.validate_referral_code(),
//     {
//       method: 'post',
//       headers: myHeaders,
//       body: JSON.stringify(request),
//     }).then(response => ({ response }), error => ({ error }));
    var a = new Promise()
    setTimeout(()=>{
        a.then(e=>({response:{status: 200,amount: 1500, code: "ADES"}}))  
    },5000)
    return a
}

function* validateCode() {
  const { referral} = yield select(mapStateToProps);
    yield put({type: "FETCH_CODE_START"})
    const { response, error } = yield call(submitFormServer, referral);
    yield put({type: "FETCH_CODE_STOP"})
    if (error || response.status !== 200) {
        yield put({type: "UPDATE_REFERRAL_CODE", code:"", amount:0, display:false})
    }
    else {
        yield put({type: "UPDATE_REFERRAL_CODE", ...response, display: true})
    }
}



function* resetCounter() {
    const { selected } = yield select(mapStateToProps);
    if(selected){
        window.$('#id_budget').val(selected.price)
        window.$('#id_plan').val(selected.heading)
    }
}


export const getPriceRate = ({ price_base_rate, one_hour_less_price_rate }, noOfHour = 1) => {
    if (noOfHour){ 
        if (noOfHour === 1) {
            return price_base_rate + one_hour_less_price_rate;
        }
        if (noOfHour === 2) {
            return 1;
        }
        return 1 - price_base_rate;
    }
    return price_base_rate + one_hour_less_price_rate;
};

export const determineHours = (hours = 1, { hour_rate }) => {
    if(hours){

    return hours > 2 ? hours - (hour_rate * hours) : hours;
    }
    return 1;
};

export const determineStudentNo = (no, { student_no_rate }) => {
    if (no) {
        return no === 1 ? no : no - (no * student_no_rate);
    }
    return 1;
};

export const calculatePrice = (price, { studentNo, hrs, days, rate, wks, discount = 0 }) => {
    const totalPrice = price * studentNo * hrs * days * wks * rate;
    let total = Math.ceil(totalPrice / 100) * 100;
    total -= (total * discount) / 100;
    return total;
};
function* updatePrice() {
    const {
        priceFactor: { no_of_students, hours_per_day, noOfDays, noOfWeeks, discount },
        pricingDeterminant,
    } = yield select(mapStateToProps);
    const rate = getPriceRate(pricingDeterminant, parseFloat(hours_per_day));
    yield put({
        type: 'UPDATE_PRICE',
        studentNo: determineStudentNo(parseFloat(no_of_students), pricingDeterminant),
        hrs: determineHours(parseFloat(hours_per_day), pricingDeterminant),
        rate,
        wks: noOfWeeks >= 4 ? 4 : noOfWeeks,
        discount,
        days: parseInt(noOfDays) || 1
    });
}
function* watchStudentChange() {
    yield* takeLatest('SELECT_NO_OF_STUDENT', updatePrice);
}
function* watchHoursChange() {
    yield* takeLatest('SELECT_HOURS', updatePrice);
}
function* watchDaysChange() {
    yield* takeLatest('SELECT_DAYS', updatePrice);
}
function* onLoad() {
    yield* takeLatest('ON_LOAD', updatePrice);
}
function* watchOptionSelected() {
    yield* takeLatest('SELECT_PRICE', resetCounter);
}
function* referralSelected(){
    yield* takeLatest('VALIDATE_REFERRAL_CODE', validateCode)
}
export default function* rootSaga() {
    yield [
        watchStudentChange(),
        watchHoursChange(),
        watchDaysChange(),
        watchOptionSelected(),
        onLoad(),
        referralSelected(),
    ];
}
