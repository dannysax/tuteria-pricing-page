import { combineReducers } from "redux";
import { calculatePrice } from "./sagas";

const genericAction = (action, action_type, field, state) => {
  if (action.type === action_type) {
    return action[field];
  }
  return state;
};

const hours = (state = 1, action) =>
  genericAction(action, "HOURS_CHANGED", "hours", state);

const weeks = (state = 1, action) =>
  genericAction(action, "WEEKS_CHANGED", "weeks", state);

const noOfStudents = (state = 1, action) =>
  genericAction(action, "NO_OF_STUDENTS_CHANGED", "no", state);

const priceFactor = (state = {}, action) => {
  switch (action.type) {
    case "SELECT_NO_OF_STUDENT":
      return { ...state, no_of_students: action.no_of_students };
    case "SELECT_HOURS":
      return { ...state, hours_per_day: action.hrs };
    case "SELECT_DAYS":
      return { ...state, noOfDays: action.days };
    default:
      return state;
  }
};
const pricingDeterminant = (state = {}, action) => {
  return state;
};
const contentReducer = (state, action) => {
  if (action.type === "SELECT_PRICE") {
    const selected = action.heading === state.heading ? action.selected : false;
    return { ...state, selected };
  }
  if (action.type === "UPDATE_PRICE") {
    return { ...state, price: calculatePrice(state, action) };
  }
  return state;
};
const priceOptions = (state = [], action) => {
  return state.map((x) => contentReducer(x, action));
};
const referral = (
  state = { code: "", amount: 0, display: true, isFetching: false },
  action
) => {
  if (action.type === "UPDATE_REFERRAL_CODE") {
    return {
      ...state,
      code: action.code,
      amount: action.amount,
      display: action.display,
    };
  }
  if (action.type === "FETCH_CODE_START") {
    return { ...state, isFetching: true };
  }
  if (action.type === "FETCH_CODE_STOP") {
    return { ...state, isFetching: false };
  }
  return state;
};
const processingFee = (state = 2500, action) => state;
const subject = (state = "", action) => state;
export default combineReducers({
  hours,
  weeks,
  noOfStudents,
  priceFactor,
  priceOptions,
  subject,
  pricingDeterminant,
  processingFee,
  referral,
});