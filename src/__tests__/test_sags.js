import { determineHours, determineStudentNo, getPriceRate,
  calculatePrice } from '../sagas';

const calculate = hour =>
  getPriceRate({ price_base_rate: 0.08, one_hour_less_price_rate: 1.25 }, hour);

const calculateHours = hours => determineHours(hours, { hour_rate: 0.2 });
const calculateRate = no => determineStudentNo(no, { student_no_rate: 0.25 });
const determinePrice = (price, s, h, days, discount) => {
  const rate = calculate(h);
  const student = calculateRate(s);
  const hrs = calculateHours(h);
  return calculatePrice(price, { studentNo: student, hrs, days, rate, wks: 1, discount });
};
test('price rate is as functional as ever', () => {
  expect(1500 * calculate(0)).toBe(1995);
  expect(1500 * calculate(1)).toBe(1995);
  expect(1500 * calculate(2)).toBe(1500);
  expect(1500 * calculate(3)).toBe(1380);
});

test('no of hours should work as expected', () => {
  expect(calculateHours(0)).toBe(1);
  expect(calculateHours(1)).toBe(1);
  expect(calculateHours(2)).toBe(2);
  expect(calculateHours(1.5)).toBe(1.5);
  expect(calculateHours(2.5)).toBe(2);
  expect(calculateHours(3)).toBe(2.4);
  expect(calculateHours(4)).toBe(3.2);
});

test('no of students rate work as expected', () => {
  expect(calculateRate(0)).toBe(1);
  expect(calculateRate(1)).toBe(1);
  expect(calculateRate(2)).toBe(1.5);
  expect(calculateRate(3)).toBe(2.25);
  expect(calculateRate(4)).toBe(3);
});

test('total price returns the correct result', () => {
  expect(determinePrice(1500, 3, 1, 3)).toBe(13500);
  expect(determinePrice(1500, 3, 1, 3, 10)).toBe(12150);
  expect(determinePrice(2000, 1, 1, 1)).toBe(2700);
  expect(determinePrice(2000, 2, 1, 1)).toBe(4000);
  expect(determinePrice(2000, 2, 2, 3)).toBe(18000);
  expect(determinePrice(2000, 1, 2, 3)).toBe(12000);
});
