export default function phoneNumber(number, prefix, showPrefix) {
  let copy = number;
  if (!number) { return ''; }
  number = String(number);
  number = number.replace(/[^0-9]*/g, '');
  if (!number) { return copy; }
  let formattedNumber = number;
  let prefixNumber = prefix ? prefix:'1';

  let c = (number[0] === prefixNumber) ? prefixNumber : '';
  number = number[0] === prefixNumber && number.length > 10 ? number.slice(1) : number;

  let area = number.substring(0, 3);
  let front = number.substring(3, 6);
  let end = number.substring(6, 10);

  if (area) {
    formattedNumber = (showPrefix ? c + '(' + area + ') ':'(' + area + ') ');
  }
  if (front) {
    // formattedNumber = (c + "(" + area + ") " + front);
    formattedNumber +=(front);
  }
  if (end) {
    formattedNumber += ('-' + end);
  }
  return formattedNumber;
};
