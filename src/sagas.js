import { put, call, select } from "redux-saga/effects";
import { takeLatest } from "redux-saga";
// import { selectedOption, mapStateToProps } from './selectors';

const HourFactor = (hourFactors, hours) => {
  let options = {};
  hourFactors.forEach((o) => {
    options[o.hours] = o.factor;
  });
  let hour_rate = 1;
  if (hours <= 1) {
    hour_rate = options["1 hour"] || 1;
  } else if (hours > 1 && hours <= 1.5) {
    hour_rate = options["1.5 hour"] || 1;
  } else if (hours >= 2 && hours <= 3) {
    hour_rate = options["2-3 hours"] || 1;
  } else if (hours > 3 && hours <= 4) {
    hour_rate = options["4 hours"] || 1;
  } else {
    hour_rate = options["5 hours"] || 1;
  }
  return hour_rate;
};

export const determinePricingPlan = (data) => {
  const locationFx = data.stateFx * data.vicinityFx;
  const extraStudentFx = data.extraStudentDiscount / 100;
  const lessonDuration = data.splitRequest[0].lessonDuration;
  const priceReducer = (accumulator, current) => {
    const scheduleValue =
      current.lessonDays * current.lessonHours * current.lessonDuration;
    const learningFx =
      current.purposeFx * current.curriculumFx * current.subjectsFx;
    const hourlyRate = current.baseRate * locationFx * learningFx;
    const singleStudentPrice = hourlyRate * scheduleValue;
    const additionalStudents = current.students - 1;
    const totalStudentsPrice =
      singleStudentPrice * (1 + additionalStudents * extraStudentFx);
    return accumulator + Math.ceil(totalStudentsPrice / 100) * 100;
  };

  const lessonReducer = (accumulator, current) => {
    return accumulator + current.lessonDays;
  };

  const totalPrice = data.splitRequest.reduce(priceReducer, 0);
  const totalLessons = data.splitRequest.reduce(lessonReducer, 0);
  return {
    // duration:
    //   lessonDuration === 4
    //     ? "per month"
    //     : `for ${Pluralize("week", lessonDuration, true)}`,
    lessons: lessonDuration * totalLessons,
    standardPrice: totalPrice * data.standardFx,
    premiumPrice: totalPrice * data.premiumFx,
    deluxePrice: totalPrice * data.deluxeFx,
  };
};

export const selectedOption = (state) =>
  state.contents.filter((x) => x.selected)[0];

export const getTotalPrice = (state, price = 1000, asString = true) => {
  let basePrice = price;
  return asString
    ? `₦${basePrice}`
    : basePrice + state.processingFee - state.referral.amount;
};

export const summaryDisplay = (state) => {
  const {
    priceFactor: {
      no_of_students,
      hours_per_day,
      noOfDays,
      days,
      noOfWeeks,
      discount,
    },
  } = state;
  const ddd = noOfWeeks >= 4 ? 4 : noOfWeeks;
  const display =
    noOfWeeks >= 4 ? `1 month` : `${noOfWeeks} week${noOfWeeks > 1 ? "s" : ""}`;
  const total = noOfDays * ddd;
  return `${total} lessons x ${display}`;
};

export const mapStateToProps = (state, ownProps) => {
  let selected = state.priceOptions.filter((x) => x.selected)[0];
  let price = 0;
  if (selected) {
    selected = {
      ...selected,
      alt_text: `${selected.heading} Package`,
      price: selected.price,
      formated_heading: `${state.subject ? state.subject : "Academic"} Lessons`,
    };
    price = selected.price;
  }
  return {
    priceOptions: state.priceOptions
      .map((x) => ({ ...x, subject: state.subject }))
      .sort((a, b) => a.perHour - b.perHour),
    priceFactor: state.priceFactor,
    pricingDeterminant: state.pricingDeterminant,
    selected,
    phone_number: "09094526878",
    totalPrice: getTotalPrice(state, price),
    summary: summaryDisplay(state),
    actualPrice: getTotalPrice(state, price, false),
    processingFee: state.processingFee,
    referral: state.referral,
  };
};

export const mapDispatchToProps = (dispatch) => ({
  selectPrice: (heading, selected) =>
    dispatch({ type: "SELECT_PRICE", heading, selected }),
  selectNoOfStudent: (no) =>
    dispatch({ type: "SELECT_NO_OF_STUDENT", no_of_students: no }),
  selectHours: (no) => dispatch({ type: "SELECT_HOURS", hrs: no }),
  selectDays: (no) => dispatch({ type: "SELECT_DAYS", days: no }),
  onFormFieldChanged: (data) => dispatch({ type: "POPULATE_FIELD", data }),
  onSubmitForm: () => dispatch({ type: "SUBMIT_FORM" }),
  validateCode: (code) => dispatch({ type: "VALIDATE_REFERRAL_CODE", code }),
});

function submitFormServer(code) {
  const myHeaders = new Headers({
    "X-Requested-With": "XMLHttpRequest",
  });
  return fetch(
    `${window.Urls.validate_referral_code(window.SLUG)}?referral_code=${code}`,
    {
      method: "get",
      headers: myHeaders,
    }
  )
    .then(
      (response) => response.json(),
      (error) => ({ error })
    )
    .then((json) => ({ response: json }));
}

function* validateCode(action) {
  const { referral } = yield select(mapStateToProps);
  window.$("#id_referral_code2").val(action.code);
  yield put({ type: "FETCH_CODE_START" });

  const { response, error } = yield call(submitFormServer, action.code);

  yield put({ type: "FETCH_CODE_STOP" });
  if (error) {
    yield put({
      type: "UPDATE_REFERRAL_CODE",
      code: "",
      amount: 0,
      display: false,
    });
  } else {
    let actions;
    if (response.status) {
      actions = { type: "UPDATE_REFERRAL_CODE", amount: 1500, display: true };
    } else {
      actions = {
        type: "UPDATE_REFERRAL_CODE",
        code: "",
        amount: 0,
        display: false,
      };
    }
    yield put(actions);
  }
}

function* resetCounter() {
  const { selected } = yield select(mapStateToProps);
  if (selected) {
    window.$("#the-form-section").removeClass("hidden");
    window.$("#id_budget").val(selected.price);
    window.$("#id_plan").val(selected.heading);
    // $('#pricing-form').trigger("onShowForm");
  }
}

export const getPriceRate = (
  { price_base_rate, one_hour_less_price_rate },
  noOfHour = 1
) => {
  // if (noOfHour) {
  //     if (noOfHour === 1) {
  //         return price_base_rate + one_hour_less_price_rate;
  //     }
  //     if (noOfHour === 2) {
  //         return 1;
  //     }
  //     return 1 - price_base_rate;
  // }
  return 1;
  // price_base_rate + one_hour_less_price_rate;
};

export const determineHours = (hours = 1, { hourFactors = [] }) => {
  let options = {};
  hourFactors.forEach((o) => {
    options[o.hours] = o.factor;
  });
  let hour_rate = 1;
  if (hours <= 1) {
    hour_rate = options["1 hour"] || 1;
  } else if (hours > 1 && hours <= 1.5) {
    hour_rate = options["1.5 hour"] || 1;
  } else if (hours >= 2 && hours <= 3) {
    hour_rate = options["2-3 hours"] || 1;
  } else if (hours > 3 && hours <= 4) {
    hour_rate = options["4 hours"] || 1;
  } else {
    hour_rate = options["5 hours"] || 1;
  }
  console.log({ hours, hour_rate });
  // if (hours) {

  //     return hours > 2 ? hours - (hour_rate * hours) : hours;
  // }
  return hours * hour_rate;
};

export const determineStudentNo = (no, { student_no_rate }) => {
  if (no) {
    return no === 1 ? no : 1 + (no - 1) * student_no_rate;
  }
  return 1;
};

export const calculatePrice = (
  { perHour: price, factor = 1, ...rest },
  {
    studentNo,
    hrs,
    days,
    rate,
    wks,
    discount = 0,
    locationFx = 1,
    purposeFx = 1,
    curriculumFx = 1,
    subjectsFx = 1,
    extraStudentFx = 1,
    hourFactors = [],
  }
) => {
  const scheduleValue = days * hrs * wks;
  const hourFx = HourFactor(hourFactors, hrs);
  const learningFx = purposeFx * curriculumFx * subjectsFx * hourFx;
  const hourlyRate = price * locationFx * learningFx;
  const singleStudentPrice = hourlyRate * scheduleValue;
  console.log({ locationFx, learningFx, price, hourlyRate, scheduleValue });
  const additionalStudents = studentNo - 1;
  const totalStudentsPrice =
    singleStudentPrice * (1 + additionalStudents * extraStudentFx);
  let total = Math.ceil(totalStudentsPrice / 100) * 100;
  //   const totalPrice = price * studentNo * hrs * days * wks * rate;
  //   let total = Math.ceil(totalPrice / 100) * 100;

  total -= (total * discount) / 100;
  return total * factor;
  // return total;
};
function* updatePrice() {
  const {
    priceFactor: {
      no_of_students,
      hours_per_day,
      noOfDays,
      days,
      noOfWeeks,
      discount,
    },
    pricingDeterminant,
  } = yield select(mapStateToProps);
  const rate = getPriceRate(pricingDeterminant, parseFloat(hours_per_day));
  yield put({
    type: "UPDATE_PRICE",
    studentNo: parseFloat(no_of_students),
    hrs: parseFloat(hours_per_day),
    rate,
    wks: noOfWeeks >= 4 ? 4 : noOfWeeks,
    discount,
    days: parseInt(noOfDays) || 1,
    locationFx: pricingDeterminant.vicinityFx * pricingDeterminant.stateFx,
    extraStudentFx: pricingDeterminant.student_no_rate,
    curriculumFx: pricingDeterminant.curriculumFx,
    purposeFx: pricingDeterminant.purposeFx,
    hourFactors: pricingDeterminant.hourFactors,
    subjectsFx: pricingDeterminant.subjectsFx,
  });
  window.$("#id_hours_per_day").val(hours_per_day);
  window.$("#id_no_of_students").val(no_of_students);
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const availableDays = weekdays.filter((x) => days.indexOf(x) == -1);
  if (noOfDays == days.length) {
    window.$("#id_available_days").val(days.join(","));
  } else {
    let rr = [];
    if (noOfDays > days.length) {
      let remaining = noOfDays - days.length;
      let rDays = availableDays.slice(0, remaining);
      rr = days.concat(rDays);
    } else {
      let remaining = days.length - noOfDays;
      let rDays = days.slice(0, remaining);
      rr = days.filter((x) => rDays.indexOf(x) == -1);
    }
    window.$("#id_available_days").val(rr.join(","));
  }
}
function* watchStudentChange() {
  yield* takeLatest("SELECT_NO_OF_STUDENT", updatePrice);
}
function* watchHoursChange() {
  yield* takeLatest("SELECT_HOURS", updatePrice);
}
function* watchDaysChange() {
  yield* takeLatest("SELECT_DAYS", updatePrice);
}
function* onLoad() {
  yield* takeLatest("ON_LOAD", updatePrice);
}
function* watchOptionSelected() {
  yield* takeLatest("SELECT_PRICE", resetCounter);
}
function* referralSelected() {
  yield* takeLatest("VALIDATE_REFERRAL_CODE", validateCode);
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
