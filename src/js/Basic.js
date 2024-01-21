import { white } from "../App";

export function ck_null(a, b) {
  return a ? a : b;
}

export function get_satuation(code) {
  if (!code.includes(".")) return white;
  return ck_null(code.split(".")[0], "white");
}

export function get_brightness(code) {
  if (!code.includes(".")) return white;
  return ck_null(parseInt(code.split(".")[1]), 50);
}

export function input_data(_state, _key, _value) {
  return { ..._state, _key: _value };
}

export function get_display_name(name) {
  if (name === "") return "";
  else return name.slice(0, -1) + "*";
}

export function get_display_age(birthdate) {
  var currentDate = new Date();
  var birthdateObj = new Date(birthdate);
  var age = currentDate.getFullYear() - birthdateObj.getFullYear();

  if (
    currentDate.getMonth() < birthdateObj.getMonth() ||
    (currentDate.getMonth() === birthdateObj.getMonth() &&
      currentDate.getDate() < birthdateObj.getDate())
  ) {
    age--;
  }

  var lowerRange = Math.floor(age / 5) * 5;
  var upperRange = lowerRange + 4;
  return `${lowerRange}~${upperRange}세`;
}

export function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
