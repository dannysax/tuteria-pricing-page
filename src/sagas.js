import { put, call, select } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
// import { selectedOption, mapStateToProps } from './selectors';

export const selectedOption = state => state.contents.filter(x => x.selected)[0];
export const mapStateToProps = (state) => {
    const wasSelected = selectedOption(state) !== undefined;
    const wasChecked = state.justBrowsing;
    return {
    ...state,
  }; };


function* resetCounter() {
    yield put({ type: 'RESET_COUNTER' });
}


export const getPriceRate = ({ price_base_rate, one_hour_less_price_rate }, noOfHour = 1) => {
    if (noOfHour === 1) {
        return price_base_rate + one_hour_less_price_rate;
    }
    if (noOfHour === 2) {
        return 1;
    }
    return 1 - price_base_rate;
};

export const determineHours = (hours = 1, { hour_rate }) => {
    return hours > 2 ? hours - (hour_rate * hours) : hours;
};

export const determineStudentNo = (no, { student_no_rate }) => {
    return no === 1 ? no : no - (no * student_no_rate);
};

export const calculatePrice = (price, { studentNo, hrs, days, rate, wks, discount }) => {
    const totalPrice = price * studentNo * hrs * days * wks * rate;
    let total = Math.ceil(totalPrice / 100) * 100;
    total -= (total * discount) / 100;
    return total;
};
function* updatePrice() {
    const {
        priceFactor: { noOfStudent, noOfhours, noOfDays, noOfWeeks, discount },
        pricingDeterminant,
    } = yield select(mapStateToProps);
    const rate = getPriceRate(pricingDeterminant, parseInt(noOfhours));
    yield put({
        type: 'UPDATE_PRICE',
        studentNo: determineStudentNo(parseInt(noOfStudent), pricingDeterminant),
        hrs: determineHours(parseInt(noOfhours), pricingDeterminant),
        rate,
        wks: noOfWeeks >= 4 ? 4 : noOfWeeks,
        discount,
        days: parseInt(noOfDays)
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
export default function* rootSaga() {
    yield [
        watchStudentChange(),
        watchHoursChange(),
        watchDaysChange(),
        watchOptionSelected(),
        onLoad(),
    ];
}
