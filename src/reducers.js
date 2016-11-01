import { combineReducers } from 'redux';
import {calculatePrice} from './sagas';

const genericAction = (action, action_type, field, state) => {
  if (action.type === action_type) {
    return action[field];
  }
  return state;
};

const hours = (state = 1, action) =>
  genericAction(action, 'HOURS_CHANGED', 'hours', state);

const weeks = (state = 1, action) =>
  genericAction(action, 'WEEKS_CHANGED', 'weeks', state);

const noOfStudents = (state = 1, action) =>
  genericAction(action, 'NO_OF_STUDENTS_CHANGED', 'no', state);

const priceFactor = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_NO_OF_STUDENT':
      return { ...state, no_of_students: action.no_of_students };
    case 'SELECT_HOURS':
      return { ...state, hours_per_day: action.hours_per_day };
    case 'SELECT_DAYS':
      return { ...state, noOfDays: action.days };
    default:
      return state;
  }
};
const pricingDeterminant = (state={}, action) => {
  return state;
};
const contentReducer = (state, action) => {
  if (action.type === 'SELECT_PRICE') {
    const selected = (action.heading === state.heading) ? action.selected : false;
    return { ...state, selected };
  }
  if (action.type === 'UPDATE_PRICE') {
    return { ...state, price: calculatePrice(state.perHour, action) };
  }
  return state;
};
const priceOptions = (state = [], action) => {
  return state.map(x=> contentReducer(x, action));
}
const subject = (state="", action)=> state
export default combineReducers({
  hours,
  weeks,
  noOfStudents,
  priceFactor,
  priceOptions,
  subject,
  pricingDeterminant,
});

function calculateDiscount(no = 1, discount = 0) {
  return 1 + ((no - 1) * (100 - discount) / 100);
}

export const getTotalPrice = (state, price = 1000, discount = 0, asString = true) => {
  const students = calculateDiscount(state.noOfStudents, discount);
  let basePrice = price * state.hours * students;
  if (state.weeks > 1) {
    const newWeek = state.weeks <= 4 ? state.weeks : 4;
    basePrice *= newWeek;
  }
  return asString ? `₦${basePrice}` : basePrice;
};

export const summaryDisplay = (state) => {
  return `12 lessons x 1 month`;
};
